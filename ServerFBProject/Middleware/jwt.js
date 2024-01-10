const jwt = require("jsonwebtoken");
SECRET = "HEHEH";
const createToken = (payload) => {
    return jwt.sign(payload, SECRET);
};
const verifyToken = (token) => {
    return jwt.verify(token, SECRET);
};
module.exports = { createToken, verifyToken };
