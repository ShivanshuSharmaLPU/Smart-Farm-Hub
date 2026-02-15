const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_FILE = path.join(__dirname, 'db.json');

async function fixPasswords() {
    if (!fs.existsSync(DB_FILE)) {
        console.log("No db.json found.");
        return;
    }

    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    let changed = false;

    for (let user of data.users) {
        // Check if password looks like a hash (bcrypt hashes start with $2a$ or $2b$)
        if (!user.password.startsWith('$2a$') && !user.password.startsWith('$2b$')) {
            console.log(`Hashing password for ${user.email}...`);
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
        console.log("Updated db.json with hashed passwords.");
    } else {
        console.log("No plain text passwords found.");
    }
}

fixPasswords().catch(console.error);
