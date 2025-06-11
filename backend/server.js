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
  userId:String,
});

const Movie = mongoose.model('Movie', movieSchema);

// Routes
app.get('/movies/:userId', async (req, res) => {
  const movies = await Movie.find({ userId: req.params.userId });
  res.json(movies);
});

app.post('/movies', async (req, res) => {
  try {
    console.log("Incoming data:", req.body); // Log incoming data
    const movie = new Movie(req.body);       // Create a new Movie document
    await movie.save();                      // Save it to MongoDB
    res.status(201).json({ message: 'Movie added!' }); // Send success response
  } catch (error) {
    console.error("POST /movies failed:", error.message); // Log error
    res.status(500).json({ error: 'Failed to add movie.' }); // Send error response
  }
});


app.delete('/movies/:title', async (req, res) => {
  await Movie.deleteOne({ title: req.params.title });
  res.json({ message: 'Movie deleted!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
