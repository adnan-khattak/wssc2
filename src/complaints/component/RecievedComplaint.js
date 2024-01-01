import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import ComplaintBox from './ComplaintBox'; // Adjust the path based on your project structure
import Navbar from '../../navbar/Navbar';
import ComplaintType from '../ComplaintType';
import ClosedComplaint from './ClosedComplaint';
import InProgressComplaint from './InProgressComplaint';
import InitiatedComplaint from './InitiatedComplaint';
import SingleComplaint from './SingleComplaint';
import PendingComplaint from './PendingComplaint';
import { Pending } from '../../../style/styles';

const RecievedComplaint = ({navigation}) => {
  const complaintDataArray = [
    { imageSource: require('../../../assets/images/leaves.jpg'), complaintName: 'Complaint 1', otherInfo: 'Information of dummy text how about you now how are you ' },
    // { imageSource: require('../../../assets/images/leaves.jpg'), complaintName: 'Complaint 1', otherInfo: 'Information of' },
    // { imageSource: require('../../assets/images/leaves.jpg'), complaintName: 'Complaint 1', otherInfo: 'Information of' },
    // { imageSource: require('../../assets/images/leaves.jpg'), complaintName: 'Complaint 1', otherInfo: 'Information of' },
    // ... more data
  ];

  return (
    <ScrollView>
        <Navbar />
        {/* <ComplaintType navigation={navigation} /> */}
      <View style={Pending.container}>
        {complaintDataArray.map((ComplaintData, index) => (
          // <ComplaintBox key={index} ComplaintData={ComplaintData} />
          // <ClosedComplaint key={index} ComplaintData={ComplaintData}/>
        // <InProgressComplaint key={index} ComplaintData={ComplaintData}/>
        // <InitiatedComplaint key={index} ComplaintData={ComplaintData} />
        <SingleComplaint key={index} ComplaintData={ComplaintData} />
        // <PendingComplaint key={index} ComplaintData={ComplaintData} />
      
        ))}
      </View>
    </ScrollView>
  );
};

export default RecievedComplaint;
