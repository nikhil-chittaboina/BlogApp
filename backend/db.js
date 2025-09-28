const mongoose=require('mongoose');


async function connectDB() {
  try {
     
      await mongoose.connect(process.env.MONGODB_URI); 
      console.log("Connected to MongoDB successfully! ✅");

  } catch (err) {
      
      console.error("Error while connecting to MongoDB:", err.message);
      // It's often good practice to exit the process on a critical DB error
      process.exit(1); 
  }
}
// schema 

// schema 
const BlogSchema = new mongoose.Schema(
    // Schema definition object (required)
    {
        content: { type: String, required: true },
        caption: String,
        likes: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
        comments: [{ 
            text: String,
           
            date: { type: Date, default: Date.now } 
        }]
    }, 
    
    { 
        timestamps: true // Corrected spelling: timestamps, not timeStamps
    }
); 

// model 
const Blog = mongoose.model('Blog', BlogSchema);




module.exports = { connectDB, Blog };
