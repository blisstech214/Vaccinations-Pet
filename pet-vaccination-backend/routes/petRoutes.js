const express = require('express');
const router = express.Router();
const {
  createPet,
  getAllPets,
  getPetById,
} = require('../controllers/petController');

router.post('/', createPet);         // Create a new pet
router.get('/', getAllPets);         // Get all pets
router.get('/:id', getPetById);      // Get a single pet

module.exports = router;
