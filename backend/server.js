// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// MongoDB setup
mongoose.connect('mongodb+srv://prajwalnayak2000:86aF7aPaZok5mVbq@cluster0.rnsjr2z.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  image: String,
});
const User = mongoose.model('User', userSchema);

// API endpoint for storing user images
app.post('/api/users', async (req, res) => {
  try {
    const { username, image } = req.body;
    const newUser = new User({ username, image });
    await newUser.save();
    res.status(201).json({ message: 'User image stored successfully' });
  } catch (error) {
    console.error('Error storing user image:', error);
    res.status(500).json({ error: 'Failed to store user image' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
