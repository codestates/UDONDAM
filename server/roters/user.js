const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const auth = require('../middleware/verifyToken')

//router.use(auth)
router.get('/', userController.userInfo);
router.patch('/', userController.userPatch);
router.patch('/area', userController.areaPatch);
router.delete('/', userController.userDelete);

module.exports = router