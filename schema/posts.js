const { GraphQLError } = require("graphql");
const { getAllPost, createOnePost, createOneComment } = require("../model/post");
const { ObjectId } = require("mongodb");
const { fetchDatabase } = require("../config/connection");

const typeDefs = `#graphql
    type Post {
        _id: ID
        content: String!
        tag: [String]
        imgUrl: String
        authorId: ID!
        comment: [Comments]
        likes: [Likes]
        createdAt: String
        updatedAt: String
    }

    type Comments {
        content: String
        username: String
        createdAt: String
        updatedAt: String
    }

    type Likes {
        username: String
        createdAt: String
        updatedAt: String
    }

    type Query {
        getPosts: [Post]
    }

    input CreatePostInput {
        content: String!
        tag: [String]
        imgUrl: String
        authorId: ID!
    }

    input CreatePostCommentInput {
        content: String
        username: String
    }

    input CreatePostLikeInput {
        username: String
    }

    type Query {
        post(id: ID!): Post
    }

    #kontrak
    type Mutation {
        createNewPost(createPost: CreatePostInput): Post
        createNewComment(postId: ID, input: CreatePostCommentInput): Comments
        createNewLike(postId: ID, input: CreatePostLikeInput): Likes
    }
`;

const resolvers = {
	// fetch post
	Query: {
		getPosts: async (_parent, args) => {
			const posts = await getAllPost();
			// console.log(posts, "<<< post schema");

			return posts;
		},
	},

	Mutation: {
		// Create Post
		createNewPost: async (_parent, { createPost }, contextValue) => {
			// console.log(createPost, "<<< post input");
			// console.log(userLoginInfo, "<<< user login");

			/**
			 * Notes:
			// (1) Resolver + Model adalah sama = Schema and Model yang normal
			
			// (2) Resolver = Bagian dari Aplikasi, Model adalah bagian dari database
			//      - Services (Apps) and Repositories (Database)
			
			// Ambil data dulu (User)
			// const user = Model.User.findOne();
			
			// Nambahin data
			// const resultAfterAddingData = Model.Product.add({ productId: xxx, userId: user._id })
			
			// Ada yang mau dihapus
			// const deletedData = Model.Product.destroy({ productId: xxxx });
			*/

			const userLoginInfo = await contextValue.doAuthentication();
			createPost.authorId = userLoginInfo.id;
			try {
				const newPost = await createOnePost({
					content: createPost.content,
					tag: createPost.tag,
					imgUrl: createPost.imgUrl,
					authorId: userLoginInfo.id,
					comment: [],
					likes: [],
					createdAt: new Date(),
					updatedAt: new Date(),
				});
				return newPost;
			} catch (error) {
				throw new GraphQLError("Error create post");
			}
		},

		createNewComment: async (_parent, args, contextValue) => {
			const userLoginInfo = await contextValue.doAuthentication();
			// console.log(userLoginInfo, "<<< user login");
			// console.log(args, "<<< comment input");

			const database = fetchDatabase();
			const postCollection = database.collection("Post");

			const findPost = await postCollection.findOne({
				_id: new ObjectId(args.postId),
			});
			// console.log(findPost, "<<< post");

			if (!findPost) {
				throw new GraphQLError("Post not found", {
					extensions: {
						code: "Not Found",
						http: { status: 404 },
					},
				});
			}

			await postCollection.updateOne(
				{
					_id: findPost._id,
				},
				{
					$addToSet: {
						comment: {
							content: args.input.content,
							username: userLoginInfo.username,
							createdAt: new Date(),
							updatedAt: new Date(),
						},
					},
				}
			);

			const updatedPost = await postCollection.findOne({
				_id: new ObjectId(args.postId),
			});

			return updatedPost;
		},

		createNewLike: async (_parent, args, contextValue) => {
			const userLoginInfo = await contextValue.doAuthentication();
			// console.log(userLoginInfo, "<<< login info");

			const database = fetchDatabase();
			const postCollection = database.collection("Post");

			const findPost = await postCollection.findOne({
				_id: new ObjectId(args.postId),
			});
			// console.log(findPost, "<<< find post");

			if (!findPost) {
				throw new GraphQLError("Post not found", {
					extensions: {
						code: "Not Found",
						http: { status: 404 },
					},
				});
			}

			await postCollection.updateOne(
				{
					_id: findPost._id,
				},
				{
					$addToSet: {
						likes: {
							username: userLoginInfo.username,
							createdAt: new Date(),
							updatedAt: new Date(),
						},
					},
				}
			);

			const updatedPost = await postCollection.findOne({
				_id: new ObjectId(args.postId),
			});
			// console.log(updatedPost, "<<< latest post");

			return updatedPost;
		},
	},
};

module.exports = { postTypeDefs: typeDefs, postResolvers: resolvers };

/**
 * BACKUP
 *  
// createNewComment: async (_parent, args, contextValue) => {
// 	// console.log(args, "<<< comment");
// 	const userLoginInfo = await contextValue.doAuthentication();
// 	args.createComment.username = userLoginInfo.username;

// 	const database = fetchDatabase();
// 	const postCollection = database.collection("Post");
// 	// console.log(postCollection, "<<< post");

// 	const post = await postCollection.findOne({
// 		_id: new ObjectId(args.createComment.postId),
// 	});
// 	// console.log(post, "<<< post");

// 	if (!post) {
// 		throw new GraphQLError("Post Not Found", {
// 			extensions: {
// 				code: "NOTFOUND",
// 				http: { status: 404 },
// 			},
// 		});
// 	}

// 	await postCollection.updateOne(
// 		{
// 			_id: post._id,
// 		},
// 		{
// 			$addToSet: {
// 				comment: {
// 					postId: args.createComment._id,
// 					content: args.createComment.content,
// 					username: userLoginInfo.username,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 			},
// 		}
// 	);

// 	const updatedPost = await postCollection.findOne({
// 		_id: new ObjectId(args.createComment.postId),
// 	});
// 	console.log(updatedPost, "<<< post updated");

// try {
// 	const newComment = await createOneComment({
// 		content: args.createComment.content,
// 		username: userLoginInfo.username,
// 		createdAt: new Date(),
// 		updatedAt: new Date(),
// 	});
// 	return newComment;
// } catch (error) {
// 	throw new GraphQLError("Error create comment");
// }
// },
*/
