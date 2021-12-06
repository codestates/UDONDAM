const express = require('express');
const router = express.Router();
const postController = require('../controllers/post')

router.get('/', postController.postTag);
router.get('/user', postController.postUser);
router.get('/:postId', postController.postPick);
router.post('/', postController.postCreate);
router.delete('/', postController.postDelete);

module.exports = router