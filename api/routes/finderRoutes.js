'use strict';
module.exports = function(app) {
  var finder = require('../controllers/finderController');

  /**
   * 
   * Get finder by explorerId
   *    RequiredRoles: to be a explorer
   * Put finder to update it
   *    RequiredRoles: to be a explorer
   * @section finder
   * @type get put
   * @url /v1/finder/:explorerId
   * @param {string} sponsorshipId
  */
 app.route('/v1/finder/:explorerId')
 .get(finder.read_a_finder)
 .put(finder.update_a_finder)
};