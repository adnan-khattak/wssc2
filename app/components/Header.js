import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
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
import * as Device from 'expo-device';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true, // Set this to true
    shouldSetBadge: false,
  }),
});

const Header = () => {
  const dispatch = useDispatch();
  const { wssc, user } = useSelector((state) => state.app);
  const [notifications, setNotifications] = useState([]);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [sound, setSound] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const navigation = useNavigation();
  const socket = io("http://172.16.112.112:7000");


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
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotifications(prevNotifications => [...prevNotifications, notification.request.content.body]);
      setNewNotificationsCount(prevCount => prevCount + 1);
    });  
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
  
    // Listen for the "complaint-status-updated" event
    socket.on('complaint-status-updated', async data => {
      const { message } = data.payload;
      setNotifications(prevNotifications => [...prevNotifications, message]);
      setNewNotificationsCount(prevCount => prevCount + 1);

  
      // Schedule a push notification
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "You've got mail! 📬",
            body: message,
            data: { data: 'goes here' },
            sound: true,
          },
          trigger: { seconds: 2 },
        });
      } catch (error) {
        console.error('Error scheduling push notification:', error);
      }
    });

    return () => {
      // Cleanup: Remove notification subscriptions and disconnect socket
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      socket.current.disconnect();
    };
  }, []);
  
  const registerForPushNotificationsAsync = async () => {
    let token = null; // Initialize token

    try {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      if (Platform.OS !== 'web') {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          throw new Error('Failed to get push token for push notification!');
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token); // Log the token
      } else {
        throw new Error('Must use physical device for Push Notifications');
      }
    } catch (error) {
      console.error(error); // Log the error
    }

    return token;
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
        <View style={Styles.iconContainer}>
          <TouchableOpacity onPress={() => setShowAllNotifications(prev => !prev)}>
            <FontAwesome6 name="bell" size={25} color={COLORS.feedbackColor} />
            {newNotificationsCount > 0 && (
              <View style={Styles.notificationBadge}>
                <Text style={Styles.notificationCount}>
                  {newNotificationsCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          {showAllNotifications && (
            <View style={Styles.notificationContainer}>
              <ScrollView contentContainerStyle={Styles.notificationContent}>
                {notifications.map((notification, index) => (
                  <Text key={index} style={Styles.notificationText}>
                    {notification}
                  </Text>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black color
  },
 
});

export default Header;