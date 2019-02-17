'use strict';
module.exports = function(app) {
  var sponsorships = require('../controllers/sponsorshipController');

/**
   * Get a sponsorship
   * 
   * RequiredRoles: to be a Sponsor and Administrator
   *  
   * Post a sponsorship 
   *    RequiredRoles: to be a sponsor
   *    RequiredStatus: sponsorshipStatus --> PAID
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
   *    RequiredRoles: to be a sponsor and Administrator
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
};