const puppeteer = require("puppeteer-extra");
const fs = require("fs");
const path = require("path");
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const chalk = require("chalk");

require("dotenv").config();


const emailList = fs
    .readFileSync(path.join(__dirname, "./", `../resources/email-list.txt`), "utf8")
    .split("\n");

/* Customizable variables */
const subject = "***IMPORTANT HEALESS BROWSER***";
const message = "Hi Pavan,\n\rI hope you are doing well.\n\rThanks & regards,\rPavan Pakki.";

/* Customizable variables */
const user = process.env.EMAIL_ACCOUNT;
const password = process.env.EMAIL_PASSWORD;
const delayBetweenEmails = 1500;
const delayBetweenSteps = 150;




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