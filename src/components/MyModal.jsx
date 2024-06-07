
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const MyModal = ({ isVisible, onClose, onButtonPress, secondData }) => {
  return (
    <Modal isVisible={isVisible} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
      <TouchableOpacity
        onPress={onClose}
        style={{ position: 'absolute', top: 10, right: 10, borderRadius: 50, padding: 10, backgroundColor: 'lightgray' }}
      >
        <Text>X</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text  style={{ fontSize: 18, fontWeight: 'bold',color: 'green', }}>Bienvenido</Text>
        <Text  style={{ fontSize: 18, margin: 5,textAlign: 'justify' }}>Es necesario seleccionar un rol, una vez seleccionado es necesario oprimir el boton</Text>
        <Text  style={{ fontSize: 18, fontWeight: 'bold',color: 'white',backgroundColor: 'rgb(29, 128, 239)', }}>'Generar los Codigos' </Text>
        <TouchableOpacity onPress={onClose}>
          <Text>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MyModal;