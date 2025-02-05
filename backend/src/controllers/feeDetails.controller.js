import FeeDetails from "../models/feeDetails.model.js";

export const getFilteredStudents = async (req, res) => {
  try {
    const { hostelFacility, academicSession, program, semester, category } = req.query;

    const query = {};
    if (hostelFacility && hostelFacility !== "All") query.availingHostel = hostelFacility;
    if (academicSession && academicSession !== "All") query.academicSession = academicSession;
    if (program && program !== "All") query.program = program;
    if (semester && semester !== "All") query.semester = parseInt(semester, 10);
    if (category && category !== "All") query.category = category;

    console.log("Query", query);

    const filteredStudents = await FeeDetails.find(query);

    console.log("Filtered students", filteredStudents);

    res.status(200).json(filteredStudents);
  } catch (error) {
    console.error("Error fetching filtered student data:", error);
    res.status(500).json({ message: "Error fetching filtered student data" });
  }
};
