import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const Loading = ({ navigation, msg }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${msg && msg + ' '}Please wait`}</Text>
      <ActivityIndicator size='large' />
    </View>
  );
};

export default Loading;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: { marginBottom: 5 },
});
