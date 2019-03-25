'use strict';
module.exports = function (app) {
  var globalConfig = require('../controllers/globalConfigController');

  app.route('/v1/config')
    .get(globalConfig.get_global_config)
    .post(globalConfig.post_global_config);
};