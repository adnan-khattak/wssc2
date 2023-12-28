import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../../Firebase';
import { user } from '../../style/styles';

import { signInWithEmailAndPassword } from 'firebase/auth';
const Signin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = () => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then(userCredential => {
        console.log('Signed in Successfully');
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('home');

      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    // Handle the sign-up logic here
    console.log('Signing in with:', email, password);
  };

  return (
    <View style={user.container}>
      <Text style={user.title}>Sign In</Text>

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

      <TouchableOpacity style={user.button} onPress={handleSignin}>
        <Text style={user.buttonText}>Sign In</Text>
        {/* // adnan530@gmail.com addi3214 & adnan0@gmail.com kamranbhai addi12@gmail.com 12345612*/}
      </TouchableOpacity> 
    </View>
  );
};


export default Signin;
