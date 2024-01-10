const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { getAllUser, createOneUser, findOneUser } = require("../model/user");
const { GraphQLError } = require("graphql");

const typeDefs = `#graphql
    type User {
        _id: ID,
        name: String,
        username: String!,
        email: String!,
        password: String!
    }
    
    type Query {
        getUsers: [User]
    }

    input UserRegisterInput {
        name: String,
        username: String!,
        email: String!,
        password: String!
    }

    type ResponseUserLogin {
        _id: ID,
		name: String, 
        username: String,
        email: String,
        token: String
    }

    input LoginInput {
        email: String
        password: String
    }
    
    #kontrak
    type Mutation {
        createNewUser(userRegister: UserRegisterInput): User
        userLogin(loginInfo: LoginInput): ResponseUserLogin
    }
`;

const resolvers = {
	// Fetch user data
	Query: {
		getUsers: async (_parent, args, context) => {
			const users = await getAllUser();
			return users;
		},
	},

	Mutation: {
		/** Note:
		 * Mutasi mengikuti kontrak yang dibuat di awal
		 * Error akan terjadi ketika nama mutasi tidak sesuai dengan kontrak yang diinginkan
		 */

		// Register User
		createNewUser: async (_parent, args) => {
			// console.log(args, "<<< args");

			const newUser = await createOneUser(args.userRegister);
			return newUser;
		},

		// Login User
		userLogin: async (_parent, args) => {
			try {
				// console.log(args, "<<< args");
				const { email, password } = args.loginInfo;
				// console.log(args.loginInfo, `HHHHHHH`);
				const findUser = await findOneUser({ email, password });
				// console.log(findUser, "<<< user found");

				if (!findUser || !compareHash(password, findUser.password)) {
					throw new GraphQLError("Invalid email/Password");
				}

				// login info
				const payload = {
					id: findUser.id,
					email: findUser.email,
					name: findUser.name,
					username: findUser.username,
				};

				// Create token
				const token = createToken(payload);

				// ! not recommended (terlalu barbar WKWKWKKWK)
				findUser.token = token; // reasign the token with created token

				return findUser;
			} catch (error) {
				throw error;
			}
		},
	},
};

module.exports = {
	userTypeDefs: typeDefs,
	userResolvers: resolvers,
};
