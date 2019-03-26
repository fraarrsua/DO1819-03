'use strict';
module.exports = function(app) {
  var sponsorships = require('../controllers/sponsorshipController'),
  authController = require('../controllers/authController');

/**
   * Get all sponsorship
   *  Required roles: sponsor(himself) and Administrator(all)
   *  
   * Post a sponsorship 
   *    RequiredRoles: to be a sponsor
   *    RequiredStatus: PAID=false
   *
   * @section sponsorships
   * @type get post
   * @url /v1/sponsorships
  */
 app.route('/v1/sponsorships')
 .get(sponsorships.list_all_sponsorships)
 .post(sponsorships.create_a_sponsorship);

 /**
   * 
   * Get sponsorships by sponsorshipId
   *
   * Put sponsorship to update it
   *    RequiredRoles: to be a sponsor
   * Delete a sponsorship
   *    RequiredRoles: to be a sponsor
   * @section sponsorships
   * @type get put delete
   * @url /v1/applications/:sponsorshipId
   * @param {string} sponsorshipId
  */
 app.route('/v1/sponsorships/:sponsorshipId')
 .get(sponsorships.read_a_sponsorship)
 .put(sponsorships.update_a_sponsorship)
 .delete(sponsorships.delete_a_sponsorship);

 /**
   *
   * Put sponsorship to paid
   *    RequiredRoles: to be a sponsor
   * @section sponsorships
   * @type get put delete
   * @url /v1/applications/:sponsorshipId/pay
   * @param {string} sponsorshipId
  */
 app.route('/v1/sponsorships/:sponsorshipId/pay')
 .put(sponsorships.pay_a_sponsorship);




 /**********V2 REQUESTS********** */
 app.route('/v2/sponsorships')
 .get(authController.verifyUser(["SPONSOR","ADMINISTRATOR"]),sponsorships.list_all_sponsorships)
 .post(authController.verifyUser(["SPONSOR"]), sponsorships.create_a_sponsorship_v2);


 app.route('/v2/sponsorships/:sponsorshipId')
 .get(authController.verifyUser(["SPONSOR"]), sponsorships.read_a_sponsorship_v2)
 .put(authController.verifyUser(["SPONSOR"]), sponsorships.update_a_sponsorship_v2)
 .delete(authController.verifyUser(["SPONSOR"]), sponsorships.delete_a_sponsorship_v2);


 app.route('/v2/sponsorships/:sponsorshipId/pay')
 .put(authController.verifyUser(["SPONSOR"]), sponsorships.pay_a_sponsorship_v2);
};