// -   [ ] Add Post: untuk menambahkan post baru
// -   [ ] Get Posts: mengambil daftar post berdasarkan yang terbaru
// -   [ ] Get Post by Id: mengambil post berdasarkan id
// -   [ ] Comment Post: untuk menambahkan komentar pada post
// -   [ ] Like Post: untuk menambahkan like pada post

const { ObjectId } = require("mongodb");
const { getDatabase } = require("../Config/mongoConnect");
const { GraphQLError } = require("graphql");

const getCollection = () => {
	const database = getDatabase();
	const followCollection = database.collection("Follows");
	return followCollection;
};

const followUser = async ({ followingId, followerId }) => {
	const followCollection = getCollection();
	const payload = {
		followingId: new ObjectId(followingId),
		followerId: followerId,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	const followingLink = await followCollection.insertOne(payload);

	const checkStatus = await followCollection.findOne({
		_id: followingLink.insertedId,
	});
	return checkStatus;
};

module.exports = {
	getCollection,
	followUser,
};
