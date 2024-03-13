import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Button,
} from "react-native";
import { SIZES, COLORS, SHADOWS } from "../constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { API } from "./Login";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as VideoPicker from "expo-image-picker";
import { Video } from "expo-av";
import axios from "axios";
import { Modal } from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';

const FileComplaint = ({ route }) => {
  const type = route.params.complaintType;
  const navigation = useNavigation();
  const { name, _id, phone, WSSC_CODE } = useSelector(
    (state) => state.app.user
  );
  const token = useSelector((state) => state.app.token);
  const [complaintAddress, setComplaintAddress] = useState();
  const [complaintDes, setComplaintDes] = useState();
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  console.log("uri: ", imageUri);
  console.log("video uri: ", videoUri);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
    return () => {
      setImageUri(null);
    };
  }, []);
  const cloudName = 'dgpwe8xy6'; // Replace with your Cloudinary cloud name
const uploadPreset = 'xguxdutu';
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        // setImageUri(result.assets[0].uri);
        const file = {
          uri: result.assets[0].uri,
          type: 'image/jpeg', // Adjust based on actual image type
          name: 'complaint_image.jpg', // Optional filename for Cloudinary
        };
  
        const uploadData = await uploadFile(file); // Function to upload the file to Cloudinary
        setImageUri(uploadData.secure_url); // Update image URI with Cloudinary URL
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
 const pickVideo = async () => {
    try {
      let result = await VideoPicker.launchImageLibraryAsync({
        mediaTypes: VideoPicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });

      if (!result.canceled) {
        // setVideoUri(result.assets[0].uri);
        const file = {
          uri: result.assets[0].uri,
          type: 'video/mp4', // Adjust based on actual video type
          name: 'complaint_video.mp4', // Optional filename for Cloudinary
        };
  
        const uploadData = await uploadFile1(file); // Function to upload the file to Cloudinary
        setVideoUri(uploadData.secure_url); // Update video URI with Cloudinary URL
      }
    } catch (error) {
      console.error("Error picking video:", error);
    }
  };
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    const response = await fetch("https://api.cloudinary.com/v1_1/dgpwe8xy6/image/upload", {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return data; // Returns the upload data containing the Cloudinary URL
};
  const uploadFile1 = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    const response = await fetch("https://api.cloudinary.com/v1_1/dgpwe8xy6/video/upload", {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return data; // Returns the upload data containing the Cloudinary URL
};
const handleImagePress = () => setIsZoomed(true);
const closeModal = () => setIsZoomed(false);
  const removeImage = () => {
    setImageUri(null);
  };
  const removeVideo = () =>{
    setVideoUri(null);
  }
  const submitComplaint = async () => {
    // if (!imageUri) {
    //   ToastAndroid.showWithGravity(
    //     'Please upload an image',
    //     ToastAndroid.SHORT,
    //     ToastAndroid.CENTER
    //   );
    //   return;
    // }
    if (complaintAddress == "") {
      ToastAndroid.showWithGravity(
        "Please enter complaint address",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    setLoading(true);
    const complaintData = {
      userId: _id,
      userName: name,
      WSSC_CODE,
      phone: phone.toString(),
      complaintAddress,
      complaintType: type,
      complaintDes,
      ImageUrl: imageUri,
      VideoUrl : videoUri,
    };
    console.log('complaint data: ',complaintData);
    try {
      const res = API.post("/api/v1/complaints", complaintData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      navigation.navigate("Complaints");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      ToastAndroid.showWithGravity(
        `${error}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  return (
    <ScrollView>
    <View style={Styles.container}>
      <View style={Styles.breadCrumb}>
        <FontAwesome5
          name="arrow-circle-left"
          size={30}
          color={COLORS.gray}
          onPress={() => navigation.navigate("Home")}
        />
        <Text style={Styles.breadHeading}>{type}</Text>
        <Text style={Styles.blank}></Text>
      </View>

      {/* Complaint form */}
      <View style={Styles.form}>
        <View style={Styles.formContainer}>
          <Text style={Styles.label}>Address</Text>
          <TextInput
            style={Styles.input}
            placeholder="Enter address here"
            onChangeText={(value) => setComplaintAddress(value)}
          />
        </View>
        <View style={Styles.formContainer}>
          <Text style={Styles.label}>Description</Text>
          <TextInput
            style={Styles.input}
            placeholder="Describe your problem"
            multiline={true}
            numberOfLines={4}
            onChangeText={(value) => setComplaintDes(value)}
          />
        </View>

        {/* show media */}
        <Text style={Styles.labelA}>Attachments</Text>
        <View style={Styles.mediaContainer}>
      <View style={Styles.itemContainer}>
      {imageUri && (
      <TouchableOpacity onPress={handleImagePress}>
        <Image
          style={Styles.image}
          source={{ uri: imageUri }}
          placeholder="YOUR_BLURHASH_HERE"
          contentFit="cover"
          transition={1000}
        />
        <FontAwesome5 name="trash" size={18} color="red" onPress={removeImage} />
      </TouchableOpacity>
    )}

        {videoUri && (
          <View>
          <Video
            source={{ uri: videoUri }}
            style={Styles.video}
            useNativeControls
          />
          <FontAwesome5 name="trash" size={18} color="red" onPress={removeVideo} />
          </View>
        )}
      </View>

      <Modal visible={isZoomed} transparent={true}>
        {/* ImageViewer for zooming in on images */}
        <ImageViewer
          imageUrls={[{ url: imageUri }]}
          enableSwipeDown={true}
          onCancel={closeModal}
        />
      </Modal>
    </View>

        {/* media button */}
        <View style={Styles.btnContainer}>
          <TouchableOpacity style={Styles.btn} onPress={pickImage}>
            <FontAwesome5 name="image" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.btn} onPress={pickVideo}>
            <FontAwesome5 name="video" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {/* submit button */}
        <View style={Styles.submitContainer}>
          <TouchableOpacity style={Styles.btnSubmit} onPress={submitComplaint}>
            {!loading ? (
              <Text style={Styles.btnText}>Submit</Text>
            ) : (
              <Feather
                style={Styles.icon}
                name="loader"
                size={28}
                color="#fff"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  breadCrumb: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  breadHeading: {
    fontSize: SIZES.medium,
    backgroundColor: COLORS.feedbackColor,
    color: COLORS.white,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  blank: {
    width: 32,
  },
  form: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
  },
  formContainer: {
    marginTop: 22,
    gap: 4,
  },
  label: {
    fontSize: SIZES.large,
  },
  input: {
    textAlignVertical: "top",
    backgroundColor: "#fff",
    padding: 10,
    fontSize: 18,
    borderRadius: 8,
    ...SHADOWS.small,
  },
  labelA: {
    marginTop: 18,
    fontSize: SIZES.large,
  },
  btnContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  submitContainer: {
    marginTop: 28,
  },
  btn: {
    backgroundColor: COLORS.feedbackColor,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignItems: "center",
    borderRadius: 8,
  },
  btnSubmit: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    fontSize: SIZES.large,
    color: "#fff",
  },
  mediaContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row', // Horizontally align items
    alignItems: 'center', // Center vertically
    marginHorizontal: 10, // Add some spacing between image and video
  },
  image: {
    width: 130,
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  video: {
    width: 130,
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});

export default FileComplaint;
