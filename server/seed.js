require('dotenv').config();

const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

// --- Define the Schema again (must match server.js) ---
const optionSchema = new mongoose.Schema({
  id: String, text: String, votes: { type: Number, default: 0 }
});
const pollSchema = new mongoose.Schema({
  id: Number, question: String, options: [optionSchema]
});
const Poll = mongoose.model('Poll', pollSchema);

// --- The poll data we want to insert ---
const initialPolls = [
  {id:1,question:"What is your favorite programming language?",options:[{id:"a",text:"JavaScript",votes:0},{id:"b",text:"Python",votes:0},{id:"c",text:"C#",votes:0},{id:"d",text:"Rust",votes:0},{id:"e",text:"Other",votes:0},],},{id:2,question:"Which area of development do you prefer?",options:[{id:"f",text:"Frontend",votes:0},{id:"g",text:"Backend",votes:0},{id:"h",text:"Full-Stack",votes:0},{id:"i",text:"Data / AI",votes:0},],},{id:3,question:"What's your go-to operating system for development?",options:[{id:"j",text:"Windows",votes:0},{id:"k",text:"macOS",votes:0},{id:"l",text:"Linux",votes:0},],},{id:4,question:"Coffee: hot or iced?",options:[{id:"m",text:"Hot Coffee",votes:0},{id:"n",text:"Iced Coffee",votes:0},{id:"o",text:"Depends on the weather",votes:0},{id:'w',text:"I don't like coffee (this is wrong, but okay...)",votes:0},],},{id:5,question:"Dogs or cats?",options:[{id:"p",text:"Cats",votes:0},{id:"q",text:"Dogs",votes:0},{id:"r",text:"Both / Neither",votes:0},],},{id:6,question:"What's your favorite way to unwind after coding?",options:[{id:"s",text:"Video Games",votes:0},{id:"t",text:"Watching a movie/show",votes:0},{id:"u",text:"Going outside",votes:0},{id:"v",text:"Reading a book",votes:0},],},
];

// --- The Seeding Function ---
const seedDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected for seeding.");

    // Clear existing polls to avoid duplicates
    await Poll.deleteMany({});
    console.log("Existing polls cleared.");

    // Insert the new polls
    await Poll.insertMany(initialPolls);
    console.log("Database seeded successfully!");

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Disconnect from the database
    mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
};

seedDatabase();