import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import SensorScreen from '../components/SensorScreen';
// import SensorScreen from '../components/SensorScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../components/Header';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>  
        <Header />
        <SensorScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',

  },
});

export default HomeScreen;

HomeScreen.tabBarLabel = 'Home';
