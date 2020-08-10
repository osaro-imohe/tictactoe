import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Results from './Results';
import Game from './Game';
import { GlobalContext } from '../Context/globalContext';

const Stack = createStackNavigator();
const Container = () => {
  const { state } = useContext(GlobalContext);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Results">
        {state.isPlaying ? (
          <>
            <Stack.Screen name="Game" component={Game} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Results" component={Results} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Container;
