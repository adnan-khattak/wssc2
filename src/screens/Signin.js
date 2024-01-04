import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView,StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
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
  const onSubmit = (data) => {       
 const url =
 'http://localhost:7000/api/v1/auth/signin'; // Replace with your API endpoint
const options = {
 method: 'POST',
 headers: {
   'Content-Type': 'application/json', // Set the content type according to your API requirements
   // Add any other headers if needed
 },
 body: JSON.stringify(data),
};

    console.log('Form Data:', data);
    setLoading(true);
    fetch(url, options)
      .then(response => {
        console.log(response);
        console.log(response);
        if (!response.ok) {
          console.log(response.status);
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON from the response
      })
      .then(result => {
        // Handle the result of the request
        console.log('POST request succeeded with JSON response:', result);
      })
      .catch(error => {
        // Handle errors during the request
        console.error('There was a problem with the POST request:', error);
      });
    setTimeout(() => {
    setLoading(false);
    // navigation.navigate('signin');
    }, 3000); 
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
