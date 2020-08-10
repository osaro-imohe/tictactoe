/* eslint-disable no-use-before-define */
import React, { useContext, useEffect } from 'react';
import {
  StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, Text,
} from 'react-native';
import { GlobalContext } from '../Context/globalContext';

const Results = () => {
  const {
    state, changeIsPlaying, getData,
  } = useContext(GlobalContext);

  useEffect(() => {
    getData();
  }, []);

  const displayWins = () => {
    if (state.wins == null) {
      return (
        <View style={styles.resultlist}>
          <Text>You haven't played any games yet</Text>
        </View>
      );
    }
    return state.wins.map((win, i) => {
      if (win.winner === 1) {
        return (
          <View style={styles.resultlist} key={i}>
            <Text>You won</Text>
            <Text>{win.date}</Text>
            <Text>{win.time}</Text>
          </View>
        );
      }
      return (
        <View style={styles.resultlist} key={i}>
          <Text>Computer won</Text>
          <Text>{win.date}</Text>
          <Text>{win.time}</Text>
        </View>
      );
    });
  };
  return (
    <View style={styles.results}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <ScrollView style={styles.resultsContainer}>{displayWins()}</ScrollView>
      <Text />
      <TouchableOpacity style={styles.play} onPress={changeIsPlaying}>
        <Text style={styles.playtext}>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  results: {
    width,
    height,
    backgroundColor: 'whitesmoke',
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  play: {
    width: 0.8 * width,
    height: 0.1 * height,
    backgroundColor: 'white',
    alignContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: height - 0.9 * height,
    flex: 1,
    justifyContent: 'center',
    borderColor: 'green',
    borderWidth: 5,
  },
  playtext: {
    color: 'green',
    fontWeight: '800',
    fontSize: 40,
    alignSelf: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    position: 'absolute',
    top: 0 + 0.2 * height,
  },
  resultsContainer: {
    height: 0.5 * height,
    width: 0.8 * width,
    position: 'absolute',
    textAlign: 'center',

  },
  resultlist: {
    width: 0.8 * width,
    borderColor: 'gray',
    borderWidth: 2,
    marginTop: 5,
    padding: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Results;
