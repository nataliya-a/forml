import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

export default function App() {
  const [passcode, setPasscode] = useState("");
  const [response, setResponse] = useState("");
  const submit = () => {
    console.log("Passcode: ", passcode);
    console.log("Submit button clicked");


    fetch('http://127.0.0.1:5000/api/crack_safe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "actual_combination": passcode })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setResponse(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }

  useEffect(() => {
    console.log(response);
  }
  , [response]);



  return (
    // center 
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <div className = "bg-fuchsia-200 backdrop-blur-sm text-white font-bold rounded-lg border  p-10 w-[80vw] h-[50vh]">
        <h1 className="text-4xl text-black">Enter Passcode:</h1>
        <input className="border-2 text-black border-black rounded-lg p-2" type="text" value={passcode} onChange={(e) => setPasscode(e.target.value)} />
        <button className="bg-blue-500 text-white rounded-lg p-2" type="submit" onClick={submit}
        >Submit</button>
      </div>
      { response && <div className="bg-fuchsia-200 backdrop-blur-sm text-white font-bold rounded-lg border p-10 w-[80vw] h-[50vh]">
        <h1 className="text-4xl text-black">Time taken to crack {passcode}</h1>
        <p className="text-2xl text-black">{response.attempts}</p>
        <p className="text-2xl text-black">{response.time_taken}</p>
      </div>
      }
     
    </div>
  );
}

// export default App;
