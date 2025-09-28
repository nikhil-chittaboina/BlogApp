const express = require('express');
// Import the database connection function we defined earlier
// Assuming your database setup file is named 'db.js' and is in the current directory
const { connectDB } = require('./db.js'); 

require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT||3000;

app.use(cors())

// Middleware setup
app.use(express.json());

// Import the posts router
const postsRouter = require('./routes/postsRoutes.js');

// Mount the router at the /posts path
app.use('/posts', postsRouter);  

// Basic health check/root route
app.get('/', (req, res) => {
    res.status(200).send('Blog API is running!');
});


// Function to connect to the DB and then start the server
async function startServer() {
    try {
        // 1. Await the database connection
        await connectDB(); 

        // 2. Start the Express server only after the DB connection is successful
        app.listen(port, () => {
            console.log(`Server running successfully on http://localhost:${port}`);
        });
    } catch (error) {
        // Log error if connection or startup fails
        console.error('Failed to start server:', error.message);
        process.exit(1); 
    }
}

// Execute the startup function
startServer();
