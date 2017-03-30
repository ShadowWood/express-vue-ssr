
/**
 * @author ShadowWood
 * @email shadowwood@foxmail.com
 * @date 2017-02-20 20:12:39
 * @desc server.js
*/

'use strict';
const Promise = require('bluebird');
const web = require('./server/web');

Promise.resolve([web])
  .each((app) => {
    app.start();
  });