// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const vaccinationRoutes = require('./routes/vaccinationRoutes');
const petRoutes = require('./routes/petRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/vaccinations', vaccinationRoutes);
app.use('/api/pets', petRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));
