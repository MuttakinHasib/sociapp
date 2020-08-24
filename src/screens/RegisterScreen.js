import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as firebase from 'firebase';

const RegisterScreen = ({ navigation }) => {
  const { width } = Dimensions.get('window');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const wrapper = require('../assets/authHeader.png');

  const handleSignUp = async () => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials =>
          userCredentials.user.updateProfile({ displayName: name })
        );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#f4f4f4' />
      <Image
        source={wrapper}
        style={{ marginTop: -150, marginLeft: -70, width: width + 70 }}
      />
      <Text style={styles.greeting}>{`Hello\nSign up to get started`}</Text>

      <View style={styles.errMsg}>
        {error && <Text style={styles.err}>{error}</Text>}
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.inputText}
          autoCapitalize='none'
          onChangeText={name => setName(name)}
          value={name}
          placeholder='Full Name'
        />
        <TextInput
          style={styles.inputText}
          autoCapitalize='none'
          onChangeText={email => setEmail(email)}
          value={email}
          placeholder='E-mail Address'
        />
        <TextInput
          style={styles.inputText}
          autoCapitalize='none'
          onChangeText={password => setPassword(password)}
          secureTextEntry
          value={password}
          placeholder='Password'
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
        <Text style={styles.btnText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: '#414959', fontSize: 13, textAlign: 'center' }}>
          Already created an account ?{' '}
          <Text style={{ color: '#e9446a', fontWeight: '500' }}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  greeting: {
    marginTop: 35,
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
  },
  errMsg: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  err: {
    color: '#e9446a',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    marginBottom: 30,
  },
  inputText: {
    color: '#8a8f9e',
    borderColor: '#8a8f9e',
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#f36',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
