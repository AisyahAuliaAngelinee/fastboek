const { fetchDatabase } = require("../config/connection");
const { hashPassword } = require("../helpers/bcrypt");
// const { getCollection } = require("./index");
const { GraphQLError } = require("graphql");

const getCollection = () => {
	const database = fetchDatabase();
	const userCollection = database.collection("User");

	return userCollection;
};

const getAllUser = async () => {
	const userCollection = getCollection();
	const users = await userCollection.find().toArray(); // mengambil data user dan menampilkan kedalam bentuk array of object

	return users;
};

// Register User
const createOneUser = async (payload) => {
	const userCollection = await getCollection();
	// console.log(userCollection, "<<< user collection");

	// console.log(payload, "<<< payload");
	const newUser = await userCollection.insertOne({
		name: payload.name,
		username: payload.username,
		email: payload.email,
		password: hashPassword(payload.password),
	});
	// console.log(newUser, "<<< new user");

	// menampilkan data yang sudah teregister
	const userRegistered = await userCollection.findOne({
		_id: newUser.insertedId,
	});

	return userRegistered;
};

// Login user
const findOneUser = async (payload) => {
	try {
		const userCollection = await getCollection();

		const userLogin = await userCollection.findOne({ email: payload.email });
		// console.log(userLogin, "<<< user login dari model");
		if (!userLogin) {
			throw new GraphQLError("User not found");
		}

		// console.log(userLogin, `HHHSHSHHH`);
		return userLogin;
	} catch (error) {
		throw error;
	}
};

module.exports = { getAllUser, createOneUser, findOneUser };
