//const flatted=require("flatted");
const chromium = require('chrome-aws-lambda');

const fs = require("fs");

const path = require("path");

const chalk = require("chalk");
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
exports.handler=async(event)=>{
  console.log("LOGIN FUNCTION");
  let page=JSON.parse(event.body);
  let waitForSelector=page.waitForSelector;
  eval(waitForSelector);
  await waitForSelector(`input[type='password']`);
  
  console.log("LOGGED IN");
  let msg={
   loggedIn:true
  }
  return{
    status code:200,
    body:JSON.stringify(msg)
  };


}
