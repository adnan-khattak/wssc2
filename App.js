import react, { useEffect, useState} from "react";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";
import TabNavigation from "./app/Navigator/TabNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./Global.css";
import { Provider, useDispatch } from "react-redux";
import store from "./app/GlobalState/store";
import { SetUserData } from "./app/GlobalState/UserSlice";
import Header from "./app/components/Header";

const setStore = async () => {
  try {
    const storedWssc = await AsyncStorage.getItem("wssc");
    const wssc = JSON.parse(storedWssc);
    setWssc(wssc);
    const storedUser = await AsyncStorage.getItem("user");
    const user = JSON.parse(storedUser);
    setUser(user);
    const storedToken = await AsyncStorage.getItem("token");
    const token = JSON.parse(storedToken);

    useDispatch(SetUserData(user, wssc, token));
  } catch (error) {}
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    setStore();
  }, []);
  const handleTouch = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  return (
    <Provider store={store}>
      <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={handleTouch}>
          <View style={{ flex: 1 }}>
            <TabNavigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    </Provider>
  );
}
