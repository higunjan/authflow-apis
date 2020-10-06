const expressJwt = require('express-jwt');
const userService = require('../component/users/user.service');

module.exports = jwt;

function jwt() {
    const secret = process.env.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/v1/users/authenticate',
            '/api/v1/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    done();
};