const { GraphQLError } = require("graphql");
const { getDatabase } = require("../Config/mongoConnect");
const {
    getCollection,
    getUserById,
    getUserByUsername,
    getUserLogin,
    createUser,
} = require("../Model/user");
const { hashPassword } = require("../Middleware/bcrypt");
const usersTypeDefs = `#graphql

    type User {
    _id: ID
    name:String
    email: String
    username: String
    password: String
    }


    type UserOutput {
    _id: ID
    name:String
    email: String
    username: String
    password: String
    Following:[User]
    Follower:[User]
    }


    type ResponseUserLogin{
    statusCode: Int!
    message: String
    error: String
    data: UserLoginData
    }

    type UserLoginData {
    token: String
    }

    input AddUser{
    _id: ID
    name:String
    email: String!
    username: String!
    password: String!
    } 


    type Query { 
    getUsers: [User]

    getUserById(id:ID!):UserOutput

    getUserByUsername(username:String):User
    getUserLogin(username:String, password:String):ResponseUserLogin

    }

    type Mutation {
    registerUser(newUserInput: AddUser): User}

`;

const usersResolvers = {
    Query: {
        getUsers: async () => {
            const database = getDatabase();
            const userCollection = database.collection("Users");
            const userData = await userCollection.find().toArray();
            return userData;
        },

        getUserById: async (_parent, args) => {
            const user = await getUserById(args.id);
            console.log(user, `INI DARI RESOLVER`);

            return user;
        },

        getUserByUsername: async (_parent, args) => {
            const user = await getUserByUsername(args.username);
            return user;
        },
        getUserLogin: async (_parent, args) => {
            const user = await getUserLogin(args.username, args.password);
            return user;
        },
    },
    Mutation: {
        registerUser: async (_parent, args) => {
            const newUser = await createUser(args.newUserInput);
            return newUser;
        },
    },
};
module.exports = {
    usersTypeDefs: usersTypeDefs,
    usersResolvers: usersResolvers,
};
