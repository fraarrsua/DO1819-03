'use strict';
module.exports = function (app) {
  var globalConfig = require('../controllers/globalConfigController'),
  authController = require('../controllers/authController');

  app.route('/v1/config')
    .get(globalConfig.get_global_config)
    .post(globalConfig.post_global_config)
    .put(globalConfig.update_global_config);

  app.route('/v2/config')
    .get(authController.verifyUser(["ADMINISTRATOR"]), globalConfig.get_global_config_v2)
    .post(authController.verifyUser(["ADMINISTRATOR"]), globalConfig.post_global_config_v2)
    .put(authController.verifyUser(["ADMINISTRATOR"]), globalConfig.update_global_config_v2);
};