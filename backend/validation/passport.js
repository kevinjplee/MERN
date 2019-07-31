const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys");
const MongoClient = require('mongodb').MongoClient;
const db = require("../config/keys").mongoURI;
const client = new MongoClient(db, {useNewUrlParser:true});
client.connect(err=> {
  console.log("MongoDB connected.")
});

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
        const collection = client.db("mern").collection("accounts");
        collection.find({id:jwt_payload.id})
          .then(user => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
      })
    );
  };