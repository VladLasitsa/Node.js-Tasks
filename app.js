"use strict";
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import {cookieParser} from './middlewares/cookie-parser';
import {queryParser} from './middlewares/query-parser';

const app = express();

app.use(queryParser);
app.use(cookieParser);
app.use(bodyParser.json())
app.use('/', routes);

export default app;
