import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Button, StyleSheet, Dimensions, Alert, Platform, ImageBackground, Image, ActivityIndicator, TouchableOpacity  } from 'react-native';
import Svg, { Circle, Rect, Path, G,Text } from 'react-native-svg';
import Header from './Header';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { useAuth } from './AuthContext';
import  Carnet  from './Carnet';
import Modal from 'react-native-modal';
import MyModal from './MyModal';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen({route}) {
  const navigation = useNavigation();
  let estado = route.params?.rolEstado;
  let rol = route.params?.rol;
  let codRol = route.params?.codRol;
  let programa = route.params?.programa;
  let codInst = route.params?.codInst;
  let documento1 = route.params?.documento;
  
  useEffect(() => {
    // Tu lógica para verificar el rol y navegar a 'Cambiar Rol'
    if (route.params?.rol === undefined) {
      navigation.navigate('Cambiar Rol');
    }
  }, [route.params?.rol, navigation]);


  const st0= {
    fill: '#E3061D',
  };
  const st1= {
    // fill-rule y clip-rule no tienen un equivalente directo en React Native.
    // Puedes intentar lograr un efecto similar utilizando otros estilos y capas.
    fill: '#FFFFFF',
  };
  const st2= {
    fontFamily: 'Tahoma-Bold',
  };
  const st3= {
    fontSize: 12,
  };
  const st4= {
    fontFamily: 'Tahoma',
  };
  const st5= {
    fontSize: 9,
  };
  const st6= {
    fontSize: 7,
  };
  const st7= {
    // stroke y stroke-miterlimit tienen un comportamiento diferente en React Native,
    // puedes ajustar el estilo según tus necesidades específicas.
    borderStyle: 'solid',
    borderColor: '#D9D8DC',
    borderWidth: 1,
  };
  const st8= {
    // stroke y stroke-width no tienen un equivalente directo en React Native,
    // en su lugar, puedes intentar ajustar el borderWidth para lograr un efecto similar.
    borderStyle: 'solid',
    borderColor: '#000000',
    borderWidth: 0.5,
  };
  const { token, codPersona,removeToken } = useAuth();

  const [documento, setDocumento] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [rh, setRh] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [secondData, setSecondDataValue] = useState([]);
  const [imagePath, setImagePath] = useState('');
  const [imageUrlPath, setImageUrlPath] = useState('');
  
  const container = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    textAlign: 'center',
    placeSelf: 'center',

    width:'100%'
  };

  const [imagePlace, setImage] = useState("");
  const [imagePlaceCB, setImageCB] = useState("");
  const [isLoadingImage, setLoadingImage] = useState(true);

  const loadImage = async () => {
    if(token!=null){
    let numeroDoc=0;
    if(codRol !== '1' && codRol !== '17' && codRol !== '18' && codRol !== '19' && codRol !== '23' && codRol !== '54' && codRol !== '56' && codRol !== '96' && codRol !== '400'){
      numeroDoc=documento;
    }else{
      numeroDoc=codInst;
    }
    console.log(numeroDoc)
    try {
      const res = await fetch(
        `http://181.79.9.80:8080/carnet/v1/qrcode?text=${numeroDoc}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const data = await res.blob();
      if(data!=null){
      const reader = new FileReader();
      reader.onload = () => {
        const base64data = reader.result;
        setImage(base64data);
        setLoadingImage(false);
      };
      reader.readAsDataURL(data);
    }

    console.log(imagePath);
      const res2 = await fetch(`http://181.79.9.80:8080/carnet/api/images/load?imageUrl=${imagePath}`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
          }
      });
  
      const data2 = await res2.blob();
      if (data2 != null) {
          const reader2 = new FileReader();
          reader2.onload = () => {
              const base64data2 = reader2.result;
              setImageUrlPath(base64data2);
              
              setLoadingImage(false);
          };
          reader2.readAsDataURL(data2);
      }
    } catch (error) {
      console.error(error);
    }
    
  }
  };

  useEffect(() => {
    loadImage();
  }, [documento, codRol, codInst, token]);

  const loadImageCB = async () => {
    let numeroDoc=0;
    if(codRol !== '1' && codRol !== '17' && codRol !== '18' && codRol !== '19' && codRol !== '23' && codRol !== '54' && codRol !== '56' && codRol !== '96' && codRol !== '400'){
      numeroDoc=documento;
    }else{
      numeroDoc=codInst;
    }
    if(token!=null){
    try {
      
      const res = await fetch(
        `http://181.79.9.80:8080/carnet/barcode/${numeroDoc}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.blob();
if(data!=null){
  const reader = new FileReader();
  reader.onload = () => {
    const base64data = reader.result;
    setImageCB(base64data);
  };
  reader.readAsDataURL(data);
}
      } else {
        // Manejar la respuesta de error
        const errorData = await res.text();
      }
      
      

    } catch (error) {
      console.error(error);
    }
  }
  };

  useEffect(() => {
    loadImageCB();
  });

  const fetchPersonaData = async (codPersona) => {
    if(token!=null){
    try {
      const response = await fetch(`http://181.79.9.80:8080/carnet/api/persona/${codPersona}`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      

      if (response.ok) {
        const data = await response.json();
      setDocumento(data.documento);
      if (data.nombre == null || data.nombre.trim().toLowerCase() === "null") {
  data.nombre = "";
}
if (data.nombre2 == null || data.nombre2.trim().toLowerCase() === "null") {
  data.nombre2 = "";
}
      setNombre(data.nombre+" "+data.nombre2);
if (data.apellido == null || data.apellido.trim().toLowerCase() === "null") {
  data.apellido = "";
}
if (data.apellido2 == null || data.apellido2.trim().toLowerCase() === "null") {
  data.apellido2 = "";
}
      setApellido(data.apellido+" "+data.apellido2);
      setRh(data.rh);
      } else {
        // Manejar la respuesta de error
        const errorData = await response.text();
        console.error('Error en la respuesta:', errorData);
        
      }
      

      // Realizar una segunda solicitud después de la primera
    const secondResponse = await fetch(`http://181.79.9.80:8080/carnet/api/participacion/${codPersona}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Asegúrate de definir 'token' en este contexto
      }
    });

    
    if (secondResponse.ok) {
      const Data2 = await secondResponse.json();
    setSecondDataValue(Data2);
    } else {
      // Manejar la respuesta de error
      const errorData = await secondResponse.text();
      console.error('Error en la respuesta:', errorData);
      
    }
      

    // Hacer algo con los datos de la segunda solicitud
    console.log(`Datos de la segunda solicitud:`, secondData[0]?.rol.rolNombre);

      

      // Realizar una segunda solicitud después de la primera
      const threeResponse = await fetch(`http://181.79.9.80:8080/carnet/api/soporte/${codPersona}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Asegúrate de definir 'token' en este contexto
        }
      });
  
      if (threeResponse.ok) {
        const Data3 = await threeResponse.json();
      console.log(Data3[0].path);
      const imageUrl = `https://siau.unillanos.edu.co:8443/ORION/ViewFilePDF?path=${Data3[0].path}`;
      console.log(imageUrl);
      setImagePath(imageUrl);
      } else {
        // Manejar la respuesta de error
        const errorData = await threeResponse.text();
        console.error('Error en la respuesta:', errorData);
        // Elimina el token (u otra acción que desees realizar)
      

      // Redirige al usuario al inicio de sesión
      /* navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      navigation.navigate('Login'); */
      }
      

      
        
  
      // Hacer algo con los datos de la segunda solicitud
      console.log(`Datos de la segunda solicitud:`, secondData[0]?.rol.rolNombre);
    } catch (error) {
      console.error(error);
    }
  }
  };


  const handleReloadImage = () => {
    setLoadingImage(true); // Establecer el estado de carga en "true" al hacer clic en el botón
    setReloadKey(reloadKey + 1); // Incrementa la clave de recarga para forzar la recarga de la imagen
  };

  useEffect(() => {
    fetchPersonaData(codPersona);
    
  }, [codPersona, token]);

  const [modalVisible, setModalVisible] = useState(true);
  const [selectedValue, setSelectedValue] = useState(null);


  const handleButtonPress = (value) => {
    rol = secondData[value]?.rol.rolNombre;
    codRol = secondData[value]?.rol.codRol;
    programa = secondData[value]?.pensumInscrito.pensum.programa.nombre;
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    
    // Verificar si el token ha expirado
    const isTokenExpired = token && token.exp && Date.now() >= token.exp * 100;

    if (isTokenExpired) {
      // Elimina el token (u otra acción que desees realizar)
      removeToken();

      // Redirige al usuario al inicio de sesión
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      navigation.navigate('Login');
    }
  }, [token, navigation, removeToken]);

  const { width, height } = Dimensions.get('window');

  const scaleFactor = width / 435; // 435 es el ancho original del SVG
  const svgWidth = 400 * scaleFactor;
  const svgHeight = 660 * scaleFactor; // 760 es la altura original del SVG

  return (
    <View style={container} width="100%">
      {isLoadingImage ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
      <Svg viewBox="0 0 155.9 255.1" width={svgWidth} height={height} top={height*0.1} style="margin-top: 30px, max-width: 135px; min-height: 760px;">
        
<Path id="Footer"  style={st0} d="M0,249.5c0,0,36.4,3.3,63.9,0c11.8-1.4,74.2-9.2,92-1.9v7.5H0V249.5z"/>
<Path id="Header" style={st0}  d="M0,51.8c0,0,18.5-7.9,42.7-7.1C66.9,45.7,78,48.3,78,48.3s22.5,5.3,45.2,2.5
	c18-2.2,31.2-10.9,32.7-12.7V0H0L0,51.8z"/>
<G id="Logo_universidad">
	<Path  style={st1}  d="M66.1,12.2h-2.3v6.6c0,0.5,0,0.8-0.1,1s-0.2,0.3-0.5,0.3s-0.4-0.1-0.5-0.3c-0.1-0.2-0.1-0.5-0.1-1v-6.6h-2.3
		v6.3c0,0.4,0,0.8,0.1,1.1c0,0.3,0.2,0.6,0.3,0.9c0.2,0.3,0.5,0.5,0.9,0.7s0.9,0.3,1.6,0.3c1.1,0,1.8-0.2,2.2-0.6s0.7-1.1,0.7-2.1
		V12.2L66.1,12.2z M67.7,21.3h1.8v-7.6l0,0l1.7,7.6h3v-9.1h-1.8v6.7l0,0l-1.5-6.7h-3.2V21.3L67.7,21.3z M78,12.2h-2.3v9.1H78V12.2
		L78,12.2z M80.9,21.3h3l1.7-9.1h-2.2l-1,7l0,0l-0.6-7h-2.5L80.9,21.3L80.9,21.3z M91.8,21.3v-1.4h-2.5v-3h2.4v-1.4h-2.4v-2h2.5
		v-1.4H87v9.1L91.8,21.3L91.8,21.3z M95.4,21.3v-4.2h0.4c0.2,0,0.4,0.1,0.6,0.3c0.2,0.2,0.3,0.4,0.3,0.7V20c0,0.2,0,0.4,0.1,0.7
		c0,0.2,0.1,0.4,0.3,0.6h2.3c-0.1-0.2-0.2-0.4-0.3-0.6C99,20.5,99,20.3,99,20.1v-1.9c0-0.6-0.1-1.1-0.4-1.3
		c-0.3-0.3-0.7-0.4-1.3-0.4l0,0c0.6-0.1,1.1-0.3,1.4-0.7c0.3-0.3,0.4-0.8,0.4-1.4c0-0.5-0.1-0.8-0.2-1.1c-0.2-0.3-0.4-0.5-0.7-0.6
		c-0.3-0.1-0.7-0.2-1.1-0.3c-0.4,0-0.9-0.1-1.6-0.1h-2.3v9.1h2.2V21.3z M95.4,13.5c0.5,0,0.8,0.1,1,0.3c0.1,0.2,0.2,0.5,0.2,0.9
		c0,0.5-0.1,0.8-0.2,0.9c-0.2,0.2-0.5,0.3-1,0.3V13.5L95.4,13.5z M106.5,15.5V14c0-0.4-0.1-0.7-0.2-0.9c-0.2-0.3-0.4-0.5-0.6-0.6
		c-0.3-0.2-0.6-0.3-0.9-0.3c-0.3-0.1-0.7-0.1-1.1-0.1c-0.9,0-1.7,0.2-2.2,0.5c-0.5,0.4-0.8,0.9-0.8,1.7c0,0.4,0.1,0.7,0.2,1
		s0.3,0.6,0.5,0.8c0.2,0.2,0.4,0.4,0.6,0.6s0.5,0.4,0.8,0.6c0.5,0.4,0.9,0.7,1.2,1c0.3,0.3,0.4,0.6,0.4,1.1c0,0.3-0.1,0.4-0.2,0.5
		s-0.3,0.2-0.5,0.2s-0.4-0.1-0.5-0.1c-0.1-0.1-0.1-0.3-0.1-0.5v-1.6h-2.3v1.7c0,0.4,0.1,0.7,0.2,1c0.2,0.3,0.4,0.5,0.7,0.6
		c0.3,0.2,0.6,0.3,0.9,0.3c0.3,0.1,0.7,0.1,1.1,0.1c1,0,1.7-0.2,2.2-0.6s0.7-1,0.7-1.9c0-0.4-0.1-0.7-0.2-1.1
		c-0.1-0.3-0.3-0.6-0.5-0.8c-0.2-0.2-0.4-0.5-0.6-0.6c-0.2-0.2-0.5-0.4-0.8-0.6c-0.5-0.4-0.8-0.6-1.1-0.9c-0.2-0.2-0.3-0.5-0.3-0.8
		c0-0.2,0-0.4,0.1-0.5s0.2-0.2,0.5-0.2c0.2,0,0.4,0.1,0.5,0.2c0.1,0.1,0.1,0.3,0.1,0.5v1.3h2.2V15.5z M110.3,12.2H108v9.1h2.3V12.2
		L110.3,12.2z M111.9,21.3h2.4c0.7,0,1.3-0.1,1.8-0.2s0.8-0.3,1.1-0.5c0.3-0.2,0.4-0.5,0.5-0.8s0.1-0.7,0.1-1.2v-3.3
		c0-0.7-0.1-1.2-0.2-1.6c-0.1-0.4-0.3-0.7-0.6-0.9c-0.3-0.2-0.6-0.4-1-0.4c-0.4-0.1-1-0.1-1.7-0.1h-2.4L111.9,21.3L111.9,21.3z
		 M114.2,13.5c0.3,0,0.5,0,0.7,0.1c0.2,0,0.3,0.1,0.4,0.2c0.1,0.1,0.1,0.2,0.1,0.4s0,0.4,0,0.8v3.8c0,0.5-0.1,0.8-0.2,1
		s-0.5,0.3-1,0.3V13.5L114.2,13.5z M121.8,17.7l0.4-4.1l0,0l0.4,4.1H121.8L121.8,17.7z M120.9,12.2l-1.7,9.1h2l0.4-2.2h1.3l0.3,2.2
		h2.3l-1.3-9.1L120.9,12.2L120.9,12.2z M126.8,21.3h2.4c0.7,0,1.3-0.1,1.8-0.2s0.8-0.3,1.1-0.5s0.4-0.5,0.5-0.8s0.1-0.7,0.1-1.2
		v-3.3c0-0.7-0.1-1.2-0.2-1.6c-0.1-0.4-0.3-0.7-0.6-0.9s-0.6-0.4-1-0.4c-0.4-0.1-1-0.1-1.7-0.1h-2.4L126.8,21.3L126.8,21.3z
		 M129.1,13.5c0.3,0,0.5,0,0.7,0.1c0.2,0,0.3,0.1,0.4,0.2c0.1,0.1,0.1,0.2,0.1,0.4s0,0.4,0,0.8v3.8c0,0.5-0.1,0.8-0.2,1
		c-0.1,0.2-0.5,0.3-1,0.3V13.5L129.1,13.5z M60.1,36.5h2.4c0.7,0,1.3-0.1,1.8-0.2c0.5-0.1,0.8-0.3,1.1-0.5c0.3-0.2,0.4-0.5,0.5-0.9
		c0.1-0.3,0.1-0.7,0.1-1.2v-3.3c0-0.7-0.1-1.3-0.2-1.7c-0.1-0.4-0.3-0.7-0.6-1c-0.3-0.2-0.6-0.4-1.1-0.4c-0.4-0.1-1-0.1-1.7-0.1H60
		L60.1,36.5L60.1,36.5z M62.5,28.5c0.3,0,0.6,0,0.7,0.1c0.2,0,0.3,0.1,0.4,0.2c0.1,0.1,0.1,0.2,0.1,0.4c0,0.2,0,0.4,0,0.8v3.8
		c0,0.5-0.1,0.8-0.2,1c-0.1,0.2-0.5,0.3-1,0.3V28.5L62.5,28.5z M71.5,36.5v-1.4H69v-3h2.4v-1.4H69v-2h2.5v-1.4h-4.9v9.3L71.5,36.5
		L71.5,36.5z M80,36.5v-1.4h-2.6v-7.9H75v9.3H80L80,36.5z M82.6,29.2c0-0.2,0-0.4,0.1-0.5s0.3-0.2,0.5-0.2s0.4,0.1,0.5,0.2
		s0.1,0.3,0.1,0.5v5.2c0,0.2,0,0.4-0.1,0.5s-0.3,0.2-0.5,0.2s-0.4-0.1-0.5-0.2c-0.1-0.1-0.1-0.3-0.1-0.5V29.2L82.6,29.2z M86.2,29.7
		c0-0.5-0.1-0.9-0.2-1.3c-0.2-0.4-0.4-0.6-0.6-0.8c-0.3-0.2-0.6-0.4-0.9-0.4C84,27,83.6,27,83.2,27s-0.8,0-1.2,0.1
		c-0.4,0.1-0.7,0.2-0.9,0.4c-0.3,0.2-0.5,0.5-0.7,0.8c-0.2,0.4-0.2,0.8-0.2,1.3v4.2c0,0.5,0.1,0.9,0.2,1.3c0.2,0.4,0.4,0.6,0.7,0.8
		c0.3,0.2,0.6,0.4,0.9,0.4c0.4,0.1,0.7,0.1,1.2,0.1c0.4,0,0.8,0,1.2-0.1c0.4-0.1,0.7-0.2,0.9-0.4c0.3-0.2,0.5-0.5,0.6-0.8
		c0.2-0.4,0.2-0.8,0.2-1.3v-4.1H86.2z M92.7,30.5V29c0-0.4-0.1-0.7-0.2-1c-0.2-0.3-0.4-0.5-0.6-0.6c-0.3-0.2-0.6-0.3-0.9-0.3
		C90.6,27,90.2,27,89.8,27c-0.9,0-1.7,0.2-2.2,0.6s-0.8,1-0.8,1.8c0,0.4,0.1,0.7,0.2,1s0.3,0.6,0.5,0.8c0.2,0.2,0.4,0.4,0.6,0.6
		s0.5,0.4,0.8,0.6c0.5,0.4,0.9,0.7,1.2,1c0.3,0.3,0.4,0.6,0.4,1.1c0,0.3,0,0.4-0.2,0.5c-0.1,0.1-0.3,0.2-0.5,0.2s-0.4-0.1-0.5-0.2
		c-0.1-0.1-0.1-0.3-0.1-0.6v-1.6h-2.4v1.7c0,0.4,0.1,0.7,0.2,1c0.2,0.3,0.4,0.5,0.7,0.6c0.3,0.2,0.6,0.3,0.9,0.3
		c0.4,0.1,0.7,0.1,1.1,0.1c1,0,1.7-0.2,2.2-0.6c0.5-0.4,0.8-1.1,0.8-1.9c0-0.4-0.1-0.7-0.2-1.1c-0.1-0.3-0.3-0.6-0.5-0.9
		c-0.2-0.2-0.4-0.5-0.7-0.7c-0.2-0.2-0.5-0.4-0.9-0.6c-0.5-0.4-0.9-0.7-1.1-0.9C89.1,29.6,89,29.3,89,29c0-0.2,0-0.4,0.1-0.5
		s0.3-0.2,0.5-0.2s0.4,0.1,0.5,0.2s0.1,0.3,0.1,0.5v1.3h2.5V30.5z M101.4,36.5v-1.4h-2.6v-7.9h-2.4v9.3H101.4L101.4,36.5z
		 M106.6,36.5v-1.4H104v-7.9h-2.4v9.3H106.6L106.6,36.5z M109.3,32.8l0.4-4.1l0,0l0.4,4.1H109.3L109.3,32.8z M108.4,27.2l-1.7,9.3h2
		l0.4-2.3h1.3l0.3,2.3h2.3l-1.3-9.3H108.4L108.4,27.2z M113.3,36.5h1.9v-7.8l0,0l1.8,7.8h3v-9.3h-1.9V34l0,0l-1.5-6.8h-3.3V36.5
		L113.3,36.5z M122.7,29.2c0-0.2,0-0.4,0.1-0.5s0.3-0.2,0.5-0.2s0.4,0.1,0.5,0.2s0.1,0.3,0.1,0.5v5.2c0,0.2,0,0.4-0.1,0.5
		s-0.3,0.2-0.5,0.2s-0.4-0.1-0.5-0.2c-0.1-0.1-0.1-0.3-0.1-0.5V29.2L122.7,29.2z M126.3,29.7c0-0.5-0.1-0.9-0.2-1.3
		c-0.2-0.4-0.4-0.6-0.6-0.8c-0.3-0.2-0.6-0.4-0.9-0.4c-0.4-0.1-0.7-0.1-1.2-0.1c-0.4,0-0.8,0-1.2,0.1c-0.4,0.1-0.7,0.2-1,0.4
		c-0.3,0.2-0.5,0.5-0.6,0.8c-0.2,0.4-0.2,0.8-0.2,1.3v4.2c0,0.5,0.1,0.9,0.2,1.3c0.2,0.4,0.4,0.6,0.6,0.8c0.3,0.2,0.6,0.4,1,0.4
		c0.4,0.1,0.7,0.1,1.2,0.1c0.4,0,0.8,0,1.2-0.1c0.4-0.1,0.7-0.2,0.9-0.4c0.3-0.2,0.5-0.5,0.6-0.8c0.2-0.4,0.2-0.8,0.2-1.3V29.7
		L126.3,29.7z M132.8,30.5V29c0-0.4-0.1-0.7-0.2-1c-0.2-0.3-0.4-0.5-0.6-0.6c-0.3-0.2-0.6-0.3-0.9-0.3c-0.3-0.1-0.7-0.1-1.2-0.1
		c-1,0-1.7,0.2-2.2,0.6s-0.8,1-0.8,1.8c0,0.4,0.1,0.7,0.2,1s0.3,0.6,0.5,0.8c0.2,0.2,0.4,0.4,0.6,0.6c0.2,0.2,0.5,0.4,0.8,0.6
		c0.5,0.4,0.9,0.7,1.2,1s0.4,0.6,0.4,1.1c0,0.3,0,0.4-0.2,0.5c-0.1,0.1-0.3,0.2-0.5,0.2s-0.4-0.1-0.5-0.2c-0.1-0.1-0.1-0.3-0.1-0.6
		v-1.6h-2.4v1.7c0,0.4,0.1,0.7,0.2,1c0.2,0.3,0.4,0.5,0.7,0.6c0.3,0.2,0.6,0.3,0.9,0.3c0.3,0.1,0.7,0.1,1.1,0.1c1,0,1.7-0.2,2.2-0.6
		c0.5-0.4,0.8-1.1,0.8-1.9c0-0.4-0.1-0.7-0.2-1.1c-0.1-0.3-0.3-0.6-0.5-0.9c-0.2-0.2-0.4-0.5-0.7-0.7c-0.2-0.2-0.5-0.4-0.8-0.6
		c-0.5-0.4-0.9-0.7-1.1-0.9c-0.2-0.2-0.3-0.5-0.3-0.8c0-0.2,0-0.4,0.1-0.5s0.3-0.2,0.5-0.2s0.4,0.1,0.5,0.2s0.1,0.3,0.1,0.5v1.3h2.4
		V30.5z"/>
	<G>
		<Path  style={st2} d="M39.6,13.4l-0.2-3.7c-0.6,0-1.1,0.1-1.7,0.2l0.8,5c0.7-0.1,1.4-0.2,2.1-0.2c0.3,0,0.5,0,0.8,0l-0.1-1.3
			C40.8,13.4,40.2,13.4,39.6,13.4z" fill='#fff'/>
		<Path  style={st2}  d="M36.2,14.3L35,10.7c-0.5,0.2-1,0.4-1.5,0.7l2.1,4.7c0.8-0.5,1.7-0.9,2.6-1.1l-0.4-1.2L36.2,14.3z" fill='#fff'/>
		<Path style={st2}  d="M29.1,14.9l1.7,1.4l-2.1-0.8c-0.4,0.5-0.7,1-1,1.5l4.2,2.7c0.2-0.3,0.4-0.6,0.6-0.9l-1.6-1.2l1.9,0.8
			c0.3-0.3,0.6-0.7,0.9-1l-3.5-3.7C29.8,14.1,29.4,14.5,29.1,14.9z" fill='#fff'/>
		<Path  style={st2}  d="M30.9,13.1l3.2,3.9c0.4-0.3,0.7-0.6,1.1-0.8l-3-4.1C31.8,12.4,31.4,12.7,30.9,13.1z" fill='#fff'/>
		<Path  style={st2}  d="M26.5,19.4l3.6,1.2l-0.3,0.8l-3.6-1.2c-0.1,0.6-0.3,1.1-0.4,1.7l5.1,0.9c0.1-0.9,0.4-1.7,0.8-2.5l-4.5-2.5
			C26.9,18.3,26.7,18.9,26.5,19.4z" fill='#fff'/>
		<Path style={st2}  d="M53.5,12.7c-3-3.3-7.4-5.4-12.2-5.6c-4.8-0.2-9.3,1.6-12.8,4.7c-3.3,3-5.4,7.3-5.6,12.2
			c-0.2,4.8,1.6,9.3,4.7,12.6c1.1,1.3,2.5,2.3,3.9,3.2c3.1,1.9,6.8,1,7.9-2.7c0.6-1.7,0-2.8-1-4c-1.5-1.8-4.5-5.3-4.1-7.2
			c0.2-1.1,0.6-2,1.3-2.6c0.7-0.6,1.8-0.9,3.4-0.8c3.2,0.1,4.5,3,4.5,3c0.1,0.1,0.2,0.2,0.3,0.3l9.4,4.2l-10.3-2.5
			c-0.6,0.4-1.2,0.6-2.1,0.5c-0.9-0.1-1.1-0.5-1.8-0.7c-0.7-0.2-1.6,0.6-0.8,1.5c0.8,0.9,3.2,3.2,3.3,4.9c0.6,4.1,0.7,7.5,6.1,6.9
			c1.5-0.1,3.6-1.8,5-3.1c3.3-3,5.4-7.3,5.6-12.2C58.4,20.5,56.6,16,53.5,12.7z M51.8,36.6c-1.4,1.3-3.4,3-5.4,2.9
			c-3.7-0.2-3.3-3.3-3.8-5.9c-0.1-1.4-1.7-3.5-3.4-5.1c0.5,0.3,1,0.5,1.8,0.5c0.7,0,1.2-0.2,1.9-0.5l11,2.1c0.3,0.1,0.6,0,0.8-0.3
			c0.1-0.3-0.1-0.7-0.4-0.9l-9.6-4.8c-0.4-0.8-2.1-3.4-5.4-3.5c-1.9-0.1-3.3,0.3-4.2,1.1c-1,0.8-1.5,1.9-1.8,3.3
			c-0.5,2.5,2.8,6.3,4.4,8.2c0.6,1.1,1,1.7,0.6,3c-0.7,2.4-3.2,3.6-5.5,2.3c-1.6-0.9-3-2-4.2-3.3c-2.8-3.1-4.5-7.2-4.3-11.7
			s2.2-8.5,5.2-11.4c3.1-2.8,7.2-4.5,11.8-4.3c4.5,0.2,8.5,2.2,11.4,5.3c2.8,3.1,4.5,7.2,4.3,11.7S54.8,33.8,51.8,36.6z" fill='#fff'/>
		<Path  style={st2} d="M54,17.6l-2.7,1.6l0.7,2l-0.6,0.3l-0.7-2L49.5,20c0.4,0.8,0.8,1.8,0.9,2.8l3.1-0.7L53,19.7l0.6-0.3l0.7,2.6
			l1.2-0.2C55.2,20.3,54.7,18.9,54,17.6z" fill='#fff'/>
		<Path style={st2}  d="M42.3,9.7l-0.5,5c0.4,0,0.8,0.1,1.1,0.2l0.2-1.3l1,0.3l-0.4,1.2c0.3,0.1,0.7,0.2,1,0.3l2-4.6
			C45.3,10.2,43.9,9.8,42.3,9.7z M44.4,12.8l-1.1-0.3l0.2-1.3l1.3,0.4L44.4,12.8z" fill='#fff'/>
		<Path  style={st2} d="M42.1,25.5c-0.1-0.7-2.2-2.3-2.7-1.4C38.8,24.9,41.4,25.7,42.1,25.5z" fill='#fff'/>
		<Path  style={st2}  d="M51.4,14.1l-3.7,3.5c0.7,0.6,1.2,1.3,1.6,2.1l4.4-2.6C53.1,16,52.3,15,51.4,14.1z M49.5,17.5l1.9-1.5l0.6,0.8
			L49.9,18L49.5,17.5z" fill='#fff'/>
		<Path  style={st2} d="M49.6,12.6l-1.3,1.7l0.7-2.2c-0.5-0.3-1.1-0.6-1.6-0.9L45,15.6c0.3,0.2,0.7,0.4,1,0.6l1.1-1.6l-0.7,2
			c0.4,0.2,0.7,0.5,1,0.8l3.5-3.7C50.5,13.3,50.1,12.9,49.6,12.6z" fill='#fff'/>
	</G>
</G>
<Text
 x="50%" textAnchor="middle" alignmentBaseline="middle"
 fontWeight="bold"
          y="134.778"
          fontSize="13"
          fill="#000000" 
          style={{width:"100%",
          justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    textAlign: 'center',
    placeSelf: 'center',}}
        >
          {nombre}
        </Text>
        <Text
         x="50%" textAnchor="middle" alignmentBaseline="middle" style={{width:"100%",
         justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center',
   placeSelf: 'center',}}
          y="149.2555"
          fontSize="10"
          fill="#000000" 
        >
          {apellido}
        </Text>
        <Text
         fontWeight="bold"
          x="15.1443"
          y="165.3148"
          fontSize="11"
          fill="#000000"
        >
          {documento}
        </Text>
        {(codRol === '1' || codRol === '17' || codRol === '18' || codRol === '19' || codRol === '23' || codRol === '54' || codRol === '56' || codRol === '96' || codRol === '400') && (
        <Text
        x="50%" textAnchor="middle" alignmentBaseline="middle"
          y="220.311"
          fontSize="5"
          fill="#000000"
        >
          {programa}
        </Text>
        )}
        {(codRol === '1' || codRol === '17' || codRol === '18' || codRol === '19' || codRol === '23' || codRol === '54' || codRol === '56' || codRol === '96' || codRol === '400') && (
        <Text
        x="50%" textAnchor="middle" alignmentBaseline="middle"
        fontWeight="bold"
          y="230.311"
          fontSize="9"
          fill="#000000"
        >
          {rol}
        </Text>
        )}
        {(codRol !== '1' && codRol !== '17' && codRol !== '18' && codRol !== '19' && codRol !== '23' && codRol !== '54' && codRol !== '56' && codRol !== '96' && codRol !== '400') && (
        <Text
        fontWeight="bold"
        x="50%" textAnchor="middle" alignmentBaseline="middle"
          y="230.311"
          fontSize="10"
          fill="#000000"
        >
          {rol}
        </Text>
        )}
        <Text
          x="7.4539"
          y="220.1772"
          fontSize="7"
          fill="#000000" 
        >
        </Text>
        <Text
         fontWeight="bold"
          x="106.4103"
          y="165.3146"
          fontSize="11"
          fill="#000000" 
        >
          RH: {rh}
        </Text>

<Rect x="74.8" y="223.3" width="68.3" height="19.6"  fill="#ffffff00"/>

      </Svg>
      {/* <Button title="Solicitar Codigos" onPress={handleReloadImage} style={{ position:'absolute',bottom: '20%',}} /> */}
              <Image
                source={{ uri: imagePlace }}
                style={{  bottom: (height-(height*0.72)),
    width: (width-260),
    height: 120,
    resizeMode: 'contain', maxWidth: width }} id="QR" x="63.2" y="200.7" 
              />
            
              <Image
                source={{ uri: imagePlaceCB }}
                style={{ bottom: (height-(height*0.78)),
                width: (width-(width*0.2)),
                height: 40,
                resizeMode: 'contain', }} id="QR" x="183.2" y="190.7" 
              />
            
      
      </>
      )}
 
      <Image source={{ uri: imageUrlPath }} alignment-baseline="middle" text-anchor="middle" stroke="none"
       x="49.9" y="82.8"  style={{width: '30%',height: '25%', position:'absolute',bottom: height-(height*0.53),resizeMode: 'contain',}} />
    
    {/* <TouchableOpacity onPress={openModal}>
        <Text>Abrir Modal</Text>
      </TouchableOpacity>
    <Text>Valor seleccionado: {selectedValue}</Text>
      <MyModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onButtonPress={handleButtonPress}
        secondData={secondData}
      /> */}
    </View>
    
  );
};


