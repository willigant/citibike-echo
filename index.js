var citibike = require('./lib/citibike')
var app = require('./package.json')

exports.handler = function (event, context) {

    try {

        var station = event.request.intent.slots.Station.value;

        // figure out station id
        citibike.searchForStation(station, function (data) {

            // figure out how many bikes + docks are there
            var bikes = data.bikes;
            var docks = data.docks;

            // return how many bikes and docks there are
            var say =
                "There are " + bikes + " bikes " +
                " and " + docks + " docks " +
                " at " + station

            context.succeed(response(say))

        }, function(){

            context.succeed(response('The worst! I don\'t  know where '+ station + ' is!'))

        });
    }
    catch (e) {
        context.succeed(response('Yikes! I don\'t  know where that is!'))
    }

}

function response(text) {
    return {
        version:  app.version,
        response: {
            outputSpeech:     {
                type: "PlainText",
                text: text
            },
            shouldEndSession: true
        }
    };

}
