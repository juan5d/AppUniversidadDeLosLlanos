import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';

const ImageLoader = ({ documento, token }) => {
  const [imagePlace, setImage] = useState("");
  const [imagePlaceCB, setImageCB] = useState("");
  const [loading, setLoading] = useState(true);

  const loadImage = async () => {
    try {
      const res = await fetch(
        `https://4f32-191-107-182-249.ngrok-free.app/v1/qrcode?text=${documento}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const data = await res.blob();

      // Lee los datos de la imagen como una URL de datos base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64data = reader.result;
        setImage(base64data);
        setLoading(false); // Cambiar el estado a "false" cuando la imagen haya cargado
      };
      reader.readAsDataURL(data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadImage();
  }, []);

  const loadImageCB = async (documento, token) => {
    try {
      const res = await fetch(
        `https://4f32-191-107-182-249.ngrok-free.app/barcode/${documento}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.blob();

      // Lee los datos de la imagen como una URL de datos base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64data = reader.result;
        setImageCB(base64data);
      };
      reader.readAsDataURL(data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadImageCB();
  }, []);

  return (
    <View>
      <View>
        {loading ? (
          <Text>Cargando imagen...</Text>
        ) : (
          <>
            {imagePlace ? (
              <Image
                source={{ uri: imagePlace }}
                style={{ width: 150, height: 150 }}
              />
            ) : (
              <Text>Error al cargar la imagen</Text>
            )}
            {imagePlaceCB ? (
              <Image
                source={{ uri: imagePlaceCB }}
                style={{ width: 280, height: 50 }}
              />
            ) : (
              <Text>Error al cargar la imagen</Text>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default ImageLoader;
