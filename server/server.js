require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5001;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Atlas connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Mongoose Schema (The structure of our data) ---
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

// GET Endpoint: Fetches all polls from the database
app.get('/api/polls', async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching polls' });
  }
});

// POST Endpoint: Handles a new vote
app.post('/api/polls/vote', async (req, res) => {
  const { pollId, optionId } = req.body;
  try {
    // Find the poll and the specific option, then increment the vote count
    const poll = await Poll.findOne({ id: pollId, 'options.id': optionId });
    if (poll) {
      await Poll.updateOne(
        { id: pollId, 'options.id': optionId },
        { $inc: { 'options.$.votes': 1 } }
      );
      // Fetch and return all polls so the front-end can update
      const updatedPolls = await Poll.find();
      res.json(updatedPolls);
    } else {
      res.status(404).json({ message: 'Poll or option not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error processing vote' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});