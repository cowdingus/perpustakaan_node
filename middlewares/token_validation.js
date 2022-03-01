const {verify} = require('jsonwebtoken');

module.exports = {
	checkToken(req, res, next) {
		const token = req.headers.authorization?.slice(7);

		if (token) {
			verify(token, process.env["SECRET_KEY"], (err, decoded) => {
				if (err) {
					console.error(err);
					res.status(401).send("JWT Token Verification Failed");
				} else {
					req.user = decoded.result;
					next();
				}
			});
		} else {
			res.status(401).send("Missing JWT Token");
		}
	}
};
