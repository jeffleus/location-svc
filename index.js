var Location = require('./Location');

var args = process.argv.slice(2);
//console.log(process.argv);

var location = {
    //LocationID: 2, 
	title: 'Fuel Station', 
	description: "primary fueling location",
    isPre: true,
    isPost: true,
    isHydration: true,
    isSnack: true,
    isStaff: true,
    isFree: false
};

var id = 3;
var filter = ('mgo,wgo').split(',');
//console.log("FILTER: ", filter);

//Location.get(id).then(function(result) {
//Location.get(null,filter).then(function(result) {
Location.create(location).then(function(result) {
//Location.update(location).then(function(result) {
//Location.delete(2).then(function(result) {	
	console.log(result);
	//return;
    return Location.get(null);
}).then(function(result) {
	console.log(result);
	return;    
}).catch(function(err) {
	console.error(err);
	return;
}).finally(function() {
	Location.close();
	return;
});

function _logTest(id, filter) {
    console.log('ID: ', id);
    console.log('FILTER: ', filter);
};