import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from '../screens/Signin';
import SignUp from '../screens/SignUp';
import ComplaintScreen from '../screens/ComplaintScreen';
import RecievedComplaint from '../screens/RecievedComplaint';
import InProgressComplaint from '../complaints/InProgressComplaint';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Recieved'>
      <Stack.Screen name="signin" component={Signin} options={{headerShown:false}}/>
      <Stack.Screen name='signup' component={SignUp} options={{headerShown:false}}/>
      <Stack.Screen name="Complaints" component={ComplaintScreen} options={{headerShown:false}} />
      <Stack.Screen name='Recieved' component={RecievedComplaint} options={{headerShown:false}} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
