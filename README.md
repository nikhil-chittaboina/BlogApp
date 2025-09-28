# 📖 BLOG YOUR DAY: Full-Stack MERN Application (Version 1.0)

This is a complete, deployed full-stack application built using the MERN (MongoDB, Express, React, Node.js) stack. It serves as a single-page client for creating, viewing, and managing blog posts.

---

## 🚀 Live Application Links

| Service                        | Address                                                                 |
|--------------------------------|-------------------------------------------------------------------------|
| Frontend Client (React UI)     | [https://blogapp-frontend-nlhr.onrender.com](https://blogapp-frontend-nlhr.onrender.com) |
| Backend API (Express Server)   | [https://blogapp-v10d.onrender.com](https://blogapp-v10d.onrender.com)   |

---

## 🛠 Technology Stack

- **Frontend:** React, JavaScript (Hooks), Pure CSS/Inline Styles, Vite  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (via Mongoose ORM)

---

## ✨ Features
- **Create (POST):** Submit new blog posts via a form.
- **Read (GET):** Fetch and display all posts from the MongoDB database, showing the newest posts first.
- **Delete (DELETE):** Remove posts instantly from the database via a button on the Post Card.
- **Responsive UI:** Layout adapts to different screen sizes.
- **Error Handling:** Displays clear messages when the API server is unreachable.

---

## ⚙️ Local Setup Instructions

To run this project on your local machine, follow these steps:

### 1. Backend Setup

1. **Navigate to the `backend/` directory**
   ```bash
   cd backend

2. **Install dependencies:**
   ```bash
   npm install
   
3. **Configure `.env`:** Create a file named **`.env`** in the `backend/` folder and add your local MongoDB URI and port:

   ```bash
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/blogapi
4. **Start the server:** `node server.js`
   (The console should confirm "Connected to MongoDB successfully!" and "Server running successfully on port 3000")

### 2. Frontend Setup

1. **Navigate to the `frontend/` directory:** `cd ../frontend`

2. **Install dependencies:** `npm install`

3. **Start the React development server:** `npm run dev`

   The React client will open, and the `GET /posts` request will automatically connect to your local backend server at `http://localhost:3000/posts`.

---

## ☁️ Deployment Configuration

This section details the environment variables required for cloud hosting (e.g., Render, Vercel).

| Component | Variable | Purpose |
| :--- | :--- | :--- |
| **Backend** | `MONGODB_URI` | Stores the secret MongoDB Atlas connection string. |
| | `PORT` | Set dynamically by the host (Render). |
| **Frontend** | `REACT_APP_API_URL` | Stores the live public URL of the backend service (e.g., `https://blogapp-v10d.onrender.com/posts`). |  
 
   
   
   
   

  

