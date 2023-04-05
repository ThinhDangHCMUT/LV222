import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
// import { Gauge } from 'react-native-svg-charts';

const SensorScreenVip = () => {
    const [selectedSensor, setSelectedSensor] = useState('temperature');

    const handleSensorSelection = (sensor) => {
        setSelectedSensor(sensor);
    };
    
    const [sensorValue, setSensorValue] = useState()
    const fetchData = async () => {
        try {
          const response = await axios.get(
            'https://io.adafruit.com/api/v2/thinhdanghcmut/feeds/bbc-humi/data/last',
            {
              headers: {
                'X-AIO-Key': 'aio_avXH33vHykcCekPAYtuuM2xPl0f5',
              },
            },
          );
          console.log(response.data.value)
          setSensorValue(response.data.value);
        } catch (error) {
          console.error(error);
        }
      };
      useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds
        return () => clearInterval(intervalId);
      }, []);


    const getSensorValue = () => {
        switch (selectedSensor) {
            case 'temperature':
                return 22;
            case 'humidity':
                return 45;
            case 'soil':
                return 70;
            case 'light':
                return 80;
            default:
                return 0;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.sensorButton,
                        selectedSensor === 'temperature' && styles.selectedButton,
                    ]}
                    onPress={() => handleSensorSelection('temperature')}
                >

                    <Icon name='thermometer' size={30} />

                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.sensorButton,
                        selectedSensor === 'humidity' && styles.selectedButton,
                    ]}
                    onPress={() => handleSensorSelection('humidity')}
                >
                    <Icon name='water' size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.sensorButton,
                        selectedSensor === 'soil' && styles.selectedButton,
                    ]}
                    onPress={() => handleSensorSelection('soil')}
                >
                    <Icon name='leaf' size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.sensorButton,
                        selectedSensor === 'light' && styles.selectedButton,
                    ]}
                    onPress={() => handleSensorSelection('light')}
                >
                    <Icon name='brightness-6' size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.valueContainer}>
                {selectedSensor === 'temperature' && (
                    <Text style={styles.sensorValue}>{sensorValue}°C</Text>
                )}
                {selectedSensor === 'humidity' && (
                    <Text style={styles.sensorValue}>45%</Text>
                )}
                {selectedSensor === 'soil' && (
                    <Text style={styles.sensorValue}>Moist</Text>
                )}
                {selectedSensor === 'light' && (
                    <Text style={styles.sensorValue}>On</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20
        // justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    sensorButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 100,
    },
    sensorButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedButton: {
        backgroundColor: '#ffc700',
        shadowColor: '#ffc700',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 10,
        shadowRadius: 1,
        elevation: 20,
    },
    valueContainer: {
        width: 200,
        height: 200,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 10,
        shadowRadius: 3.84,
        elevation: 10,
    },
    sensorValue: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    gaugeContainer: {
        alignItems: 'center',
    },
    gauge: {
        height: 200,
        width: 200,
    },
});

export default SensorScreenVip;
