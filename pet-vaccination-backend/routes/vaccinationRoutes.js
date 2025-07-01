// routes/vaccinationRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllVaccinations,
  addVaccination,
  addVaccinationType,
} = require('../controllers/vaccinationController');

router.get('/', getAllVaccinations);
router.post('/', addVaccination);
router.post('/type', addVaccinationType); // if types are to be stored separately

module.exports = router;
