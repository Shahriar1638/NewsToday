const express = require('express');
const router = express.Router();
const User = require('../Model/User');

router.post('/bookmark', async (req, res) => {
  try {
    const { email, article_id } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.bookmarks.includes(article_id)) {
      user.bookmarks = user.bookmarks.filter(id => id !== article_id);
    } else {
      user.bookmarks.push(article_id);
    }
    
    await user.save();
    
    const userObject = user.toObject();
    delete userObject.password;
    res.status(200).json({ user: userObject });
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post('/favourite', async (req, res) => {
  try {
    const { email, article_id } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.favourites.includes(article_id)) {
      user.favourites = user.favourites.filter(id => id !== article_id);
    } else {
      user.favourites.push(article_id);
    }
    
    await user.save();
    
    const userObject = user.toObject();
    delete userObject.password;
    res.status(200).json({ user: userObject });
  } catch (error) {
    console.error("Error toggling favourite:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
