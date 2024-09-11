import React, { useState } from "react";
import "./SignUp.css";

const europeanCountries = [
  "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Bosnia and Herzegovina",
  "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland",
  "France", "Germany", "Georgia", "Greece", "Hungary", "Ireland", "Iceland", "Italy", "Kosovo",
  "Latvia", "Lithuania", "Liechtenstein", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro",
  "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino",
  "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom", "Vatican"
];

const SignUp = ({ onSignUpSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Trim inputs
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setMessage("Username and Password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: trimmedUsername, password: trimmedPassword, age, country }),
      });

      if (response.ok) {
        const data = await response.json();
        onSignUpSuccess();
        setMessage(data.message || "Sign-up successful!");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Invalid username or password.");
      }
    } catch (error) {
      setMessage("Error during sign-up. Please try again.");
    }
  };

  return (
    <div className="signup-form">
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
        <select value={age} onChange={(e) => setAge(e.target.value)} required>
          <option value="">Select Age</option>
          {Array.from({ length: 11 }, (_, i) => i + 6).map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
        <select value={country} onChange={(e) => setCountry(e.target.value)} required>
          <option value="">Select Country</option>
          {europeanCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;
