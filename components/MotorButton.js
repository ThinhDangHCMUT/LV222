import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
// import { switchMotor } from '../utils/api';

const MotorButton = () => {
  const [isMotorOn, setIsMotorOn] = useState(false);

  const handleSwitchMotor = () => {
    setIsMotorOn(item => !item);
    // switchMotor(!isMotorOn);
  };

  return (
    <View>
      <Text>Motor: {isMotorOn ? 'ON' : 'OFF'}</Text>
      <Switch value={isMotorOn} onValueChange={handleSwitchMotor} />
    </View>
  );
};

export default MotorButton;
