import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
// import { setSwitchTime } from '../utils/helpers';

const SettingsScreen = ({navigation}) => {
  const [switchTime, setSwitchTime] = useState('');

  const handleSetSwitchTime = () => {
    // setSwitchTime(switchTime);
    // setSwitchTime(parseInt(switchTime));
    console.log("hello")
  };

  return (
    <View>
      <Text>Set switch time in a day:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setSwitchTime(text)}
        value={switchTime}
        keyboardType='numeric'
      />
      <TouchableOpacity onPress={handleSetSwitchTime}>
        <Text>Set</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

SettingsScreen.tabBarLabel = 'Settings'