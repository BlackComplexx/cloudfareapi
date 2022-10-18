"use strict"

const { Cloudfare } = require("./cf.js")
const cfClass = new Cloudfare("MAIL", "AUTH_KEY", "ZONE_ID", "RULER_ID");

cfClass.makeRequest("on", (response, body) => { //"on" - "off"
	console.log(body)
})