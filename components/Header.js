import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [weather, setWeather] = useState('');

    useEffect(() => {
        // const fetchWeather = async () => {
        //   const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=London&appid={YOUR_APP_ID}');
        //   setWeather(response.data.weather[0].description);
        // };
        // fetchWeather();
        const interval = setInterval(() => {
            const date = new Date();
            const options = { day: "2-digit", month: "short", year: "numeric" };
            // const formattedDate = date.toLocaleDateString("en-US", options)
            setCurrentDate(date.toLocaleDateString("en-US", options));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {/* <Ionicons name="menu" size={24} color="white" /> */}
                <Text style={styles.title}>Welcome to {" "}
                    <Image source={require('../assets/mango.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                    {" "} Garden
                </Text>
            </View>
            <View style={styles.rightContainer}>
                <Image source={require('../assets/weather.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
                <View style={styles.textContainer}>
                    <Text style={styles.weatherText}>Sunny</Text>
                    <Text style={styles.dateText}>{currentDate}</Text>
                </View>
            </View>
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffc700',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 20
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    weatherText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginRight: 12,
    },
    dateText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Header;
