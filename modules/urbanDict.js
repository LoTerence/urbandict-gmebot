//load https server
const https = require('https');

/* 
function urb() would be called if groupme user begins message with /urbanDict
-It takes the user input after /urbanDict (a string) and returns the urbandictionary
    definition of that string
*/
exports.urb = function(input) {
    const word = encodeURIComponent(input);
    let msg = '';

    //connecting to urbandictionary API
    var options = {
        hostname: "api.urbandictionary.com",
        path: "/v0/define?term=" + word,
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
    
    https.request(options, callbackAPI)
        .on('error', (e) => {
            console.error(e);
            msg = 'there was an error making https request, check console';
        })
        .end();

    return 'test urbandict worked: ' + msg;
}