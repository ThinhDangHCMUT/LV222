// import mqttConnection from '../utils/mqttConnection'
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IP_ADDRESS } from '../constants';
import axios from 'axios'

const SensorScreen = () => {
    const [selectedNode, setSelectedNode] = useState('Node1')
    const [selectedSensor, setSelectedSensor] = useState('temperature');
    const [sensorValue1, setSensorValue1] = useState("")
    const [sensorValue2, setSensorValue2] = useState("")
    const [notification1, setNotification1] = useState({ N: "", P: "", K: "" })
    const [notification2, setNotification2] = useState({ N: "", P: "", K: "" })
    const [flag, setFlag] = useState(false)

    const handleSensorSelection = (sensor) => {
        setSelectedSensor(sensor);
    };

    const handleSoilAuto = () => {
        setFlag(item => !item)
    }

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
                    console.log("Data from backend:", response.data)
                    // console.log("emergency");
                    if (response.data["I"] === 0) setSensorValue1(response.data)
                    if (response.data["I"] === 1) setSensorValue2(response.data)
                    console.log("Node 1: ", sensorValue1)
                    console.log("Node 2: ", sensorValue2)
                    //NODE 1
                    //warning N
                    if (parseFloat(sensorValue1["N"]) < 10) setNotification1(prevState => ({ ...prevState, N: "N: Thấp" }));
                    if (parseFloat(sensorValue1["N"]) >= 10 && parseFloat(sensorValue1["N"]) <= 20) setNotification1(prevState => ({ ...prevState, N: "N: Tốt" }));
                    if (parseFloat(sensorValue1["N"]) > 20) setNotification1(prevState => ({ ...prevState, N: "N: Vượt ngưỡng!!!" }));
                    //warning P
                    if (parseFloat(sensorValue1["P"]) < 10) setNotification1(prevState => ({ ...prevState, P: "P: Thấp" }));
                    if (parseFloat(sensorValue1["P"]) >= 10 && parseFloat(sensorValue1["P"]) <= 15) setNotification1(prevState => ({ ...prevState, P: "P: Tốt" }));
                    if (parseFloat(sensorValue1["P"]) > 15) setNotification1(prevState => ({ ...prevState, P: "P: Vượt ngưỡng!!!" }));
                    //Warning K
                    if (parseFloat(sensorValue1["K"]) < 30) setNotification1(prevState => ({ ...prevState, K: "K: Thấp" }));
                    if (parseFloat(sensorValue1["K"]) >= 30 && parseFloat(sensorValue1["P"]) <= 50) setNotification1(prevState => ({ ...prevState, K: "K: Tốt" }));
                    if (parseFloat(sensorValue1["K"]) > 50) setNotification1(prevState => ({ ...prevState, K: "K: Vượt ngưỡng!!!" }));

                    //NODE 2
                    //warning N
                    if (parseFloat(sensorValue2["N"]) < 10) setNotification2(prevState => ({ ...prevState, N: "N: Thấp" }));
                    if (parseFloat(sensorValue2["N"]) >= 10 && parseFloat(sensorValue2["N"]) <= 20) setNotification2(prevState => ({ ...prevState, N: "N: Tốt" }));
                    if (parseFloat(sensorValue2["N"]) > 20) setNotification2(prevState => ({ ...prevState, N: "N: Vượt ngưỡng!!!" }));
                    //warning P
                    if (parseFloat(sensorValue2["P"]) < 10) setNotification2(prevState => ({ ...prevState, P: "P: Thấp" }));
                    if (parseFloat(sensorValue2["P"]) >= 10 && parseFloat(sensorValue2["P"]) <= 15) setNotification2(prevState => ({ ...prevState, P: "P: Tốt" }));
                    if (parseFloat(sensorValue2["P"]) > 15) setNotification2(prevState => ({ ...prevState, P: "P: Vượt ngưỡng!!!" }));
                    //Warning K
                    if (parseFloat(sensorValue2["K"]) < 30) setNotification2(prevState => ({ ...prevState, K: "K: Thấp" }));
                    if (parseFloat(sensorValue2["K"]) >= 30 && parseFloat(sensorValue2["P"]) <= 50) setNotification2(prevState => ({ ...prevState, K: "K: Tốt" }));
                    if (parseFloat(sensorValue2["K"]) > 50) setNotification2(prevState => ({ ...prevState, K: "K: Vượt ngưỡng!!!" }));

                    if (flag === true) {
                        console.log("*****************************************")
                        if (parseFloat(sensorValue1["A"]) < 45 && selectedNode ==="Node1") {
                            axios.post(`http://${IP_ADDRESS}:3000/api/data`, { data: JSON.stringify("ONRELAY") })
                        }
                        if (parseFloat(sensorValue1["A"]) >= 45 && selectedNode ==="Node1") {
                            axios.post(`http://${IP_ADDRESS}:3000/api/data`, { data: JSON.stringify("OFFRELAY") })
                        }
                        if (parseFloat(sensorValue2["A"]) < 45 && selectedNode ==="Node2" ) {
                            axios.post(`http://${IP_ADDRESS}:3000/api/data`, { data: JSON.stringify("ONRELAY") })
                        }
                        if (parseFloat(sensorValue2["A"]) < 45 && selectedNode ==="Node2") {
                            axios.post(`http://${IP_ADDRESS}:3000/api/data`, { data: JSON.stringify("ONRELAY") })
                        }
                        
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error)
                })
        }, 1000)
        // clean up the timer when the component unmounts
        return () => clearInterval(interval)
    }, [sensorValue1, sensorValue2, flag])



    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                {/* <Button title="Send Email" onPress={sendEmergencyEmail} /> */}
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
                                        backgroundColor: "#ffc700", color: '#fff', padding: 10, borderBottomLeftRadius: 10,
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
                                        backgroundColor: "#ffc700", color: '#fff', padding: 10, borderBottomLeftRadius: 10,
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
                                        backgroundColor: "#ffc700", color: '#fff', padding: 10, borderBottomLeftRadius: 10,
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
                                        backgroundColor: "#ffc700", color: '#fff', padding: 10, borderBottomLeftRadius: 10,
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
                                        backgroundColor: "#ffc700", color: '#fff', padding: 10, borderBottomLeftRadius: 10,
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
                                        backgroundColor: "#ffc700", color: '#fff', padding: 10, borderBottomLeftRadius: 10,
                                        borderTopLeftRadius: 10,
                                    }} />
                                    <Text style={styles.soilValue}>{sensorValue2["K"]} mg/kg</Text>
                                </View>
                            </View>)}
                        {selectedSensor === 'light' && (
                            <Text style={styles.sensorValue}>{sensorValue2["A"]}g/m3</Text>

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
            {selectedNode === 'Node2' && selectedSensor === 'soil' && (
                <View>
                    <Text style={styles.sensorLabel}>{notification2.N}</Text>
                    <Text style={styles.sensorLabel}>{notification2.P}</Text>
                    <Text style={styles.sensorLabel}>{notification2.K}</Text>
                </View>
            )}
            {selectedNode === 'Node1' && selectedSensor === 'soil' && (
                <View>
                    <Text style={styles.sensorLabel}>{notification1.N}</Text>
                    <Text style={styles.sensorLabel}>{notification1.P}</Text>
                    <Text style={styles.sensorLabel}>{notification1.K}</Text>
                </View>
            )}
            {selectedSensor === 'light' && (
                <Text style={styles.sensorLabel}>Độ ẩm đất</Text>
            )}
            {selectedSensor === 'light' &&
                    (<View style={styles.sensorContainer}>
                        {/* <View style={styles.sensorIconContainer}>
                            <MaterialCommunityIcons name="water-pump" size={40} color={flag ? "#ffc700" : "black"} />
                        </View> */}
                        <Text style={styles.sensorName}>Tự động theo độ ẩm đất</Text>
                        {/* <Text style={styles.sensorDes}>Vườn xoài 1</Text> */}
                        <Switch
                            value={flag}
                            onValueChange={handleSoilAuto}
                            trackColor={{ false: "#767577", true: "#ffc700" }}
                            thumbColor={flag ? "#f4f3f4" : "#f4f3f4"}
                            style={{
                                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                                width: 50,
                                trackSize: 50,
                            }} />
                    </View>
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
    sensorContainer: {
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 10,
        flexDirection: 'column',
        // justifyContent: 'flex-start',
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 10,
    },
    sensorIconContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 50,
        padding: 10,
        marginBottom: 10,
    },
    sensorIcon: {
        width: 50,
        height: 50,
    },
    sensorName: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    sensorDes: {
        fontSize: 15,
        color: '#767577',
        marginBottom: 10,
    },
});

export default SensorScreen;