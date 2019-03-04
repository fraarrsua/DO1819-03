'use strict';
module.exports = function (app) {
  var finder = require('../controllers/finderController');

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
   * @url /v1/finder/:finderId
   * @param {string} finderId
  */
  app.route('/v1/finders/:finderID')
    .get(finder.read_a_finder)
    .put(finder.update_a_finder);
};