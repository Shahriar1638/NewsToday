const express = require('express');
const router = express.Router();
const User = require('../Model/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, profile_picture } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profile_picture: profile_picture || null,
      bookmarks: [],
      favourites: []
    });

    const savedUser = await newUser.save();

    const userObject = savedUser.toObject();
    delete userObject.password;

    res.status(201).json({ message: "User registered successfully", user: userObject });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const userObject = user.toObject();
    delete userObject.password;

    res.status(200).json({ message: "Login successful", user: userObject });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
