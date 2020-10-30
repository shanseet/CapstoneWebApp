const Counter = require('../models/Counters');

module.exports = {
    isActive: function (req, res) {
        Counter.findById("isactive")
            .then(isactive => {
                    res.json(isactive.sequence_value)
                }
            )
            .catch(err => res.status(422).json(err));
    },
    setActive: function (req, res) {
        Counter.findOneAndUpdate({ _id: "isactive" }, { sequence_value: req.body.startstop })
            .then(update => res.json("isactive updated"));
    }
}

// db.counters.insert({_id: "isactive", sequence_value: 0})