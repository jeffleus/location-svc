var Sport = require('./Sport');

var args = process.argv.slice(2);
//console.log(process.argv);

var sport = {
	SportCodeID: 'XXX', 
	description: "yo, dis an update suckah",
	inSeasonStart: "2016-11-01T12:12:12.123Z",
	inSeasonEnd: "2017-03-24T12:12:12.123Z",
	offSeasonStart: "2017-03-25T12:12:12.123Z",
	offSeasonEnd: "2017-06-30T12:12:12.123Z"
};

var id = 1;
var filter = ('mgo,wgo').split(',');
console.log("FILTER: ", filter);

//Sport.get(null, filter).then(function(student) {
Sport.get(null,filter).then(function(student) {
//Sport.create(sport).then(function(student) {
//Sport.update(sport).then(function(student) {
//Sport.delete('XXX').then(function(result) {
	
//Athletes.delete(1165).then(function(result) {
//Athletes.update(ath).then(function(student) {
//Athletes.create(ath).then(function(student) {
//Athletes.get(id, filter).then(function(student) {
//	console.log(result);
	console.log(student);
	return;
}).catch(function(err) {
	console.error(err);
	return;
}).finally(function() {
	Sport.close();
	return;
});

function _logTest(id, filter) {
    console.log('ID: ', id);
    console.log('FILTER: ', filter);
};