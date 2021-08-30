//const flatted=require("flatted");
//const chromium = require('chrome-aws-lambda');
//const fs = require("fs");
console.log("OUTSIDE LOGIN");

const {WebHostPage}=require("./WebHostPage.js);

console.log(global);
console.log(webHostPage);
console.log(WebHostPage);



exports.handler=async(event)=>{
  console.log("LOGIN INSIDE FUNCTION");
  let page=JSON.parse(event.body);
  /*let waitForSelectorFun=page.waitForSelector;
  waitForSelectorFun=waitForSelectorFun.replace(/\n/g,"");
  waitForSelectorFun="function "+waitForSelectorFun;
  eval(waitForSelectorFun);
  await waitForSelector(`input[type='password']`);*/
  //console.log(global.page);
  console.log("LOGGED IN");
  let msg={
   loggedIn:true
  }
  return{
    statusCode:200,
    body:JSON.stringify(msg)
  };


}
