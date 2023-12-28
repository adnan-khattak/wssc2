import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { box } from '../../../style/styles';

const ComplaintBox = ({ ComplaintData }) => {
  return (
    <View style={box.container}>
      {/* Image at the upper part */}
      <Image
        source={ComplaintData.imageSource}
        style={box.image}
        resizeMode="cover"
      />

      {/* Complaint Name and Other Information at the lower part */}
      <View>
        <Text style={box.complaintName}>{ComplaintData.complaintName}</Text>
        <Text style={box.otherInfo}>{ComplaintData.otherInfo}</Text>
      </View>
    </View>
  );
};


export default ComplaintBox;
