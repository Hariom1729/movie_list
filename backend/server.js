require('dotenv').config(); 
const express = require('express');


const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  rating: String,
});

const Movie = mongoose.model('Movie', movieSchema);

// Routes
app.get('/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.post('/movies', async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.status(201).json({ message: 'Movie added!' });
});

app.delete('/movies/:title', async (req, res) => {
  await Movie.deleteOne({ title: req.params.title });
  res.json({ message: 'Movie deleted!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
