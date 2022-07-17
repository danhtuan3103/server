const express = require('express');
const router = express.Router();

const cardController = require('../app/controllers/CardController');

router.get('/', cardController.index);
router.post('/', cardController.postCard);
router.post('/add', cardController.addCard);
router.post('/delete', cardController.deleteCard);


module.exports = router;
