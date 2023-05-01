import { useState } from "react";

import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LogInForm";
import Logo from "../components/Logo";
import './AuthPage.css';

function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className="AuthPage">
      {showLogin ? (
        <div className="flex-container">
          <div className="left-login">
            <Logo />
            <p>Description here</p>
          </div>
          <div className="right-login">
            <LoginForm setUser={setUser} showLogin={showLogin} setShowLogin={setShowLogin}/>
          </div>
        </div>
      ) : (
        <>
          <SignUpForm setUser={setUser} showLogin={showLogin} setShowLogin={setShowLogin}/>
        </>
      )}
    </main>
  );
}

export default AuthPage;