import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { GlobalContextProvider } from './Context/globalContext';
import Container from './Components/Container';




export default function App() {
  return (
    <GlobalContextProvider>
      <Container/>
    </GlobalContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
