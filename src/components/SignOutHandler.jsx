import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';

const SignOutHandler = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        // Realiza la lógica de cierre de sesión, como borrar el token
        await logout();

        // Navega de nuevo a la pantalla de inicio de sesión
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        navigation.navigate('Login');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    };

    handleSignOut(); // Llama a la función cuando el componente se monta

    // No olvides retornar un cleanup si es necesario
    return () => {
      // Código de cleanup si es necesario
    };
  }, [navigation, logout]);

  // Puedes mostrar algún indicador de carga o mensaje si lo deseas
  return null;
};

export default SignOutHandler;