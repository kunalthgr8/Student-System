import express from 'express';
import feeDetails from '../models/feeDetails.model.js';

const router = express.Router();

// GET all student details
router.get('/students', async (req, res) => {
  try {
    const students = await feeDetails.find({});
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).json({ message: "Error fetching student data" });
  }
});

export default router;
