// import mqttConnection from '../utils/mqttConnection'
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IP_ADDRESS } from '../constants';
// import Speedometer from 'react-native-speedometer-chart';
import axios from 'axios'


const SensorScreen = () => {
    const [selectedNode, setSelectedNode] = useState('Node1')
    const [selectedSensor, setSelectedSensor] = useState('temperature');
    const [sensorValue1, setSensorValue1] = useState("")
    const [sensorValue2, setSensorValue2] = useState("")

    const handleSensorSelection = (sensor) => {
        setSelectedSensor(sensor);
    };
    useEffect(() => {
        // set up a timer to fetch data every second
        const interval = setInterval(async () => {
            axios.get(`http://${IP_ADDRESS}:3000/api/value`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            })
                .then(response => { 
                    console.log(response.data)
                    // setSensorValue1(response.data["ID"] === 1 && response.data)
                    // setSensorValue2(response.data["ID"] === 2 && response.data)
                    if(response.data["ID"] === 1 ) setSensorValue1(response.data)
                    if(response.data["ID"] === 2 ) setSensorValue2(response.data)
                    console.log("Node 1: ",sensorValue1)
                    console.log("Node 2: ",sensorValue2)
                    // console.log("Humid: ",response.data['humidity'])
                    // console.log("Temperature: ", response.data['temperature'])
                    // setTemp(response.data['temperature'])
                    // setHumid(response.data['humidity'])
                    // setSensorValue({
                    //     temperature: response.data['temperature'],
                    //     humidity: response.data['humidity']
                    // })
                })
                .catch(error => {
                    console.error('Error fetching data:', error)
                })
        }, 1000)

        // clean up the timer when the component unmounts
        return () => clearInterval(interval)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.sensorButton,
                        selectedNode === 'Node1' && styles.selectedButton,
                    ]}
                    onPress={() => setSelectedNode('Node1')}
                >
                    <Text style={styles.sensorButtonText}>Node 1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.sensorButton,
                        selectedNode === 'Node2' && styles.selectedButton,
                    ]}
                    onPress={() => setSelectedNode('Node2')}
                >
                    <Text style={styles.sensorButtonText}>Node 2</Text>
                </TouchableOpacity>
            </View>
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
            {selectedNode === 'Node1' && <View style={styles.valueContainer}>
                {selectedSensor === 'temperature' && (
                    <Text style={styles.sensorValue}>{sensorValue1["TEMP"]}°C</Text>
                )}
                {selectedSensor === 'humidity' && (
                    <Text style={styles.sensorValue}>{sensorValue1["HUMID"]}%</Text>
                )}
                {selectedSensor === 'soil' && (
                    <Text style={styles.sensorValue}>{sensorValue1["ADC"]}</Text>
                )}
                {selectedSensor === 'light' && (
                    <Text style={styles.sensorValue}>{sensorValue1["N"]}</Text>
                )}
            </View>}
            {selectedNode === 'Node2' && <View style={styles.valueContainer}>
                {selectedSensor === 'temperature' && (
                    <Text style={styles.sensorValue}>{sensorValue2["TEMP"]}°C</Text>
                )}
                {selectedSensor === 'humidity' && (
                    <Text style={styles.sensorValue}>{sensorValue2["HUMID"]}%</Text>
                )}
                {selectedSensor === 'soil' && (
                    <Text style={styles.sensorValue}>{sensorValue2["ADC"]}</Text>
                )}
                {selectedSensor === 'light' && (
                    <Text style={styles.sensorValue}>{sensorValue2["N"]}</Text>
                )}
            </View>}
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.2,
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

export default SensorScreen;