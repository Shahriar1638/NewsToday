const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    profile_picture: {
      type: String,
      default: null
    },
    bookmarks: [{ 
      type: String 
    }],
    favourites: [{ 
      type: String 
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema, 'Users');
