import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const TemperatureScreen = () => {
  return (
    <ImageBackground source={require('../assets/temperature.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperatureText}>Temperature</Text>
          <Text style={styles.temperatureText}>80°F</Text>
        </View>
        <View style={styles.humidityContainer}>
          <Text style={styles.humidityText}>Humidity</Text>
          <Text style={styles.humidityText}>50%</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperatureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  temperatureText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#555',
  },
  humidityContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    padding: 20,
  },
  humidityText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default TemperatureScreen;
