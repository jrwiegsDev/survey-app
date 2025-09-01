// Load environment variables from a .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5001;

// --- Middleware ---
// Allow requests from any origin - the standard for a public API
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Atlas connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Mongoose Data Schema ---
const optionSchema = new mongoose.Schema({
  id: String,
  text: String,
  votes: { type: Number, default: 0 }
});

const pollSchema = new mongoose.Schema({
  id: Number,
  question: String,
  options: [optionSchema]
});

const Poll = mongoose.model('Poll', pollSchema);

// --- API Endpoints ---

// GET /api/polls: Fetches all polls from the database
app.get('/api/polls', async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching polls' });
  }
});

// POST /api/polls/vote: Finds a poll and option by ID and increments the vote
app.post('/api/polls/vote', async (req, res) => {
  const { pollId, optionId } = req.body;
  try {
    // Find the specific option within a poll and increment its vote count by 1
    await Poll.updateOne(
      { id: pollId, 'options.id': optionId },
      { $inc: { 'options.$.votes': 1 } }
    );
    
    // Fetch and return the updated list of all polls
    const updatedPolls = await Poll.find();
    res.json(updatedPolls);
  } catch (err) {
    res.status(500).json({ message: 'Error processing vote' });
  }
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});