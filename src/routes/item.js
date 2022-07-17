const express = require('express');
const router = express.Router();

const itemController = require('../app/controllers/ItemController');

router.get('/id/:id', itemController.getById);
router.get('/type/:type', itemController.getByType);
router.get('/:sex/:type', itemController.getBySexAndType);
router.get('/:sex', itemController.getBySex);
router.get('/', itemController.index);

module.exports = router;
