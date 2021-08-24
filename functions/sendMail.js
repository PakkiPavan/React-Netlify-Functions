
//const puppeteer = require("puppeteer-extra");
const fs = require("fs");
const path = require("path");
//const pluginStealth = require("puppeteer-extra-plugin-stealth");
const chalk = require("chalk");


exports.handler = async(event) => {

	//sendGmail(JSON.parse(event.body));
	let msg = {
		mailSent:true
	};
	return {
		statusCode: 200,
        body: JSON.stringify(msg)
	};
};