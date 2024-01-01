import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { user } from '../../style/styles';


const Signin = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    // Add your sign-in logic here
    console.log('Sign In:', { phoneNumber, password });
  };

  return (
    <View style={user.container}>
      <Text style={user.title}>Sign In</Text>

      <TextInput
        style={user.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />

<View style={user.passwordContainer}>
        <TextInput
          style={user.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {/* <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="gray" />
        </TouchableOpacity> */}
      </View>


      <TouchableOpacity style={user.button} onPress={handleSignIn}>
        <Text style={user.ButtonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={user.signUpLink}>
          Don't have an account?{' '}
  <Text style={user.clickHere} onPress={() => navigation.navigate('signup')}>
    Click here
  </Text>
</Text>

    </View>
  );
};


export default Signin;
