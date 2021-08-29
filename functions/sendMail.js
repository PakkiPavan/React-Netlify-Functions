
//const puppeteer = require("puppeteer");
//const puppeteer = require("puppeteer-core");

const chromium = require('chrome-aws-lambda');

const fs = require("fs");

const path = require("path");

//const pluginStealth = require("puppeteer-extra-plugin-stealth");

const chalk = require("chalk");
const flatted = require("flatted");
const emailSender = {

    login: async page => {

        //console.log(chalk.whiteBright.inverse("Logging in Gmail..."));
        console.log("LOGIN CALLED");
        await page.goto(

            "https://accounts.google.com/AccountChooser?service=mail&continue=https://mail.google.com/mail/"

        );

        await page.waitForSelector(`input[type='email']`);

        await page.type(`input[type='email']`, process.env.USERNAME, { delay: 15 });

        await page.keyboard.press("Enter");

        await page.waitForNavigation(["networkidle0", "load", "domcontentloaded"]);

        await page.waitFor(3550);

        await page.waitForSelector(`input[type='password']`);

        await page.type(`input[type='password']`, process.env.PASSWORD, { delay: 15 });

        await page.keyboard.press("Enter");

        await page.waitForNavigation(["networkidle0", "load", "domcontentloaded"]);

        console.log(chalk.whiteBright.inverse("Logged in succesfully."));

        await page.waitFor(5000);

    },

    writeNewEmail: async (page, { index, subject, email, message }) => {

        console.log(chalk.whiteBright.inverse(`${index}. Writing new e-mail...`));

        const $newEmailButton = `[jscontroller] > [id] > [class] > [id] div[style][role='button'][class]`;

        const $emailInput = `textarea[name = "to"]`;

        const $subjectInput = `input[name='subjectbox']`;

        // const $messageInput = `[aria-label*='mensagem'][role=textbox]`;

        const $messageInput = `[aria-label*='Message Body'][role=textbox]`;

        const $emailIsBeingSent = `[aria-live="assertive"] > div > div:nth-child(2) > span > span:nth-child(1)`;

        await page.waitForSelector($newEmailButton);

        await page.click($newEmailButton);

        await page.waitForSelector($emailInput);

        await page.type($emailInput, email);

        await page.waitFor(delayBetweenSteps);

        await page.waitForSelector($subjectInput);

        await page.type($subjectInput, subject);

        await page.waitFor(delayBetweenSteps);

        await page.waitForSelector($messageInput);

        await page.type($messageInput, message);

        await page.waitFor(delayBetweenSteps);

        await page.keyboard.press("Tab");

        await page.waitFor(delayBetweenSteps);

        await page.keyboard.press("Enter");

        await page.waitFor(delayBetweenSteps);

        await page.waitForSelector($emailIsBeingSent);

		console.log(`Mail sent to ${chalk.green(email)} Successfully.`);

        await page.waitFor(delayBetweenEmails);

    }

};

sendGmail = async(emailProperties)=>{
        console.log("SEND GMAIL");

	let subject = emailProperties.subject;
	let message = emailProperties.message;

        console.log(subject);
        console.log(message);

	//puppeteer.use(pluginStealth());

    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });
    console.log("OPENING GMAIL");

    const page = await browser.newPage();
    console.log("LOGGING IN");

    await emailSender.login(page);
    console.log("LOGGED IN");

    for (let i = 0; i < emailList.length; i++) {

        await emailSender.writeNewEmail(page, {

            index: i,

            subject,

            email: emailList[i],

            message

        });

	}

    await browser.close();

};
let msg={
  subject:"Test from Outside",
  message:"Test Message"
};

//sendGmail(msg);
/*(
 async function(){
  await sendGmail(msg);
}
)();*/
exports.handler = async(event,context,callback) => {
        console.log("SEND MAIL FUNCTION CALLED");
        //context.callbackWaitsForEmptyEventLoop = false;
	//await sendGmail(JSON.parse(event.body));
        let body=JSON.parse(event.body);
        let subject = body.subject;
	let message = body.message;

        console.log(subject);
        console.log(message);

	//puppeteer.use(pluginStealth());

    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });
    console.log("OPENING GMAIL");

     const page = await browser.newPage();
        
       console.log(page.goto);
       await page.goto(

            "https://accounts.google.com/AccountChooser?service=mail&continue=https://mail.google.com/mail/"

        );
        await page.waitForSelector(`input[type='email']`);
        await page.type(`input[type='email']`, process.env.USERNAME, { delay: 15 });

        await page.keyboard.press("Enter");
        await page.waitForNavigation(["networkidle0", "load", "domcontentloaded"]);

        await page.waitFor(3550);
        await page.waitForSelector(`input[type='password']`);

        await page.type(`input[type='password']`, process.env.PASSWORD, { delay: 15 });

        await page.keyboard.press("Enter");

        await page.waitForNavigation(["networkidle0", "load", "domcontentloaded"]);

        console.log("SUCCESS");
        //console.log(flatted.stringify(page));
	let msg = {
		mailSent:true
	};
	return {
		statusCode: 200,
                body: JSON.stringify(msg)//flatted.stringify(page)

	};
};
