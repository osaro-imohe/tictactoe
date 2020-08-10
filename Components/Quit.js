import React, {useState, useContext} from 'react';
import { GlobalContext} from '../Context/globalContext';
import {Text, StyleSheet,View, TouchableOpacity, Dimensions} from 'react-native';

const Quit = ({toggleQuitModal}) => {

    const { state, incrementPlayerWins, incrementComputerWins, changeIsPlaying } = useContext(GlobalContext);

    return (
        <View style={styles.quitoverlay}>
            <View style={styles.quitmodal}>
                <Text style={styles.quitheader}>Are you sure you want to quit?</Text>
                <TouchableOpacity style={[styles.quitbutton, {borderColor:'red'}]} onPress={(event) => {toggleQuitModal(); changeIsPlaying();}}>
                    <Text style={[styles.quittext, {color: 'red'}]}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.quitbutton, {borderColor: 'green'}]} onPress={(event) => {toggleQuitModal();}} >
                    <Text style={[styles.quittext, {color: 'green'}]}>No</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


const styles = StyleSheet.create({
    quitoverlay:{
        width: width,
        height: height,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 3,
    },
    quitmodal: {
        width: width,
        height: 0.5 * height,
        backgroundColor: 'white',
        zIndex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quitbutton: {
       width: 0.9 * width,
       height: 0.1 *  height,
       borderWidth: 5,
       borderRadius: 50,
       textAlign: 'center',
       alignContent: 'center',
       alignItems: 'center',
       justifyContent: 'center',
       marginTop: 10,
    },
    quittext:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    quitheader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default Quit;