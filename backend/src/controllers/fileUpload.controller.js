import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import csvParser from "csv-parser";
import feeDetailsModel from "../models/feeDetails.model.js";
import { feeDetailsMapping } from "../constants.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    const filePath = path.resolve(`src/uploads/${req.file.filename}`);
    const fileExtension = path.extname(req.file.filename).toLowerCase();

    // console.log(filePath);

    let feeDetailsData = [];

    if (fileExtension === ".xlsx") {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
        defval: null,
      });

      const headers = sheetData[0];
      const rows = sheetData.slice(1);

      feeDetailsData = rows
        .map((row) => {
          const rowData = {};
          headers.forEach((header, index) => {
            rowData[header] = row[index] || null;
          });
          return rowData;
        })
        .filter((row) => Object.values(row).some((value) => value !== null)); // Remove empty rows
    } else if (fileExtension === ".csv") {
      const csvData = [];
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on("data", (row) => {
            if (Object.values(row).some((value) => value.trim() !== "")) {
              csvData.push(row);
            }
          })
          .on("end", () => resolve())
          .on("error", (error) => reject(error));
      });
      feeDetailsData = csvData;
    } else {
      return res.status(400).send({ message: "Unsupported file format. Upload .xlsx or .csv only." });
    }

    // console.log(feeDetailsData);

    // Map header row data to the MongoDB schema
    const mappedData = feeDetailsData.map(feeDetailsMapping);
    
    // Insert data into MongoDB
    await feeDetailsModel.insertMany(mappedData);

    // Delete the uploaded file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${filePath}`, err);
      }
    });

    res.status(200).send({ message: "File processed and data uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error processing the file", error: error.message });
  }
};
