const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoD
mongoose.connect("mongodb://127.0.0.1:27017/sports_pulse", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

//  Schema & Model
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  sport: String,
  date: { type: Date, default: Date.now }
});

const Student = mongoose.model("Student", studentSchema);

//  API Routes
app.post("/register", async (req, res) => {
  try {
    const { name, email, sport } = req.body;
    const newStudent = new Student({ name, email, sport });
    await newStudent.save();
    res.json({ message: "Registration successful!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving data" });
  }
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

//  Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
