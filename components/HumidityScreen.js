import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
// import { fetchHumidity } from '../utils/api';

const HumidityScreen = () => {
  const [humidity, setHumidity] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchHumidity()
//         .then(data => setHumidity(data))
//         .catch(error => console.log(error));
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

  return (
    <View>
      <Text>Humidity: {humidity}%</Text>
    </View>
  );
};

export default HumidityScreen;
