import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React,{useState} from 'react';
import ComplaintScreen from './component/PendingComplaint';
import RecievedComplaint from './component/RecievedComplaint';
import PendingComplaint from './component/PendingComplaint';
import { Type } from '../../style/styles';

const ComplaintType = ({navigation}) => {
  const [selectedComplaintType, setSelectedComplaintType] = useState('complaint');
  const handleButtonPress = (complaintType) => {
    setSelectedComplaintType(complaintType);
  };
  return (
    <View>
      <View style={Type.container}>
        {/* Text: Pending Complaint */}
        <TouchableOpacity onPress={() => handleButtonPress('complaint')}>
          <Text style={Type.text}>Pending Complaint</Text>
        </TouchableOpacity>

        <View style={Type.divider} />
       
        {/* Clickable: Received Complaint */}
        <TouchableOpacity onPress={() => handleButtonPress('received')}>
          <Text style={Type.text}>Received Complaint</Text>
        </TouchableOpacity>

        <View style={Type.divider} />
        
        {/* Icon: > */}
        <Text style={Type.icon}>{'>'}</Text>
      </View>

      <Text style={Type.footerText}>Please Choose The Complaint Type</Text>
      {selectedComplaintType === 'complaint' && <PendingComplaint />}
      {selectedComplaintType === 'received' && <RecievedComplaint />}
    </View>
  );
};


export default ComplaintType;
