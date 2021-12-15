const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likes');
const auth = require('../middleware/verifyToken')


//router.use(auth)

router.get('/', likesController.likesUser);
router.post('/', likesController.likesCreate);
router.delete('/', likesController.likesDelete);

module.exports = router