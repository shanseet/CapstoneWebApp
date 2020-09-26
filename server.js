const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=> {
    res.send("Hello");
})

app.listen(4000, ()=> console.log("server running"));