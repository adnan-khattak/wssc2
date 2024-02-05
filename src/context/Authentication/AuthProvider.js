import React, { useState} from 'react';
import { loginUser } from '../../services/citizen/signInApi';// import your loginUser function
import { signupUser } from '../../services/citizen/signUpApi';
import AuthContext from './authContext';

export const AuthProvider = ({ children }) => {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = async (data) => {
    console.log('form Data:',data);
    setLoading(true);
    try {
      const userData = await signupUser(data);
      setCount(userData);
      console.log("signup sucess: ", userData);
      setLoading(false);
      return true; // signup was successful
    } catch (error) {
      console.error(error);
      setLoading(false);
      return false; // signup failed
    }
  };

  const login = async (data) => {
    setLoading(true);
    try {
      const userData = await loginUser(data);
      setCount(userData); // assuming your API returns a user object
      console.log("Signin successful:", userData);
      setLoading(false);
      return true; // login was successful
    } catch (error) {
      console.error("Signin error", error);
      setLoading(false);
      return false; // login failed
    }
  };
  
  
  return (
    <AuthContext.Provider value={{count: count, loading: loading,login, signup}}>
    {children}
  </AuthContext.Provider>
  
  );
};
