import React, {useState, useContext} from 'react';
import Results from './Results';
import Game from './Game';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalContext} from '../Context/globalContext';


const Stack = createStackNavigator();
const Container = () => {
    const { state, incrementPlayerWins, incrementComputerWins } = useContext(GlobalContext);
    return(
        <NavigationContainer>
        
          <Stack.Navigator initialRouteName="Results">
              {state.isPlaying ? (
                <>
                  <Stack.Screen name="Game" component={Game} options={{headerShown: false}} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Results" component={Results} options={{headerShown: false}} />
                </>
              )}
          </Stack.Navigator>

      </NavigationContainer>
    )
}

export default Container