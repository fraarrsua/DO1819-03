'use strict';
module.exports = function (app) {
  var trips = require('../controllers/tripController'),
  authController = require('../controllers/authController');

  /**
   * Post trips
   *    RequiredRoles: Manager
   * Get trips
   *
   * @section trips
   * @type get post 
   * @url /v1/trips
  */
  app.route('/v1/trips')
    .get(trips.list_all_trips)
    .post(trips.create_a_trip);


  /**
 * get results from a search of trips groupBy category
 *    RequiredRoles: None
 * 
 * @section trips
 * @type get
 * @url /v1/trips/search
 * @param {string} sortedBy (category)
 * @param {string} keyword //in title, ticket, or description
 */
  app.route('/v1/trips/search')
    .get(trips.search_trips)

  /**
   * Put a trip or update it
   *    RequiredRoles: Manager
   *     
   * Delete a trip
   *    RequiredRoles: Manager
   * 
   * Get a trip
   *    RequiredRoles: None
   * 
   * @section trips
   * @type get put delete 
   * @url /v1/trips/:tripId
  */
  app.route('/v1/trips/:tripId')
    .get(trips.read_a_trip)
    .put(trips.update_a_trip)
    .delete(trips.delete_a_trip);

  /**
* Put to cancel a trip
        RequiredRoles: None
* @section trips
* @type put 
* @url /v1/trips/:tripId/cancel
*/
  app.route('/v1/trips/:tripId/cancel')
    .put(trips.cancel_a_trip);



  /**------------v2 METHODS------------ */
  /**
 * Post trips
 *    RequiredRoles: Manager
 * Get trips
 *
 * @section trips
 * @type get post 
 * @url /v2/trips
*/
  app.route('/v2/trips')
    .get(trips.list_all_trips)
    .post(authController.verifyUser(["MANAGER"]), trips.create_a_trip_v2);


  /**
* Put a trip or update it
*    RequiredRoles: Manager
*     
* Delete a trip
*    RequiredRoles: Manager
* 
* Get a trip
*    RequiredRoles: None
* 
* @section trips
* @type get put delete 
* @url /v2/trips/:tripId
*/
  app.route('/v2/trips/:tripId')
    .get(trips.read_a_trip_v2)
    .put(authController.verifyUser(["MANAGER"]), trips.update_a_trip_v2)
    .delete(authController.verifyUser(["MANAGER"]), trips.delete_a_trip_v2);

  /**
  * Put to cancel a trip
  * @section trips
  * @type put 
  * @url /v2/trips/:tripId/cancel
  */
  app.route('/v2/trips/:tripId/cancel')
    .put(authController.verifyUser(["MANAGER"]), trips.cancel_a_trip_v2);
};

