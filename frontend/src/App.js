import { useState } from "react";

export default function App() {
  const [passcode, setPasscode] = useState("");
  const [response, setResponse] = useState("");
  const submit = () => {
    if (passcode.length < 10) {
      alert("Passcode must be 10 digits long");
      return;
    }
    fetch("http://127.0.0.1:5000/api/crack_safe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ actual_combination: passcode }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setResponse(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-fuchsia-200 backdrop-blur-sm text-white font-bold rounded-xl p-10  flex flex-col justify-center items-center gap-2 border-2 border-black border-b-4 border-r-4">
        <h1 className="text-4xl text-black">Enter Passcode:</h1>
        <div>
          <input
            className="border-2 text-black border-black rounded-lg p-2 mr-2"
            type="number"
            value={passcode}
            onChange={(e) => {
              if (e.target.value.length > 10) return;
              setPasscode(e.target.value);
            }}
          />
          <button
            className="bg-black text-white rounded-lg p-2 hover:opacity-50"
            type="submit"
            onClick={submit}
          >
            Submit
          </button>
        </div>

        {response && (
          <>
            <p className="text-2xl text-black">
              Attempts taken: {response.attempts}
            </p>
            <p className="text-2xl text-black">
              Total Runtime: {Math.round(response.time_taken * 100000) / 100000}{" "}
              seconds
            </p>
          </>
        )}
      </div>
    </div>
  );
}
