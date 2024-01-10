require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { userTypeDefs, userResolvers } = require("./schema/users");
const { mongoConnection } = require("./config/connection");
const { postTypeDefs, postResolvers } = require("./schema/posts");
const authentication = require("./middleware/authentication");
const { followTypeDefs, followResolvers } = require("./schema/follows");
const PORT = process.env.PORT || 3000;

const server = new ApolloServer({
	typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
	resolvers: [userResolvers, postResolvers, followResolvers],
	introspection: true,
});

(async () => {
	try {
		await mongoConnection();
		const { url } = await startStandaloneServer(server, {
			listen: PORT,
			context: async ({ req, res }) => {
				// console.log("must pass the authentication");
				return {
					doAuthentication: () => authentication(req),
				};
			},
		});

		console.log(`Server is ready, URL: ${url}`);
	} catch (error) {
		console.log(error);
	}
})();
