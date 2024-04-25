import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, ActivityIndicator, Dimensions, ToastAndroid } from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../../constants/theme';
import { Video, ResizeMode} from 'expo-av';
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { API } from '../Login';
import { useSelector } from "react-redux";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as VideoPicker from "expo-image-picker";
import axios from "axios";
import { Modal } from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageModal from '../../components/ImageModal';
// import Navbar from '../navbar/Navbar';
// import Icon from 'react-native-vector-icons/FontAwesome6'

const borderColor = {
  "Initiated": COLORS.initiatedColor,
  "InProgress": COLORS.inprogessColor,
  "Completed": COLORS.completedColor,
  "Closed": COLORS.closedColor,
}

const ComplaintDetails = ({route}) => {
    
    const navigation = useNavigation();
    const complaint = route.params;
    const token = useSelector((state) => state.supervisor.supervisorToken);
    const DescRef = useRef(null);
    const [des, setDes] = useState('');
    const [loading, setLoading] = useState(false);  
    const [imageUri, setImageUri] = useState(null);
    const [imageUris, setImageUris] = useState(null);
    const [videoUri, setVideoUri] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);

    // console.log("uri: ", imageUri);
    // console.log("video uri: ", videoUri);
    useEffect(() => {
      (async () => {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      })();
      // imageUrls()
      return () => {
        setImageUri(null);
        // setImageUris([])
      };
    }, []);

    const imageUrls = () => {
        const status = complaint.status?.slice(-1).pop()?.state; // Use optional chaining and pop() method correctly
      
        if (status === 'Closed' || status === 'Completed') { // Use || instead of | for logical OR
          setImageUris([...imageUris, { url: complaint.ImageUrl }, { url: complaint.response.ImageUrl }]);
        } else {
          setImageUris([...imageUris, { url: complaint.ImageUrl }]);
        }
      };
  
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
          // setImageUris([...imageUris,{url: uploadData.secure_url}])
          console.log('ImageUrl: ',uploadData.secure_url);
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
            name: 'response_video.mp4', // Optional filename for Cloudinary
          };
    
          const uploadData = await uploadFile1(file); // Function to upload the file to Cloudinary
          setVideoUri(uploadData.secure_url); // Update video URI with Cloudinary URL
          console.log('VideoUrl: ',uploadData.secure_url);
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

  const selectUrl = (url) => {
    if (url === 'citizen') {
      setImageUris(complaint.ImageUrl)
    }else if (url === 'supervisor') {
      setImageUris(complaint?.response?.ImageUrl)
    }else{
      setImageUris(imageUri)
    }
    setIsZoomed(true)
  }
  const handleImagePress = () => {
    // console.log('ImageUris in handleImage: ', imageUris);
    setIsZoomed(true);
    console.log(isZoomed);
  } 
  
  const closeModal = () => {
    setIsZoomed(false);
    console.log(isZoomed);
  }
    const removeImage = () => {
      setImageUri(null);
    };
    const removeVideo = () =>{
      setVideoUri(null);
    }

    const handleInputChange = (text) => {
      setDes(text)
    }
     // SubmiResponse method definition express supervisor response on complaint resolution
  const SubmitResponse = async () => {
          setLoading(true)
          if (des === "") {
            ToastAndroid.showWithGravity(
              "please add resolution statement",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            return;
          }
          
          if (!imageUri && !videoUri) {
            ToastAndroid.showWithGravity(
              "please upload at least one media",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            return;
          }

          // when both media and des have been provided by supervisor then api will be called to update the complaint status
          try   {
            const response = {
              complaintId: complaint?._id,
              ImageUrl: imageUri,
              // description: DescRef?.current?.value,
              description: des,
            };
            const { complaintId, ImageUrl, description } = response;
            // console.log(description);
            // Call Supervisor response API to update the complaint status
            const res = await API.patch(`api/v1/complaints/response/${complaintId}`, {ImageUrl, description}, {
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                  },
            });
            setLoading(false)
          console.log(res.data)
          if (res.status == 200) {
            ToastAndroid.showWithGravity(
              "Response submitted Successfully",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            navigation.navigate("supervisorHome") 
          }
          return res.data;
          } catch (error) {
            console.log(error);
            if (error.response) {
              if (error.response.status == 404) {
                  return error.response.status;
              } else {
                  return error.response.status;
              }
          }
          }
        };

  return (
    <View>
      <ScrollView>
        <View style={styles.wrapper}>
          {/* NAVIGATION */}
          <View style={styles.flexContainer}>
            <TouchableOpacity >
              <FontAwesome5
                name="arrow-circle-left"
                size={30}
                color={COLORS.gray}
                onPress={() => navigation.navigate("supervisorHome")}
              />
            </TouchableOpacity>
            <Text style={styles.complaintHeaderText}>Complaint Details</Text>
            <View style={styles.emptySpace}></View>
          </View>

          {/* COMPLAINT DETAILS */}
          <View style={styles.complaintDetailsContainer}>
            
            <View style={styles.rowContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailText}>Type:</Text>
              <Text style={[styles.detailValue, styles.textBold]}> {complaint.complaintType}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailText}>Status: </Text>
              <Text style={[styles.detailValue, styles.statusColor(complaint.status?.slice(-1).pop().state),styles.textBold
                // getStatusStyle(complaint?.status[complaint?.status.length - 1]?.state)
                ]}>
                {complaint.status?.slice(-1).pop().state}
              </Text>
            </View>
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>ID: </Text>
                <Text style={styles.detailValue}> {complaint?._id.slice(0, 8).toUpperCase()}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>Date: </Text>
                <Text style={styles.detailValue}>{complaint.createdAt.split("T")[0]}</Text>
              </View>
            </View>
            <View style={styles.columnContainer}>
              <Text style={styles.detailText}>Address:</Text>
              <View style={styles.infoFields}>
               <Text style={styles.detailValue}>{complaint?.complaintAddress}</Text>
             </View>
            </View>
            <View style={styles.columnContainer}>
                <Text style={styles.detailText}>Description:</Text>
                <View style={styles.infoFields}>
               <Text style={styles.detailValue}>{complaint?.complaintDes}</Text>
             </View>
              </View>
              <View style={styles.columnContainer}>
                <Text style={styles.detailText}>Admin statement:</Text>
                <View style={styles.infoFields}>
                  <Text style={styles.detailValue}>{complaint?.wsscStatement}</Text>
                </View>
              </View>
            {/* )} */}
            <View style={styles.attachmentContainer}>
              <Text style={styles.detailText}>Attached media</Text>
              <View style={styles.mediaContainer}>
                <TouchableOpacity onPress={() => selectUrl('citizen')}>
                  <Image source={{ uri: complaint.ImageUrl }} style={styles.mediaImage} />
                </TouchableOpacity>
                  {complaint.VideoUrl ? (
                    <Video source={{ uri: complaint.VideoUrl}} style={styles.mediaVideo} useNativeControls resizeMode={ResizeMode.CONTAIN} isLooping/>
                  ) : (
                    <Image source={require('../../../assets/complaintDefaultPic.png')} style={styles.mediaImage} />
                  )}
              </View>
            </View>
          </View>

          {/* Supervisor complaint feedback section */}
          <View style={styles.supervisorFeedbackSection}>
            <Text style={styles.feedbackHeaderText}>Your Response</Text>
          </View>
          
          {complaint.response ? (
            <View style={styles.responseContainer}>
              <View style={styles.columnContainer}>
                <Text style={styles.detailText}>Description</Text>
                <View style={styles.infoFields}>
                  <Text style={styles.detailValue}>{complaint?.response?.description}</Text>
                </View>
              </View>

              {/* MEDIA ATTACHMENT */}
              <View style={styles.attachmentContainer}>
              <View style={styles.mediaContainer}>
                <TouchableOpacity onPress={() => selectUrl('supervisor')}> 
                  <Image source={{ uri: complaint?.response?.ImageUrl }}
                    style={styles.mediaImage} />
                </TouchableOpacity>
                  {complaint.VideoUrl ? (
                    <Video source={{ uri: complaint.VideoUrl}} style={styles.mediaVideo} useNativeControls resizeMode={ResizeMode.CONTAIN} isLooping/>
                  ) : (
                    <Image source={require('../../../assets/complaintDefaultPic.png')} style={styles.mediaImage} />
                  )}
              </View>
            </View>
            </View>
          ) : (
            <View style={styles.responseContainer}>
            {/* Your supervisor response components */}
            <View style={styles.statmentContainer}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingText}>Statement</Text>
                <Text style={styles.requiredMark}>*</Text>
                <Text style={styles.headingSubtext}>شکایت کے حل کی تفصیل</Text>
              </View>
              <TextInput
                name="query"
                id="response"
                // ref={DescRef}
                onChangeText={handleInputChange}
                value={des}
                placeholder="please write your query"
                multiline={true}
                numberOfLines={5}
                // editable={complaint?.response?.description === ''} // Only editable if no existing statement
                style={styles.textInput}
              />
            </View>

            {/* MEDIA ATTACHMENT */}
            <View style={styles.statmentContainer}>
              <View style={styles.headingContainer}>
              <Text style={styles.headingText}>Attachment <Text style={styles.requiredMark}>* </Text></Text>
              <Text style={styles.headingSubtext}>تصویر / ویڈیو</Text>
              </View>
              <View style={styles.mediaButtonsContainer}>
                <View style={styles.mediaContainer}>
                {imageUri && (
                <TouchableOpacity onPress={selectUrl}>
                  <Image
                    style={styles.mediaImage}
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
                        style={styles.mediaVideo}
                        useNativeControls
                      />
                      <FontAwesome5 name="trash" size={18} color="red" onPress={removeVideo} />
                    </View>
                  )}
                </View>
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.rowContainer}>
              {/* Picture upload button */}
              <TouchableOpacity onPress={pickImage} 
              style={styles.button}>
                <View style={styles.buttonContent}>
                  <FontAwesome5 name="image" size={24} color="black" />
                  <Text style={styles.buttonText}>Picture</Text>
                </View>
              </TouchableOpacity>

              {/* Video upload button */}
              <TouchableOpacity onPress={pickVideo}
                style={styles.button}
              >
                <View style={styles.buttonContent}>
                  <FontAwesome5 name="video" size={24} color="black" />
                  <Text style={styles.buttonText}>Video</Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* buttons Section End */}

            {/* Submit Button */}
            <View style={styles.submitButtonContainer}>
            {!loading ? (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={SubmitResponse}
              >
                <FontAwesome5
                name="file-upload"
                size={30}
                color={'white'}
                />
                <Text style={styles.submitButtonText}> Submit</Text>
              </TouchableOpacity>
            ) : (
              <Feather
                // style={styles.icon}
                name="loader"
                size={28}
                color="#fff"
              />
            )}
            </View>
            {/* Submit Button End */}

          </View>
          ) }
        </View>
    <ImageModal visible={isZoomed} imageUrls={[{url: imageUris}]} onClose={closeModal}/>
    </ScrollView>
    </View>   
  );
};

