import { Client } from 'react-native-mqtt';

const client = new Client({
  url: 'broker.mqttdashboard.com:8000', // replace with your broker URL
  clientId: 'clientId-ELToqcd31R', // replace with your client ID
});

client.connect().then(() => {
  console.log('MQTT connected');
}).catch((error) => {
  console.log('MQTT connection failed: ', error);
});

client.on('closed', () => {
  console.log('MQTT connection closed');
});

client.on('error', (error) => {
  console.log('MQTT error: ', error);
});

export default client;
