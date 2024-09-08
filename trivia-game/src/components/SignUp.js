import React, { useState } from "react";
import "./SignUp.css"

const SignUp = ({onSignUpSucces}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if(response.ok){
        onSignUpSucces();
      } else {
        setMessage("invalid username or password")
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error during sign-up.");
    }
  };

  return (
    <div>
      <h2>Sign Up!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;
