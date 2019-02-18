'use strict';
module.exports = function(app) {
  var trips = require('../controllers/tripController');

  /**
   * Manage catalogue of trips: 
   * Post trips
   *    RequiredRoles: Manager
   *    tripStatus --> UNPUBLISHED
   * Get trips 
   *    RequiredRoles: Manager
   *
   * @section trips
   * @type get post 
   * @url /v1/trips
  */
  app.route('/v1/trips')
		.get(trips.list_all_trips)
    .post(trips.create_a_trip);

  /**
   * Put a trip or update it
   *    RequiredRoles: Manager
   *    RequiredStatus: tripStatus --> UNPUBLISHED
   *     
   * Delete a trip
   *    RequiredRoles: Manager
   *    RequiredStatus: tripStatus --> UNPUBLISHED
   * 
   * Get a trip
   *    RequiredRoles: Manager
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

  /*app.route('/v0/categories')
    .get(trips.list_all_categories)
    .post(trips.create_a_category);

  app.route('/v0/categories/:categId')*/
    //.get(trips.read_a_category)
    //.put(trips.update_a_category)
    //.delete(trips.delete_a_category);
};
