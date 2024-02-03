import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useForm, Controller} from 'react-hook-form';
import { useAuth, AuthContext } from '../context/Authentication/AuthProvider';
import { signupUser } from '../services/citizen/signUpApi';
import {user, welcome} from '../../style/styles';

const SignUp = ({navigation}) => {
  const [value, setValue] = useState(null);
  // const {signup, loading} = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      WSSC_CODE: '',
      password: '',
    },
  });
  const password1 = watch('password', '');

  const resdata = [
    { value: 'wsscp25001', label: 'Peshawer'},
    { value: 'wssca22020', label: 'Abbottabad'},
    { value: 'wsscs19200', label: 'Swat'},
    { value: 'wssck026010', label: 'Kohat'},
    { value: 'wsscm23200', label: 'Mardan'},
    { value: 'wsscabannu', label: 'Bannu'},
  ];

  const onSubmit = async (data) => {
    // delete data.confirmPassword;
    // const formData = { ...data, WSSC_CODE: value };
    // console.log("FormData", formData);
    // await signup(formData);
    // if (!loading) {
    //   navigation.navigate('signin');
    // }
  };

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
              name="name"
            />
            {errors.name && <Text>This is required.</Text>}
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
                  ype="numeric"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  // value={value}
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
                required: 'Password is required',
                minLength: {
                  value: 6,
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
            {errors.confirmPassword && (
              <Text>{errors.confirmPassword.message}</Text>
            )}

            {/* <TouchableOpacity onPress={() => set WSSC_CODE(! WSSC_CODE)} style={user.iconContainer}>
               <Ionicons name={ WSSC_CODE ? 'eye' : 'eye-off'} size={20} color="gray" /> 
            </TouchableOpacity>  */}
          </View>
          {/* Residential Area */}
          <View>
          <Dropdown
            data={resdata}
            value={value}
            name="WSSC_CODE"
            labelField="label"
            valueField="value"
            placeholder="Residential Area"
            onChange={(item) => {
              setValue(item.value);
            }}
          />
          </View>

          <TouchableOpacity
            style={user.submitButton}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}>
            <Text style={user.buttonText}>
              {!loading ? 'SIGN UP | سائن اپ' : 'Signing Up...'}
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
          <Text style={user.additionalTextText}>ہمارے ساتھ رجسٹر کریں</Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default SignUp;