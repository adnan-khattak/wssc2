import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { ComplaintStages } from '../../../style/styles';
const ClosedComplaint = ({ ComplaintData }) => {
  return (
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
  );
};


    


export default ClosedComplaint