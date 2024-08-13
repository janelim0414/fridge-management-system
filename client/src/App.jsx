import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "./Firebase.js";
import axios from 'axios';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

function App() {
  const [user, setUser] = useState('');

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      const name = result.user.displayName;

      // Check if existing user
      const getResult = await getUser(email);
      console.log(getResult);
      // If user exists, set it; otherwise, create a new user
      getResult ? setUser(getResult) : createUser(email, name);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  async function getUser(email) {
    try {
      const res = await axios.get(`http://localhost:4000/login/${email}`);
      return res.data[0];
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  function createUser(email, name) {
    const newUser = {
      email: email,
      name: name
    };

    axios
    .post('http://localhost:4000/login', newUser)
    .then((res) => {
      setUser(newUser);
    })
    .catch((e) => {
      console.error(e);
    })
  }

  return (
    <div>
      <Header user={user} setUser={setUser}/>
      <div className="text-center pt-20">
        <h1 className="text-4xl pb-3">
          What's in my fridge?
        </h1>
        <p className="italic">
          Inventory manage system that rescues your rotting ingredients from the fridge, with a touch of AI
        </p>
      </div>
      {user ? 
      <Main user={user}/> : 
      <div className="text-center my-10">
      <button className="text-white bg-orange-400 rounded-xl w-38 h-10 px-3" onClick={signIn}> Sign in with Google </button>
      </div>}
      <Footer/>
    </div>
    
  );
}

export default App;
