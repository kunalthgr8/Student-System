import FeeDetails from "../models/feeDetails.model.js";

export const getFilteredStudents = async (req, res) => {
  try {
    let { hostelFacility, academicSession, program, semester, category, search } = req.query;

    console.log("Query params", req.query);
    
    if (search === "undefined" || search === "null" || !search.trim()) {
      search = null;
    }
    
    // console.log("Searching...", search);

    const query = {};
    if (hostelFacility && hostelFacility !== "All") query.availingHostel = hostelFacility;
    if (academicSession && academicSession !== "All") query.academicSession = academicSession;
    if (program && program !== "All") query.program = program;
    if (semester && semester !== "All") query.semester = parseInt(semester, 10);
    if (category && category !== "All") query.category = category;
    if (search) {
      query.$or = [
        { candidateName: { $regex: search, $options: "i" } },
        { idNumber: { $regex: search, $options: "i" } }
      ];
    }

    console.log("Query", query);

    const filteredStudents = Object.keys(query).length === 0 ? await FeeDetails.find({}) : await FeeDetails.find(query);

    // console.log("Filtered students", filteredStudents);

    res.status(200).json(filteredStudents);
  } catch (error) {
    console.error("Error fetching filtered student data:", error);
    res.status(500).json({ message: "Error fetching filtered student data" });
  }
};
