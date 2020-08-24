import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const isSignedIn = async () =>
      await firebase
        .auth()
        .onAuthStateChanged(user =>
          navigation.navigate(user ? 'Home' : 'Login')
        );
    isSignedIn();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loading...</Text>
      <ActivityIndicator size='large' />
    </View>
  );
};

// LoadingScreen.navigationOptions = () => {
//   return {
//     header: null,
//   };
// };
export default LoadingScreen;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: { marginBottom: 5 },
});
