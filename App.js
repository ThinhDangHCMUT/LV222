import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';


const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === 'Sensor') {
              iconName = 'thermometer';
            } else if (route.name === 'Device') {
              iconName = 'tune-vertical';
            }

            return <Icon name={iconName} size={30} color={color} />;
          },
          "tabBarActiveTintColor": "#ffc700",
          "tabBarInactiveTintColor": "black",
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ]

        })}
      >
        <Tab.Screen name="Sensor" component={HomeScreen} />
        <Tab.Screen name="Device" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;