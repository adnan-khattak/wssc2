import React from 'react'
import { Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import { SHADOWS } from '../constants/theme'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');
const itemWidth = (width - 30) / 2;

const ComplaintTypeItem = ({ complaintType, index }) => {
    const navigation = useNavigation();

    return (
        <Animatable.View animation="zoomIn" duration={500} delay={100 * index} style={Styles.container}>
            <TouchableOpacity style={[Styles.typeContainer, complaintType.id == 5 && Styles.centeredItem]} onPress={() => navigation.navigate("FileComplaint", complaintType)}>
                <Image style={Styles.img} source={complaintType.img} />
                <Text style={Styles.text}>{complaintType.name}</Text>
                <Text style={Styles.text}>{complaintType.urdu}</Text>
            </TouchableOpacity>
        </Animatable.View>
    )
}

const Styles = StyleSheet.create({
    container: {
        width: '48%',
        marginHorizontal: 4,
    },
    typeContainer: {
        width: '100%',
        borderRadius: 20,
        paddingBottom: 10,
        marginBottom: 20,
        backgroundColor: "#fff",
        ...SHADOWS.medium
    },
    img: {
        height: 90,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    text: {
        marginTop: 10,
        textAlign: 'center'
    },
    centeredItem: {
        marginLeft: (width - itemWidth) / 2,
        marginRight: (width - itemWidth) / 2,
    },
})

export default ComplaintTypeItem