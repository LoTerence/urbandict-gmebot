//load https server
var HTTPS = require('https');

/* 
function urb() would be called if groupme user begins message with /urbanDict
-It takes the user input after /urbanDict (a string) and returns the urbandictionary
    definition of that string
*/
exports.urb = function(input) {
    var mes = 'hi this is msg ' +input;

    //connecting to urbandictionary API
    var options = {
        hostname: "api.urbandictionary.com",
        path: "/v0/define?term=" + encodeURIComponent(input),
        rejectUnauthorized: false
    };

    var callbackAPI = function(res) {
        var str = '';
        console.log('running callback api method trying to get https get() to work on ud-api');
        res.on('data', function(chunk) {
            str += chunk;
        });

        res.on('end', function() {
            console.log('res.on(end) - does this work');
            try{
                str = JSON.parse(str);
                if( (typeof(str.list[0].definition)) !== 'undefined' ){
                    return str.list[0].definition;
                } else {
                    return input+" was not found in urban dictionary";
                }
            } catch (e) {
                console.log(e.message);
            }
        });
    };
    
    var request = HTTPS.get(options, callbackAPI);
    request.on('error', (e) => {
        console.log( 'got error:'  + e.message);
    });
    request.end();

    return 'test urbandict worked: ' + mes;
}