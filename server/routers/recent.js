const express = require('express');
const router = express.Router();
const recentController = require('../controllers/recent')
const auth = require('../middleware/verifyToken')



// router.use(auth)

router.get('/', recentController.get);
router.post('/', recentController.post);

module.exports = router