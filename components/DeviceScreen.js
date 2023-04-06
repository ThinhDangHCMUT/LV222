import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const SensorScreen = () => {
    const [isMotorOn, setIsMotorOn] = useState(false);
    const [selectedNode, setSelectedNode] = useState('Node1')
    const handleSwitchMotor = () => {
        setIsMotorOn(item => !item);
        // switchMotor(!isMotorOn);
    };
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
                <View style={styles.sensorContainer}>
                    <View style={styles.sensorIconContainer}>
                        <Icon name='leaf' size={30} />
                    </View>
                    <Text style={styles.sensorName}>sasad</Text>
                    <Switch value={isMotorOn} onValueChange={handleSwitchMotor} />
                </View>


        </View>
    );
};

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    sensorContainer: {
        width: '50%',
        backgroundColor: '#ff8e13',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 10,
        shadowRadius: 3.84,
        elevation: 10,
    },
    sensorIconContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 50,
        padding: 10,
        marginBottom: 20,
    },
    sensorIcon: {
        width: 50,
        height: 50,
    },
    sensorName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    sensorValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#555',
    },
});

export default SensorScreen;
