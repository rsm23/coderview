const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser((id, done) => {
    User.findOne({_id: id}, (err, user) => {
        done(err, user);
    })
});

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    (username, password, done) => {
        User.findOne({email: username}, (err, user) => {
            if (err) return done(err);
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username or password'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect username or password'
                });
            }
            return done(null, user);
        });
    }
));

passport.use(new FacebookStrategy({
        clientID: '309100959867515', // Facebook APP ID
        clientSecret: '630f0b54f5519864e920772037996339', // Facebook APP Secret
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'email']
    }, (token, refreshToken, profile, done) => {
        User.findOne({'facebookId': profile.id}, (err, user) => {
            if (err) return done(err);

            if(user) {
                return done(null, user);
            } else {
                User.findOne({email: profile.emails[0].value}, (err, user) => {
                    if (user) {
                        user.facebookId = profile.id;
                        return user.save((err) => {
                            if (err) return done(null, false, {message: 'Can\'t save user info'});
                            return done(null, user);
                        });
                    }

                    var user= new User();
                    user.name = profile.displayName;
                    user.email = profile.emails[0].value;
                    user.facebookId = profile.id;
                    user.save((err) => {
                        if (err) return done(null, false, {message : 'Can\'t save user info'});
                        return done(null, user);
                    });
                });
            }
        })
    }
));