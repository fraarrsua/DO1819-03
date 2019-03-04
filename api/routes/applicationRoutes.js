'use strict';
module.exports = function(app) {
  var application = require('../controllers/applicationController');
  
  
  /**
   * Get all applications
   *    RequiredRoles: to be a manager
   * 
   * Post an application 
   *    RequiredRoles: to be a explorer 
   *    RequiredStatus: tripStatus --> !STARTED & !CANCELLED
   *
   * @section applications
   * @type get post
   * @url /v1/applications
  */
  app.route('/v1/applications')
	  .get(application.list_all_applications)
	  .post(application.create_an_application);
  

/**
   * 
   * Get applications by userId
   *    RequiredRole: to be an Explorer
   *
   * @section applications
   * @type get
   * @url /v1/applications/:userId
   * @param {string} userId
  */
 app.route('/v1/applications/:applicationID/changeStatus')
 .put(application.change_status);


 /**
   * Get an aplication giving applicationId
   * Update an aplication giving applicationId
   *      RequiredRole: To be a Manager
   * @section applications
   * @type get, put
   * @url /v1/applications/:applicationId
   * @param {string} applicationId
  */
 app.route('/v1/applications/:applicationId')
 .get(application.read_an_application)
 .put(application.update_an_application);
};
