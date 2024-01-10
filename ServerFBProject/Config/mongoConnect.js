const { MongoClient, ObjectId } = require("mongodb");

// Replace the uri string with your connection string.
const uri =
    "mongodb+srv://shellinw:mongodbpassword@phase3.mzfd8gt.mongodb.net/";

const client = new MongoClient(uri);

let database;

async function mongoConnect() {
    try {
        await client.connect();
        console.log(`Successfully connect to mongo`);
        database = client.db("FacebookProject");

        return client;
    } catch (error) {
        // Ensures that the client will close when you finish/error
        await client.close();
        console.log(`Error while connect to mongo`);
        throw error;
    }
}

function getDatabase() {
    return database;
}

module.exports = {
    mongoConnect,
    getDatabase,
};
