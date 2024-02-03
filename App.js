import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigator/AppNavigator'; // Path to your AppNavigator
import { AuthProvider } from './src/context/Authentication';
const App = () => {
  return (
    <AuthProvider>
      
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>

    </AuthProvider>
    );
};

export default App;
