const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

console.log("Checking local Mock Database...");

if (fs.existsSync(DB_FILE)) {
    try {
        const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
        if (data.users && data.advisories) {
            console.log("SUCCESS: Local Mock Database is ready!");
            process.exit(0);
        } else {
            throw new Error("Invalid structure in db.json");
        }
    } catch (err) {
        console.error("ERROR: Mock DB file is corrupted.", err.message);
        process.exit(1);
    }
} else {
    console.error("ERROR: db.json not found. Run the server once to initialize it.");
    process.exit(1);
}
