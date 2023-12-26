import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import ComplaintBox from '../complaints/ComplaintBox'; // Adjust the path based on your project structure
import Navbar from '../navbar/Navbar';

const ComplaintScreen = () => {
  const complaintDataArray = [
    { imageSource: require('../../assets/images/leaves.jpg'), complaintName: 'Complaint 1', otherInfo: 'Information of' },
    { imageSource: require('../../assets/images/leaves.jpg'), complaintName: 'Complaint 1', otherInfo: 'Information of' },
    { imageSource: require('../../assets/images/leaves.jpg'), complaintName: 'Complaint 1', otherInfo: 'Information of' },
    { imageSource: require('../../assets/images/leaves.jpg'), complaintName: 'Complaint 1', otherInfo: 'Information of' },
    // ... more data
  ];

  return (
    <ScrollView>
        <Navbar />
      <View style={styles.container}>
        {complaintDataArray.map((ComplaintData, index) => (
          <ComplaintBox key={index} ComplaintData={ComplaintData} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default ComplaintScreen;
