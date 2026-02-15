const mongoose = require('mongoose');

const uri = "mongodb+srv://sinchinedas9285_db_user:2Obb1zaAhcf7RLVo@cluster0.jl7gfg6.mongodb.net/?appName=Cluster0";

console.log("Attempting to connect to MongoDB Atlas...");

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => {
        console.log("SUCCESS: Connected to MongoDB Atlas!");
        process.exit(0);
    })
    .catch(err => {
        console.error("ERROR: Could not connect to MongoDB Atlas.");
        console.error("Reason:", err.message);
        process.exit(1);
    });
