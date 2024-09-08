import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(null);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const showSignIn =()=>{
    setShowSignInForm(true);
  }
  const showSignUp = ()=>{
    setShowSignInForm(false)
  }

  return (
    <div className="App">
      <Header />
      {isSignedIn ? 
      (<Game />  
      ): (
      <div>
        {!showSignInForm && showSignInForm !==false ? (
          <div>
            <button onClick={showSignIn}>Sign In</button>
            <button onClick={showSignUp}>Sign up</button>
          </div>
        ):(
          <div>
            {showSignInForm?(
              <SignIn onLoginSucces={handleSignIn}/>
            ):(
              <SignUp onSignUpSucces={showSignIn}/>
            )}
          </div>
        )}
      </div>
    )}
    </div>
  );
}

export default App;
