'use strict';
module.exports = function (app) {
  var application = require('../controllers/applicationController'),
    authController = require('../controllers/authController');


  /**
   * Get all applications
   *    RequiredRoles: to be a manager
   *
   * @section applications
   * @type get post
   * @url /v1/applications
  */
  app.route('/v1/applications')
    .get(application.list_all_applications);

  /**
* Get all applications
*    RequiredRoles: to be a manager
* 
* Post an application 
*    RequiredRoles: to be a explorer 
*    RequiredStatus: tripStatus --> PUBLISHED && !STARTED && !CANCELLED
*
* @section applications
* @type get post
* @param tripId
* @url /v1/applications
*/
  app.route('/v1/applications/:tripId')
    .post(application.create_an_application);

  /**
* Get an aplication by applicationId
* Update an aplication by applicationId
* @section applications
* @type get, put
* @url /v1/applications/:applicationId
* @param {string} applicationId
*/
  app.route('/v1/applications/:applicationId')
    .get(application.read_an_application)
    .put(application.update_an_application);


  /**
     * 
     * Put to change a status of one application
     * Previous status must be PENDING
     * New status must be REJECTED or DUE
     *    RequiredRole: to be an Manager
     *
     * @section applications
     * @type put
     * @url /v1/applications/:applicationId/change
     * @param {string} applicationId
     * @body newStatus
    */
  app.route('/v1/applications/:applicationId/change')
    .put(application.change_status);

  /**
    * 
    * Put to pay an application
    *    Change the status=ACCEPTED and status=true
    *    RequiredRole: to be an EXPLORER
    *
    * @section applications
    * @type put
    * @url /v1/applications/:applicationId/pay
    * @param {string} applicationId
   */
  app.route('/v1/applications/:applicationId/pay')
    .put(application.pay_an_application);

  /**
  * 
  * Put to cancel an application
  *    Change the status=CANCELLED only if status=ACCEPTED
  *    RequiredRole: to be an EXPLORER
  *
  * @section applications
  * @type put
  * @url /v1/applications/:applicationId/cancel
  * @param {string} applicationId
 */
  app.route('/v1/applications/:applicationId/cancel')
    .put(application.cancel_an_application);






  //------------------V2 Requests --------------

  /**
   * Get all applications
   *    RequiredRoles:
   *      - To be a manager: Only returns applications added to trips created by himself 
   *      - To be a explorer: Only returns applications created by himself and groupedBy status
   * 
   * Post an application 
   *    RequiredRoles: to be a explorer 
   *    RequiredStatus: tripStatus --> PUBLISHED
   *
   * @section applications
   * @type get post
   * @url /v2/applications
  */
  app.route('/v2/applications')
    .get(authController.verifyUser(["EXPLORER", "MANAGER", "ADMINISTRATOR"]), application.list_all_applications_v2)
    .post(authController.verifyUser(["EXPLORER"]), application.create_an_application_v2);

  /**
   * 
   * Put to change a status of one application
   * Previous status must be PENDING
   * New status must be REJECTED or DUE
   *    RequiredRole: to be an Manager
   *
   * @section applications
   * @type put
   * @body newStatus
   * @url /v2/applications/:applicationId/change
   * @param {string} applicationId
  */
  app.route('/v2/applications/:applicationId/change')
    .put(authController.verifyUser(["MANAGER"]), application.change_status_v2);

  /**
    * 
    * Put to pay an application
    *    Change the status=ACCEPTED and status=true
    *    RequiredRole: to be an EXPLORER
    *
    * @section applications
    * @type put
    * @url /v2/applications/:applicationId/pay
    * @param {string} applicationId
   */
  app.route('/v2/applications/:applicationId/pay')
    .put(authController.verifyUser(["EXPLORER"]), application.pay_an_application_v2);

  /**
* 
* Put to cancel an application
*    Change the status=CANCELLED only if status=ACCEPTED
*    RequiredRole: to be an EXPLORER
*
* @section applications
* @type put
* @url /v2/applications/:applicationId/cancel
* @param {string} applicationId
*/
  app.route('/v2/applications/:applicationId/cancel')
    .put(authController.verifyUser(["EXPLORER"]), application.cancel_an_application_v2);

};


