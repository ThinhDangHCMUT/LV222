import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IP_ADDRESS } from '../constants';
import axios from 'axios'


const SensorScreen = () => {
    const [motor1, setMotor1] = useState(false);
    const [motor2, setMotor2] = useState(false);
    const [autoMode, setAutoMode] = useState(false);
    const [hour, setHour] = useState('');
    const [min, setMin] = useState('');
    const [dead, setDead] = useState('15')
    const [start, setStart] = useState("None")
    const [end, setEnd] = useState("None")
    const [selectedNode, setSelectedNode] = useState('Node1')
    const [selectedValue, setSelectedValue] = useState('java');

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);
  
    const compareTime = () => {
    //   console.log(start)
      const temp = start.split(' ')
      console.log(temp)
      if (currentTime.getHours() === parseInt(temp[0]) &&
          currentTime.getMinutes() === parseInt(temp[2])) {
        // do some function here
        console.log("It's time to watering");
        setMotor1(true)
        const data = {
            "status": "ON",
        }
        axios.post(`http://${IP_ADDRESS}:3000/api/data`,{data: JSON.stringify(data)})
                .then(response => { 
                    console.log(response.data)
                })
                .catch(error => {
                    console.error('Error fetching data:', error)
                })
      }
      else{
        //   setMotor1(false)
        //   setAutoMode(false)
        // const data = {
        //     "status": motor1 ? "ON":"OFF",
        // }
        // axios.post(`http://${IP_ADDRESS}:3000/api/data`,{data: JSON.stringify(data)})
        //         .then(response => { 
        //             console.log(response.data)
        //         })
        //         .catch(error => {
        //             console.error('Error fetching data:', error)
        //         })
      }
    }
  
    useEffect(() => {
        if(autoMode) compareTime();
    }, [currentTime]);

    const handleSwitchMotor1 = async () => {
        setMotor1(item => !item);
        const data = {
            "status": motor1? "OFF":"ON",
        }
        axios.post(`http://${IP_ADDRESS}:3000/api/data`,{data: JSON.stringify(data)})
                .then(response => { 
                    console.log(response.data)
                })
                .catch(error => {
                    console.error('Error fetching data:', error)
                })
    };
    const handleSwitchMotor2 = () => {
        setMotor2(item => !item);
        // switchMotor(!isMotorOn);
    };

    const handleHour = (text) => {
        const number = parseInt(text);
        if (number >= 0 && number <= 23) {
            setHour(text);
        }
        else setHour('')
    };
    const handleMin = (text) => {
        const number = parseInt(text);
        if (number >= 0 && number <= 59) {
            setMin(text);
        }
        else setMin('')
    };
    const handleDead = (text) => {
        const number = parseInt(text);
        if (number >= 0 && number <= 59) {
            setDead(text);
        }
        else setDead('')
    };
    // console.log(start)
    // console.log(end)
    const handleSubmit = () => {
        setAutoMode(true)
        let number = parseInt(min) + parseInt(dead)
        let endTimeClock
        setStart(hour + ' giờ ' + min + ' phút')
        if(number >= 60){
            number = number - 60
            if(hour === '23') endTimeClock = '0 giờ ' + number + " phút" 
            else endTimeClock = (parseInt(hour) + 1).toString() + " giờ " + number + " phút"
        }
        setEnd(endTimeClock)
        setHour('')
        setMin('')
        setDead('')
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
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
                {selectedNode === 'Node1' &&
                    (<View style={styles.sensorContainer}>
                        <View style={styles.sensorIconContainer}>
                            <MaterialCommunityIcons name="water-pump" size={40} color={motor1 ? "#ffc700" : "black"} />
                        </View>
                        <Text style={styles.sensorName}>Máy bơm 1</Text>
                        <Text style={styles.sensorDes}>Vườn xoài 1</Text>
                        <Switch
                            value={motor1}
                            onValueChange={handleSwitchMotor1}
                            trackColor={{ false: "#767577", true: "#ffc700" }}
                            thumbColor={motor1 ? "#f4f3f4" : "#f4f3f4"}
                            style={{
                                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                                width: 50,
                                trackSize: 50,
                            }} />
                    </View>
                    )}
                {selectedNode === 'Node2' &&
                    (<View style={styles.sensorContainer}>
                        <View style={styles.sensorIconContainer}>
                            <MaterialCommunityIcons name="water-pump" size={40} color={motor2 ? "#ffc700" : "black"} />
                        </View>
                        <Text style={styles.sensorName}>Máy bơm 2</Text>
                        <Text style={styles.sensorDes}>Vườn xoài 2</Text>
                        <Switch
                            value={motor2}
                            onValueChange={handleSwitchMotor2}
                            trackColor={{ false: "#767577", true: "#ffc700" }}
                            thumbColor={motor2 ? "#f4f3f4" : "#f4f3f4"}
                            style={{
                                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                                width: 50,
                                trackSize: 50,
                            }} />

                    </View>
                    )}
                <View style={styles.scheduleContainer}>

                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <Text style={styles.sensorName}>Đặt lịch trình tưới</Text>
                        <TouchableOpacity onPress={handleSubmit} style={{
                            backgroundColor: "#ffc700", paddingVertical: 5,
                            paddingHorizontal: 10, borderRadius: 10, marginLeft:10

                        }}>
                            <Text style={{ color: "#fff", fontSize: 16, fontStyle:'bold' }}>Đặt</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text> Bắt đầu </Text>
                            <TextInput
                                style={{ height: 30, width: 30, borderColor: 'gray', borderWidth: 0.5, borderRadius: 10, fontSize: 12, paddingLeft: 5 }}
                                onChangeText={handleHour}
                                value={hour}
                                placeholder="hh"
                                keyboardType="numeric"
                            />
                            <Text> : </Text>
                            <TextInput
                                style={{ height: 30, width: 30, borderColor: 'gray', borderWidth: 0.5, borderRadius: 10, fontSize: 12, paddingLeft: 5 }}
                                onChangeText={handleMin}
                                value={min}
                                placeholder="mm"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                            <Text> Kết thúc sau </Text>
                            <TextInput
                                style={{ height: 30, width: 30, borderColor: 'gray', borderWidth: 0.5, marginLeft: 10, borderRadius: 10, fontSize: 12, paddingLeft: 5 }}
                                onChangeText={handleDead}
                                value={dead}
                                placeholder="mm"
                                keyboardType="numeric"
                            />

                        </View>
                    </View>
                    <Text style={{
                        fontSize: 15,
                        color: '#767577',
                        marginBottom: 10,
                        fontStyle: 'italic'
                    }}>
                        Bắt đầu tưới lúc: {start}
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        color: '#767577',
                        marginBottom: 10,
                        fontStyle: 'italic'
                    }}>
                        Kết thúc sau: {end}
                    </Text>


                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    sensorButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
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
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20
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
    scheduleContainer: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
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
    sensorValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#555',
    },
});

export default SensorScreen;
