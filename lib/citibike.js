"use strict";

var Q = require('q');
var curCity = 'New York, NY';
var geocoder = require('node-geocoder')('google', 'http', '');
var geolib = require('geolib');
var numeral = require('numeral');
var request = require('request')
var rp = require('request-promise');

module.exports = {

    endpoint: 'http://api.citybik.es/citi-bike-nyc.json',

    searchForStation: function (name, callback, fail) {

        if (typeof name === 'undefined' || name === '') {
            fail();
            return;
        }

        // format name for current city
        name += ' ' + curCity;

        // set up the promise array
        Q.allSettled([this._getStationsRaw(), this._getLatLng(name)]
        ).spread(function (citiResponse, geoResponse) {
            if (citiResponse.state === 'fulfilled' && geoResponse.state === 'fulfilled') {

                var geo = geoResponse.value[0];

                var lat = parseFloat(geo.latitude);
                var lng = parseFloat(geo.longitude);

                // in case we want some other data, because 'mo data...less problems?
                var neighborhood = geo.extra.neighborhood;
                var streetName = geo.streetName;
                var zipCode = geo.zipcode;

                var citi = JSON.parse(citiResponse.value);

                var distance = Number.POSITIVE_INFINITY;
                var closest = null;

                for (var i=0;i < citi.length; i++) {

                    var station = citi[i];
                    var longitude = station.lng / 1000000;
                    var latitude = station.lat / 1000000;

                    var stationDistance = geolib.getDistance(
                        {latitude: geo.latitude, longitude: geo.longitude},
                        {latitude: latitude , longitude: longitude}
                    );

                    // set the closest station
                    if (stationDistance < distance) {
                        distance = stationDistance;
                        closest = station;
                    }
                }

                if (closest === null) {
                    fail();
                }

                callback(closest);
                return;
            }
        }).done();
    },

    _getLatLng: function (name) {
        return geocoder.geocode(name);
    },

    _getStationsRaw: function () {
        return rp(this.endpoint);
    },

};


