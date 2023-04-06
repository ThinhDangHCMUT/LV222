import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import DeviceScreen from '../components/DeviceScreen';
// import { setSwitchTime } from '../utils/helpers';

const SettingsScreen = ({navigation}) => {
  const [switchTime, setSwitchTime] = useState('');
  

  const handleSetSwitchTime = () => {
    // setSwitchTime(switchTime);
    // setSwitchTime(parseInt(switchTime));
    console.log("hello")
  };

  return (
    <View style={styles.container}>  
        <Header />
        <DeviceScreen />
        {/* <SensorScreenVip /> */}
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

export default SettingsScreen;

SettingsScreen.tabBarLabel = 'Settings'