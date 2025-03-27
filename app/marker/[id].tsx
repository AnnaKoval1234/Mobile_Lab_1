import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ImagePickerResult, launchImageLibraryAsync } from 'expo-image-picker';
import { MarkerData, ImageData } from '../../types';
import { MarkerContext } from '@/components/MarkerContext';
import  ImageList  from '@/components/ImageList';

export default function MarkerDetailScreen() {

  const { id } = useLocalSearchParams();
  const state = useContext(MarkerContext);
  const foundMarker = state.markers.find(marker => marker.id === id);

  const addImage = async () => {
    try {
      const result: ImagePickerResult = await launchImageLibraryAsync();
      if (!result.canceled) {
        const image: ImageData = {
          id: Date.now().toString(),
          uri: result.assets[0].uri
        }
        
        const updatedMarker: MarkerData = {
            ...foundMarker!,
            images: [...foundMarker!.images, image],
        };

        state.setMarkers(prevMarkers => prevMarkers.map(marker => marker.id === id ? updatedMarker : marker));
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось выбрать изображение.');
    }
  };

  const deleteImage = (i: ImageData) => {
    const updatedMarker: MarkerData = {
      ...foundMarker!,
      images: foundMarker!.images.filter(image => image.id !== i.id),
    };

    state.setMarkers(prevMarkers => prevMarkers.map(marker => marker.id === id ? updatedMarker : marker));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Широта: {foundMarker?.coordinate.latitude.toFixed(2)}    Долгота: {foundMarker?.coordinate.longitude.toFixed(2)}</Text>
      <ImageList images={foundMarker!.images} onDelete={deleteImage}/>
      <Button title="Добавить изображение" onPress={addImage}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    textAlign: 'center',
  }
});
