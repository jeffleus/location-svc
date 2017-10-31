'use strict';
var Location;
var moduleName = 'location-svc';

module.exports.get = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var response = {
    statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify({
      message: 'GET from the location microservice for FuelStationApp'
    })
  };
    var Location = require('./Location').init(event.requestContext.authorizer.claims['custom:team']);
    //check the event path params for an employee id to use during lookup
    var id = (event.pathParameters && event.pathParameters.lid) ? event.pathParameters.lid : null;
	console.log(event.requestContext.authorizer.claims);
	//console.log(event.queryStringParameters);
    var filter = ((event.queryStringParameters !== null) && (event.queryStringParameters.filter !== null))?	
		event.queryStringParameters.filter.split(','):null;
    console.log(moduleName, 'filter created - ' + JSON.stringify(filter));
    Location.get(id,filter).then(function(result) {
        if (result.count === 0) response.statusCode = 404;
        response.body = JSON.stringify({
            message: 'Successful get command found: ' + result.count,
            locations: result.locations
        });
        callback(null, response);
    }).catch(function(err) {
        console.log(moduleName, 'there was an error during the get call');
        console.error(err);
    }).finally(function() {
        console.info(moduleName, 'completed the location model get');
    });
};

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var response = {
    statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify({
      message: 'POST from the location microservice for FuelStationApp'
    })
  };
    
    var json = JSON.parse(event.body);
    var location;
    
    Location.create(json).then(function(loc) {
        console.log(moduleName, 'location created.');
        location = loc;	//stash the location in a function scoped variable
		
        response.body = JSON.stringify({
            message: 'Successfully created a new location: ' + location.LocationID,
            location: location
        });
        callback(null, response);
    }).catch(function(err) {
        console.log(moduleName, 'there was an error creating the location');
        console.error(err);
    }).finally(function() {
        console.info(moduleName, 'completed the location model create');
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var response = {
    statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify({
      message: 'PUT from the location microservice for FuelStationApp'
    })
  };
    var json = JSON.parse(event.body);
    var id = (event.pathParameters && event.pathParameters.lid) ? event.pathParameters.lid : null;
	
  Location.update(json).then(function(location) {
      console.log('location updated using the LOCATION utility module');
      callback(null, response);
  }).catch(function(err) {
      console.log('There was an error updating the location record');
      console.error(err);
      callback(err);
  });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var response = {
    statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify({
      message: 'DELETE from the location microservice for FuelStationApp'
    })
  };

  var id = (event.pathParameters && event.pathParameters.lid) ? event.pathParameters.lid : null;
  if (!id) {
      callback(null, {
          statusCode: 400,
          body: JSON.stringify({ message: 'Valid location id was not passed to the delete method.' })
      })
  }
	
  Location.delete(id).then(function(count) {
      console.log('(' + count + ') - location successfully deleted');
      callback(null, response);
  }).catch(function(err) {
      console.log('There was an error deleting the location record');
      console.error(err);
      callback(err);
  });
};

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
