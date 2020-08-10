import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const GlobalContext = createContext();

const GlobalContextProvider = ({children}) => {
    const [state,setState]  = useState({
        currentGame : [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ],
        playersturn : 1,
        playing: false,
        quitModal: false,   
        isPlaying : false,
        wins: null,
        timerStart: false,
        stopwatchStart: true,
        stopwatchReset: false,
        enableGetStopWatchTime: false,
        formattedTime: null
    })

    const storeData = async (value) => {
        const existingWins = await AsyncStorage.getItem('wins')
        let newWins = JSON.parse(existingWins);
        if( !newWins ){
            newWins = []
        }
        newWins.push(value)
        await AsyncStorage.setItem('wins', JSON.stringify(newWins) )
        .then( ()=>{
        console.log('It was saved successfully')
        } )
        .catch( ()=>{
        console.log('There was an error saving the product')
        } )
    }


    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('wins')
          setState(prevState => ({
              ...prevState,
              wins: jsonValue != null ? JSON.parse(jsonValue) : null
          }))
        } catch(e) {
            console.log('failed to get data')
        }
      }

    const clearStorage = async () => {
        try {
          await AsyncStorage.clear()
          alert('Storage successfully cleared!')
        } catch (e) {
          alert('Failed to clear the async storage.')
        }
      }

    const incrementPlayerWins = (date,time) => {
        const value = {winner:1, date,time}
        storeData(value);
    }   
    const incrementComputerWins = (date,time) => {
        const value = {winner:-1, date,time}
        storeData(value);
    }
    const changeIsPlaying = () => {
        const isPlaying = state.isPlaying;
        if(isPlaying == true){
            setState(prevState => ({
                ...prevState,
                isPlaying: false,
            }))
        }else if(isPlaying == false){
            setState(prevState => ({
                ...prevState,
                isPlaying: true,
            }))
        }
    }

    

    return(
        <GlobalContext.Provider value={{state,setState,incrementPlayerWins,incrementComputerWins, changeIsPlaying,getData}}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalContextProvider };