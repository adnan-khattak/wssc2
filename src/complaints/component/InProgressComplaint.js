import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const InProgressComplaint = ({ ComplaintData }) => {
  return (
    <View style={styles.container}>
        <View style={styles.closedIndicator}/>
        <View style={styles.textContainer}>
        <Text style={styles.complaintName}>{ComplaintData.complaintName}</Text>
        <Text style={styles.otherInfo}>{ComplaintData.otherInfo}</Text>
        </View>

        <View style={styles.imageContainer}>
      <Image
        source={ComplaintData.imageSource}
        style={styles.image}
        resizeMode="cover"
      />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#cbd5e1',
        borderRadius: 10,
        // overflow: 'hidden',
        width:400,
        height:200,
        marginBottom:10,
      },
      closedIndicator: {
        width: 6,
        backgroundColor: '#35A5E4',
        height: '100%', // Makes the line stretch to the height of the container
      },
      textContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
      },
      complaintName: {
        fontSize: 20,
        color: '#333',
      },
      otherInfo: {
        fontSize: 16,
        color: '#333',
      },
      imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 8,
      },    
});

export default InProgressComplaint