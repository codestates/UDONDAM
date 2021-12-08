const express = require('express');
const router = express.Router();
const postController = require('../controllers/post')
const auth = require('../middleware/verifyToken')

router.use(auth)
router.get('/', postController.postTag);
router.get('/user', postController.postUser);
router.get('/:postId', postController.postPick);
router.post('/', postController.postCreate);
router.delete('/:postId', postController.postDelete);

module.exports = router