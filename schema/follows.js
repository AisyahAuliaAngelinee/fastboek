const { GraphQLError } = require("graphql");
const { getAllFollow, createOneUserFollow } = require("../model/follow");

const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    type Query {
        getFollowers: [Follow]
    }

    input UserFollowingInput {
        followingId: ID
    }

    #kontrak
    type Mutation {
        createNewFollower(userFollowing: UserFollowingInput): Follow
    }
`;

const resolvers = {
	// Fetch user follower
	Query: {
		getFollowers: async (_parent, args) => {
			const follows = await getAllFollow();
			return follows;
		},
	},

	Mutation: {
		createNewFollower: async (_parent, args, contextValue) => {
			// console.log(args, "<<< args");
			// console.log(contextValue, "<<< context value");
            
		},
	},
};

module.exports = {
	followTypeDefs: typeDefs,
	followResolvers: resolvers,
};
