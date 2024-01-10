const { ObjectId } = require("mongodb");
const { getDatabase } = require("../Config/mongoConnect");
const { GraphQLError } = require("graphql");
const { createToken, verifyToken } = require("../Middleware/jwt");
const { comparePassword, hashPassword } = require("../Middleware/bcrypt");
const getCollection = () => {
    const database = getDatabase();
    const userCollection = database.collection("Users");

    return userCollection;
};

const getUsers = async () => {
    const userCollection = getCollection();

    const users = await userCollection.find().toArray();

    return users;
};

const getUserById = async (id) => {
    const userCollection = getCollection();
    const user = await userCollection
        .aggregate([
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "Follows",
                    localField: "_id",
                    foreignField: "followingId",
                    as: "followingConnection",
                },
            },
            {
                $lookup: {
                    from: "Users",
                    localField: "followingConnection.followerId",
                    foreignField: "_id",
                    as: "Follower",
                },
            },
            {
                $lookup: {
                    from: "Follows",
                    localField: "_id",
                    foreignField: "followerId",
                    as: "followerConnection",
                },
            },
            {
                $lookup: {
                    from: "Users",
                    localField: "followerConnection.followingId",
                    foreignField: "_id",
                    as: "Following",
                },
            },
            {
                $project: {
                    password: 0,
                    "following.password": 0,
                    "follower.password": 0,
                },
            },
        ])
        .toArray();
    console.log(user[0], "INI DARI SINI");
    return user[0];
};

// static async findOne(id) {
//     try {
//       const user = await this.collection()
//         .aggregate([
//           {
//             $match: {
//               _id: new ObjectId(id),
//             },
//           },
//           {
//             $lookup: {
//               from: "follows",
//               localField: "_id",
//               foreignField: "followingId",
//               as: "followingConnection",
//             },
//           },
//           {
//             $lookup: {
//               from: "users",
//               localField: "followingConnection.followerId",
//               foreignField: "_id",
//               as: "follower",
//             },
//           },
//           {
//             $lookup: {
//               from: "follows",
//               localField: "_id",
//               foreignField: "followerId",
//               as: "followerConnection",
//             },
//           },
//           {
//             $lookup: {
//               from: "users",
//               localField: "followerConnection.followingId",
//               foreignField: "_id",
//               as: "following",
//             },
//           },
//           {
//             $project: {
//               password: 0,
//               "following.password": 0,
//               "follower.password": 0,
//             },
//           },
//         ])
//         .toArray();
//       if (user.length === 0) {
//         return null;
//       }
//       return user[0];
//     } catch (error) {
//       throw error;
//     }
//   }
const getUserByUsername = async (username) => {
    const userCollection = getCollection();
    const user = await userCollection.findOne({ username });

    return user;
};

const getUserLogin = async (username, password) => {
    console.log(username, `USERNAME`);
    const userCollection = getCollection();
    if (!username || !password) {
        throw new GraphQLError("Invalid User");
    }

    const user = await userCollection.findOne({ username });
    console.log(user, `WHO IS HERE`);
    const checkPassword = comparePassword(password, user.password);
    if (!user || !checkPassword) {
        throw new GraphQLError("Login Error");
    }

    const payload = {
        loggedId: user._id,
        email: user.email,
        username: user.username,
    };
    console.log(payload, `PAYYYYY`);
    const accessToken = createToken(payload);
    console.log(accessToken, `SEHARUSKAH`);
    const datacekl = verifyToken(accessToken);
    console.log(datacekl, `INIII`);
    if (!accessToken) {
        throw new GraphQLError("Token creation failed");
    }
    return {
        statusCode: 200,
        message: `Successfully to login`,
        data: {
            token: accessToken,
        },
    };
};

const createUser = async (payload) => {
    const userCollection = getCollection();
    payload.password = hashPassword(payload.password);
    const newUser = await userCollection.insertOne(payload);

    const user = await userCollection.findOne({
        _id: newUser.insertedId,
    });

    return user;
};

module.exports = {
    getCollection,
    getUsers,
    getUserById,
    getUserByUsername,
    getUserLogin,
    createUser,
};
