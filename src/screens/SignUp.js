import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { user } from '../../style/styles';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
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
