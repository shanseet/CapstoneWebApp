const express = require('express');
const router = express.Router();
/* ========================= */
const pracsController = require('../controllers/pracsController');
/* ========================= */
router.route('/')
    .get(pracsController.getAll)
    .post(pracsController.add);

router.route('/counter')
    .get(pracsController.getNum);

router.route('/:id')
    .get(pracsController.getById);

module.exports = router;