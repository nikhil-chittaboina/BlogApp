


const express = require('express');

const router = express.Router();

const { Blog } = require('../db.js'); // u will perform ops on blogModel 



// CREATE A POST
router.post("/", async (req, res) => {
    try {
        const post = new Blog(req.body);

        // Save will automatically perform validation based on your Blog schema
        await post.save();

        // Use 201 (Created) for successful creation
        res.status(201).json(post); 

    } catch (error) {
        // Handle validation errors or database connection issues
        // Use 400 (Bad Request) if the client sent invalid data
        res.status(400).json({ msg: "Failed to create post", error: error.message });
    }
});



// READ ALL THE POSTS
router.get("/", async (req, res) => {
    try {
        const posts = await Blog.find();

        // Use 200 (OK). It's standard to return an empty array if no posts are found.
        res.status(200).json(posts); 

    } catch (error) {
        // Use 500 (Internal Server Error) for unexpected server/database errors
        res.status(500).json({ msg: "Internal server error while fetching posts", error: error.message });
    }
});


// READ A SINGLE POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);

        if (!post) {
            // Use 404 (Not Found) when a resource doesn't exist
            return res.status(404).json({ msg: "Post not found" });
        }

        // Use 200 (OK)
        res.status(200).json(post); 

    } catch (error) {
        // Catches errors like an invalid MongoDB ID format
        res.status(400).json({ msg: "Invalid post ID format or database error", error: error.message });
    }
});



// UPDATE A POST 
router.put("/:id", async (req, res) => {
    try {
        // { new: true } returns the updated document, not the original one
        // { runValidators: true } ensures Mongoose runs schema validation on update
        const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!post) {
            return res.status(404).json({ msg: "Post not found for update" });
        }

        // Use 200 (OK)
        res.status(200).json(post); 

    } catch (error) {
        // Handles validation errors during the update process
        res.status(400).json({ msg: "Failed to update post due to bad data or ID", error: error.message });
    }
});



// DELETE A POST 
router.delete("/:id", async (req, res) => {
    try {
        // Store the result to check if a document was actually deleted
        const deletedPost = await Blog.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            // If findByIdAndDelete returns null, the post wasn't found
            return res.status(404).json({ msg: "Post not found for deletion" });
        }

        // Use 204 (No Content) for a successful deletion when you don't send back a body
        res.status(204).send(); 
        
        // Alternative: Use 200 (OK) and send a confirmation message
        // res.status(200).json({ msg: "Post deleted successfully" });

    } catch (error) {
        res.status(500).json({ msg: "Internal server error during deletion", error: error.message });
    }
});

//---------------------------------------------------------

module.exports = router; // export this router with all the defined routes