const express = require('express');
const router = express.Router();
const Article = require('../Model/Newsdata');

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const requestedLimit = parseInt(req.query.limit) || 20;
    const limit = Math.min(requestedLimit, 52);
    const skip = (page - 1) * limit;

    const queryFilter = {}; 

    if (req.query.startDate || req.query.endDate) {
      queryFilter.pubDate = {};
      if (req.query.startDate) queryFilter.pubDate.$gte = new Date(req.query.startDate);
      if (req.query.endDate) queryFilter.pubDate.$lte = new Date(req.query.endDate);
    }

    if (req.query.author) {
      queryFilter.creator = { $regex: req.query.author, $options: 'i' };
    }

    if (req.query.language) {
      queryFilter.language = req.query.language.toLowerCase();
    }

    if (req.query.country) {
      queryFilter.country = req.query.country.toLowerCase();
    }

    if (req.query.category) {
      const categoriesArray = req.query.category.split(',').map(c => c.toLowerCase());
      queryFilter.category = { $in: categoriesArray };
    }

    if (req.query.datatype) {
      queryFilter.datatype = req.query.datatype.toLowerCase();
    }

    if (req.query.ids) {
      const idsArray = req.query.ids.split(',');
      queryFilter.article_id = { $in: idsArray };
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
