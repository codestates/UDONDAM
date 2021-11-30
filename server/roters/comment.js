const express = require('express');
const router = express.Router();
const commentRouter = require('../controllers/comment');

router.get('/', commentRouter.commentUser);
router.post('/', commentRouter.commentCreate);
router.delete('/', commentRouter.commentDelete);

module.exports = router