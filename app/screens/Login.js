import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, ToastAndroid } from 'react-native';
import { COLORS, SHADOWS } from '../constants/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { SetUserData } from '../GlobalState/UserSlice';
import { Feather } from '@expo/vector-icons';


// export const API = axios.create({ baseURL: 'https://e3ac-2407-d000-503-e0ce-bcd5-ff72-8531-e2a.ngrok-free.app' });
export const API = axios.create({ baseURL: 'http://172.16.114.21:7000' });

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
            <Image
                style={Styles.logo}
                source={require('../../assets/Logo.png')}
            />
            <Text>Your Voice, Our Commitment</Text>
            <View style={Styles.form}>
                <TextInput style={Styles.input} placeholder='Mobile Number | فون نمبر' keyboardType='number-pad' onChangeText={(value) => setPhone(value)} />
                <TextInput style={Styles.input} placeholder='Enter Password | پاس ورڈ درج کریں' keyboardType='ascii-capable' onChangeText={(value) => setPassword(value)} secureTextEntry />

            </View>
            <TouchableOpacity style={Styles.btn} onPress={logIn}>
                {
                    !loading ? <Text style={Styles.btnText} >Login</Text> : <Feather style={Styles.icon} name="loader" size={28} color='#fff' />
                }
            </TouchableOpacity>
            <View style={Styles.linkContainer}>
                <Text>Already have an account?</Text>
                <Text style={Styles.link} onPress={() => navigation.navigate("SignUp")}> Sign Up</Text>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 12,
        gap: 24,
    },
    logo: {
        height: 150,
        width: 150,
    },
    form: {
        width: '100%',
        gap: 10,
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        fontSize: 18,
        borderRadius: 8,
        ...SHADOWS.small,
    },
    btn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '500',
        textTransform: 'uppercase',
    },
    linkContainer: {
        flexDirection: 'row',
        gap: 4,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },

})

export default Login