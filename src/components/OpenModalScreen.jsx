import React, { useEffect } from 'react';
import { View } from 'react-native';
import MyModal from './MyModal'; // Importa el componente de modal

export default function OpenModalScreen({ navigation }) {
  useEffect(() => {
    // Abre el modal cuando se carga esta pantalla
    navigation.navigate('Welcome', { openModal: true });
  }, []);

  return <View />;
}