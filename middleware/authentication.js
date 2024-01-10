const { GraphQLError } = require("graphql");
const { verifyToken } = require("../helpers/jwt");
const { findOneUser } = require("../model/user");
const { ObjectId } = require("mongodb");

const authentication = async (req) => {
	// console.log(req.headers, "<<< authentication");

	const authorizationToken = req.headers.authorization;
	// console.log(authorizationToken, "<<< token");

	if (!authorizationToken) {
		throw new GraphQLError("Invalid Token", {
			extensions: {
				code: "UNAUTHENTICATED",
				http: { status: 401 },
			},
		});
	}

	const token = authorizationToken.split(" ")[1];
	// console.log(token, "<<< token");

	const tokenValidation = verifyToken(token);
	// console.log(tokenValidation, "<<< token validate");

	const foundUser = await findOneUser({
		// _id: new ObjectId(tokenValidation.id),
		email: tokenValidation.email,
	});
	// console.log(foundUser, "<<< user found");

	if (!foundUser) {
		throw new GraphQLError("Invalid Token", {
			extensions: {
				code: "User not found",
				http: { status: 401 },
			},
		});
	}

	return {
		id: foundUser._id,
		name: foundUser.name,
		username: foundUser.username,
		email: foundUser.email,
	};
};

module.exports = authentication;
