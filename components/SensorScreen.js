// import mqttConnection from '../utils/mqttConnection'
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IP_ADDRESS } from '../constants';
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
        // console.log(IP_ADDRESS)
        const interval = setInterval(async () => {
            await axios.get(`http://${IP_ADDRESS}:3000/api/value`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            })
                .then(response => {
                    console.log(response.data)
                    if (response.data["ID"] === 0) setSensorValue1(response.data)
                    if (response.data["ID"] === 1) setSensorValue2(response.data)
                    console.log("Node 1: ", sensorValue1)
                    console.log("Node 2: ", sensorValue2)
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
            {selectedNode === 'Node1' &&
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={selectedSensor !== 'soil' && styles.valueContainer}>
                        {selectedSensor === 'temperature' && (
                            <Text style={styles.sensorValue}>{sensorValue1["T"]}°C</Text>
                        )}
                        {selectedSensor === 'humidity' && (
                            <Text style={styles.sensorValue}>{sensorValue1["H"]}%</Text>
                        )}
                        {selectedSensor === 'soil' && (
                            <View style={styles.soilContainer}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 20,
                                    // backgroundColor: 'black'
                                }}>
                                    <Icon name='alpha-n-box' size={50} style={{
                                        backgroundColor: "#ffc700",color:'#fff', padding: 10, borderBottomLeftRadius: 10,
                                        borderTopLeftRadius: 10,
                                    }} />
                                    <Text style={styles.soilValue}>{sensorValue1["N"]} mg/kg</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 20,
                                    marginVertical: 10,
                                    // backgroundColor: 'black'
                                }}>
                                    <Icon name='alpha-p-box' size={50} style={{
                                        backgroundColor: "#ffc700",color:'#fff', padding: 10, borderBottomLeftRadius: 10,
                                        borderTopLeftRadius: 10,
                                    }} />
                                    <Text style={styles.soilValue}>{sensorValue1["P"]} mg/kg</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 20,
                                }}>
                                    <Icon name='alpha-k-box' size={50} style={{
                                        backgroundColor: "#ffc700",color:'#fff', padding: 10, borderBottomLeftRadius: 10,
                                        borderTopLeftRadius: 10,
                                    }} />
                                    <Text style={styles.soilValue}>{sensorValue1["K"]} mg/kg</Text>
                                </View>
                            </View>)}
                        {selectedSensor === 'light' && (
                            <Text style={styles.sensorValue}>{sensorValue1["A"]} g/m3</Text>

                        )}
                    </View>
                </View>

            }
            {selectedNode === 'Node2' &&
                 <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={selectedSensor !== 'soil' && styles.valueContainer}>
                        {selectedSensor === 'temperature' && (
                            <Text style={styles.sensorValue}>{sensorValue2["T"]}°C</Text>
                        )}
                        {selectedSensor === 'humidity' && (
                            <Text style={styles.sensorValue}>{sensorValue2["H"]}%</Text>
                        )}
                        {selectedSensor === 'soil' && (
                            <View style={styles.soilContainer}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 20,
                                    // backgroundColor: 'black'
                                }}>
                                    <Icon name='alpha-n-box' size={50} style={{
                                        backgroundColor: "#ffc700",color:'#fff', padding: 10, borderBottomLeftRadius: 10,
                                        borderTopLeftRadius: 10,
                                    }} />
                                    <Text style={styles.soilValue}>{sensorValue2["N"]} mg/kg</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 20,
                                    marginVertical: 10,
                                    // backgroundColor: 'black'
                                }}>
                                    <Icon name='alpha-p-box' size={50} style={{
                                        backgroundColor: "#ffc700",color:'#fff', padding: 10, borderBottomLeftRadius: 10,
                                        borderTopLeftRadius: 10,
                                    }} />
                                    <Text style={styles.soilValue}>{sensorValue2["P"]} mg/kg</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 20,
                                }}>
                                    <Icon name='alpha-k-box' size={50} style={{
                                        backgroundColor: "#ffc700",color:'#fff', padding: 10, borderBottomLeftRadius: 10,
                                        borderTopLeftRadius: 10,
                                    }} />
                                    <Text style={styles.soilValue}>{sensorValue2["K"]} mg/kg</Text>
                                </View>
                            </View>)}
                        {selectedSensor === 'light' && (
                            <Text style={styles.sensorValue}>{sensorValue2["A"]}</Text>

                        )}
                    </View>
                </View>
            }
             {selectedSensor === 'temperature' && (
                        <Text style={styles.sensorLabel}>Nhiệt độ</Text>
                    )}
                    {selectedSensor === 'humidity' && (
                        <Text style={styles.sensorLabel}>Độ ẩm</Text>
                    )}
                    {selectedSensor === 'soil' && (
                        <Text style={styles.sensorLabel}>Phân bón</Text>
                    )}
                    {selectedSensor === 'light' && (
                        <Text style={styles.sensorLabel}>Độ ẩm đất</Text>


                    )}
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
        shadowColor: "#ffc700",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    soilContainer: {
        width: 300,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: "#fff"
    },
    // soilValue{
    //     color:
    // },
    sensorLabel: {
        color: "black",
        backgroundColor: '#ffc700',
        borderRadius: 15,
        padding: 10,
        marginTop: 20,
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    soilValue: {
        width: 200,
        fontSize: 25,
        padding: 20,
        backgroundColor: '#fff',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        fontWeight: 'bold',
        // color: "ffc700"
    },
    sensorValue: {
        // color: 'white',
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