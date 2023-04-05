import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const sensorDevice = [
    {
        label: 'Temperature',
        value: 70,
        unit: '°C',
        icon: 'thermometer',
    },
    {
        label: 'Humidity',
        value: 70,
        unit: '%',
        icon: 'water'
    },
    {
        label: 'Soil',
        value: 70,
        unit: 'rH',
        icon: 'leaf'
    },
    {
        label: 'Light',
        value: 70,
        unit: 'lx',
        icon: 'brightness-6'
    }
]

const SensorScreen = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                {
                    sensorDevice.map(item => (
                        <View style={styles.sensorContainer}>
                            <View style={styles.sensorIconContainer}>
                                <Icon name={item.icon} size={30} />
                            </View>
                            <Text style={styles.sensorName}>{item.label}</Text>
                            <Text style={styles.sensorValue}>{item.value}{item.unit}</Text>
                        </View>
                    ))
                }

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    sensorContainer: {
        width: '48%',
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
