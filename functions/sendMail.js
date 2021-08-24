const puppeteer = require("puppeteer-extra");
//const emailSender = require("./email-sender");
const fs = require("fs");
const path = require("path");
const pluginStealth = require("puppeteer-extra-plugin-stealth");


require("dotenv").config();

const chalk = require("chalk");

//const fs = require("fs").promises;


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

const emailSender = {
    login: async page => {
        console.log(chalk.whiteBright.inverse("Logging in Gmail..."));

        await page.goto(
            "https://accounts.google.com/AccountChooser?service=mail&continue=https://mail.google.com/mail/"
        );

        await page.waitForSelector(`input[type='email']`);
        await page.type(`input[type='email']`, user, { delay: 15 });
        await page.keyboard.press("Enter");

        await page.waitForNavigation(["networkidle0", "load", "domcontentloaded"]);
        await page.waitFor(3550);
        await page.waitForSelector(`input[type='password']`);
        await page.type(`input[type='password']`, password, { delay: 15 });
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
	let subject = emailProperties.subject;
	let message = emailProperties.message;
	console.log(subject);
	console.log(message);
	puppeteer.use(pluginStealth());
    const browser = await puppeteer.launch({
        // headless: false,
        timeout: 0
    });

    //const lastEmailIndex = await emailSender.getLastSentEmailIndex();

    const page = await browser.newPage();
    await emailSender.login(page);

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