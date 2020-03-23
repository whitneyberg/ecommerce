require('dotenv').config()
const express = require('express');
const massive = require('massive')
const delegateRoutes = require('./routers/delegate.router');
const session = require('express-session')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const getDb = require('./database/bootstrap.database');
const path = require('path');


const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();
// app.use( express.static(`${__dirname}/../build`));

app.use(express.json());

app.use(
    session({
      resave: false,
      saveUninitialized: true,
      rejectUnauthorized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
      secret: SESSION_SECRET
    })
  );
  massive({
    connectionString: CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false
    }
  }).then(db => {
    app.set("db", db);
    app.listen(SERVER_PORT || 5050, () =>
      console.log(`Server running on ${SERVER_PORT}`)
    );
    console.log("Database connected");
  });

app.use(passport.initialize())
app.use(passport.session())
// auth0 strategy
const strategy = new Auth0Strategy({
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/login",
    scope: 'openid email profile'
},
    function (accessToken, refreshToken, extraParams, profile, done) {
        // console.log('profile', profile)
        // get name and other relevant data
        const user = {
            auth_id: profile.id, //id from google
            first_name: profile._json.given_name,
            last_name: profile._json.family_name,
            img_url: profile.picture,
            email: profile._json.email
        }
        return done(null, user)
    }
)
passport.use(strategy)
passport.serializeUser(function (user, done) {
    console.log('serializing user to session: user: ', user)
    //req.session.passport.user
    done(null, user)
})
passport.deserializeUser(function (user, done) {
//from database this would be app.db.get_all_users or whatever it would be.
    console.log('deserializing user: ', user);
    done(null, user)
})

// ENDPOINTS
//auth endpoint
app.get('/login', passport.authenticate('auth0', {
    successRedirect: (process.env.NODE_ENV == 'dev' ? 'http://localhost:3000' : '' ) + "/dashboard",
    failureRedirect: (process.env.NODE_ENV == 'dev' ? 'http://localhost:3000' : '' ) + "/"
}))
// check for logged in user
app.get('/check', function (req, res) {
    console.log('checking for logged in user')
    //check if user has logged in
    if (req.session.passport) {
        const db = getDb();
        console.log(req.session.passport.user.email);
        const { email } = req.session.passport.user;
        db.get_user_email([email])
            .then( user => res.status(200).send(user))
            .catch( err => res.status(500).send(err));
        // console.log(req.user.email);
        // res.status(200).send(req.session.passport.user)
    } else res.status(401).send('unauthorized')
})
//logout
app.get('/logout', function (req, res) {
    //req.logout()
    console.log('loggin out')
    req.session.destroy(function () { res.send(200) })
})

delegateRoutes(app);

app.get('*', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../build')});
});

app.all('*', (req, res) => {
    res.status(404).send({message: "Cannot access any resources at " + req.originalUrl });
});