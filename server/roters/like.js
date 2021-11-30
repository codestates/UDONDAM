const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like')

router.get('/', likeController.likeUser);
router.post('/', likeController.likeCreate);
router.delete('/', likeController.likeDelete);

module.exports = router