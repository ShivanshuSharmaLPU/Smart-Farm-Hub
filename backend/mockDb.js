const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

// Initialize DB file if not exists
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], advisories: [] }, null, 2));
}

class MockModel {
    constructor(collectionName) {
        this.collectionName = collectionName;
    }

    _getData() {
        return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }

    _saveData(data) {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    }

    async find(query = {}) {
        let data = this._getData()[this.collectionName];
        let results = data.filter(item => {
            for (let key in query) {
                if (item[key] !== query[key]) return false;
            }
            return true;
        });

        // Add chainable mock methods
        results.sort = function () { return this; };
        return results;
    }

    async findOne(query = {}) {
        const results = await this.find(query);
        return results[0] || null;
    }

    async findById(id) {
        const data = this._getData()[this.collectionName];
        return data.find(item => item.id === id || item._id === id) || null;
    }

    async create(doc) {
        const data = this._getData();
        const newDoc = {
            ...doc,
            _id: Math.random().toString(36).substr(2, 9),
            id: undefined,
            createdAt: new Date()
        };
        // To mimic mongoose .id getter
        newDoc.id = newDoc._id;

        data[this.collectionName].push(newDoc);
        this._saveData(data);
        return newDoc;
    }

    // This is for new User({...}).save() pattern
    static createInstance(collectionName, data) {
        const model = new MockModel(collectionName);
        return {
            ...data,
            save: async function () {
                return await model.create(this);
            }
        };
    }
}

const User = new MockModel('users');
const Advisory = new MockModel('advisories');

// Adding some helper methods to User to match routes
User.findById = async function (id) {
    const user = await MockModel.prototype.findById.call(this, id);
    if (user) {
        user.select = function () { return this; }; // mock .select('-password')
    }
    return user;
};

module.exports = { User, Advisory, MockModel };
