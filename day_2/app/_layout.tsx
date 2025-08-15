import { NoteProvider } from '@/contexts/noteContext';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

const StackLayout = () => {
  return <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="(notes)"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="formModal"
      options={{ headerShown: false, presentation: 'modal' }}
    />
  </Stack>
}


const RootLayout = () => {
  return (
    <NoteProvider>
      <StackLayout />
    </NoteProvider>
  );
}


export default RootLayout

const styles = StyleSheet.create({})