import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const LogInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      const user = userCredential.user
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message
      setError(errorMessage)
    })
    navigate('/')
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleLogIn}>
          Login.
        </button>
      </form>
    </div>
  );
};

export default LogInForm