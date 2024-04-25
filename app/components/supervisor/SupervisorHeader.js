import { useState } from 'react'
import { View, Text, StyleSheet, Image, ToastAndroid, TouchableOpacity } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'
import { COLORS, SIZES, SHADOWS } from '../../constants/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { LogOut } from '../../GlobalState/SupervisorSlice'
import { FontAwesome } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


const SupervisorHeader = () => {
    const dispatch = useDispatch()
    const { WSSC, supervisor } = useSelector((state) => state.supervisor)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigation = useNavigation()

    const logOut = () => {
        AsyncStorage.removeItem('supervisor');
        AsyncStorage.removeItem('swssc');
        AsyncStorage.removeItem('stoken');
        dispatch(LogOut())
        setIsMenuOpen(false)

        ToastAndroid.showWithGravity(
            'Logged out successfully',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    }
    return (
        supervisor && WSSC && <SafeAreaView style={Styles.container}>
            <View style={Styles.iconContainer}>
                <Image style={Styles.img} source={require('../../../assets/Logo.png')} />
                <Text style={Styles.logoName}>{WSSC.shortname}</Text>
            </View>
            <View style={Styles.iconContainer}>
                <FontAwesome6 name="bell" size={25} color={COLORS.feedbackColor} />
                <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
                    {
                        supervisor.profile_image ? <Image style={Styles.img} source={{ uri: supervisor.profile_image }} /> : <FontAwesome name='user-circle' size={35} color={COLORS.primary} />
                    }
                </TouchableOpacity>
            </View>
            {isMenuOpen && <Animatable.View animation="fadeIn" duration={500} style={Styles.menu}>
                <View style={Styles.profile}>
                    <Image source={supervisor.profile_image ? { uri: supervisor.profile_image } : require('../../../assets/Logo.png')} style={Styles.imgProfile} />
                    <Text style={Styles.name}>{supervisor.name}</Text>
                </View>
                <TouchableOpacity style={Styles.items} onPress={() => {
                    navigation.navigate("supervisorProfile");
                    setIsMenuOpen(false)
                }}>
                    <Feather name='settings' size={20} color={COLORS.primary} />
                    <Text style={Styles.item}>Settings</Text>
                </TouchableOpacity>
                <Text style={Styles.logout} onPress={() => {
                    setIsMenuOpen(false)
                    logOut();
                }}>Logout</Text>
            </Animatable.View>}
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        backgroundColor: "#fff",
        paddingRight: 12,
        paddingLeft: 12,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
        position: 'relative'
    },
    logoName: {
        fontSize: SIZES.large,
        fontWeight: '500'
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    img: {
        height: 35,
        width: 35,
        borderRadius: 30,
    },
    imgProfile: {
        height: 25,
        width: 25,
        borderRadius: 30,
    },
    menu: {
        position: 'absolute',
        padding: 14,
        backgroundColor: '#fff',
        borderRadius: 10,
        top: 80,
        right: 12,
        gap: 12,
        width: 180,
        ...SHADOWS.medium
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10

    },
    items: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingBottom: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    name: {
        fontSize: SIZES.medium,
        fontWeight: '500'

    },
    item: {
        fontSize: SIZES.medium,
    },
    logout: {
        color: '#fff',
        backgroundColor: COLORS.closedColor,
        width: 'fit-content',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 10,
        width: 65,
    }
})

export default SupervisorHeader