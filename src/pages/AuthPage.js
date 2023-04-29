import { useState } from "react";

import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LogInForm";
import Logo from "../components/Logo";

function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className="AuthPage">
      {showLogin ? (
        <>
          <div className="left-login">
            <Logo />
            <p>Description here</p>
          </div>
          <div className="right-login">
            <LoginForm setUser={setUser} setShowLogin={setShowLogin}/>
            <button type="button" onClick={() => setShowLogin(false)}>Create New Account</button>
          </div>
        </>
      ) : (
        <>
          <SignUpForm setUser={setUser} setShowLogin={setShowLogin}/>
          <button type="button" onClick={() => setShowLogin(true)}>Create New Account</button>
        </>
      )}
    </main>
  );
}

export default AuthPage;
