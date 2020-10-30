const express = require('express');
const router = express.Router();
/* ========================= */
const pracsController = require('../controllers/pracsController');
const activePracController = require('../controllers/activePracController');
/* ========================= */
router.route('/')
    .get(pracsController.getAll)
    .post(pracsController.add);

router.route('/counter')
    .get(pracsController.getNum);

router.route('/deleteAll')
    .post(pracsController.deleteAll);

router.route('/isactive')
    .get(activePracController.isActive)
    .post(activePracController.setActive);

router.route('/:id')
    .get(pracsController.getById);

module.exports = router;