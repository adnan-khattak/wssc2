import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import InitiatedComplaint from './InitiatedComplaint';
import RecievedComplaint from './RecievedComplaint';
import { ComplaintStages, Tracking } from '../../../style/styles';

const SingleComplaint = ({ ComplaintData }) => {
  return (
    <View>
    <View style={Tracking.textbox}>
     <Text style={Tracking.textContainer}>Complaint Tracking</Text>
    </View>
    <View style={ComplaintStages.container}>
        <View style={ComplaintStages.closedIndicator}/>
        <View style={ComplaintStages.textContainer}>
        <Text style={ComplaintStages.complaintName}>{ComplaintData.complaintName}</Text>
        <Text style={ComplaintStages.otherInfo}>{ComplaintData.otherInfo}</Text>
    </View>

    <View style={ComplaintStages.imageContainer}>
      <Image
        source={ComplaintData.imageSource}
        style={ComplaintStages.image}
        resizeMode="cover"
      />
    </View>
      
      </View> 
    </View>
  );
};


export default SingleComplaint