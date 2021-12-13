const express = require('express');
const router = express.Router();
const commentRouter = require('../controllers/comment');
const auth = require('../middleware/verifyToken')

// router.use(auth)
router.get('/', commentRouter.commentUser);
router.post('/', commentRouter.commentCreate);
router.delete('/:commentId', commentRouter.commentDelete);

module.exports = router