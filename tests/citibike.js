var test = require('tape');
var citibike = require('../lib/citibike')


test('search citibike station test: empty', function (t) {

    t.plan(1);

    var station = '';

    citibike.searchForStation(station, function(data){
    },function(){
        t.equal(true, true);
        console.log('Failed. Sucks.');
    });

});

test('search citibike station test: 5th and 29th', function (t) {

    t.plan(1);

    var station = '5th and 29th';

    citibike.searchForStation(station, function(data){
        t.equal(474, data.number);
    },function(){
        console.log('Failed. Sucks.');
    });

});


test('search citibike station test: reverse! 29th and 5th', function (t) {

    t.plan(1);

    var station = '29th and 5th';

    citibike.searchForStation(station, function(data){
        t.equal(474, data.number);
    },function(){
        console.log('Failed. Sucks.');
    });

});



test('search citibike station test: broadway and 29th', function (t) {

    t.plan(1);

    var station = 'broadway and 29th';

    citibike.searchForStation(station, function(data){
        t.equal(486, data.number);
    },function(){
        console.log('Failed. Sucks.');
    });

});


test('citibike locaition search: broadway and 22nd', function (t) {

    t.plan(1);

    var station = 'broadway and 22nd';

    citibike.searchForStation(station, function(data){
        t.equal(402, data.number);
    },function(){
        console.log('Failed. Sucks.');
    });

});

test('citibike locaition search: Water and Whitehall', function (t) {

    t.plan(1);

    var station = 'water and whitehall plaza';

    citibike.searchForStation(station, function(data){
        t.equal(534, data.number);
    },function(){
        //console.log('Failed. Sucks.');
    });

});