const getStatusStyle = (status) => {
    switch (status) {
      case "Initiated":
        return styles.initiatedStatus;
      case "InProgress":
        return styles.inProgressStatus;
      case "Completed":
        return styles.completedStatus;
      case "Closed":
        return styles.closedStatus;
      default:
        return {};
    }
  };

  const { width } = Dimensions.get('window');
  const imageSize = width / 4;
  
const styles = StyleSheet.create({
    ////////////////////////////////////////////////////////////////////////////
    statusColor: (status) => ({
      color: borderColor[status]
  }),
    container: {
        // flexGrow: 1,
        backgroundColor: '#E5E5E5',
      },
      wrapper: {
        paddingVertical: 14,
        paddingHorizontal: '1.9%',
        backgroundColor: '#E5E5E5',
      },
      flexContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      arrowIcon: {
        fontSize: 28,
        color: '#1E40AF',
      },
      complaintHeaderText: {
        fontSize: 18,
        color: '#fff',
        backgroundColor: '#1A5980',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
      },
      emptySpace: {
        width: 7,
      },
      complaintDetailsContainer: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        marginTop:14,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      },
      rowContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
      },
      columnContainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        marginTop:8
      },
      infoFields:{
        borderWidth: 1,
        borderColor: '#CCCCCC',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        marginTop: 5,
      },
      detailRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 9,
        marginTop:7
      },
      detailText: {
        color: '#777777',
        fontSize:19
      },
      textBold:{
        fontWeight:'bold'
      },
      detailValue: {
        fontSize:19,
        color:'black'
      },
      initiatedStatus: {
        color: '#FF9900',
      },
      inProgressStatus: {
        color: '#FF0000',
      },
      completedStatus: {
        color: '#00FF00',
      },
      closedStatus: {
        color: '#0000FF',
      },
      attachmentContainer: {
        marginTop: 10,
      },
      mediaButtonsContainer:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      mediaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        padding: 5,
        width:'100%',
        height:160,
      },
      mediaImage: {
        width: 150,
        height: 130,
        resizeMode: 'cover',
        borderRadius:10,
        marginVertical:3
      },
      mediaVideo: {
        // marginRight:10,
        width: 150,
        height: 130,
      },
      supervisorFeedbackSection: {
        backgroundColor: '#E5E5E5',
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
      },
      feedbackHeaderText: {
        fontSize: 18,
        backgroundColor: '#1A5980',
        color: '#FFFFFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
      },
      responseContainer: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      },
      //supervisor statement styling
      statmentContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 3,
        marginTop:5,
      },
      headingContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 10,
      },
      headingText: {
        fontSize: 19,
        // fontWeight: 'bold',
        color: '#000',
        marginRight: 5,
      },
      requiredMark: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'red',
        marginRight:10
      },
      headingSubtext: {
        fontSize: 19,
        color: '#000',
      },
      textInput: {
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        fontSize:19,
        width: '100%',
        height: 130, // Adjust height as needed
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlignVertical: 'top', // For multiline alignment
      },
      /////////////////////////////////////
      // Supervisor Attached Media Styling
      image: {
        width: imageSize,
        height: imageSize,
        borderRadius: 5,
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      loadingText: {
        fontSize: 12,
        marginTop: 5,
      },
      videoContainer: {
        width: imageSize,
        height: imageSize,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#FFA500',
        justifyContent: 'center',
        alignItems: 'center',
      },
      video: {
        width: '100%',
        height: '100%',
      },
      // Attach Media Styling End

      // Buttons Styling
        button: {
          borderWidth: 2,
          borderColor: '#32da32',
          borderRadius: 10,
          paddingVertical: 5,
          paddingHorizontal: 10,
          margin:10,
        },
        activeButton: {
          backgroundColor: '#1A5980',
          borderColor: '#1A5980',
        },
        disabledButton: {
          backgroundColor: '#CCCCCC',
          borderColor: '#CCCCCC',
        },
        buttonContent: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        buttonText: {
          fontSize: 18,
          marginLeft: 5,
          color: '#000',
        },
        iconSize:{
          width:30,
          height:30
        },
      // Buttons Styling End

      // Submit Button Styling
      submitButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
      },
      submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '100%',
        backgroundColor: '#32da32',
        borderRadius: 10,
        paddingVertical: 10,
      },
      submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      // Submit Button Styling End
      responseFormContainer: {
        // Style your supervisor response form container
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 10,
      },
      imageModal: {
        position: 'absolute',
        top: '10%',
        left: '2%',
        height: '75%',
        width: 'auto',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        zIndex: 20,
        overflow: 'hidden',
        transform: [{ scale: 0 }],
        transitionDuration: '0.3s',
      },
      imageModalVisible: {
        transform: [{ scale: 1 }],
      },
      image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      },
    ///////////////////////////////////////////////////////////////////////////
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#5F7181',
  },
  innerContainer: {
    width: '100%',
    justifyContent: 'center',
    // backgroundColor: '#5F7181',
  },
  complaintDetails: {
    // paddingTop: 14,
    width: '100%',
    // backgroundColor: '#5F7181',
  },
    //   Navigation
    navContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    iconContainer: {
        padding: 2,
        borderRadius: 9999,
        backgroundColor: '#F3F4F6', // Gray-100
    },
    icon: {
        fontSize: 28,
        color: '#3B82F6', // PrimaryColor-500
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        color: '#3B82F6', // PrimaryColor-500
        backgroundColor: '#1A5980', // Custom background color
        paddingHorizontal: 2,
        borderRadius: 8,
    },  
    title: {
        color: '#FFFFFF', // White
        fontSize:20,
    },
    emptySpace: {
        width: 7,
    },
    
    //Complaint Details styling
    detialsContainer: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        marginHorizontal: 2,
        marginVertical: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#CCCCCC', // Border color
        borderRadius: 8,
        backgroundColor: '#FFFFFF', // Background color
        shadowColor: '#000000', // Shadow color
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      },
      detailsWrapper: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        marginHorizontal: 2,
        marginVertical: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#CCCCCC', // Border color
        borderRadius: 8,
        backgroundColor: '#FFFFFF', // Background color
        shadowColor: '#000000', // Shadow color
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      }, 

    //   Type & Status of complaint
    typeAndStatuscontainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 5,
        marginVertical: 2,
        borderWidth: 2,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      },
      flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      label: {
        color: '#888888',
        marginRight: 5,
      },
      boldText: {
        fontWeight: 'bold',
      },
      // Conditional styles
      initiatedColor: {
        color: 'yellow',
      },
      inProgressColor: {
        color: 'blue',
      },
      completedColor: {
        color: 'green',
      },
      closedColor: {
        color: 'red',
      },
});

export default ComplaintDetails;
