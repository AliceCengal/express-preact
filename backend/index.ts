import express from 'express'
import path from 'path'

// var cookieParser = require('cookie-parser');
import logger from 'morgan'

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

import apiRouters from './routes'
app.use('/api', apiRouters);

// app.use(express.static(path.join(__dirname, 'public')));

export default app
