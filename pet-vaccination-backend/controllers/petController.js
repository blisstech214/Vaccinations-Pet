const Pet = require('../models/Pet');

// POST /api/pets
exports.createPet = async (req, res) => {
  try {
    const { name, birthDate } = req.body;
    const pet = new Pet({ name, birthDate });
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create pet' });
  }
};

// GET /api/pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
};

// GET /api/pets/:id
exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ error: 'Pet not found' });
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pet' });
  }
};
