// controllers/vaccinationController.js
const Vaccination = require('../models/Vaccination');
const mongoose = require("mongoose");

exports.getAllVaccinations = async (req, res) => {
  try {
    const vaccinations = await Vaccination.find().populate("petId", "name"); // ⬅️ only populate pet name
    res.json(vaccinations);
  } catch (error) {
    console.error("Failed to get vaccinations:", error);
    res.status(500).json({ error: "Failed to fetch vaccinations" });
  }
};

exports.addVaccination = async (req, res) => {
  try {
    const { petId, type, lastCompleted, dueDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(petId)) {
      return res.status(400).json({ error: "Invalid pet ID" });
    }

    const vaccination = new Vaccination({
      petId,
      type,
      lastCompleted: new Date(lastCompleted),
      dueDate: new Date(dueDate), // ✅ Use user-supplied dueDate
    });

    await vaccination.save();
    res.status(201).json(vaccination);
  } catch (error) {
    console.error("Add vaccination error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.addVaccinationType = async (req, res) => {
  // Optional: if you want a separate model for types
  res.status(201).json({ message: 'Vaccination type added (not implemented)' });
};
