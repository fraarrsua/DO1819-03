'use strict';
module.exports = function(app) {
	var store = require('../controllers/storeController');

  // Data Storage routes

  /**
	 * Bad option: Put a large json with documents from a file into a collection of mongoDB
	 *
	 * @section store
	 * @type post
	 * @url /v1/store/insertMany
     * @param {string} mongooseModel  //mandatory
	 * @param {string} sourceFile   //mandatory
	 * Sample 1: http://localhost:8080/v1/store/insertMany?dbURL=mongodb://myUser:myUserPassword@localhost:27017/ACME-Explorer&mongooseModel=Actor&sourceFile=/home/ricmercedes/Documents/acme/actors.json
  */
  app.route('/v1/store/insertMany')
 		.post(store.store_json_insertMany);

  /**
	 * Put a large json with documents from a file into a collection of mongoDB
	 *
	 * @section store
	 * @type post
	 * @url /v1/store/fs
	 * @param {string} dbURL       //mandatory
     * @param {string} collection  //mandatory
	 * @param {string} sourceURL   //mandatory
	 * @param {string} batchSize   //optional
	 * @param {string} parseString //optional
	 * Sample 1: http://localhost:8080/v1/store/fs?dbURL=mongodb://admin:admin@localhost:27017/ACME-Explorer&collection=actor&batchSize=100&parseString=*&sourceFile=/home/ricmercedes/Documents/acme/streamactors.json
  */
  app.route('/v1/store/fs')
		.post(store.store_json_fs);


  /**
	 * Put a large json with documents from an URL into a collection of mongoDB
	 *
	 * @section store
	 * @type post
	 * @url /v1/store/url
	 * @param {string} dbURL       //mandatory
     * @param {string} collection  //mandatory
	 * @param {string} sourceFile   //mandatory
	 * @param {string} batchSize   //optional
	 * @param {string} parseString //optional
	 * Sample 1: http://localhost:8080/v1/store/url?dbURL=mongodb://admin:admin@localhost:27017/ACME-Explorer&collection=test&batchSize=100&parseString=rows.*&sourceURL=http://drive.google.com/uc?export=download%26id=1kkIbpDMoNjy9BSWOI9xPlCxA7nfv4N0v
	 * Sample 2: http://localhost:8080/v1/store/url?dbURL=mongodb://admin:admin@localhost:27017/ACME-Explorer&collection=actors&batchSize=100&parseString=*&sourceURL=http://drive.google.com/uc?export=download%26id=1kkIbpDMoNjy9BSWOI9xPlCxA7nfv4N0v
  */ 
  app.route('/v1/store/url')
 		.post(store.store_json_url);
};