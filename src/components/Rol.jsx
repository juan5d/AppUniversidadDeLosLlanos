
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useAuth } from './AuthContext';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Rol() {
    const navigation = useNavigation();
      const { token, codPersona } = useAuth();
      const [secondData, setSecondDataValue] = useState([]);
      const fetchPersonaData = async (codPersona) => {
        try {
      
          // Realizar una segunda solicitud después de la primera
        const secondResponse = await fetch(`http://181.79.9.80:8080/carnet/api/participacion/${codPersona}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Asegúrate de definir 'token' en este contexto
          }
        });
      
        const Data2 = await secondResponse.json();
        setSecondDataValue(Data2);
          
      
        // Hacer algo con los datos de la segunda solicitud
        console.log(`Datos de la segunda solicitud:`, secondData[0]?.rol.rolNombre);
      
          
        } catch (error) {
          console.error(error);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login'}], // 'Main' es el nombre de la pantalla del menú hamburguesa
          });
          navigation.navigate('Login');
        }
      };
      useEffect(() => {
        fetchPersonaData(codPersona);
      }, []);

      const onButtonPress = (value) => {
        let rol=secondData[value]?.rol.rolNombre;
        let codRol = secondData[value]?.rol.codRol;
        let programa= secondData[value]?.pensumInscrito?.pensum?.programa.nombre
        let codInst= secondData[value]?.codInst;
        let documento= secondData[value]?.codPersona;
        
        navigation.navigate('Inicio', {
            rol,
            codRol,
            programa,
            codInst,
            documento
          });
      };
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Selecciona una opción:</Text>
        {secondData && secondData.length > 0 ? (
          secondData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onButtonPress(index)}
              style={{ padding: 10, margin: 5, backgroundColor: 'lightblue', borderRadius: 5 }}
            >
              <Text>{item?.rol.rolNombre}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No hay datos disponibles</Text>
        )}
      </View>
  );
};
