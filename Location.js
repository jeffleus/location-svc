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
    }
});

var Sport = sequelize.define('sport', {
  SportCodeID: { 
	  type: Sequelize.STRING, 
	  primaryKey: true, 
	  field: 'SportCodeID' 
  }, 
  description: { type: Sequelize.STRING, field: 'sportDescription' }, 
  inSeasonStart: { type: Sequelize.DATE, field: 'InSeasonStartDate' }, 
  inSeasonEnd: { type: Sequelize.DATE, field: 'InSeasonEndDate' },
  offSeasonStart: { type: Sequelize.DATE, field: 'OffSeasonStartDate' }, 
  offSeasonEnd: { type: Sequelize.DATE, field: 'OffSeasonEndDate' },
}, {
	tableName: 'SportCodes'
});

var moduleName = "SPORT:";

module.exports.get = function(id,filter) {
    if (!id) return list(filter);
    console.log(moduleName, 'calling getSingle with id: ' + id);
    return sequelize.sync().then(function() {
        return Sport.findById(id).then(function(sport) {
            console.info(moduleName, 'sport record found');
            return {
                count: (sport)?1:0,
                sports: [ (sport)?sport.dataValues:null ]
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
                    SportCodeID: filter 
                } 
            };
            return Sport.findAndCountAll(filterOption);
        } else return Sport.findAndCountAll();
    }).then(function(result) {
		//return Athlete.findAndCountAll().then(function(result) {
        var sports = [];
        result.rows.forEach(function(sportRow) {
            sports.push(sportRow.dataValues);
        });
        return {
            count: result.count,
            sports: sports
        };
	});
}

module.exports.create = function(json) {
	return sequelize.sync().then(function() {
		console.info(moduleName, 'create a new sport using JSON provided');
		console.error('need to add json validation to sport creation');
		var sportJson = json;//JSON.parse(json);
		return Sport.create(json).then(function(sport) {
			console.info('sport successfully created');
			return sport;
		});
	});
};

module.exports.update = function(json) {
	return sequelize.sync().then(function() {
		console.info(moduleName, 'update a single sport using JSON provided');
		console.error('need to add json validation to sport update');
		var ath = json;//JSON.parse(json);
		return Sport.update(
			json,
			{ where: { SportCodeID: json.SportCodeID } }
		).then(function(result) {
			console.info(moduleName, 'sport successfully updated');
			return result;
		});
	});
};

module.exports.delete = function(id) {
	return sequelize.sync().then(function() {
		console.info(moduleName, 'delete a sport by id');
		return Sport.destroy({ where: { SportCodeID: id } }).then(function(count) {
			console.info(moduleName, '(' + count.toString() + ') sports successfully deleted');
			return count;
		});
	});
};

module.exports.close = function() {
	sequelize.close();
};