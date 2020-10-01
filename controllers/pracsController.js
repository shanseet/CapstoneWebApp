const Prac = require('../models/Pracs');
const Counter = require('../models/Counters');

module.exports = {
    getAll: function (req, res) {
        Prac.find({})
            .then(pracs => res.json(pracs))
            .catch(err => res.status(422).json(err));
    },
    getById: function (req, res) {
        Prac.findById(req.params.id)
            .then(prac => res.json(prac))
            .catch(err => res.status(422).json(err));
    },
    getNum: function (req, res) {
        Counter.findById("pracid")
            .then(counter => res.json(counter.sequence_value))
            .catch(err => res.status(422).json(err));
    },
    add: function (req, res) {
        Counter.findOneAndUpdate({ _id: "pracid" }, { $inc: { sequence_value: 1 } }, { new: true })
            .then(counter => {
                req.body["_id"] = counter.sequence_value;
                Prac.create(req.body)
                    .then(newPrac => res.json({ prac: "prac added successfully" }))
                    .catch(err => res.status(422).json(err));
            })
    }
};