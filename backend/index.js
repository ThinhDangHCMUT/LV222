const express = require('express')
const mqtt = require('mqtt')
const nodemailer = require('nodemailer');

const app = express()

const brokerUrl = 'ws://broker.mqttdashboard.com:8000/mqtt'
const clientId = 'thinhdang'
const topic = 'mango_garden_data'
const topic_send = 'mango_garden_cmd'
const client = mqtt.connect(brokerUrl, { clientId })



const transporter = nodemailer.createTransport({
  service: 'gmail', // Use the email service of your choice
  auth: {
    user: 'mangogarden1402@gmail.com', // Your email address
    pass: 'rxoluyzgjgnhbwju' // Your email password
  }
});

// Define the email options
const mailOptionsN = {
  from: 'mangogarden1402@gmail.com', // Sender email address
  to: 'danggiathinhgocong@gmail.com', // Recipient email address
  subject: 'Cảnh báo về chỉ số N', // Subject of the email
  text: 'Chỉ số N đang ngoài mức cho phép' // Plain text body of the email
};

const mailOptionsP = {
  from: 'mangogarden1402@gmail.com', // Sender email address
  to: 'danggiathinhgocong@gmail.com', // Recipient email address
  subject: 'Cảnh báo về chỉ số P', // Subject of the email
  text: 'Chỉ số N đang ngoài mức cho phép' // Plain text body of the email
};

const mailOptionsK = {
  from: 'mangogarden1402@gmail.com', // Sender email address
  to: 'danggiathinhgocong@gmail.com', // Recipient email address
  subject: 'Cảnh báo về chỉ số K', // Subject of the email
  text: 'Chỉ số K đang ngoài mức cho phép' // Plain text body of the email
};

// Send the email


let lastMessage = null

client.on('connect', () => {
  console.log('Connected to HiveMQ broker')
  client.subscribe(topic)
})


// client.on('message', (topic, message) => {
//   console.log(`Received message on topic ${ topic }: ${ message.toString() }`)
//   // if (parseFloat((message.toString()).split(',')[1].split(':')[1]) > 30) {
//   //   transporter.sendMail(mailOptions, (error, info) => {
//   //     if (error) {
//   //       console.error('Could not send email', error);
//   //     } else {
//   //       console.log('Email sent successfully', info);
//   //     }
//   //   });
//   // }
//   lastMessage = message.toString()
// })

const messageListener = (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`)
  console.log((message.toString()).split(',')[1].split(':')[1])
  if(parseFloat((message.toString()).split(',')[4]?.split(':')[1]) > 20 || parseFloat((message.toString()).split(',')[4]?.split(':')[1]) < 10) {
    transporter.sendMail(mailOptionsN, (error, info) => {
      if (error) {
        console.error('Could not send email', error);
      } else {
        console.log('Email sent successfully', info);
        // Remove the event listener after sending the email
        // client.removeListener('message', messageListener);
      }
    });
  }

  if(parseFloat((message.toString()).split(',')[5]?.split(':')[1]) > 15 || parseFloat((message.toString()).split(',')[5]?.split(':')[1]) < 10) {
    transporter.sendMail(mailOptionsP, (error, info) => {
      if (error) {
        console.error('Could not send email', error);
      } else {
        console.log('Email sent successfully', info);
        // Remove the event listener after sending the email
        // client.removeListener('message', messageListener);
      }
    });
  }

  if(parseFloat((message.toString()).split(',')[6]?.split(':')[1]) > 50 || parseFloat((message.toString()).split(',')[6]?.split(':')[1]) < 30) {
    transporter.sendMail(mailOptionsK, (error, info) => {
      if (error) {
        console.error('Could not send email', error);
      } else {
        console.log('Email sent successfully', info);
        // Remove the event listener after sending the email
        // client.removeListener('message', messageListener);
      }
    });
  }

  lastMessage = message.toString()
};

// // Add the event listener
client.on('message', messageListener);


app.get('/api/value', (req, res) => {
  console.log('Sending data to frontend:', lastMessage)
  res.send(lastMessage)
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
