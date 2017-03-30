/**
 * @author ShadowWood
 * @email shadowwood@foxmail.com
 * @date 2017-02-20 20:12:39
 * @desc server.js
*/

'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const renderer = require('vue-server-renderer').createRenderer();
global.Vue = require('vue');

const logger = require('../utils/logger');

// 获取HTML布局
const layout = fs.readFileSync(path.join(__dirname, '../client/index.html'), 'utf-8');

const router = express.Router();

router.all('/', function(req, res, next) {
  const clientApp = require(path.join(__dirname, '../client/dist/main.js'))();
  renderer.renderToString(clientApp, (err, html) => {
    if (err) {
      logger.error(err);
      next({code: 500, msg: err});
    }

    res.send(layout.replace('<div id="app"></div>', html))
  })
  return res.send('hello world!');
});

module.exports = router;