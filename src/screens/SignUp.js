import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {user, welcome} from '../../style/styles';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    // Handle the sign-up logic here
    console.log('Signing up with:',name,  phoneNumber, password);
  };

  return (
    <View style={user.container}>
       {/* <Image source={require('../../assets/images/leaves.jpg')} style={welcome.logo} /> */}
      <Text style={user.title}>Sign Up</Text>

      <TextInput
        style={user.input}
        placeholder="Enter Your Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={user.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />

      <View style={user.passwordContainer}>
        <TextInput
          style={user.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        {/* <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="gray" />
        </TouchableOpacity> */}
      </View>

      <TouchableOpacity style={user.button} onPress={handleSignUp}>
        <Text style={user.ButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={user.signUpLink}>
        Already have an account?{' '}
        <Text
          style={user.clickHere}
          onPress={() => navigation.navigate('signin')}>
          Click here
        </Text>
      </Text>
    </View>
  );
};

export default SignUp;
