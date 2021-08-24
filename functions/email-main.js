const puppeteer = require("puppeteer-extra");
const emailSender = require("./email-sender");
const fs = require("fs");
const path = require("path");
const pluginStealth = require("puppeteer-extra-plugin-stealth");

const emailList = fs
    .readFileSync(path.join(__dirname, "./", `../resources/email-list.txt`), "utf8")
    .split("\n");

/* Customizable variables */
const subject = "***IMPORTANT HEALESS BROWSER***";
const message = "Hi Pavan,\n\rI hope you are doing well.\n\rThanks & regards,\rPavan Pakki.";

sendMail = async(emailProperties)=>{
	let subject = emailProperties.subject;
	let message = emailProperties.message;
	console.log(subject);
	console.log(message);
	puppeteer.use(pluginStealth());
    const browser = await puppeteer.launch({
        // headless: false,
        timeout: 0
    });

    const lastEmailIndex = await emailSender.getLastSentEmailIndex();

    const page = await browser.newPage();
    await emailSender.login(page);

    for (let i = lastEmailIndex; i < emailList.length; i++) {
        await emailSender.writeNewEmail(page, {
            index: i,
            subject,
            email: emailList[i],
            message
        });
    }

    await browser.close();
};

exports.handler = async(event) => {
	sendMail(JSON.parse(event.body));
	let msg = {
		mailSent:true
	};
	return {
		statusCode: 200,
        body: JSON.stringify(msg)
	};
};