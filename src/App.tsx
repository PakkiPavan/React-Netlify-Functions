import React,{useEffect,useState} from 'react';
import './App.css';

//import {stringify} from "flatted";
/*
Kill port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

*/
function App() {
	useEffect(()=>{
		/*fetch('.netlify/functions/getData')
		.then(res=>res.json())
		.then(data=>{
			console.log(data);
		});*/
		
		
	},[]);
	let sendMail=()=>{
		let email = {
			subject,//: "***IMPORTANT FROM NETLIFY SERVERLESS FUNCTIONS***",
			message//: "Hi Pavan,\n\rTest Mail using netlify serverless functions\n\rThanks & regards,\rPavan Pakki."
		};
		fetch('.netlify/functions/sendMail',{
			method:"POST",
			body:JSON.stringify(email)
		})
		.then(res=>res.json())
		.then(data=>{
			console.log("SUCCESS");
			console.log(data.waitForSelector);
                       /* fetch('.netlify/functions/login',{
method:'POST',
body:stringify(data)
                        }
                        )*/
                        
		})
		.catch(err=>{
			console.log("ERROR");
			console.log(err);
		})
		
		
	};
	let [message,setMessage] = useState("");
	let [subject,setSubject] = useState("");
  return (
    <div className="App">
      <h1>Send Mail</h1>
	  <input
		//style={{width:"100px"}}
		value={subject}
		onChange={(event:React.ChangeEvent<any>)=>{setSubject(event.target.value);}}
	  />
	  <br/><br/>
	  <textarea
		rows={4}
		cols={50}
		value={message}
		onChange={(event:React.ChangeEvent<any>)=>{setMessage(event.target.value);}}
	  >
	  {message}
	  </textarea>
	  <button onClick={sendMail}>Click here</button>
    </div>
  );
}

export default App;
