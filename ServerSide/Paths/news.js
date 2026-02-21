const express = require('express');
const router = express.Router();
const Article = require('../Model/Newsdata');

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const requestedLimit = parseInt(req.query.limit) || 20;
    const limit = Math.min(requestedLimit, 52); // Max 52 per page requested by user
    const skip = (page - 1) * limit;

    // Expand empty filter object to handle all the category/date filters
    const queryFilter = {}; 

    // 1. Date Range Filter
    if (req.query.startDate || req.query.endDate) {
      queryFilter.pubDate = {};
      // Append operators if they exist in the incoming query
      if (req.query.startDate) queryFilter.pubDate.$gte = new Date(req.query.startDate);
      if (req.query.endDate) queryFilter.pubDate.$lte = new Date(req.query.endDate);
    }

    // 2. Author / Creator Filter (Regex so its case-insensitive and partial match)
    if (req.query.author) {
      queryFilter.creator = { $regex: req.query.author, $options: 'i' };
    }

    // 3. Language Filter (Exact string match)
    if (req.query.language) {
      queryFilter.language = req.query.language;
    }

    // 4. Country Filter (Checks if country exists inside the country array)
    if (req.query.country) {
      queryFilter.country = req.query.country;
    }

    // 5. Category Filter (Multi-select)
    if (req.query.category) {
      // Allows it to handle both single "?category=Business" and multi "?category=Business,Technology"
      const categoriesArray = req.query.category.split(',');
      queryFilter.category = { $in: categoriesArray };
    }

    // 6. Content Type Filter (e.g. "News" or "Blog")
    if (req.query.datatype) {
      queryFilter.datatype = req.query.datatype;
    }

    const [articles, totalArticles] = await Promise.all([
      Article.find(queryFilter)
        .sort({ pubDate: -1 })
        .skip(skip)
        .limit(limit),
      Article.countDocuments(queryFilter)
    ]);

    res.json({
      articles,
      pagination: {
        totalArticles,
        currentPage: page,
        // Make sure it defaults to 1 if there are no articles
        totalPages: Math.ceil(totalArticles / limit) || 1, 
        limit
      }
    });

  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
