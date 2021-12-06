const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likes');

router.get('/', likesController.likesUser);
router.post('/', likesController.likesCreate);
router.delete('/', likesController.likesDelete);

module.exports = router