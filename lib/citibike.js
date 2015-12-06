"use strict";

var request = require('request')
var fuzzy = require('fuzzy');
var numeral = require('numeral');

module.exports = {

    endpoint: 'http://api.citybik.es/citi-bike-nyc.json',

    searchForStation: function (name, callback, fail) {

        if(typeof name =='undefined') {
            return
        }

        this._getStationsRaw(function (allStationData) {

            name = name.split(' ').map(function (word) {

                switch (word) {
                    case 'and':
                    case '&':
                        return '';

                        break;
                }

                var ordinal = numeral().unformat(word);

                if (ordinal > 0) {
                    return ordinal;
                }

                return word;

            }).join(' ')


            var modified = allStationData.map(function (station) {

                if (station.name.indexOf('- ') !== false) {

                    // Split out the  number and name combination
                    var pieces = station.name.split('- ');
                    station.id = pieces[0].trim();
                    pieces.shift();
                    station.name = pieces.join(' ');

                }

                station.searchName = station.name.split(' ').map(function (word) {

                    switch (word) {
                        case 'and':
                        case '&':
                        case '-':
                            return '';

                            break;
                    }

                    var ordinal = numeral().unformat(word);

                    if (ordinal > 0) {
                        return ordinal;
                    }

                    return word;

                }).join(' ')


                // return it to array
                return station;
            })

            var options = {
                extract: function (el) { return el.searchName; }
            };
            var results = fuzzy.filter(name, modified, options);

            if (results.length === 0) {
                fail();
                return;
            }

            var key = results[0].index;


            var stationData = {
                "id":        modified[key].id,
                "name":      modified[key].name,
                "bikes":     modified[key].bikes,
                "docks":     modified[key].free,
                "number":    modified[key].number,
                "lat":       modified[key].lat,
                "long":      modified[key].lng,
                "timestamp": modified[key].timestamp
            }

            callback(stationData);
        }, fail)
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


