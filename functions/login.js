//const flatted=require("flatted");
//const chromium = require('chrome-aws-lambda');
//const fs = require("fs");

exports.handler=async(event)=>{
  console.log("LOGIN FUNCTION");
  let page=JSON.parse(event.body);
  let waitForSelector=page.waitForSelector;
  waitForSelector=waitForSelector.replace(/\n/g,"");
  eval(waitForSelector);
  await waitForSelector(`input[type='password']`);
  
  console.log("LOGGED IN");
  let msg={
   loggedIn:true
  }
  return{
    statusCode:200,
    body:JSON.stringify(msg)
  };


}
