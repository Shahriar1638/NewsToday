Full-Stack Automated News Aggregation System
Build a full-stack automated news aggregation system that completely decouples the frontend from third-party API limits. The backend must autonomously fetch data on a schedule, store it securely in the database, and the frontend will query the database exclusively to provide a high-performance filtering experience.
________________________________________
# # Tech Stack
Frontend: React ( can use next js as well ), Typescript ( Optional )
Backend: Node.js with Express
Database: MongoDB
Data Source: NewsData.io API
Documentation: https://newsdata.io/documentation
________________________________________
# # Phase 1: Backend Ingestion Pipeline (Express & MongoDB)
## Cron Job
Set up a recurring scheduled task (e.g., using node-cron within your Express app) that runs at a defined interval (e.g., every 6 hours) and makes a server-side GET request to the NewsData.io API to fetch the latest industry news.
## Database Storage (MongoDB)
Parse the JSON response and store articles in a MongoDB collection (e.g., articles). You must use the API's unique article identifier to perform an upsert to prevent duplicate articles on every 
cron run. Store all relevant metadata including title, link, content, pubDate, language, country, category, creator/author, and any other available fields.
## Internal API
Create an Express REST route (e.g., GET /api/news) that the React frontend will call. This endpoint must strictly query the MongoDB collection and accept query parameters to support frontend filters.
________________________________________
# # Phase 2: Frontend Dashboard & Query Engine (React)
The React application serves as the user interface and must never call NewsData.io directly. It must only communicate with the Express backend.
## Main Feed
Display stored articles in a clean list or grid UI showing Title, Author, Date, Source, and Snippet.
## Complex Multi-Filtering (Core Requirement)
Build a dynamic filtration UI alongside the feed. All filters must use AND logic, meaning an article must match all selected criteria simultaneously.
## Required Filters
●	Date Range: Select start and end date (query pubDate)
●	Author / Creator: Dropdown or search input matching author field
●	Language: Dropdown (e.g., English, French)
●	Country: Dropdown mapping to publisher country
●	Category: Multi-select (e.g., Business, Technology, Sports)
●	Content Type: Toggle or dropdown for datatype (e.g., News, Blog, Press Release, Podcast)
