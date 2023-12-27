import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ComplaintBox = ({ ComplaintData }) => {
  return (
    <View style={styles.container}>
      {/* Image at the upper part */}
      <Image
        source={ComplaintData.imageSource}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Complaint Name and Other Information at the lower part */}
      <View>
        <Text style={styles.complaintName}>{ComplaintData.complaintName}</Text>
        <Text style={styles.otherInfo}>{ComplaintData.otherInfo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8, // equivalent to 'rounded-lg'
    backgroundColor: '#cbd5e1', // equivalent to 'bg-slate-300'
    width: 160, // equivalent to 'w-40'
    marginHorizontal: 20, // equivalent to 'mx-5'
    marginTop: 8, // equivalent to 'my-2'
    marginBottom: 8,
  },
  image: {
    width: 160, // equivalent to 'w-40'
    borderRadius: 8, // equivalent to 'rounded-lg'
    height: 80, // equivalent to 'h-20'
    marginBottom: 4, // equivalent to 'mb-1'
  },
  complaintName: {
    fontSize: 18, // equivalent to 'text-lg'
    textAlign: 'center', // equivalent to 'text-center'
    fontWeight: 'bold', // equivalent to 'font-bold'
    marginBottom: 4, // equivalent to 'mb-1'
  },
  otherInfo: {
    fontSize: 14, // equivalent to 'text-sm'
    textAlign: 'center', // equivalent to 'text-center'
  },
});

export default ComplaintBox;
