const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
};

const compareHash = (pass, hash) => {
	// console.log(pass, "<<< password");
	return bcrypt.compareSync(pass, hash);
};

module.exports = { hashPassword, compareHash };
