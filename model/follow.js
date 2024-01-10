const { fetchDatabase } = require("../config/connection");
const { GraphQLError } = require("graphql");

const getCollection = () => {
	const database = fetchDatabase();
	const followCollection = database.collection("Follow");

	return followCollection;
};

const getAllFollow = async () => {
	const followCollection = await getCollection();
	const followData = await followCollection.find().toArray();
	console.log(followData, `DARI MODEL FOLLOW`);

	return followData;
};

// Follow User
const createOneUserFollow = async (payload) => {
	console.log(payload);
};

module.exports = { getAllFollow, createOneUserFollow };
