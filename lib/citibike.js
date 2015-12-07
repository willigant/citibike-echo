"use strict";

var request = require('request')
var fuzzy = require('fuzzy');
var rp = require('request-promise');
var geocoder = require('node-geocoder')('google', 'http', '');
var numeral = require('numeral');
var Q = require('q');
var geolib = require('geolib');
var curCity = 'New York, NY';

module.exports = {

    endpoint: 'http://api.citybik.es/citi-bike-nyc.json',

    searchForStation: function (name, callback, fail) {

        if(typeof name == 'undefined') {
            return;
        }

        // format name for current city
        name += ' ' + curCity;

        // set up the promise array
        Q.allSettled([this._getStationsRaw(), this._getLatLng(name)]
        ).spread(function(citiResponse, geoResponse){
            if (citiResponse.state === 'fulfilled' && geoResponse.state === 'fulfilled') {

                var geo = geoResponse.value[0];

                var lat = parseFloat(geo.latitude);
                var lng = parseFloat(geo.longitude);

                // in case we want some other data, because 'mo data...less problems?
                var neighborhood = geo.extra.neighborhood;
                var streetName   = geo.streetName;
                var zipCode      = geo.zipcode;

                var citi = JSON.parse(citiResponse.value);
            }
        }).done();
    },

            onFail(response.statusCode);
        });

    _getLatLng: function(name) {
            return geocoder.geocode(name);
    },

    _getStationsRaw: function () {
        return rp(this.endpoint);
    },

};


