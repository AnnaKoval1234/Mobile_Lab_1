import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MarkerContext, MarkerContextType } from '@/components/MarkerContext';
import { useState } from 'react';
import { MarkerData } from '@/types';

export default function RootLayout() {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const cstate: MarkerContextType = {
    markers: markers,
    setMarkers: setMarkers
  }
  return (
    <MarkerContext.Provider value={cstate}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Карта' }} />
        <Stack.Screen name="markers/[id]" options={{ title: 'Детали' }} />
      </Stack>
      <StatusBar style="light" />
    </MarkerContext.Provider>
  );
}
