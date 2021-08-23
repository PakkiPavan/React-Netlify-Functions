import React,{useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	useEffect(()=>{
		fetch('.netlify/functions/getData')
		.then(res=>res.json())
		.then(data=>{
			console.log(data);
		});
	},[]);
  return (
    <div className="App">
      React with TypeScript
    </div>
  );
}

export default App;
