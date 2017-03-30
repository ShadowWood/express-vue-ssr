/**
 * @author ShadowWood
 * @email shadowwood@foxmail.com
 * @date 2017-02-20 20:12:39
 * @desc server.js
*/

'use strict';

const responseTime = require('response-time');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const connectRedis = require('connect-redis');
const express = require('express');
const compression = require('compression');
const http = require('http');
const config = require('config');

const router = require('../routes');
const logger = require('../utils/logger');

const SessStore = connectRedis(expressSession);

const app = express();

app.use(compression());
app.use(responseTime());
app.use(logger.log4js.connectLogger(logger, config.log));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', parameterLimit: 100000, extended: false}));
app.use(cookieParser());
app.use(expressSession({
  proxy: true,
  resave: true,
  saveUninitialized: false,
  name: 'oauth2-server',
  secret: 'oauth2-server-secret',
  store: new SessStore(config.redisSession),
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
}));

// app.use(express.static(config.static.dir, {maxAge: config.static.maxAge}))

app.use(router);

app.use(function(req, res, next) {
  next({status: 'pageNotFound', code: 404});
});

let server = http.createServer(app);

function start() {
  server.listen(config.web.port, function() {
    logger.info(config.web.name, config.web.url, 'start up!');
  })
}

app.start = start;

module.exports = app;