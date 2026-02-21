const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: '.env.local' }); 
const mongoose = require('mongoose');
const { startCronJob } = require('./cron');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `${process.env.DB_URI}`;

mongoose.connect(uri)
  .then(() => {
    console.log("Pinged your deployment. You successfully connected to MongoDB via Mongoose!");
    // startCronJob(); 
    // startCronJob();
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.get('/', (req, res) => {
  res.send('Server is running')
});

// Route Handlers
const newsRoutes = require('./Paths/news');
app.use('/api/news', newsRoutes);

app.listen(port, () => {
  console.log(`Current active port: ${port}`);
})
