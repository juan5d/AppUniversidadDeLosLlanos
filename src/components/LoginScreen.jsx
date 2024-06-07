import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
  ImageBackground,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, Text, Linking } from 'react-native';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isMobile, setIsMobile] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    const { width, height } = Dimensions.get('window');
    setIsMobile(width < 768);
  }, []);

  const handleLinkPress = async () => {
    const url = 'http://unillanos.edu.co/';
    await Linking.openURL(url);
  };

  const toggleErrorModal = () => {
    setErrorModalVisible(!isErrorModalVisible);
  };

  async function handleLogin() {
    const loginData = {
      nickname: username,
      password: password,
    };

    axios
      .post('http://181.79.9.80:8080/carnet/user/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
      .then(response => {
        const { data } = response;
        const token = data.token;
        const codPersona = data.codPersona;

        const userData = {
          token: token,
          codPersona: codPersona,
        };

        login(userData);

        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
        navigation.navigate('Main');
      })
      .catch(error => {
        console.error('Axios Error:', error);

        /* Alert.alert(
          'Error',
          'Fallo en conexión. ' + error.message,
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ]
        ); */

        setErrorModalVisible(!isErrorModalVisible);
      });
  }

  const renderMobileView = () => (
    <ImageBackground style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.formContainer2}>
          <Image
            source={require('./../../assets/Logo.png')}
            style={styles.logo}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nombre de usuario"
              onChangeText={setUsername}
              value={username}
            />
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Contraseña"
                secureTextEntry={!showPassword}
                onChangeText={setPassword}
                value={password}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Icon
                  name={showPassword ? 'eye' : 'eye-slash'}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <Button title="Iniciar sesión" onPress={handleLogin} />
          </View>
        </View>
      </View>
      <Text
        style={{
          color: '#73879c',
          justifyContent: 'flex-end',
          textAlign: 'center',
        }}
      >
        ©2018 Todos los derechos reservados{' '}
        <Text
          style={{ color: '#73879c', textDecorationLine: 'underline' }}
          onPress={handleLinkPress}
        >
          Universidad de los Llanos
        </Text>
      </Text>
      <Text
        style={{ color: '#73879c', textDecorationLine: 'underline' }}
        onPress={handleLinkPress}
      >
        Términos - Política de privacidad
      </Text>
      <Modal
        isVisible={isErrorModalVisible}
        onBackdropPress={toggleErrorModal}
        backdropColor="white"
        style={styles.formContainer}
      >
        <View style={styles.errorModal}>
          <View alignItems="center">
            <Icon name="exclamation-triangle" size={50} color="red" />
            <Text style={styles.errorTitle}>Error</Text>
            <Text style={styles.errorMessage}>
              Inicio de sesión fallido. Verifica tus credenciales.
            </Text>
          </View>
          <Button
            padding="10px"
            title="OK"
            minWidth={100}
            onPress={toggleErrorModal}
          />
        </View>
      </Modal>
    </ImageBackground>
  );

  const renderPCView = () => (
    <ImageBackground style={styles.pcContainer}>
      <View style={styles.pcContent}>
        <Image
          source={require('./../../assets/Logo.png')}
          style={styles.logo}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            onChangeText={setUsername}
            value={username}
          />
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={showPassword ? 'eye' : 'eye-slash'}
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <Button title="Iniciar sesión" onPress={handleLogin} />
        </View>
      </View>
      <Modal
        isVisible={isErrorModalVisible}
        onBackdropPress={toggleErrorModal}
        backdropColor="white"
        style={styles.formContainer}
      >
        <View style={styles.errorModal}>
          <View alignItems="center">
            <Icon name="exclamation-triangle" size={50} color="red" />
            <Text style={styles.errorTitle}>Error</Text>
            <Text style={styles.errorMessage}>
              Inicio de sesión fallido. Verifica tus credenciales.
            </Text>
          </View>
          <Button
            padding="10px"
            title="OK"
            minWidth={100}
            onPress={toggleErrorModal}
          />
        </View>
      </Modal>
    </ImageBackground>
  );

  return isMobile ? renderMobileView() : renderPCView();
};

const styles = StyleSheet.create({
  // Estilos para tu alerta personalizada
  errorModal: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 30,
  },
  errorTitle: {
    fontSize: 24,
    color: 'red',
    marginBottom: 15,
  },
  errorMessage: {
    fontSize: 14,
    marginBottom: 30,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pcContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
  },
  formContainer2: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  pcContent: {
    minWidth: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  logo: {
    width: 320,
    height: 100,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    minWidth: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 12,
    paddingLeft: 8,
  },
  passwordInput: {
    flex: 1,
    height: 40,
  },
});

export default LoginScreen;