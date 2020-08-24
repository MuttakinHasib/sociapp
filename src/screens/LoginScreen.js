import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as Google from 'expo-google-app-auth';
import Loading from '../components/Loading';
import { onSignIn } from '../../auth/firebaseAuth';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const { width } = Dimensions.get('window');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const wrapper = require('../assets/authHeader.png');

  const handleLogin = async () => {
    setLoading(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => setError(err.message));
    setLoading(false);
  };
  
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '420603333466-bp9m7dtlt39s9gj2l0r3134n00sjur1i.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        onSignIn(result);
        navigation.navigate('Home');
        setLoading(false);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      setError(e.message);
      return { error: true };
    }
  };
  // 420603333466-bp9m7dtlt39s9gj2l0r3134n00sjur1i.apps.googleusercontent.com

  return loading ? (
    <Loading msg='Sign in' />
  ) : (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#f4f4f4' />
      <Image
        source={wrapper}
        style={{ marginTop: -150, marginLeft: -70, width: width + 70 }}
      />
      <Text style={styles.greeting}>{`Hi there\nWelcome back`}</Text>

      <View style={styles.errMsg}>
        {error && <Text style={styles.err}>{error}</Text>}
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.inputText}
          autoCapitalize='none'
          onChangeText={email => setEmail(email)}
          value={email}
          placeholder='E-mail address...'
        />
        <TextInput
          style={styles.inputText}
          autoCapitalize='none'
          onChangeText={password => setPassword(password)}
          secureTextEntry
          value={password}
          placeholder='Password ...'
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={signInWithGoogle}>
        <View style={styles.googleButton}>
          <Image
            source={require('../assets/google-icon.png')}
            style={styles.googleIcon}
          />
          <Text
            style={{
              letterSpacing: 0.5,
              fontSize: 16,
              color: '#707070',
            }}
          >
            Continue with Google
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: '#414959', fontSize: 13, textAlign: 'center' }}>
          New to Soci App ?{' '}
          <Text style={{ color: '#e9446a', fontWeight: '500' }}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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
    marginBottom: 15,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  googleButton: {
    backgroundColor: '#fff',
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    borderRadius: 4,
  },
  googleIcon: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
});
