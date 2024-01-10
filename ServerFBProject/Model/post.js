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
    const postCollection = database.collection("Posts");
    return postCollection;
};

const getPosts = async () => {
    const postCollection = getCollection();

    const posts = await postCollection.find().toArray();

    return posts;
};

const getPostById = async (id) => {
    const postCollection = getCollection();
    const post = await postCollection.findOne({
        _id: new ObjectId(id),
    });
    console.log(id, `DARI POS MODEL`);

    return post;
};

const commentPost = async (id, payload) => {
    const postCollection = getCollection();
    const findPost = await postCollection.findOne({ _id: new ObjectId(id) });
    if (!findPost) {
        throw new GraphQLError("Post Not Found");
    }
    console.log(findPost, `INI POST`);

    await postCollection.updateOne(
        { _id: new ObjectId(id) },
        {
            $addToSet: {
                comments: payload,
            },
        }
    );

    const checkUpdate = await postCollection.findOne({ _id: new ObjectId(id) });

    return checkUpdate;
};

const likePost = async (id, payload) => {
    const postCollection = getCollection();
    const findPost = await postCollection.findOne({ _id: new ObjectId(id) });
    if (!findPost) {
        throw new GraphQLError("Post Not Found");
    }
    await postCollection.updateOne(
        { _id: new ObjectId(id) },
        {
            $addToSet: {
                likes: payload,
            },
        }
    );
    const checkUpdate = await postCollection.findOne({ _id: new ObjectId(id) });

    return checkUpdate;
};

const createPost = async (payload) => {
    const postCollection = getCollection();

    const newPost = await postCollection.insertOne(payload);

    const post = await postCollection.findOne({
        _id: newPost.insertedId,
    });

    return post;
};

module.exports = {
    getCollection,
    getPosts,
    createPost,
    getPostById,
    commentPost,
    likePost,
};
