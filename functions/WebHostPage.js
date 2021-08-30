export class WebHostPage{
 constructor(page){
  console.log("CONSTRUCTOR");
  this.page=page;
 }
 getPage(){
  console.log("Get Page");
  return this.page;
 }
}
