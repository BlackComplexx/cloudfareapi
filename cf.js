"use strict"
const request = require("request")

//view docs of cloudfare..
const apiCloudfare = "https://api.cloudflare.com/client/v4/zones/{zoneID}/firewall/rules";

const expressionsCF = {
    enable: {
        "id": "dd82d47d198447aeba229b51b5cdca06",
        "paused": false,
        "description": "Waf",
        "action": "challenge", // make challangue in this ruler
        "filter": {
          "id": "d622836b79ee44748862130d4a63a3f5",
          "expression": "(cf.threat_score gt 0) or (http.request.uri.query contains \"?\") or (http.request.full_uri contains \"?=\") or (cf.client.bot) or (not ssl) or (http.request.version eq \"SPDY/3.1\") or (http.request.version eq \"HTTP/1.0\") or (http.request.version eq \"HTTP/1.1\") or (http.request.version eq \"HTTP/1.2\") or (http.request.version contains \"HTTP/1\")",
          "paused": false
        },
        "created_on": "2022-07-03T14:46:02Z",
        "modified_on": "2022-07-03T18:39:04Z",
        "index": 0,
        "rules": null
      }, 

      disable: {
        "id": "dd82d47d198447aeba229b51b5cdca06",
        "paused": true,
        "description": "Waf",
        "action": "challenge", // make challangue in this ruler
        "filter": {
          "id": "d622836b79ee44748862130d4a63a3f5",
          "expression": "(cf.threat_score gt 0) or (http.request.uri.query contains \"?\") or (http.request.full_uri contains \"?=\") or (cf.client.bot) or (not ssl) or (http.request.version eq \"SPDY/3.1\") or (http.request.version eq \"HTTP/1.0\") or (http.request.version eq \"HTTP/1.1\") or (http.request.version eq \"HTTP/1.2\") or (http.request.version contains \"HTTP/1\")",
          "paused": false
        },
        "created_on": "2022-07-03T14:46:02Z",
        "modified_on": "2022-07-03T18:39:04Z",
        "index": 0,
        "rules": null
      }
}

class Cf {
	constructor(email, authKey, zoneID, rulerID){
		this.mail = email
		this.authKey = authKey
		this.zoneID = zoneID
		this.rulerID = rulerID
	}

	makeRequest(action, callback){
		if (action == 'on') {
			const options = {
			    url: apiCloudfare.replace("{zoneID}", this.zoneID)+'/'+this.rulerID,
			    json: true,
			    headers: {
			        "X-Auth-Email": this.mail,
			        "X-Auth-Key": this.authKey,
			        "Content-Type": "application/json"
			    },
			    body: expressionsCF.enable
			};

		request.put(options, (err, res, body) => {
			callback(res, body)
		    if (err) return console.log(err);
		});

		} else if (action == 'off'){

		    const options = {
		        url: apiCloudfare.replace("{zoneID}", this.zoneID)+'/'+rulerID,
		        json: true,
		        headers: {
		            "X-Auth-Email": this.mail,
		            "X-Auth-Key": this.authKey,
		            "Content-Type": "application/json"
		        },
		        body: expressionsCF.disable
		    };

	    request.put(options, (err, res, body) => {
	    	callback(res, body)
	        if (err) return console.log(err);
	    });
	} else {
		return console.error("option asignated no is valid!")
	}
}
}

exports.Cloudfare = Cf