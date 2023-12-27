import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from '../screens/Signin';
import SignUp from '../screens/SignUp';
import ComplaintScreen from '../complaints/component/PendingComplaint';
import RecievedComplaint from '../complaints/component/RecievedComplaint';
import InProgressComplaint from '../complaints/component/InProgressComplaint';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='signinr'>
      <Stack.Screen name="signin" component={Signin} options={{headerShown:false}}/>
      <Stack.Screen name='signup' component={SignUp} options={{headerShown:false}}/>
      <Stack.Screen name='home' component={HomeScreen} options={{headerShown:false}} />
      <Stack.Screen name='Recieved' component={RecievedComplaint} options={{headerShown:false}} />
      <Stack.Screen name='complaint' component={ComplaintScreen} options={{headerShown:false}} />
      
    </Stack.Navigator>
  );
};

export default AppNavigator;
