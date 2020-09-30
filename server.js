const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const Prac = require('./models/prac.model');
const Counter = require('./models/counter.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/dashboard_app', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connection.once('open', () => { console.log("MongoDB connected!") });

app.get('/', (req, res) => {
    res.send("Hello");
})

app.get('/pracs', (req, res) => {
    Prac.find((err, pracs) => {
        if (err) console.log(err)
        else {
            res.json(pracs);
        }
    })
})

app.post('/pracs', (req, res) => {
    Counter.findOneAndUpdate({ _id: "pracid" }, { $inc: { sequence_value: 1 } }, {new: true }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            req.body["_id"] = result.sequence_value;
            let prac = new Prac(req.body);
            prac.save()
                .then(() => {
                    res.status(200).json({ prac: "prac added successfully" });
                })
                .catch(err => {
                    res.status(400).send('failed in adding new prac ' + err);
                })
        }
    });
})

app.get('/pracs/:id', (req, res) => {
    Prac.findById(req.params.id, (err, prac) => {
        if (err) res.send("can't find this prac");
        else {
            res.json(prac)
        }
    });
})

app.get('/counter', (req, res) => {
    Counter.findById("pracid", (err, result) => {
        if (err) res.send("can't find the counter")
        else res.json(result.sequence_value);
    })
})

app.listen(4000, () => console.log("server running"));