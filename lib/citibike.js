"use strict";

var request = require('request')
var fuzzy = require('fuzzy');
var geocoder = require('node-geocoder')('google', 'http', '');
var numeral = require('numeral');

module.exports = {

    endpoint: 'http://api.citybik.es/citi-bike-nyc.json',

    searchForStation: function (name, callback, fail) {

        if(typeof name == 'undefined') {
            return;
        }

        name += ' New York, NY';

        geocoder.geocode(name, function(err, res) {
            console.log(res);
        });

    },

    _getStationsRaw: function (onSuccess, onFail) {

        request(this.endpoint, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                var json = JSON.parse(body);

                onSuccess(JSON.parse(body));
            }

            onFail(response.statusCode);
        });

    },


}


