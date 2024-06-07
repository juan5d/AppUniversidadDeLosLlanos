import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/components/LoginScreen';
import 'react-native-gesture-handler';
import * as Animated from 'react-native-reanimated';
import { AuthProvider } from './src/components/AuthContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from './src/components/Main';
const Stack = createStackNavigator();


export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false, // Oculta la barra de navegación en la pantalla de inicio de sesión
            }}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown: false, // Oculta la barra de navegación en la pantalla de inicio de sesión
            }}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
      </AuthProvider>
  );
}