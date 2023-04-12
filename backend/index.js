const express = require('express')
const mqtt = require('mqtt')

const app = express()

const brokerUrl = 'ws://broker.mqttdashboard.com:8000/mqtt'
const clientId = 'thinhdang'
const topic = 'mango_garden_data'
const topic_send = 'mango_garden_cmd'
const client = mqtt.connect(brokerUrl, { clientId })


let lastMessage = null

client.on('connect', () => {
  console.log('Connected to HiveMQ broker')
  client.subscribe(topic)
})

client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`)
  lastMessage = message.toString()
})

app.get('/api/value', (req, res) => {
  console.log('Sending data to frontend:', lastMessage)
  res.send(lastMessage)
  // const data = { temperature: 25, humidity: 50 }
  // console.log('Sending data to frontend:', data)
  // // Send the data to the frontend
  // res.send(data)
})

app.post('/api/data', express.json(), (req, res) => {
  const message = req.body.data
  console.log("Button Data: ", message)
  client.publish(topic_send, message)
  res.json({ success: true })
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
