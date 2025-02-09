import FeeDetails from "../models/feeDetails.model.js";

export const getFilteredStudents = async (req, res) => {
  try {
    let { searchQuery, hostelFacility, academicSession, program, semester, category } = req.query;

    console.log("Query params", req.query);
    
    if (!searchQuery || typeof searchQuery !== "string" || searchQuery.trim() === "") {
      searchQuery = null;
    }
    
    
    // console.log("Searching...", searchQuery);

    const query = {};
    if (hostelFacility && hostelFacility !== "All") query.availingHostel = hostelFacility;
    if (academicSession && academicSession !== "All") query.academicSession = academicSession;
    if (program && program !== "All") query.program = program;
    if (semester && semester !== "All") query.semester = parseInt(semester, 10);
    if (category && category !== "All") query.category = category;
    if (searchQuery) {
      query.$or = [
        { candidateName: { $regex: searchQuery, $options: "i" } },
        { idNumber: { $regex: searchQuery, $options: "i" } }
      ];
    }

    const filteredStudents = Object.keys(query).length === 0 ? await FeeDetails.find({}) : await FeeDetails.find(query);

    // console.log("Filtered students", filteredStudents);

    res.status(200).json(filteredStudents);
  } catch (error) {
    console.error("Error fetching filtered student data:", error);
    res.status(500).json({ message: "Error fetching filtered student data" });
  }
};
