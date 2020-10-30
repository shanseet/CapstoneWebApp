const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
/* ========================= */
mongoose.connect('mongodb://localhost/dashboard_app', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connection.once('open', () => { console.log("MongoDB connected!") });
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