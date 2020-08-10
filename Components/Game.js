import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet,View,Dimensions, TouchableOpacity,Text} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalContext} from '../Context/globalContext';
import Quit from './Quit';
import { Stopwatch } from 'react-native-stopwatch-timer';



const Game = () => {

    const { state, setState,incrementPlayerWins, incrementComputerWins, changeIsPlaying,} = useContext(GlobalContext);
    const today = new Date();
    const date = today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();
    const time = today.toLocaleTimeString('en-US', { hour12: true, hour: "numeric", minute: "numeric"});
    


    const initGame = () => {
        setState(prevState =>({
            ...prevState,
            currentGame: 
            [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
            playersturn : 1,
            playing: false,
            quitModal: false,
        }))
        resetStopWatch();
    }

    useEffect(() => {
        initGame();
      }, []);
    
    const showIcon = (row,col) => {
    
        const value = state.currentGame[row][col];
        switch(value){
            case 1:
                return <AntDesign name="close" size={50} color="black" />
            case -1:
                return <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={50} color="black" />
            case 2:
                return <AntDesign name="close" size={50} color="green" />
            case -2:
                return <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={50} color="green" />
            default:
                return <View/>
        }
        
    }


    const checkIfOccupied = (row,col) => {
        const value = state.currentGame[row][col];
        switch(value){
            case 1:
                return true
            case -1:
                return true
            case 2:
                return true
            case -2:
                return true
            default:
                return false
        }
    }



    const computersTurn = () => {
        
        let arr = state.currentGame.slice();
        let playersturn = state.playersturn;
        let nextPlayer = (playersturn == 1) ? -1 : 1;


        //CHECK IF ANY CELLS ARE EMPTY FOR COMPUTERS TURN
        if(arr[0][0] == 0 || arr[0][1] == 0 || arr[0][2] == 0 ||arr[1][0] == 0 || arr[1][1] == 0 || arr[1][2] == 0 ||arr[2][0] == 0 || arr[2][1] == 0 || arr[2][2] == 0 ){
                for(let i=0; i < 2000; ++i){
                    let randomCol = Math.floor(Math.random()*(2 - 0 + 1));
                    let randomRow = Math.floor(Math.random()*(2 - 0 + 1));
                    if(arr[randomCol][randomRow] == 0){
                        arr[randomCol][randomRow] = -1;
                        setState(prevState =>({
                            ...prevState,
                            currentGame : arr
                        }))
                        break;
                    }else{
                        continue;
                    }
                }
        }
    }
    
    
    const onBoxPress = (row,col) => {
    
    console.log(state.wins)
    //START STOPWATCH
    setState(prevState => ({
        ...prevState,
        stopwatchStart: true,
        stopwatchReset: false
    }))
    //PREVENT BOX CHANGE
    let value = state.currentGame[row][col];
    let playersturn = state.playersturn;

    if(value !== 0){return;}

    //USERS TURN
    if(playersturn == 1 & checkWinner() === 0){
        //SHOW THE CORRECT BOX
        let arr = state.currentGame.slice();
        arr[row][col] = playersturn;
        setState(prevState =>({
            ...prevState,
            currentGame : arr
        }))


        //SWITCH TO OTHER COMPUTERS TURN
        let nextPlayer = (playersturn == 1) ? -1 : 1;
        setState(prevState =>({
            ...prevState,
            playersturn : nextPlayer
        }))
    }


    //PLAY COMPUTERS TURN 
    if(playersturn === 1 & checkWinner() === 0){
        //SETTING A DELAY OF 750ms BETWEEN USERS TURN AND COMPUTERS TURN
        setTimeout(() => {
            computersTurn();
            checkWinner();
            setState(prevState =>({
                ...prevState,
                playersturn : 1
            }))
        }, 750);
    }

    }


    const toggleStopwatch = ()  =>{
        if(state.stopwatchStart == true){
            setState(prevState => ({
                ...prevState,
                stopwatchStart: false,
                stopwatchReset: false,
            }))
        }
    }
    
    const resetStopWatch = () => {
        setState(prevState => ({
            ...prevState,
            stopwatchStart: false,
            stopwatchReset: true
        }))
    }



    //CHECK WHO WON THE GAME
    const checkWinner = () => {
        let sum;
        let arr = state.currentGame;
        const boxes = 3;


        for ( let i=0; i < boxes; ++i){
            sum = arr[i][0] + arr[i][1] + arr[i][2];
            if(sum == 3){
                arr[i][0]  = 2
                arr[i][1]  = 2
                arr[i][2]  = 2
                toggleStopwatch();
                incrementPlayerWins(date,time);
                return 1;
            }else if(sum == -3){
                arr[i][0]  = -2
                arr[i][1]  = -2
                arr[i][2]  = -2
                toggleStopwatch();
                incrementComputerWins(date,time);
                return -1;
            }
        }

        for ( let i=0; i < boxes; ++i){
            sum = arr[0][i] + arr[1][i] + arr[2][i];
            if(sum == 3){
                arr[0][i]  = 2
                arr[1][i]  = 2
                arr[2][i]  = 2
                toggleStopwatch();
                incrementPlayerWins(date,time);
                return 1;
            }else if(sum == -3){
                arr[0][i]  = -2
                arr[1][i]  = -2
                arr[2][i]  = -2
                toggleStopwatch();
                incrementComputerWins(date,time);
                return -1
            }
        }

        sum = arr[0][0] + arr[1][1] + arr[2][2];
        if(sum == 3){
            arr[0][0]  = 2
            arr[1][1]  = 2
            arr[2][2]  = 2
            toggleStopwatch();
            incrementPlayerWins(date,time);
            
            return 1;
        }else if(sum == -3){
            arr[0][0]  = -2
            arr[1][1]  = -2
            arr[2][2]  = -2
            toggleStopwatch();
            incrementComputerWins(date,time);
            return -1
        }

        sum = arr[2][0] + arr[1][1] + arr[0][2];
        if(sum == 3){
            arr[2][0]  = 2
            arr[1][1]  = 2
            arr[0][2]  = 2
            toggleStopwatch();
            incrementPlayerWins(date,time);
            return 1;
        }else if(sum == -3){
            arr[2][0]  = -2
            arr[1][1]  = -2
            arr[0][2]  = -2
            toggleStopwatch();
            incrementComputerWins(date,time);
            return -1
        }


        return 0;
    }



    const toggleQuitModal = () => {
        const quitModal = state.quitModal;
        if(quitModal == true){
            setState(prevState =>({
                ...prevState,
                quitModal : false
            }))
        }else{
            setState(prevState =>({
                ...prevState,
                quitModal : true
            }))
        }
    }




        return(
            <View style={styles.game}>
                { state.quitModal ? <Quit toggleQuitModal={toggleQuitModal.bind()} continueGame={() => continueGame}/> : null }
                <View style = {styles.tictactoebox}>
                    <View style={styles.boxrow}>
                        <TouchableOpacity style={[styles.box, {borderRightWidth: 3, borderBottomWidth: 3}, {backgroundColor: checkIfOccupied(0,0) ? 'red' : 'white'}]} onPress = {() => onBoxPress(0,0)}>
                            {showIcon(0,0)}
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.box, {borderBottomWidth:3}, {backgroundColor: checkIfOccupied(0,1) ? 'red' : 'white'}]} onPress = {() => onBoxPress(0,1)}>
                            {showIcon(0,1)}
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.box, {borderLeftWidth: 3, borderBottomWidth:3}, {backgroundColor: checkIfOccupied(0,2) ? 'red' : 'white'}]} onPress = {() => onBoxPress(0,2)}>
                            {showIcon(0,2)}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boxrow}>
                        <TouchableOpacity style={[styles.box, {borderRightWidth: 3, borderBottomWidth: 3}, {backgroundColor: checkIfOccupied(1,0) ? 'red' : 'white'}]} onPress = {() => onBoxPress(1,0)}>
                            {showIcon(1,0)}
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.box, {borderBottomWidth: 3}, {backgroundColor: checkIfOccupied(1,1) ? 'red' : 'white'}]} onPress = {() => onBoxPress(1,1)}>
                            {showIcon(1,1)}
                            <TouchableOpacity style={styles.reset} onPress = {() => initGame()}>
                                <Text style={styles.resettext}>Reset</Text>
                            </TouchableOpacity>
                            <Stopwatch laps msec={false} start={state.stopwatchStart} reset={state.stopwatchReset} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.box, {borderLeftWidth: 3, borderBottomWidth: 3}, {backgroundColor: checkIfOccupied(1,2) ? 'red' : 'white'}]} onPress = {() => onBoxPress(1,2)}>
                            {showIcon(1,2)}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boxrow}>
                        <TouchableOpacity style={[styles.box, {borderRightWidth: 3}, {backgroundColor: checkIfOccupied(2,0) ? 'red' : 'white'}]} onPress = {() => onBoxPress(2,0)}>
                            {showIcon(2,0)}
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.box, {backgroundColor: checkIfOccupied(2,1) ? 'red' : 'white'}]} onPress = {() => onBoxPress(2,1)}>
                            {showIcon(2,1)}
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.box, {borderLeftWidth: 3}, {backgroundColor: checkIfOccupied(2,2) ? 'red' : 'white'}]} onPress = {() => onBoxPress(2,2)}>
                            {showIcon(2,2)}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.navigation}>
                    <TouchableOpacity style={styles.quitcontainer} onPress={toggleQuitModal}>
                    <Text style={styles.quit} onPress={toggleQuitModal}>QUIT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    game : {
        height:height,
        width: width,
        backgroundColor: 'white',
        padding: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tictactoebox: {
        width:   width,
        height:  height,
        alignSelf: 'center',
        margin: 0,
    },
    box: {
        width:  width / 2.9,
        height: height / 3,
        backgroundColor: 'white',
        margin: 0,
        padding: 0,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxrow:{
        width:  width,
        flexDirection: 'row',
    },
    reset: {
        color: 'black',
        position: 'absolute',
        backgroundColor: 'yellow',
        top: 0,
        alignSelf: 'flex-end',
        backgroundColor: 'black',
        padding: 4,
        borderRadius: 5,
        width: 0.2 * width,
        textAlign: 'center',
        alignItems: 'center',
        right: 0,
    },
    resettext:{
        fontSize: 10,
        color: '#FFF',
    },
    navigation: {
        width: width,
        height: 0.08 * height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
    },
    quitcontainer: {
        width: 0.5 * width,
        height: 0.15 * height,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    quit: {
        color: 'white',
        flex: 1,
        fontWeight: 'bold',
        fontSize: 40,
    },
})

export default Game;