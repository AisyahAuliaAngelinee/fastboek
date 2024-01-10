const { ObjectId } = require("mongodb");
const { fetchDatabase } = require("../config/connection");

const getCollection = () => {
	const database = fetchDatabase();
	const postCollection = database.collection("Post");

	return postCollection;
};

// Fetch post
const getAllPost = async () => {
	const postCollection = getCollection();
	const post = await postCollection.find().toArray();

	return post;
};

// Create post
const createOnePost = async (payload) => {
	// console.log(payload, "<<< payload");
	const newPost = await getCollection().insertOne(payload);
	// console.log(newPost, "<<< post created");

	const latestPost = await getCollection().findOne({
		_id: new ObjectId(newPost.insertedId),
	});
	// console.log(latestPost, "<<< post terbaru");

	return latestPost;
};

module.exports = { getAllPost, createOnePost };
