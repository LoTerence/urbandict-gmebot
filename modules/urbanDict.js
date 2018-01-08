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

        res.on('data', function(chunk) {
            str += chunk;
        });

        res.on('end', function() {
            try{
                str = JSON.parse(str);
                if( (typeof(str.list[0].definition)) !== 'undefined' ){
                    mes = str.list[0].definition;
                } else {
                    mes = input+" was not found in urban dictionary";
                }
            } catch (e) {
                console.error(e.message);
            }
        });
    };
    
    var request = HTTPS.get(options, callbackAPI);
    
    request.end();

    return 'test urbandict worked: ' + mes;
}