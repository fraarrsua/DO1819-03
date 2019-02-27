'use strict';
module.exports = function(app) {
  var finderController = require('../controllers/finderController');

app.route('v1/finder/')
  .post(finderController.post_a_finder);

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
 app.route('/v1/finder/:explorerID')
 .get(finderController.read_a_finder)
 .put(finderController.update_a_finder);
};