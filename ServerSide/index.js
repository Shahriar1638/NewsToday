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
    startCronJob();
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.get('/', (req, res) => {
  res.send('Server is running')
});

// Route Handlers
const newsRoutes = require('./Paths/news');
const authRoutes = require('./Paths/auth');
const userRoutes = require('./Paths/user');

app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Current active port: ${port}`);
})
