BLOG YOUR DAY: Full-Stack MERN Application (Version 1.0)
This is a complete, deployed full-stack application built using the MERN (MongoDB, Express, React, Node.js) stack. It serves as a single-page client for creating, viewing, and managing blog posts.

🚀 Live Application Links
Service

Address

Frontend Client (React UI)

https://blogapp-frontend-nlhr.onrender.com

Backend API (Express Server)

https://blogapp-v10d.onrender.com

🛠️ Technology Stack
Frontend: React, JavaScript (Hooks), Pure CSS/Inline Styles, Vite

Backend: Node.js, Express.js

Database: MongoDB (via Mongoose ORM)

Deployment: Render (Backend), Render (Frontend)

✨ Features
Create (POST): Submit new blog posts via a form.

Read (GET): Fetch and display all posts from the MongoDB database, showing the newest posts first.

Delete (DELETE): Remove posts instantly from the database via a button on the Post Card.

Responsive UI: Layout adapts to different screen sizes.

Error Handling: Displays clear messages when the API server is unreachable.

⚙️ Local Setup Instructions
To run this project on your local machine, follow these steps:

1. Backend Setup
Navigate to the backend/ directory.

cd backend

Install dependencies:

npm install

Configure .env: Create a file named .env in the backend/ folder and add your local MongoDB URI and port:

PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/blogapi

Start the server:

node server.js

(The console should confirm "Connected to MongoDB successfully!")

2. Frontend Setup
Navigate to the frontend/ directory.

cd ../frontend

Install dependencies:

npm install

Start the React development server:

npm run dev

The React client will open, and the GET /posts request will automatically connect to your local backend server at http://localhost:3000/posts.

☁️ Deployment Configuration
The application is configured for deployment using environment variables:

Component

Variable

Purpose

Backend

MONGODB_URI

Stores the secret MongoDB Atlas connection string.



PORT

Set dynamically by the host (Render).

Frontend

REACT_APP_API_URL

Stores the live public URL of the backend service (https://blogapp-v10d.onrender.com/posts).

(The frontend uses a fallback to http://localhost:3000/posts during local development.)
