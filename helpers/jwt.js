const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

//membuat token
const createToken = (payload) => {
	return jwt.sign(payload, SECRET_KEY);
};

//cocokin token yang sudah ada
const verifyToken = (token) => {
	return jwt.verify(token, SECRET_KEY);
};

module.exports = { createToken, verifyToken };
