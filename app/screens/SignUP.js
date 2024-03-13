import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesome6 } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants/theme';
import { Feather } from '@expo/vector-icons';
import { API } from './Login';
import OtpModal from '../components/OtpModal';

const SignUP = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isFocus, setIsFocus] = useState();
    const [WSSC_CODE, setWSSC] = useState('');
    const [loading, setLoading] = useState(false);
    // const [isModal, setIsModal] = useState(false);
    // const [confirm, setConfirm] = useState();

    const data = [
        { label: 'Peshawar', value: 'wsscp25001' },
        { label: 'Mardan', value: 'wsscm23200' },
        { label: 'Kohat', value: 'wssck026010' },
        { label: 'Swat', value: 'wsscs19200' },
        { label: 'Abbottabad', value: 'wssca22020' },
    ];

    const signUp = async () => {
        setLoading(true)
        if (name == '' || phone == '' || password == '' || confirmPass == '' || WSSC_CODE == '') {
            ToastAndroid.showWithGravity(
                'Please provide all the information',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            setLoading(false)
            return;
        } else if (password !== confirmPass) {
            ToastAndroid.showWithGravity(
                'Passwords does not match',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            setLoading(false)
        } else {
            // api call
            // setIsModal(true)

            // if (confirm === true) {
            try {
                const res = await API.post('/api/v1/auth/signup', { name, phone, password, WSSC_CODE });

                setLoading(false)

                ToastAndroid.showWithGravity(
                    'Account created 🎉, Please login to continue',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                navigation.navigate("Login");
            } catch (error) {
                setLoading(false)
                ToastAndroid.showWithGravity(
                    'Something went wrong!',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
            //     ToastAndroid.showWithGravity(
            //         'OTP Verified',
            //         ToastAndroid.SHORT,
            //         ToastAndroid.CENTER,
            //     );
            // } else {
            //     setLoading(false);
            //     ToastAndroid.showWithGravity(
            //         'Wrong OTP, please enter again',
            //         ToastAndroid.SHORT,
            //         ToastAndroid.CENTER,
            //     );
            // }
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
            <Text style={Styles.titleText}>آپ کی آواز، ہمارا عزم</Text>
            <Text style={Styles.titleText}>Your Voice, Our Commitment</Text>
          </View>
            <View style={Styles.form}>
                <View style={Styles.formInput}>
                <TextInput style={Styles.input} placeholder='User Name | صارف نام' keyboardType='name-phone-pad' onChangeText={(value) => setName(value)} />
                </View>
                <View style={Styles.formInput}>
                <TextInput style={Styles.input} placeholder='Mobile Number | فون نمبر' keyboardType='number-pad' onChangeText={(value) => setPhone(value)} />
                </View>
                <View style={Styles.formInput}>
                <TextInput style={Styles.input} placeholder='Create Password | پاس ورڈ بنائیں' keyboardType='ascii-capable' onChangeText={(value) => setPassword(value)} secureTextEntry />
                </View>
                <View style={Styles.formInput}>
                <TextInput style={Styles.input} placeholder='Confirm Password | تصدیق کریں ' keyboardType='ascii-capable' onChangeText={(value) => setConfirmPass(value)} secureTextEntry />
                </View>
               
               
                
                <Dropdown
                    style={[Styles.dropdown, isFocus && { borderColor: COLORS.primary }]}
                    placeholderStyle={Styles.placeholderStyle}
                    selectedTextStyle={Styles.selectedTextStyle}
                    inputSearchStyle={Styles.inputSearchStyle}
                    iconStyle={Styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={WSSC_CODE}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setWSSC(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <FontAwesome6
                            style={Styles.icon}
                            color={isFocus ? COLORS.primary : 'black'}
                            name="map"
                            size={20}
                        />
                    )}
                />

            
            <TouchableOpacity style={Styles.submitButton} onPress={signUp}>
                {
                    !loading ? <Text style={Styles.buttonText} >Sign Up</Text> : <Feather style={Styles.icon} name="loader" size={28} color='#fff' />
                }
            </TouchableOpacity>
            </View>
            <View style={Styles.additionalText}>
                <Text style={Styles.additionalTextText}>Already have an account?{' '} <Text
              style={Styles.clickableText}
              onPress={() => navigation.navigate('Login')}>
              Click here
            </Text>
          </Text>
          {/* <Text style={Styles.additionalTextText}>ہمارے ساتھ رجسٹر کریں</Text> */}
            </View>
            {/* <OtpModal confirm={confirm} setConfirm={setConfirm} isModal={isModal} setIsModal={setIsModal} phone={phone} /> */}
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
        width: '85%',
      },logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      },
      logo: {
        width: 44,
        height: 44,
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
    
        passwordContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          marginBottom: 15,
        },  
        iconContainer: {
          position: 'absolute',
          right: 10,
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
        icon: {
            marginRight: 5,
        },
        label: {
            position: 'absolute',
            backgroundColor: 'white',
            left: 22,
            top: 8,
            zIndex: 999,
            paddingHorizontal: 8,
            fontSize: 14,
        },
        placeholderStyle: {
            fontSize: 16,
        },
        selectedTextStyle: {
            fontSize: 16,
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 16,
        },

})

export default SignUP