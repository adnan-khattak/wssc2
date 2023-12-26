import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignUp from './src/screens/SignUp'
import Signin from './src/screens/Signin'
import ComplaintScreen from './src/screens/ComplaintScreen'

const Stack = createNativeStackNavigator();
export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      {/* <Stack.Screen name="signup" component={SignUp} options={{headerShown:false}}/> */}
      {/* <Stack.Screen name='signin' component={Signin} options={{headerShown:false}} /> */}
      <Stack.Screen name='comlaintscreen' component={ComplaintScreen} options={{headerShown:false}} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}