'use strict';
module.exports = function (app) {
  var finder = require('../controllers/finderController'),
  authController = require('../controllers/authController');

  /**
   * 
   * Get list of finders
   *    RequiredRoles: to be a explorer
   * Post a finder
   *    RequiredRoles: to be a explorer
   * @section finder
   * @type get post
   * @url /v1/finders
  */
  app.route('/v1/finders')
    .get(finder.list_all_finders)
    .post(finder.post_a_finder);

  /**
   * 
   * Get finder by finderId
   *    RequiredRoles: to be a explorer
   * Put finder to update it
   *    RequiredRoles: to be a explorer
   * @section finder
   * @type get put
   * @url /v1/finders/:finderId
   * @param {string} finderId
  */
  app.route('/v1/finders/:finderId')
    .get(finder.read_a_finder)
    .put(finder.update_a_finder);



  /*********V2 ROUTES****** */

  /**
   * 
   * Get list of finders
   *    RequiredRoles: to be a explorer
   * Post a finder
   *    RequiredRoles: to be a explorer
   * @section finder
   * @type get post
   * @url /v2/finders
  */
  app.route('/v2/finders')
    .get(authController.verifyUser(["EXPLORER"]),finder.list_all_finders_v2)
    .post(authController.verifyUser(["EXPLORER"]),finder.post_a_finder_v2);

  /**
   * 
   * Get finder by finderId
   *    RequiredRoles: to be a explorer
   * Put finder to update it
   *    RequiredRoles: to be a explorer
   * @section finder
   * @type get put
   * @url /v2/finders/:finderId
   * @param {string} finderId
  */
  app.route('/v2/finders/:finderId')
    .get(authController.verifyUser(["EXPLORER"]),finder.read_a_finder_v2)
    .put(authController.verifyUser(["EXPLORER"]),finder.update_a_finder_v2);
};