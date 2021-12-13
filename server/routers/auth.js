const express = require('express');
const router = express.Router();
const authRouter = require('../controllers/auth')
const auth = require('../middleware/verifyToken')

router.post('/login', authRouter.login);
router.get('/logout',authRouter.logout);
router.post('/signup', authRouter.signup);
router.post('/email', authRouter.email);
router.post('/emailcheck', authRouter.emailCheck);
router.post('/passwordcheck', authRouter.passwordCheck);
router.post('/tempp', authRouter.tempp);
router.get('/google', authRouter.google);
router.get('/googlecallback',authRouter.googlecallback);
router.get('/naver', authRouter.naver);
router.get('/kakao', authRouter.kakao);
router.get('/kakaocallback', authRouter.kakaoCallback);
module.exports = router