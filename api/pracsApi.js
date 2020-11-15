const express = require('express');
const router = express.Router();
/* ========================= */
const pracsController = require('../controllers/pracsController');
const activePracController = require('../controllers/activePracController');
/* ========================= */
router.route('/')
    .get(pracsController.getAll)
    .post(pracsController.add);

router.route('/deleteAll')
    .post(pracsController.deleteAll);

router.route('/delete/:id')
    .post(pracsController.deleteOne);

router.route('/isactive')
    .get(activePracController.isActive)
    .post(activePracController.setActive);

router.route('/editNotes/:id')
    .post(pracsController.editNotes);

router.route('/findInRange')
    .post(pracsController.findInRange);

module.exports = router;