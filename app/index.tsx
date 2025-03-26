import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, LongPressEvent } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { MarkerData } from '@/types';
import MarkerList from '@/components/MarkerList';
import { MarkerContext } from '@/components/MarkerContext';

export default function Index() {

    const router = useRouter();
    const state = useContext(MarkerContext);

    const handleLongPress = (event: LongPressEvent) => {
        const newMarker: MarkerData = {
            id: Date.now().toString(),
            coordinate: event.nativeEvent.coordinate,
            images: [],
        };
        state.setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    };

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 58.00,
            longitude: 56.19,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onLongPress={handleLongPress}>
            <MarkerList
              markers={state.markers}
              onMarkerPress={(m) => router.push({pathname: "/marker/[id]", params: { id: m.id }})}>
            </MarkerList>
        </MapView>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
