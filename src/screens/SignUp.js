import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {user, welcome} from '../../style/styles';

const SignUp = ({navigation}) => {
  const [pending, setPending] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      userName: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });
  const password1 = watch('password', '');

  const onSubmit = data => {
    console.log('Form Data:', data);
    setPending(true);
    setTimeout(() => {
      setPending(false);
      navigation.navigate('signin');
    }, 3000);
  };

  // const handleSignUp = () => {
  //   // Handle the sign-up logic here
  //   console.log('Signing up with:',name,  phoneNumber, password);
  // };

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
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={user.input}
                  placeholder="User Name | صارف نام"
                  placeholderTextColor="#a0aec0"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="userName"
            />
            {errors.userName && <Text>This is required.</Text>}
          </View>

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
                  placeholder="Mobile Number | فون نمبر"
                  placeholderTextColor="#a0aec0"
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="phoneNumber"
            />
            {errors.phoneNumber && <Text>{errors.phoneNumber.message}</Text>}
          </View>

          <View style={user.formInput}>
            <Controller
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={user.input}
                  placeholder="Create Password | پاس ورڈ بنائیں"
                  placeholderTextColor="#a0aec0"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            {errors.password && <Text>{errors.password.message}</Text>}
            {/* <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={user.iconContainer}>
              <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={20} color="gray" /> 
             </TouchableOpacity>  */}
          </View>

          <View style={user.formInput}>
            <Controller
              control={control}
              rules={{
                required: 'Confirm password is required',
                validate: value =>
                  value === password1 || 'Passwords do not match',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={user.input}
                  placeholder="Confirm Password | تصدیق کریں"
                  placeholderTextColor="#a0aec0"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && ( <Text>{errors.confirmPassword.message}</Text>
            )}

            {/* <TouchableOpacity onPress={() => setConfirmPassword(!confirmPassword)} style={user.iconContainer}>
               <Ionicons name={confirmPassword ? 'eye' : 'eye-off'} size={20} color="gray" /> 
            </TouchableOpacity>  */}
          </View>
          <TouchableOpacity
            style={user.submitButton}
            onPress={handleSubmit(onSubmit)}
            disabled={pending}>
            <Text style={user.buttonText}>
              {!pending ? 'SIGN UP | سائن اپ' : 'Signing Up...'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={user.additionalText}>
          <Text style={user.additionalTextText}>
            Already Registered?{' '}
            <Text
              style={user.clickableText}
              onPress={() => navigation.navigate('signin')}>
              Click here
            </Text>
          </Text>
          <Text style={user.additionalTextText}>
          ہمارے ساتھ رجسٹر کریں
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
