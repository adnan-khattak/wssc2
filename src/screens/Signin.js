import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView,StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { signInUser } from '../services/citizen/signInApi';
import HomeScreen from './HomeScreen';
import { user } from '../../style/styles';


const Signin = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      phone: "",
      password: "",
    },
  }) 
  const onSubmit = async (data) => {       
 

    console.log('Form Data:', data);
    try{
    setLoading(true);
    const response = await signInUser(data);
    console.log("Signin Suncessful",response);
    navigation.navigate('home');
  }catch(error){
console.error("signin error",error);
  }finally{
    setTimeout(() => {
    setLoading(false);
    }, 3000); 
  }
}
  return (
    <ScrollView contentContainerStyle={user.container}>
      <View style={user.innerContainer}>
        <View style={user.logoContainer}>
          {/* <Image source={logo} style={user.logo} /> */}
          <View style={user.title}>
            <Text style={user.titleText}>آپ کی آواز، ہمارا عزم</Text>
            <Text style={user.titleText}>Your Voice, Our Commitment</Text>
          </View>
        </View>
        <View style={user.form}>
          <View style={user.formInput}>
      <Controller
              control={control}
              rules={{
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{11}$/, // Example pattern for a 10-digit phone number
                  message: 'Invalid phone number',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
      <TextInput
        style={user.input}
        placeholder="Phone Number"
        keyboardType="numeric"
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
      />
      )}
      name="phone"
    />
    {errors.phone && <Text>{errors.phone.message}</Text>}
    </View>
    

<View style={user.formInput}>
<Controller
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 8 characters long",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={user.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={value}
          onBlur={onBlur}
          onChangeText={onChange}
        /> )}
        name="password"
      />
      {errors.password && <Text>{errors.password.message}</Text>}
        {/* <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="gray" />
        </TouchableOpacity> */}
      </View>
      


      <TouchableOpacity style={user.submitButton} onPress={handleSubmit(onSubmit)}>
        <Text style={user.buttonText}>Sign In</Text>
      </TouchableOpacity>
      </View>

      <View style={user.additionalText}>
      <Text style={user.additionalTextText}>
          Don't have an account?{' '}
  <Text style={user.clickableText} onPress={() => navigation.navigate('signup')}>
    Click here
  </Text>
</Text>
<Text style={user.additionalTextText}>
            کیا آپ پہلے ہی رجسٹرڈ ہیں؟
          </Text>
</View>
    </View>
    </ScrollView>
  );
};


export default Signin;
