const flatted=require("flatted");

exports.handler=function(event){
  console.log("LOGIN FUNCTION");
  console.log(flatted.parse(event.body));

}
