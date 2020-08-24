import React from 'react';
import * as firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoadingScreen from './src/screens/LoadingScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { SafeAreaView } from 'react-native';
import { firebaseConfig } from './firebase/config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

const Navigator = () => (
  <Stack.Navigator headerMode='none' initialRouteName='Loading'>
    <Stack.Screen name='Loading' component={LoadingScreen} />
    <Stack.Screen name='Home' component={HomeScreen} />
    <Stack.Screen name='Login' component={LoginScreen} />
    <Stack.Screen name='Register' component={RegisterScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default App;
