const { GraphQLError } = require("graphql");
const {
    getPosts,
    createPost,
    getPostById,
    commentPost,
    likePost,
} = require("../Model/post");
const { ObjectId } = require("mongodb");

const postsTypeDefs = `#graphql
type Comment {
    content: String
    username: String
    createdAt: String
    updatedAt: String
}
type Like {
    username: String
    createdAt: String
    updatedAt: String
}

type Post {
    _id: ID!
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
}

type Query {
    getPosts: [Post]
    getPostById(id:ID):Post

}

input PostInput{
    _id: ID
    content:String
    authorId: String
    createdAt: String
    updatedAt: String
    } 

input CommentInput{
    postId: ID
    content:String
    }

input LikePostInput{
    postId: ID
    username: String
    }

type Mutation {
    createPost(postInput: PostInput):Post
    commentOnPost(commentInput:CommentInput):Post
    likePost(likePayload: LikePostInput):Post
}
`;

const postsResolvers = {
    Query: {
        getPosts: async (_, _args, context) => {
            const data = await context.authentication();
            console.log(data.id, `GetPost`);
            const postData = await getPosts();
            return postData;
        },
        getPostById: async (_parent, args) => {
            const post = await getPostById(args.id);
            if (!post) {
                throw new GraphQLError("Post Not Found");
            }
            return post;
        },
    },
    Mutation: {
        createPost: async (_parent, args, context) => {
            const data = await context.authentication();
            console.log(data.id, `CreatePost`);
            const newPost = await createPost({
                content: args.postInput.content,
                authorId: new ObjectId(data.id),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return newPost;
        },
        commentOnPost: async (_parents, args, context) => {
            const data = await context.authentication();
            const payload = {
                content: args.commentInput.content,
                username: data.username,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const post = await commentPost(args.commentInput.postId, payload);
            return post;
        },
        likePost: async (_parents, args, context) => {
            const data = await context.authentication();
            const payload = {
                username: data.username,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const addLike = await likePost(args.likePayload.postId, payload);
            return addLike;
        },
    },
};
module.exports = {
    postsTypeDefs: postsTypeDefs,
    postsResolvers: postsResolvers,
};
