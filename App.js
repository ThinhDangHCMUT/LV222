import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import { registerRootComponent } from 'expo';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color}) => {
            let iconName;

            if (route.name === 'Sensor') {
              iconName = 'thermometer';
            } else if (route.name === 'Device') {
              iconName = 'tune-vertical';
            }

            return <Icon name={iconName} size={30} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#ffc700',
          inactiveTintColor: 'black',
        }}
      >
        <Tab.Screen name="Sensor" component={HomeScreen} />
        <Tab.Screen name="Device" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
registerRootComponent(App)
export default App;

