'use strict';
var Sequelize = require('sequelize');
var Config = require('./Config')();
var sequelize = new Sequelize('FuelStation_STAN', Config.username, Config.password, {
	host: 'callsheet-mysql.cn6x6nhayn9c.us-west-2.rds.amazonaws.com',
	port: 3306,
    pool: {
        max: 10,
        min: 1,
        idle: 100
    },
    dialect: 'mysql'
});

var Location = sequelize.define('location', {
  LocationID: { 
	  type: Sequelize.INTEGER,
      autoIncrement: true,
	  primaryKey: true, 
	  field: 'LocationID' 
  }, 
  title: { type: Sequelize.STRING, field: 'Title' }, 
  description: { type: Sequelize.STRING, field: 'Description' },
  isPre: { type: Sequelize.BOOLEAN, field: 'isPre' },
  isPost: { type: Sequelize.BOOLEAN, field: 'isPost' },
  isHydration: { type: Sequelize.BOOLEAN, field: 'isHydration' },
  isSnack: { type: Sequelize.BOOLEAN, field: 'isSnack' },
  isStaff: { type: Sequelize.BOOLEAN, field: 'isStaff' },
  isFree: { type: Sequelize.BOOLEAN, field: 'isFree' }
}, {
	tableName: 'Locations'
});

var moduleName = "LOCATION:";

module.exports.get = function(id,filter) {
    if (!id) return list(filter);
    console.log(moduleName, 'calling getSingle with id: ' + id);
    return sequelize.sync().then(function() {
        return Location.findById(id).then(function(location) {
            console.info(moduleName, 'location record found');
            return {
                count: (location)?1:0,
                locations: [ (location)?location.dataValues:null ]
            };
        })
    });
}

function list(filter) {
    console.log(moduleName, 'calling getAll because no id provided');
	return sequelize.sync().then(function() {
        if (filter) {
            var filterOption = {
                where: {
                    LocationID: filter 
                } 
            };
            return Location.findAndCountAll(filterOption);
        } else return Location.findAndCountAll();
    }).then(function(result) {
        var locations = [];
        result.rows.forEach(function(locationRow) {
            locations.push(locationRow.dataValues);
        });
        return {
            count: result.count,
            locations: locations
        };
	});
}

module.exports.create = function(json) {
	return sequelize.sync().then(function() {
		console.info(moduleName, 'create a new location using JSON provided');
		console.error('need to add json validation to location creation');
		var locationJson = json;//JSON.parse(json);
		return Location.create(json).then(function(location) {
			console.info('location successfully created');
			return location;
		});
	});
};

module.exports.update = function(json) {
	return sequelize.sync().then(function() {
		console.info(moduleName, 'update a single location using JSON provided');
		console.error('need to add json validation to location update');
		return Location.update(
			json,
			{ where: { LocationID: json.LocationID } }
		).then(function(result) {
			console.info(moduleName, 'location successfully updated');
			return result;
		});
	});
};

module.exports.delete = function(id) {
	return sequelize.sync().then(function() {
		console.info(moduleName, 'delete a location by id');
		return Location.destroy({ where: { LocationID: id } }).then(function(count) {
			console.info(moduleName, '(' + count.toString() + ') location successfully deleted');
			return count;
		});
	});
};

module.exports.close = function() {
	sequelize.close();
};