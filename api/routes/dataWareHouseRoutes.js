'use strict';
module.exports = function(app) {
  var dataWareHouse = require('../controllers/dataWareHouseController');


  	/**
	 * Get a list of all indicators or post a new computation period for rebuilding
	 * RequiredRole: Administrator
	 * @section dataWareHouse
	 * @type get post
	 * @url /dataWareHouse
	 * @param [string] rebuildPeriod
	 * 
	*/
<<<<<<< HEAD
	app.route('/dataWareHouse')
=======
	app.route('/v1/dataWareHouse')
>>>>>>> be0037f2b1dbf966c5a65089955a20ce9c13b70e
	.get(dataWareHouse.list_all_indicators)
	.post(dataWareHouse.rebuildPeriod);

	/**
	 * Get a list of last computed indicator
	 * RequiredRole: Administrator
	 * @section dataWareHouse
	 * @type get
	 * @url /dataWareHouse/latest
	 * 
	*/
<<<<<<< HEAD
	app.route('/dataWareHouse/latest')
=======
	app.route('/v1/dataWareHouse/latest')
>>>>>>> be0037f2b1dbf966c5a65089955a20ce9c13b70e
	.get(dataWareHouse.last_indicator);
};
