import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, ToastAndroid } from 'react-native';
import { COLORS, SHADOWS } from '../constants/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { SetUserData } from '../GlobalState/UserSlice';
import { Feather } from '@expo/vector-icons';
import { RH, RW } from '../components/Responsive';


// export const API = axios.create({ baseURL: 'https://e3ac-2407-d000-503-e0ce-bcd5-ff72-8531-e2a.ngrok-free.app' });
export const API = axios.create({ baseURL: 'http://172.16.112.112:7000' });

const Login = ({ navigation }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState('');

    const logIn = async () => {
        if (phone == '' || password == '') {
            return;
        } else {
            // api call
            setLoading(true)
            try {
                const res = await API.post('/api/v1/auth/signin', { phone, password });
                await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
                await AsyncStorage.setItem('wssc', JSON.stringify(res.data.WSSC));
                await AsyncStorage.setItem('token', JSON.stringify(res.data.token));
                dispatch(SetUserData({ user: res.data.user, wssc: res.data.WSSC, token: res.data.token }))
                setLoading(false);
                ToastAndroid.showWithGravity(
                    'Welcome to the app 🎉',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );


            } catch (error) {
                // Alert.alert('Success', `${error}`);
                setLoading(false)
                if (error.response) {
                    // ToastAndroid.showWithGravity(
                    //     `${error}`,
                    //     ToastAndroid.SHORT,
                    //     ToastAndroid.CENTER,
                    // );

                    if (error.response.status == 404) {
                        ToastAndroid.showWithGravity(
                            'User not found 😔',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );
                    } else if (error.response.status == 400) {
                        ToastAndroid.showWithGravity(
                            'Incorrect phone or password',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );
                    } else {
                        ToastAndroid.showWithGravity(
                            'Something went wrong 😟',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );
                    }
                }
            }


        }
    }

    return (
        <View style={Styles.container}>
        <View style={Styles.innerContainer}>
            <View style={Styles.logoContainer}>
            <Image
                style={Styles.logo}
                source={require('../../assets/Logo.png')}
            />
            </View>
            <View style={Styles.title}>
            <Text style={Styles.titleText}>Your Voice, Our Commitment</Text>
            </View>

            <View style={Styles.form}>
                <View style={Styles.formInput}>
                <TextInput style={Styles.input} placeholder='Mobile Number | فون نمبر' keyboardType='number-pad' onChangeText={(value) => setPhone(value)} />
                </View>
                <View style={Styles.formInput}>
                <TextInput style={Styles.input} placeholder='Enter Password | پاس ورڈ درج کریں' keyboardType='ascii-capable' onChangeText={(value) => setPassword(value)} secureTextEntry />
                </View>
            </View>

            <TouchableOpacity style={Styles.submitButton} onPress={logIn}>
                {
                    !loading ? <Text style={Styles.buttonText} >Login</Text> : <Feather style={Styles.icon} name="loader" size={28} color='#fff' />
                }
            </TouchableOpacity>
            <View style={Styles.additionalText}>
                <Text style={Styles.additionalTextText}>Create an account{' '} <Text
              style={Styles.clickableText}
              onPress={() => navigation.navigate('SignUp')}>
              Click here
            </Text>
          </Text>
          <Text style={Styles.additionalTextText}>ہمارے ساتھ رجسٹر کریں</Text>
            </View>
        </View>
        </View>
    )
}

const Styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: RW(85),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: RW(10), // Updated width using RW
    height: RW(10), // Updated height using RW
  },
  title: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  formInput: {
    position: 'relative',
    marginTop: 10,
    marginBottom: 15,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    fontSize: 16,
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#cbd5e0',
    width: '100%',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#4299e1',
    borderRadius: 5,
    paddingVertical: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  additionalText: {
    marginTop: 20,
    alignItems: 'center',
  },
  additionalTextText: {
    fontSize: 14,
    color: '#4a5568',
    textAlign: 'center',
  },
  clickableText: {
    color: '#4299e1',
    textDecorationLine: 'underline',
  },
});


export default Login