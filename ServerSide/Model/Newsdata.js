const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {

    article_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
    keywords: [{ type: String }],
    creator: [{ type: String }],
    video_url: { type: String, default: null },
    description: { type: String, default: null },
    pubDate: { type: Date, required: true },
    image_url: { type: String, default: null },
    source_id: { type: String },
    source_url: { type: String },
    source_icon: { type: String, default: null },
    source_priority: { type: Number },
    country: [{ type: String }],
    category: [{ type: String }],
    language: { type: String },
    duplicate: { type: Boolean, default: false },
    datatype: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Article', articleSchema, 'NewsData');