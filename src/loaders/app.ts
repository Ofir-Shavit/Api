import logger from 'morgan';
import cors from 'cors';
import config from '../../config/config';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import express from 'express';

const app = express();

app.use(logger('dev'));
app.use(cors(config.cors));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true, maxAge: 60000, sameSite: false}
}));

export default app;