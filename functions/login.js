//const flatted=require("flatted");
//const chromium = require('chrome-aws-lambda');
//const fs = require("fs");
console.log("OUTSIDE LOGIN");

console.log(globalThis);
console.log(globalThis.hello);



exports.handler=async(event)=>{
  console.log("LOGIN INSIDE FUNCTION", globalThis.hello);
  console.log(globalThis);
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
