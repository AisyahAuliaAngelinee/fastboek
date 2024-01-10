const { MongoClient } = require("mongodb");

// mongo URI connection string
const mongoURI = process.env.MONGO_URI;
const client = new MongoClient(mongoURI); // set the connection to client

let database; // the Database that used

// connection to database mongoDB
async function mongoConnection() {
	try {
		await client.connect(); // run the mongoDB connection URI
		console.log("Success Connect to MongoDB URI");

		database = client.db("fastboekDB"); // reasign value database kosong dengan database yang ada di mongoDB

		return client;
	} catch (error) {
		await client.close(); // this will run if the connection error
		console.log("Failed to Connect MonggoDB URI");
	}
}

// fetch data in database
function fetchDatabase() {
	return database;
}

module.exports = { mongoConnection, fetchDatabase };
