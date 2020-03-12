var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/User');
var keys = require('./keys');

module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = keys.passport_jwt.secretOrKey;
    passport.use(new JwtStrategy(opts , (jwt_payload , done) => {
        User.findOne({id: jwt_payload.id}, (err, user) => {
            if (err) {
              return done(err, false);
            }
            if (user) {
              done(null, user);
            } else {
              done(null, false);
            }
          });        
    }));
};
