var citibike = require('./lib/citibike')
var app = require('./package.json')

exports.handler = function (event, context) {

    try {

        var station = event.request.intent.slots.Station.value;

        // figure out station id
        citibike.searchForStation(station, function (data) {

            // figure out how many bikes + docks are there
            var bikes = data.bikes;
            var docks = data.bikes + data.free;
            var id = data.id;
            var timestamp = data.timestamp;
            var name = data.name;

            // return how many bikes and docks there are
            var say =
                "There are " + bikes + " bikes " +
                " and " + docks + " docks " +
                " at " + name;

            console.log(data);
            console.log(say);
            context.succeed(response(say));

        }, function(){
            // failed request
            console.log("the worst");
            context.succeed(response('I am the worst! I don\'t  know where '+ station + ' is!'));

        });
    }
    catch (e) {
        console.log(e);
        context.succeed(response('Yikes! I don\'t  know where that is!'));
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
