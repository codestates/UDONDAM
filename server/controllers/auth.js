const db = require('../models');
const { generateAccessToken, sendAccessToken } = require('../controllers/token.js');
module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;
        let userInfo = await db.user.findOne({
            where: {email: email, password: password}
        })

        if(!userInfo) {
            res.status(401).json({"message": "Invalid email or password"})
            return ;
        }
        else {
            const { id, nickname, area, area2, manager, socialType } = userInfo;
            const userData = {
                userId: id,
                nickname: nickname,
                area: area,
                area2: area2,
                manager: manager,
                socialType: socialType
            }
            const token = generateAccessToken(userData);
            sendAccessToken(res, token, userData);
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('jwt');
            res.status(200).json({"message": "logout!"});
            return;
        } catch (err) {
            console.log(err);
            return res.status(401).json({ "message": "Unauthorized"});
        }
    },
    signup: async (req, res) => {
        const { email, password } = req.body;
        await db.user.create({
            email: email, password:password
        });
        res.status(201).json({ "message": "signUp!"});
        return;
    },
    email: (req, res) => {
        res.status(200).send('email인증');
    },
    emailCheck: async (req, res) => {
        const { email } = req.body;
        const emailCheck = await db.user.findOne({
            where: { email: email }
        });
        if (emailCheck) {
            res.status(409).json({ "message": "Email already exists"});
            return;
        }
        else {
            res.status(200).json({ "message": "ok!"})
        }
    },
    passwordCheck: (req, res) => {
        res.status(200).send('비밀번호 체크');
    },
    tempp: (req, res) => {
        res.status(200).send('임시비밀번호 발송');
    },
    google: (req, res) => {
        res.status(200).send('소셜 구글');
    },
    naver: (req, res) => {
        res.status(200).send('소셜 네이버');
    },
    kakao: (req, res) => {
        res.status(200).send('소셜 카카오');
    },
}