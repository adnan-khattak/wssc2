import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import BreadCrumb from './../components/BreadCrumb';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, SIZES } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import DpModal from '../components/DpModal';
import Avatar from '../components/Avatar';
import { API } from './Login';
import { UpdateUserData } from '../GlobalState/UserSlice';
import { manipulateAsync } from 'expo-image-manipulator';
import EditModal from '../components/EditModal';



const Profile = () => {
    const { user, token } = useSelector((state) => state.app)
    const dispatch = useDispatch();
    const [isModal, setIsModal] = useState(false)
    const [image, setImage] = useState()
    const [update, setUpdate] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState()
    const [label, setLabel] = useState()

    if (user) {
        const changeImage = async (mode) => {
            setUpdate(true)
            try {
                let result = {};
                if (mode == 'Gallery') {
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                    result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1
                    })
                } else {
                    await ImagePicker.requestCameraPermissionsAsync();
                    result = await ImagePicker.launchCameraAsync({
                        cameraType: ImagePicker.CameraType.front,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1
                    })
                }

                setIsModal(false);
                if (!result.canceled) {
                    await saveImage(result.assets[0].uri);
                } else {
                    setUpdate(false)
                }
            } catch (error) {
                setIsModal(false)
                setUpdate(false)
                ToastAndroid.showWithGravity(
                    `Error while uploading image`,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                )
            }
        }

        const saveImage = async (img) => {
            try {
                // save image locally
                const manipResult = await manipulateAsync(
                    img, [],
                    { base64: true }
                );

                const uriArr = manipResult.uri.split('.');
                const fileType = uriArr[uriArr.length - 1]
                const file = `data:${fileType};base64,${manipResult.base64}`

                setImage(manipResult.uri);

                // save image to cloundinary
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "xguxdutu");
                data.append("cloud_name", "dgpwe8xy6");
                data.append("folder", "ProfilePhotos");
                data.append("quality", "auto:good");

                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/dgpwe8xy6/image/upload",
                    {
                        method: "post",
                        body: data,
                    }
                );
                const photo = await response.json();
                // setProfilePhoto(photo.secure_url);
                const updatedpic = {
                    profile_image: photo.secure_url,
                };


                if (photo.secure_url) {
                    // update profile image in backend
                    const res = await API.patch(`api/v1/citizens/${user._id}`, updatedpic, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    })

                    dispatch(UpdateUserData(res.data.updateInfo))
                } else {
                    ToastAndroid.showWithGravity(
                        `Error uploading to cloudinary`,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    )
                }

                setUpdate(false)
            } catch (error) {
                setImage(null)
                ToastAndroid.showWithGravity(
                    `${error}`,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                )
            }
        }



        return (
            <View style={Styles.container}>
                <BreadCrumb screen='Home' title='Profile' />

                <Avatar uri={image} user={user} setIsModal={setIsModal} update={update} />

                <View style={Styles.infoContainer}>
                    <Text style={Styles.infoLabel}>Name</Text>
                    <View style={Styles.infoInnerContainer}>
                        <Text style={Styles.infoText}>{user.name}</Text>
                        <MaterialCommunityIcons name='account-edit' size={25} color={COLORS.primary} onPress={() => {
                            setValue(user.name)
                            setIsEdit(true)
                            setLabel('name')
                        }} />
                    </View>
                </View>

                <View style={Styles.infoContainer}>
                    <Text style={Styles.infoLabel}>Phone Number</Text>
                    <View style={Styles.infoInnerContainer}>
                        <Text style={Styles.infoText}>0{user.phone}</Text>
                        <MaterialCommunityIcons name='account-edit' size={25} color={COLORS.gray} />
                    </View>
                </View>

                <View style={Styles.infoContainer}>
                    <Text style={Styles.infoLabel}>Email</Text>
                    <View style={Styles.infoInnerContainer}>
                        <Text style={Styles.infoText}>{user.email ? user.email : 'Email goes here'}</Text>
                        <MaterialCommunityIcons name='account-edit' size={25} color={COLORS.primary} onPress={() => {
                            setValue(user.email || 'Email goes here')
                            setIsEdit(true)
                            setLabel('email')
                        }} />
                    </View>
                </View>
                <View style={Styles.infoContainer}>
                    <Text style={Styles.infoLabel}>Address</Text>
                    <View style={Styles.infoInnerContainer}>
                        <Text style={Styles.infoText}>{user.address ? user.address : 'Your address goes here'}</Text>
                        <MaterialCommunityIcons name='account-edit' size={25} color={COLORS.primary} onPress={() => {
                            setValue(user.address || 'Your address goes here')
                            setIsEdit(true)
                            setLabel('address')
                        }} />
                    </View>
                </View>

                <TouchableOpacity style={Styles.btn('password')}>
                    <Text style={Styles.btnText}>Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Styles.btn('account')}>
                    <Text style={Styles.btnText}>Delete Account</Text>
                </TouchableOpacity>

                <DpModal isModal={isModal} setIsModal={setIsModal} onCameraPress={() => changeImage('')} onGalleryPress={() => changeImage('Gallery')} />

                <EditModal isEdit={isEdit} setIsEdit={setIsEdit} value={value} label={label} />
            </View>
        )
    }

}
const Styles = StyleSheet.create({
    container: {
        margin: 12,
    },
    infoContainer: {
        marginHorizontal: 44,
        gap: 4,
        marginTop: 14,
    },
    infoLabel: {
        fontSize: 14,
        color: COLORS.gray,
    },
    infoInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoText: {
        fontSize: SIZES.medium,
        fontWeight: '600',
    },
    btn: (type) => ({
        marginHorizontal: 44,
        marginTop: type === 'password' ? 32 : 12,
        marginBottom: type === 'password' ? 0 : 14,
        alignItems: 'center',
        backgroundColor: type === 'password' ? COLORS.primary : COLORS.closedColor,
        paddingVertical: 10,
        borderRadius: 10,
    }),
    btnText: {
        fontSize: SIZES.medium,
        color: '#fff',
    }
})

export default Profile