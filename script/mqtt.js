// Import required libraries
const express = require('express');
const http = require('http');
const mqtt = require('mqtt');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const keys = require('./iot-test-data-425419-09bd41dcab52.json'); // Update with your credentials file path

// Create an Express application
const app = express();
// Create an HTTP server and bind it to the Express app
const server = http.createServer(app);
// Create a Socket.io instance and attach it to the server
const io = socketIo(server);

// Connect to the MQTT broker
const mqttClient = mqtt.connect('mqtt://test.mosquitto.org');


// When connected to the MQTT broker
mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    const topics = ['pi3/carbon-credit'];
    // Subscribe to sensor topics
    mqttClient.subscribe(topics, (err) => {
        if (err) {
            console.error('Subscription error:', err);
        } else {
            console.log('Subscribed to topics:', topics);
        }
    });
});


// When a message is received from the MQTT broker
mqttClient.on('message', (topic, message) => {
    const value = message.toString();
    console.log(`Received message from ${topic}: ${value}`);
    // Emit the received data to connected clients via Socket.io
    io.emit(topic, value);
});

// When a client connects via Socket.io
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Serve the main index page
app.get("./index.html", (req, res) => {
    res.sendFile(__dirname + "./index.html");
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/login');
});