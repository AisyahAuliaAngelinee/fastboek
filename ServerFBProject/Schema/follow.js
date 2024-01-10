const { GraphQLError } = require("graphql");
const { followUser } = require("../Model/follow");
const { ObjectId } = require("mongodb");
const { getDatabase } = require("../Config/mongoConnect");
const followsTypeDefs = `#graphql
type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
}

input FollowingInput{
    followingId: ID
    } 

type Mutation {
    followUser(followingInput: FollowingInput):Follow
}
`;

const followsResolvers = {
	Mutation: {
		followUser: async (_parent, args, context) => {
			const data = await context.authentication();
			const db = getDatabase();

			const checkId = await db.collection("Users").findOne({
				_id: new ObjectId(args.followingInput.followingId),
			});
			if (!checkId) {
				throw new GraphQLError("User Invalid");
			}

			console.log(args.followingInput.followingId, `INI INPUTAN ID`);
			console.log(data.id, `LOGGED USER`);
			const following = await followUser({
				followingId: args.followingInput.followingId,
				followerId: data.id,
			});
			return following;
		},
	},
};
module.exports = {
	followsTypeDefs: followsTypeDefs,
	followsResolvers: followsResolvers,
};
