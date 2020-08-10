/* eslint-disable no-use-before-define */
import React, { useContext } from 'react';
import {
  Text, StyleSheet, View, TouchableOpacity, Dimensions,
} from 'react-native';
import { GlobalContext } from '../Context/globalContext';

const Quit = ({ toggleQuitModal }) => {
  const {
    changeIsPlaying,
  } = useContext(GlobalContext);

  return (
    <View style={styles.quitoverlay}>
      <View style={styles.quitmodal}>
        <Text style={styles.quitheader}>Are you sure you want to quit?</Text>
        <TouchableOpacity style={[styles.quitbutton, { borderColor: 'red' }]} onPress={() => { toggleQuitModal(); changeIsPlaying(); }}>
          <Text style={[styles.quittext, { color: 'red' }]}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.quitbutton, { borderColor: 'green' }]} onPress={() => { toggleQuitModal(); }}>
          <Text style={[styles.quittext, { color: 'green' }]}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  quitoverlay: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 3,
  },
  quitmodal: {
    width,
    height: 0.5 * height,
    backgroundColor: 'white',
    zIndex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quitbutton: {
    width: 0.9 * width,
    height: 0.1 * height,
    borderWidth: 5,
    borderRadius: 50,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  quittext: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quitheader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Quit;
