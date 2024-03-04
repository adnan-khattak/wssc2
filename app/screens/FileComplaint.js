import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { SIZES, COLORS, SHADOWS } from "../constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { API } from "./Login";
import { Feather } from "@expo/vector-icons";
import { launchImageLibraryAsync } from "expo-image-picker";
import { launchImageLibrary } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
import * as VideoPicker from "expo-image-picker";
import { Video } from "expo-av";
// import { Image, Video } from 'react-native-animatable';

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

  // console.log()

  const submitComplaint = async () => {
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
      userName: name,
      userId: _id,
      WSSC_CODE,
      phone: phone.toString(),
      complaintType: type,
      complaintAddress,
      complaintDes,
      imageUri, // Include image URI
      videoUri,
    };
    console.log("Form Data: ", complaintData);
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
  const handleMediaPress = async (mediaType) => {
    const options = {
      mediaType: mediaType === "photo" ? "Images" : "Videos",
      allowsEditing: true,
      quality: 1,
    };

    launchImageLibraryAsync(options)
      .then((response) => {
        if (!response.canceled) {
          const { uri } = response;
          if (typeof uri === "string") {
            if (mediaType === "photo") {
              setImageUri(uri);
            } else if (mediaType === "video") {
              setVideoUri(uri);
            }
          }
        }
      })
      .catch((error) => {
        console.log("Error in " + mediaType + " picker: ", error);
      });
  };
  return (
    <ScrollView style={Styles.container}>
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
        <Text style={Styles.label}>Attachment:</Text>
        <View style={Styles.mediaContainer}>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={Styles.uploadedImage} />
          )}
          {videoUri && (
            <Video source={{ uri: videoUri }} style={Styles.uploadedVideo} />
          )}
        </View>

        <View style={Styles.buttonsContainer}>
          <TouchableOpacity onPress={() => handleMediaPress("photo")}>
            <FontAwesome5 name="image" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMediaPress("video")}>
            <FontAwesome5 name="video" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* media button */}
        {/* <View style={Styles.btnContainer}>
                    <TouchableOpacity style={Styles.btn} onPress={handleImagePress}>
                        <FontAwesome5 name="image" size={24} color="black" />

                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.btn} onPress={handleVideoPress}>
                    <FontAwesome5 name="video" size={24} color="black" />

                    </TouchableOpacity>
                </View> */}
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
  mediaContainer: {
    marginTop: 4,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    height: 100,
    ...SHADOWS.small,
  },
  btnContainer: {
    marginTop: 12,
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
});

export default FileComplaint;
