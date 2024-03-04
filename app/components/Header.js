import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS, SIZES, SHADOWS } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../GlobalState/UserSlice";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { io } from "socket.io-client";
import { Audio } from "expo-av";
import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';


const Header = () => {
  const dispatch = useDispatch();
  const { wssc, user } = useSelector((state) => state.app);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const navigation = useNavigation();
  const socket = io("http://172.16.114.21:7000");
  const logOut = () => {
    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("wssc");
    AsyncStorage.removeItem("token");
    dispatch(LogOut());
    setIsMenuOpen(false);

    ToastAndroid.showWithGravity(
      "Logged out successfully",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  socket.on("connect", () => {
    console.log("Socket connected");
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
  const notificationSound = require('../../assets/livechat-129007.mp3');
  // const playSound = async () => {
  //   try {
  //     const { sound: soundObject, status } = await Audio.Sound.createAsync(notificationSound);
  //     await soundObject.playAsync();
  //   } catch (error) {
  //     console.error('Failed to play notification sound', error);
  //   }
  // };
  const BACKGROUND_FETCH_TASK = 'background-fetch';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, () => {
  // This is the task that will be executed in the background
  // Here you can handle your notifications or other background tasks

  console.log('Running background fetch task');

  return BackgroundFetch.Result.NewData;
});
  const createTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test Notification",
        body: "This is a test notification",
      },
      trigger: null,
    });
  };

  useEffect(() => {
    // Request audio permissions
    (async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true,
      });
    })();
  
    // Set the notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  
    // Set the notification channel for Android
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: 'default',
      });
    }
    // Register the background fetch task
  (async () => {
    const status = await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 15, // the minimum time interval (in minutes) at which background fetch can occur
      stopOnTerminate: false, // set to true if you want your task to run only while the app is running
      startOnBoot: true, // set to true if you want your task to run after the device boots up
    });

    if (status === BackgroundFetch.Result.Failed) {
      console.log('Failed to register background fetch task');
    }
  })();
  
    // Listen for socket events for complaint status changes
    socket.on("complaint-status-updated", async (data) => {
      const { message } = data.payload;
      setNotifications((prevNotifications) => [...prevNotifications, message]);
      setNewNotificationsCount((prevCount) => prevCount + 1);
  
      const notificationSound = require('../../assets/livechat-129007.mp3'); // replace with your audio file path
      // Play default notification sound
      try {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(notificationSound);
        await soundObject.playAsync();
      } catch (error) {
        console.error('Failed to play notification sound', error);
      }
  
      // Display a notification
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Complaint Status Updated",
          body: message,
        },
        trigger: null,
      });
    });
  
    // Subscribe to Expo's foreground events
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Received notification: ', notification);
      // Increment the notification count when a new notification is received
      setNewNotificationsCount((prevCount) => prevCount + 1);
    });
  
    // Emit a mock "complaint-status-updated" event for testing
    socket.emit("complaint-status-updated", {
      payload: {
        message: 'This is a test message',
      },
    });
  // createTestNotification();
    // Cleanup function
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
  
      // Unsubscribe from socket events
      socket.off("complaint-status-updated");
    };
  }, [socket]);
  

  const toggleNotificationView = () => {
    setShowAllNotifications(!showAllNotifications);
    if (!showAllNotifications) {
      setNewNotificationsCount(0); // Reset new notifications count when viewing all notifications
    }
  };
  

  return (
    user &&
    wssc && (
      <SafeAreaView style={Styles.container}>
        <View style={Styles.iconContainer}>
          <Image style={Styles.img} source={require("../../assets/Logo.png")} />
          <Text style={Styles.logoName}>{wssc.shortname}</Text>
        </View>
        <View style={Styles.iconContainer}>
          <TouchableOpacity onPress={toggleNotificationView}>
            <FontAwesome6 name="bell" size={25} color={COLORS.feedbackColor} />
            {newNotificationsCount > 0 && (
              <View style={Styles.notificationBadge}>
                <Text style={Styles.notificationCount}>
                  {newNotificationsCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          {showAllNotifications ? (
            // Render all notifications
            <View style={Styles.notificationContainer}>
              <ScrollView contentContainerStyle={Styles.notificationContent}>
                {notifications.map((notification, index) => (
                  <Text key={index} style={Styles.notificationText}>
                    {notification}
                  </Text>
                ))}
              </ScrollView>
            </View>
          ) : null}
          <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
            {user.profile_image ? (
              <Image style={Styles.img} source={{ uri: user.profile_image }} />
            ) : (
              <FontAwesome
                name="user-circle"
                size={35}
                color={COLORS.primary}
              />
            )}
          </TouchableOpacity>
        </View>
        {isMenuOpen && (
          <Animatable.View
            animation="fadeIn"
            duration={500}
            style={Styles.menu}
          >
            <View style={Styles.profile}>
              <Image
                source={
                  user.profile_image
                    ? { uri: user.profile_image }
                    : require("../../assets/Logo.png")
                }
                style={Styles.imgProfile}
              />
              <Text style={Styles.name}>{user.name}</Text>
            </View>
            <TouchableOpacity
              style={Styles.items}
              onPress={() => {
                navigation.navigate("Profile");
                setIsMenuOpen(false);
              }}
            >
              <Feather name="settings" size={20} color={COLORS.primary} />
              <Text style={Styles.item}>Settings</Text>
            </TouchableOpacity>
            <Text
              style={Styles.logout}
              onPress={() => {
                setIsMenuOpen(false);
                logOut();
              }}
            >
              Logout
            </Text>
          </Animatable.View>
        )}
      </SafeAreaView>
    )
  );
};

const Styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    backgroundColor: "#fff",
    paddingRight: 12,
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    position: "relative",
  },
  logoName: {
    fontSize: SIZES.large,
    fontWeight: "500",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  img: {
    height: 35,
    width: 35,
    borderRadius: 30,
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 20,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCount: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  notificationContainer: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    maxHeight: 200,
    width: 300,
    overflow: "hidden",
  },
  notificationContent: {
    flexGrow: 1,
  },
  notificationText: {
    fontSize: SIZES.medium,
    marginBottom: 5,
  },
  img: {
    height: 35,
    width: 35,
    borderRadius: 30,
  },
  imgProfile: {
    height: 25,
    width: 25,
    borderRadius: 30,
  },
  menu: {
    position: "absolute",
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 10,
    top: 80,
    right: 12,
    gap: 12,
    width: 180,
    ...SHADOWS.medium,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  items: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  name: {
    fontSize: SIZES.medium,
    fontWeight: "500",
  },
  item: {
    fontSize: SIZES.medium,
  },
  logout: {
    color: "#fff",
    backgroundColor: COLORS.closedColor,
    width: "fit-content",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    width: 65,
  },
});

export default Header;
