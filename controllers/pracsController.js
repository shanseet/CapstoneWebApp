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
    add: function (req, res) {
        Prac.create(req.body.prac)
            .then(newPrac => res.json({ prac: "prac added successfully" }))
            .catch(err => { res.status(422).json(err); console.log(err) });
    },
    deleteOne: function (req, res) {
        Prac.deleteOne({ _id: req.params.id }).then(result => res.json(result))
            .catch(err => status(422).json(err));
    },
    deleteAll: function (req, res) {
        Prac.deleteMany({}).then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    }
};