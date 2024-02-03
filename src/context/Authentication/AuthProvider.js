import React, { useState} from 'react';
import { loginUser } from '../../services/citizen/signInApi';// import your loginUser function
import AuthContext from './authContext';

export const AuthProvider = ({ children }) => {
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);

  const login = (data) => {
    console.log("I am in Context now, My name is Login")
    setLoading(true);
    loginUser(data)
      .then(data => {
        setCount(data.count); // assuming your API returns a user object
        console.log("Signin successful:", data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Signin error", error);
        setLoading(false);
      });
  };
  

  return (
    <AuthContext.Provider value={{ count: count,loading: loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};
