import react, { useEffect } from "react";
import TabNavigation from "./app/Navigator/TabNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import './Global.css'
import { Provider, useDispatch } from 'react-redux';
import store from './app/GlobalState/store';
import { SetUserData } from "./app/GlobalState/UserSlice";

const setStore = async () => {
  try {
    const storedWssc = await AsyncStorage.getItem('wssc');
    const wssc = JSON.parse(storedWssc);
    setWssc(wssc);
    const storedUser = await AsyncStorage.getItem('user');
    const user = JSON.parse(storedUser);
    setUser(user);
    const storedToken = await AsyncStorage.getItem('token');
    const token = JSON.parse(storedToken);

    useDispatch(SetUserData(user, wssc, token))
  } catch (error) {

  }
}



export default function App() {

  useEffect(() => {
    setStore()
  }, [])
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <TabNavigation />
      </SafeAreaProvider>
    </Provider>
  )
}


