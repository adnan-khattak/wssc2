import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../../Firebase';
import { user } from '../../style/styles';

import { createUserWithEmailAndPassword } from 'firebase/auth';
const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then(userCredential => {
        console.log('Signed Up Successfully');
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('signin');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    // Handle the sign-up logic here
    console.log('Signing up with:', email, password);
  };

  return (
    <View style={user.container}>
      <Text style={user.title}>Sign Up</Text>

      <TextInput
        style={user.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={user.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={user.button} onPress={handleSignUp}>
        <Text style={user.buttonText}>Sign Up</Text>
        {/* //adnan530@gmail.com addi3214 & adnan0@gmail.com kamranbhai */}
      </TouchableOpacity> 
    </View>
  );
};


export default SignUp;
