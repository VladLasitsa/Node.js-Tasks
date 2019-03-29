"use strict";
import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import {cookieParser} from './middlewares/cookie-parser';
import {queryParser} from './middlewares/query-parser';
import {jwtTokenVerify} from './middlewares/jwtToken-verify';
import passport from './utils/authenticationStrategiesUtil';

const app = express();

app.use(queryParser);
app.use(cookieParser);
app.use(bodyParser.json());
app.use(expressSession({secret: 'SECRET', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(jwtTokenVerify);
app.use('/', routes);

export default app;
