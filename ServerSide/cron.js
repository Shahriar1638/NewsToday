const cron = require('node-cron');
const mongoose = require('mongoose');
const Article = require('./Model/Newsdata');

async function fetchAndUpsertNews() {
  console.log('Running scheduled task: Fetching news from NewsData.io...');
  
  try {
    const apiKey = process.env.NEWSDATA_IO;
    const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=en`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status !== 'success') {
      console.error('Failed to fetch data from NewsData API:', data);
      return;
    }

    const articles = data.results;

    let newInserts = 0;
    let updates = 0;

    for (const item of articles) {
      const filter = { article_id: item.article_id };
      const updateDoc = {
        $set: {
          title: item.title,
          link: item.link,
          keywords: item.keywords || [],
          creator: item.creator || [],
          video_url: item.video_url || null,
          description: item.description || null,
          pubDate: new Date(item.pubDate),
          image_url: item.image_url || null,
          source_id: item.source_id,
          source_url: item.source_url,
          source_icon: item.source_icon || null,
          source_priority: item.source_priority,
          country: item.country || [],
          category: item.category || [],
          language: item.language,
          duplicate: item.duplicate || false,
          datatype: item.datatype || 'News'
        }
      };

      // if upsert: true update MongoDB else insert brand new
      const options = { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true };
      const result = await Article.findOneAndUpdate(filter, updateDoc, options);

      // Check how many got inserted to debug any issues later
      if (result.createdAt.getTime() === result.updatedAt.getTime()) {
        newInserts++;
      } else {
        updates++;
      }
    }
    console.log(`Cron job complete! Inserted: ${newInserts}, Updated: ${updates}`);

  } catch (error) {
    console.error('Error in fetchAndUpsertNews:', error.message);
  }
}

const startCronJob = () => {
    console.log('Initializing News Ingestion Pipeline...');
    fetchAndUpsertNews(); 

    cron.schedule('0 */6 * * *', () => {
      fetchAndUpsertNews();
    });
};

module.exports = { startCronJob };
