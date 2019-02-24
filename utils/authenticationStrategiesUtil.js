import passport from 'passport';
import LocalStrategy from 'passport-local';
import FacebookStrategy from 'passport-facebook';
import TwitterStrategy from 'passport-twitter';
import GoogleStrategy from 'passport-google-oauth';
import {User} from '../models';
import {port} from '../config/config.json';

const user = new User();

passport.use(new LocalStrategy.Strategy((username, password, done) => {
    const foundUser = user.findUserByLoginAndPassword({
        login: username,
        password: password
    });
    if (foundUser) {
        done(null, foundUser);
    } else {
        done(null, false, {message: "User with entered login and password doesn't exists"});
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    done(null, {id});
});

passport.use(new FacebookStrategy.Strategy({
    clientID: "405864223527098",
    clientSecret: "b8a490013ecccaa26789a4de85e70303",
    callbackURL: `http://localhost:${port}/auth/facebook/callback`
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile)
}));

passport.use(new TwitterStrategy.Strategy({
    consumerKey: "ey06nuOpFXPP9RHIyhxzEGJtA",
    consumerSecret: "gRqGPjLtS45nK4xWRukWYIfEhP0jgXndBcMSLSTf1XHZBh3FWs",
    callbackURL: `http://localhost:${port}/auth/twitter/callback`
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile)
}));

passport.use(new GoogleStrategy.OAuth2Strategy({
    clientID: "755300139024-udujpe4vlj64mole97bus9376bmsbfn3.apps.googleusercontent.com",
    clientSecret: "wFpnlLYmSs0kEg9wkHQ7Mp4x",
    callbackURL: `http://localhost:${port}/auth/google/callback`
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile)
}));

export default passport;