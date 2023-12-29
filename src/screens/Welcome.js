// WelcomeScreen.js
import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { welcome } from '../../style/styles';

const Welcome = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Set a timeout to navigate to the signin page after 5 seconds
    const timeoutId = setTimeout(() => {
      navigation.navigate('signin'); // Replace 'SignIn' with the name of your signin screen
    }, 5000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <View style={welcome.container}>
      {/* Background image */}
      <Image source={require('../../assets/images/leaves.jpg')} style={welcome.backgroundImage} />

      <View style={welcome.contentContainer}>
      <Text style={welcome.appName}>Welcome To Community Cleanup App</Text>
        {/* <Image source={require('../../assets/images/leaves.jpg')} style={welcome.logo} /> */}
      </View>
    </View>
  );
};


export default Welcome;
