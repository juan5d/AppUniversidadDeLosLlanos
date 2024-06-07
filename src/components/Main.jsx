import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './WelcomeScreen';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Rol from './Rol';
import { useAuth } from './AuthContext';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SignOutHandler from './SignOutHandler';


export default function Main() {
  const navigation = useNavigation();
  const Menu = createDrawerNavigator();
  const { logout } = useAuth(); 

  const handleSignOut = async () => {
    // Realiza la lógica de cierre de sesión, como borrar el token
    await logout();

    // Navega de nuevo a la pantalla de inicio de sesión
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login'}], // 'Main' es el nombre de la pantalla del menú hamburguesa
    });
    navigation.navigate('Login');
  };

  return (
        <Menu.Navigator initialRouteName="Inicio" initialParams={ {rolEstado:true} }> 
          <Menu.Screen
            name="Inicio"
            component={WelcomeScreen}
            initialParams={ {rolEstado:false} }
          />
          <Menu.Screen
            name="Cambiar Rol"
            component={Rol}
          />
          <Menu.Screen
          name="Cerrar Sesión"
          options={{
            drawerIcon: () => null,
          }}
          component={SignOutHandler}
      />
          
        </Menu.Navigator>
  );
}
