import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import TemperatureScreen from '../components/TemperatureScreen';
import HumidityScreen from '../components/HumidityScreen';
import MotorButton from '../components/MotorButton';
import SensorScreenVip from '../components/SensorScreenVip';
// import SensorScreen from '../components/SensorScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../components/Header';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>  
        <Header />
        <SensorScreenVip />
        {/* <SensorScreen /> */}
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
