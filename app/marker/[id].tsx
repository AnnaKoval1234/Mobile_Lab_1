import React, { useContext, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, Image, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ImagePickerResult, launchImageLibraryAsync } from 'expo-image-picker';
import { MarkerData, ImageData } from '../../types';
import { MarkerContext } from '@/components/MarkerContext';
import  ImageList  from '@/components/ImageList';

export default function MarkerDetailScreen() {

  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [images, setImages] = useState<ImageData[]>([]);
  const state = useContext(MarkerContext);
  const foundMarker = state.markers.find(marker => marker.id === id);

  console.log(state.markers);

  const addImage = async () => {
    try {
      const result: ImagePickerResult = await launchImageLibraryAsync();
      if (!result.canceled) {
        const image: ImageData = {
          id: Date.now().toString(),
          uri: result.assets[0].uri
        }
        setImages([...images, image]);
        
        const updatedMarker: MarkerData = {
            ...foundMarker!,
            images: [...foundMarker!.images, image],
        };

        state.setMarkers(prevMarkers => prevMarkers.map(marker => marker.id === id ? updatedMarker : marker));
        console.log(state);
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось выбрать изображение.');
    }
  };

  const removeImage = (item: ImageData) => {
    setImages(images.filter(image => image.id !== item.id));

    const updatedMarker: MarkerData = {
      ...foundMarker!,
      images: images,
  };

  state.setMarkers(prevMarkers => prevMarkers.map(marker => marker.id === id ? updatedMarker : marker));
  };

  return (
    <View style={styles.container}>
      <Text>Информация о маркере: {foundMarker?.id}</Text>
      <ImageList images={foundMarker!.images} onDelete={removeImage}/>
      <Button title="Добавить изображение" onPress={addImage}/>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
