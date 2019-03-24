'use strict';
module.exports = function (app) {
  var actors = require('../controllers/actorController'),
    authController = require('../controllers/authController');


  //------------------V1 Requests --------------
  /**
   * Get all actors
   *    Required role: None
   * Post an actor 
   *    RequiredRoles: None
	 *
	 * @section actors
	 * @type get post
	 * @url /v1/actors
   * @param {string} role (manager|administrator|explorer|sponsor) 
  */
  app.route('/v1/actors')
    .get(actors.list_all_actors)
    .post(actors.create_an_actor);

  /**
   * Put an actor
   *    RequiredRoles: to be the proper actor
   * Get an actor
   *    RequiredRoles: to be the proper actor or an Administrator
	 *
	 * @section actors
	 * @type get put
	 * @url /v1/actors/:actorId
  */
  app.route('/v1/actors/:actorId')
    .get(actors.read_an_actor)
    .put(actors.update_an_actor_v1);
  //.delete(actors.delete_an_actor);

  /**
	 * Put to Ban an EXPLORER by actorId
   *    RequiredRole: Administrator
	 *
	 * @section actors
	 * @type put
	 * @url /v1/actors/:actorId/ban
	 * @param {string} actorId
  */
  app.route('/v1/actors/:actorId/ban')
    .put(actors.ban_an_actor);

  /**
 * Put to UnBan an EXPLORER by actorId
 *    RequiredRole: Administrator
 *
 * @section actors
 * @type put
 * @url /v1/actors/:actorId/unban
 * @param {string} actorId
*/
  app.route('/v1/actors/:actorId/unban')
    .put(actors.unban_an_actor);


  //------------------V2 Requests --------------

  /**
     * Get all actors
     *    Required role: Administrator
     *
     * @section actors
     * @type get post
     * @url /v1/actors
     * @param {string} role (administrator) 
    */
  app.route('/v2/actors')
    .get(authController.verifyUser(["ADMINISTRATOR"]), actors.list_all_actors_v2);


  /**
    * Put an actor
    *    RequiredRoles: to be the proper actor
    * Get an actor
    *    RequiredRoles: to be the proper actor
    *
    * @section actors
    * @type get put
    * @url /v1/actors/:actorId
   */
  app.route('/v2/actors/:actorId')
    .get(authController.verifyUser(["ADMINISTRATOR", "EXPLORER", "MANAGER", "SPONSOR"]), actors.read_an_actor_v2)
    .put(authController.verifyUser(["ADMINISTRATOR", "EXPLORER", "MANAGER", "SPONSOR"]), actors.update_an_actor_v2); //Todos pueden editar su perfil

  /**
	 * Put to Ban an EXPLORER by actorId
   *    RequiredRole: Administrator
	 *
	 * @section actors
	 * @type put
	 * @url /v1/actors/:actorId/ban
	 * @param {string} actorId
	*/
  app.route('/v2/actors/:actorId/ban')
    .put(authController.verifyUser(["ADMINISTRATOR"]), actors.ban_an_actor_v2);

  /**
* Put to UnBan an EXPLORER by actorId
*    RequiredRole: Administrator
*
* @section actors
* @type put
* @url /v1/actors/:actorId/unban
* @param {string} actorId
*/
  app.route('/v2/actors/:actorId/unban')
    .put(authController.verifyUser(["ADMINISTRATOR"]), actors.unban_an_actor_v2);
};

