const UserShema = require('../../db/schemas/User.js');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

const Guard = {

	checkJwt: async (req, res, next) => {

		let token = req.headers.authorization;

		jwt.verify(token, app.get('jwtSecret'), function (err, result) {

			if (err instanceof jwt.JsonWebTokenError) {

				let error = util.errorHelper.unauthorised('Unauthorised');

				return res.status(error.code).send(error)

			}

			let userEmail = jwt_decode(token)._doc.email;

			const checkUserId = async () => {

				let user = await UserShema.findOne({

					email: userEmail

				});

				if (!user) {

					let error = util.errorHelper.unauthorised('Unauthorised');

					return res.status(error.code).send(error)

				}

				next();

			}

			checkUserId();

		})

	}

};

Guard.checkJwt.unless = require('express-unless');

module.exports = Guard;