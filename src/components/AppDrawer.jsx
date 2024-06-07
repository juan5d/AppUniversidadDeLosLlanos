import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
// Pantallas de la aplicación
import LoginScreen from './LoginScreen';
import WelcomeScreen from './WelcomeScreen';

// Componente personalizado para el contenido del menú
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('WelcomeScreen')}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

export default AppDrawer;