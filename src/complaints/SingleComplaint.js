import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const SingleComplaint = ({ ComplaintData }) => {
  return (
    <View style={styles.container}>
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
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  complaintName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  otherInfo: {
    color: 'gray',
  },
  imageContainer: {
    marginLeft: 16,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default SingleComplaint;
