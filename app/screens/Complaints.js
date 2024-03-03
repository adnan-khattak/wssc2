import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import BreadCrumb from './../components/BreadCrumb';
import ComplaintCard from '../components/ComplaintCard';
import { API } from './Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../components/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

const Complaints = () => {
    const [complaintsAll, setComplaintsAll] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation()
    const [isFocus, setIsFocus] = useState();
    const [filter, setFilter] = useState('All');

    const data = [
        { label: 'All Complaints', value: 'All' },
        { label: 'Initiated', value: 'Initiated' },
        { label: 'InProgress', value: 'InProgress' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Closed', value: 'Closed' },
    ];

    useEffect(() => {
        navigation.addListener('focus', async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                const token = JSON.parse(storedToken);

                // API call to get all complaints
                const res = await API.get('/api/v1/complaints', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })

                setComplaintsAll(res.data.allComplaints);
                setLoading(false)

            } catch (error) {
                setLoading(false)
                ToastAndroid.showWithGravity(
                    'Something went wrong!',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        })
    }, [])
    return (
        <View style={Styles.container} >
            <BreadCrumb screen='H0ome' title='Complaints' />
            {complaintsAll.length == 0 && !loading && <View style={Styles.msgContainer}>
                <Text style={Styles.msgHeading}>No Complaints to show 😟</Text>
                <Text style={Styles.msgText}>Click below file your first complaint</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={Styles.msgBtn}><Text style={Styles.btnText}>Complaint</Text></TouchableOpacity>
            </View>}
            {!loading && <View style={Styles.filterContainer}>
                <Dropdown
                    style={[Styles.dropdown, isFocus && { borderColor: COLORS.primary }]}
                    placeholderStyle={Styles.placeholderStyle}
                    selectedTextStyle={Styles.selectedTextStyle}
                    iconStyle={Styles.iconStyle}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'All Complaints' : '...'}
                    value={filter}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setFilter(item.value);
                        setIsFocus(false);
                    }}

                />
                <View style={Styles.countContainer}>
                    <Text style={Styles.coutText}>{complaintsAll.length}</Text>
                </View>
            </View>}
            {!loading ? <FlatList data={complaintsAll} renderItem={({ item, index }) => {
                const status = item.status.slice(-1).pop().state;
                if (filter == 'All') {
                    return <ComplaintCard complaint={item} index={index} />
                } else if (status == filter) {
                    return <ComplaintCard complaint={item} index={index} />
                } else {
                    return;
                }

            }} contentContainerStyle={{ rowGap: 10, paddingTop: 10, paddingBottom: 100, alignItems: 'center' }} showsVerticalScrollIndicator={false} /> : <>
                {complaintsAll.length === 0 && loading && <Loader />}
            </>}
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        margin: 12,
        alignItems: 'center'
    },
    filterContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        paddingBottom: 10,
    },
    countContainer: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: '#ccc',
        borderRadius: 4,
    },
    coutText: {
        fontSize: SIZES.medium,
        fontWeight: '500',
        color: COLORS.feedbackColor
    },
    msgContainer: {
        marginTop: 250,
        width: '100%',
        alignItems: 'center',
        gap: 10,
    },
    msgHeading: {
        fontSize: SIZES.large,
        fontWeight: '600',
        color: COLORS.gray
    },
    msgText: {
        fontSize: SIZES.small
    },
    msgBtn: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
    },
    btnText: {
        color: '#fff',
        fontSize: SIZES.medium
    },
    dropdown: {
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "#fff",
        width: '50%',
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
})

export default Complaints