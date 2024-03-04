import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import BreadCrumb from '../components/BreadCrumb'
import ComplaintCard from '../components/ComplaintCard'
import { COLORS, SHADOWS, SIZES } from '../constants/theme'
import moment from 'moment'
import * as Animatable from 'react-native-animatable'


const StatusColor = {
    "Initiated": COLORS.initiatedColor,
    "InProgress": COLORS.inprogessColor,
    "Completed": COLORS.completedColor,
    "Closed": COLORS.closedColor,
}

const SingleComplaint = ({ route }) => {
    const complaint = route.params;
    return (
        <View style={Styles.container}>
            <BreadCrumb screen="Complaints" title="Complaint Details" />
            <View style={Styles.complaint}></View>
            <ComplaintCard complaint={complaint} />
            <View style={Styles.timeline}>
                <View style={Styles.line}></View>
                <FlatList data={complaint.status} renderItem={({ item, index }) => <Animatable.View animation="fadeInRight" duration={500} delay={100 * index} style={Styles.status(item.state)}>
                    <View style={Styles.dot(item.state)}></View>
                    <Text style={Styles.statusText(item.state)}>{item.state}</Text>
                    <Text style={Styles.statusDate}>{moment(item.updatedAt).format('MMMM Do YYYY, h:mm a')}</Text>
                </Animatable.View>} contentContainerStyle={{ paddingVertical: 10 }} />
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        margin: 12,
        alignItems: 'center',
        width: '97%'
    },
    complaint: {
        marginTop: 8,
    },
    timeline: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        gap: 12,
    },
    line: {
        height: '90%',
        width: 6,
        backgroundColor: COLORS.gray,
        marginLeft: 24
    },
    dot: (state) => ({
        position: 'absolute',
        height: 18,
        width: 18,
        backgroundColor: StatusColor[state],
        borderRadius: 30,
        left: -24,
        top: 16,
    }),
    status: (state) => ({
        position: 'relative',
        width: '90%',
        marginTop: 18,
        padding: 14,
        gap: 14,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderRightColor: StatusColor[state],
        borderRightWidth: 5,
        zIndex: 1000,
        ...SHADOWS.small
    }),
    statusText: (state) => ({
        fontSize: SIZES.medium,
        fontWeight: '700',
        color: StatusColor[state],
    }),
    statusDate: {}
})

export default SingleComplaint