const express = require('express');
const router = express.Router();

const favoriteController = require('../app/controllers/FavoriteController');

router.get('/', favoriteController.index);
router.post('/' , favoriteController.findFavorite)
router.put('/' , favoriteController.addFavorite)
router.post('/delete' , favoriteController.deleteFavorite)



module.exports = router;
