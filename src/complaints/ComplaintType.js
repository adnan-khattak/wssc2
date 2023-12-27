import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const ComplaintType = ({navigation}) => {
  return (
    <View>
      <View style={styles.container}>
        {/* Text: Pending Complaint */}
        <TouchableOpacity onPress={() => console.log('Pending Complaint clicked')}>
          <Text style={styles.text}>Pending Complaint</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Clickable: Received Complaint */}
        <TouchableOpacity onPress={() => navigation.navigate('Recieved')}>
          <Text style={styles.text}>Received Complaint</Text>
        </TouchableOpacity>

        <View style={styles.divider} />
        
        {/* Icon: > */}
        <Text style={styles.icon}>{'>'}</Text>
      </View>

      <Text style={styles.footerText}>Please Choose The Complaint Type</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // equivalent to 'flex-row'
    alignItems: 'center', // equivalent to 'items-center'
    justifyContent: 'space-between', // equivalent to 'justify-between'
    marginHorizontal: 16, // equivalent to 'mx-4'
    padding: 16, // equivalent to 'p-4'
    backgroundColor: '#60a5fa', // equivalent to 'bg-blue-400'
    borderRadius: 9999, // equivalent to 'rounded-full'
    marginTop: 32, // equivalent to 'mt-8'
  },
  text: {
    color: 'black', // equivalent to 'text-black'
    fontSize: 18, // equivalent to 'text-lg'
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: 'black', // equivalent to 'border-r border-black'
    height: 32, // equivalent to 'h-8'
  },
  icon: {
    color: 'white', // equivalent to 'text-white'
    fontSize: 18, // equivalent to 'text-lg'
  },
  footerText: {
    color: 'black', // equivalent to 'text-black'
    fontSize: 18, // equivalent to 'text-lg'
    fontWeight: 'bold', // equivalent to 'font-bold'
    textAlign: 'center', // equivalent to 'text-center'
    paddingVertical: 24, // equivalent to 'p-6'
  },
});

export default ComplaintType;
