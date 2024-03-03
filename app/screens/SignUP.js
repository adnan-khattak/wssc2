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
            <Image
                style={Styles.logo}
                source={require('../../assets/Logo.png')}
            />
            <Text>Your Voice, Our Commitment</Text>
            <View style={Styles.form}>
                <TextInput style={Styles.input} placeholder='User Name | صارف نام' keyboardType='name-phone-pad' onChangeText={(value) => setName(value)} />
                <TextInput style={Styles.input} placeholder='Mobile Number | فون نمبر' keyboardType='number-pad' onChangeText={(value) => setPhone(value)} />
                <TextInput style={Styles.input} placeholder='Create Password | پاس ورڈ بنائیں' keyboardType='ascii-capable' onChangeText={(value) => setPassword(value)} secureTextEntry />
                <TextInput style={Styles.input} placeholder='Confirm Password | تصدیق کریں ' keyboardType='ascii-capable' onChangeText={(value) => setConfirmPass(value)} secureTextEntry />
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

            </View>
            <TouchableOpacity style={Styles.btn} onPress={signUp}>
                {
                    !loading ? <Text style={Styles.btnText} >Sign Up</Text> : <Feather style={Styles.icon} name="loader" size={28} color='#fff' />
                }
            </TouchableOpacity>
            <View style={Styles.linkContainer}>
                <Text>Already have an account?</Text>
                <Text style={Styles.link} onPress={() => navigation.navigate("Login")}>Login</Text>
            </View>
            {/* <OtpModal confirm={confirm} setConfirm={setConfirm} isModal={isModal} setIsModal={setIsModal} phone={phone} /> */}
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
    dropdown: {
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "#fff",
        ...SHADOWS.small,
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