//load https server
//const HTTPS = require('https');

/* 
function urb() would be called if groupme user begins message with /urbanDict
-It takes the user input after /urbanDict (a string) and returns the urbandictionary
    definition of that string
*/
exports.urb = function(input) {
    var message = 'hi this is msg ' +input;
/*
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
            str = JSON.parse(str);

            if(typeof(str.list[0].definition)!== 'undefined'){
                msg = str.list[0].definition;
            } else {
                msg = input+" was not found in urban dictionary";
            }
        });
    };
    
    HTTPS.request(options, callbackAPI).end();
*/
    return 'test urbandict worked: ' + message;
}