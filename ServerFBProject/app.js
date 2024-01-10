const { mongoConnect } = require("./Config/mongoConnect");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { usersTypeDefs, usersResolvers } = require("./Schema/user");
const { postsResolvers, postsTypeDefs } = require("./Schema/post");
const { followsResolvers, followsTypeDefs } = require("./Schema/follow");
const { GraphQLError } = require("graphql");
const { verifyToken } = require("./Middleware/jwt");
const { getDatabase } = require("./Config/mongoConnect");
const { ObjectId } = require("mongodb");
const PORT = 3000;

const server = new ApolloServer({
    typeDefs: [usersTypeDefs, postsTypeDefs, followsTypeDefs],
    resolvers: [usersResolvers, postsResolvers, followsResolvers],
});

(async () => {
    try {
        await mongoConnect();
        const { url } = await startStandaloneServer(server, {
            listen: {
                port: PORT,
            },
            context: async ({ req }) => {
                return {
                    authentication: async () => {
                        try {
                            const { authorization } = req.headers;
                            if (!authorization) {
                                throw new GraphQLError(
                                    "Unauthenticated,LoginFirst"
                                );
                            }
                            const token = authorization.split(" ")[1];

                            const data = verifyToken(token);
                            console.log(data, `MIII`);
                            const db = getDatabase().collection("Users");

                            const checkUser = await db.findOne({
                                _id: new ObjectId(data.loggedId),
                                username: data.username,
                            });
                            console.log(checkUser, `INI USER MIII`);
                            if (!checkUser) {
                                throw new GraphQLError("InvalidUser");
                            }
                            return {
                                id: checkUser._id,
                                email: checkUser.email,
                                username: checkUser.username,
                            };
                        } catch (error) {
                            console.log(error);
                        }
                    },
                };
            },
        });
        console.log(`🚀  Server ready at: ${url}`);
    } catch (error) {
        console.log(error);
    }
})();
