//const flatted=require("flatted");
//const chromium = require('chrome-aws-lambda');
//const fs = require("fs");

exports.handler=async(event)=>{
  console.log("LOGIN FUNCTION");
  let page=JSON.parse(event.body);
  let waitForSelectorFun=page.waitForSelector;
  waitForSelectorFun=waitForSelectorFun.replace(/\n/g,"");
  waitForSelectorFun="function "+waitForSelectorFun;
  eval(waitForSelectorFun);
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
