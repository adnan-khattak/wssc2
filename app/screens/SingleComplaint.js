import React from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import BreadCrumb from '../components/BreadCrumb'
import ComplaintCard from '../components/ComplaintCard'
import { COLORS, SHADOWS, SIZES } from '../constants/theme'
import moment from 'moment'
import * as Animatable from 'react-native-animatable'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
            {/* <ScrollView style={Styles.responsive}> */}
            <View style={Styles.complaint}></View>
                <ComplaintCard complaint={complaint} />
                <View style={Styles.timeline}>
                    <View style={Styles.line}></View>
                    <FlatList data={complaint.status} renderItem={({ item, index }) => 
                        <Animatable.View animation="fadeInRight" duration={500} delay={100 * index} style={Styles.status(item.state)}>
                            <View style={Styles.dot(item.state)}></View>
                            <Text style={Styles.statusText(item.state)}>{item.state}</Text>
                            <Text style={Styles.statusDate}>{moment(item.updatedAt).format('MMMM Do YYYY, h:mm a')}</Text>
                        </Animatable.View>} contentContainerStyle={{ paddingVertical: 10 }} />
                </View>
            {/* </ScrollView> */}
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        margin: wp(2.9),
        alignItems: 'center',
        width: wp(97),
    },
    responsive: {
        width: wp(80),
        height: hp(100)
    },
    complaint: {
        marginTop: 8,
    },
    timeline: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: wp(97),
        gap: wp(3.5),
        // height: hp('30%')
    },
    line: {
        height: hp(50),
        // width: 6,
        width: wp(1.6),
        backgroundColor: COLORS.gray,
        // marginLeft: 24
        marginLeft: wp(6.6)
    },
    dot: (state) => ({
        position: 'absolute',
        // height: 18,
        height: wp(2),
        // width: 18,
        width: wp(2),
        backgroundColor: StatusColor[state],
        borderRadius: 30,
        left: -wp(2.4),
        top: wp(1.8),
    }),
    status: (state) => ({
        position: 'relative',
        // width: '90%',
        width: wp(77),
        height: hp(10),
        marginTop: wp(4.5),
        padding: wp(3),
        gap: wp(2.8),
        backgroundColor: '#fff',
        borderRadius: 12,
        borderRightColor: StatusColor[state],
        // borderRightWidth: 5,
        borderRightWidth: wp(1.3),
        zIndex: 1000,
        ...SHADOWS.small
    }),
    statusText: (state) => ({
        // fontSize: SIZES.medium,
        fontSize: hp(2),
        fontWeight: '700',
        color: StatusColor[state],
    }),
    statusDate: {}
})

export default SingleComplaint