var test = require('tape');
var citibike = require('../lib/citibike')
var _ = require('underscore')


test('search citibike station test', function (t) {

    t.plan(1);

    var station = '';

    citibike.searchForStation(station, function(data){
    },function(){
        t.equal(true, true);
        console.log('Failed. Sucks.');
    });

});

test('search citibike station test', function (t) {

    t.plan(1);

    var station = '5th and 29th';

    citibike.searchForStation(station, function(data){
        t.equal(474, data.number);
    },function(){
        console.log('Failed. Sucks.');
    });

});



test('search citibike station test', function (t) {

    t.plan(1);

    var station = 'broadway and 29th';

    citibike.searchForStation(station, function(data){
        t.equal(486, data.number);
    },function(){
        console.log('Failed. Sucks.');
    });

});


test('search citibike station test', function (t) {

    t.plan(1);

    var station = 'broadway and 22nd';

    citibike.searchForStation(station, function(data){
        t.equal(402, data.number);
    },function(){
        console.log('Failed. Sucks.');
    });

});

