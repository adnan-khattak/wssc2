import { View, Text } from 'react-native'
import React from 'react'
import ComplaintScreen from '../complaints/component/PendingComplaint';
import RecievedComplaint from '../complaints/component/RecievedComplaint';
import Navbar from '../navbar/Navbar';
import ComplaintType from '../complaints/ComplaintType';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  return (
    <View>
        <Navbar />
        <ComplaintType/>
     {/* <ComplaintScreen /> */}
     {/* <RecievedComplaint /> */}
    </View>
  )
}

export default HomeScreen;