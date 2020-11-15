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
        req.body.prac.notes = "";
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
    },
    editNotes: function (req, res) {
        Prac.findByIdAndUpdate({ _id: req.params.id }, { notes: req.body.content })
            .then(result => {
                res.json("note added");
            })
            .catch(err => { res.status(422).json(err); console.log(err) });
    },
    findInRange: function (req, res) {
        // YYYY-MM-DD
        let startDate = new Date(new Date(req.body.start).setHours(0, 0, 0));
        let endDate = new Date(new Date(req.body.end).setHours(23, 59, 59));

        Prac.find({ start: { $gte: startDate, $lte: endDate } })
            .then(result => {
                res.json(result);
            })
            .catch(err => res.status(422).json(err));
    }
};