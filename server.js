const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
/* ========================= */
const connection = "mongodb+srv://" + process.env.DB_username + ":"
    + process.env.DB_password + "@capstonemern.ubkvj.mongodb.net/dashboard_app";
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));
/* ========================= */
const pracs = require('./api/pracsApi');
app.use('/api/pracs', pracs);
/* ========================= */

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'));
})
/* ========================= */
const port = process.env.PORT || 4000;
app.listen(port, () => console.log("server running"));