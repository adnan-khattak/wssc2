import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'





const OtpModal = ({ isModal, setIsModal, confirm, setConfirm, phone }) => {
    return (
        <Modal visible={isModal} onRequestClose={setIsModal} animationType='fade' transparent>
            <View style={Styles.overlay}>
                <View style={Styles.container}>
                    <MaterialIcons name='verified-user' size={72} color={COLORS.primary} />
                    <Text style={Styles.heading}>Enter OTP Code</Text>
                    <View style={Styles.inputContainer}>
                        <TextInput maxLength={1} style={Styles.input} />
                        <TextInput maxLength={1} style={Styles.input} />
                        <TextInput maxLength={1} style={Styles.input} />
                        <TextInput maxLength={1} style={Styles.input} />
                    </View>
                    <TouchableOpacity style={Styles.btn} onPress={() => setIsModal(false)}>
                        <Text style={Styles.btnText} >Verify</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const Styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        backgroundColor: '#fff',
        padding: 22,
        borderRadius: 20,
        width: '70%',
        gap: 20,
        alignItems: 'center'
    },
    heading: {
        fontSize: SIZES.medium,
        fontWeight: '700'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 8,
        width: 45,
        height: 45,
        fontSize: 35,
        textAlign: 'center'
    },
    btn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 8,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        textTransform: 'uppercase',
    },
})

export default OtpModal