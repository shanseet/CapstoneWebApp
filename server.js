const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const mqtt = require('mqtt');

app.use(cors());
app.use(bodyParser.json());
/* ========================= */
mongoose.connect('mongodb://localhost/dashboard_app', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connection.once('open', () => { console.log("MongoDB connected!") });
/* ========================= */
const pracs = require('./api/pracsApi');
app.use('/api/pracs', pracs);
/* ========================= */
// const mqttSub = mqtt.connect('mqtt://192.168.31.111');
// mqttSub.on('connect', function () {
//     console.log("connected to MQTT broker!")
//     mqttSub.subscribe('myTopic');
// })
// mqttSub.on('message', function (topic, message) {
//     console.log(message.toString());
// })
/* ========================= */
app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'));
})
/* ========================= */
const port = process.env.PORT || 4000;
app.listen(port, () => console.log("server running"));