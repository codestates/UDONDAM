const db = require('../models');
const { user } = require("../models");
const nodemailer = require('nodemailer');
const { generateAccessToken, sendAccessToken, deleteRefreshToken, isAuthorized } = require('../controllers/token.js');
module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;
        let userInfo = await user.findOne({
            where: {
                email: email,
                password: password
            }
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
        }
        catch (err) {
            console.log(err);
            return res.status(401).json({ "message": "Unauthorized"});
        }
    },
    signup: async (req, res) => {
        const { email, password } = req.body;
        await user.create({
            email: email, password:password
        });
        res.status(201).json({ "message": "signUp!"});
        return;
    },
    email: async (req, res) => {
        const { email } = req.body;

        try {
            // 인증코드 생성 함수
            const generateRandomCode = (n) => {
                let str = "";
                for (let i = 0; i < n; i++) {
                    str += Math.floor(Math.random() * 10);
                }
                return str;
            };

            let transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASS
                },
            });

            const verificationCode = generateRandomCode(6);

            const mailOptions = {
                from: `[UDONDAM] <${process.env.NODEMAILER_USER}>`,
                to: email,
                subject: `[UDONDAM] 이메일 인증번호를 확인해주세요`,
                html: `<div style="background-color: white;
                display: flex; align-items: center; text-align: center;
                flex-direction:column; font-size: 20px;">
                <div style="background-size: 58px;
                background-color: black;
                width: 50rem; min-height: 45rem;
                border-radius: 15px 15px 15px 15px;
                padding: 2rem;">
                <img width="300" alt="로고-우동담-dark-배경o" src="https://user-images.githubusercontent.com/87490361/143793727-047f5764-454d-4b9f-94cd-d82d0f959623.png">
                <div style="text-align: left; padding:10px 10px 0;">
                <h3 style="text-align: left; color:white;">이메일 인증을 완료하시려면 <b>인증번호</b>를 입력해주세요.</h3>
                <h3 style="color:white;">인증번호를 입력하셔야만 이메일 인증이 완료됩니다.</h3>
                <h3 style="color:white;">UDONDAM 인증번호 : <u>${verificationCode}</u></h3>
                </div></div></div>`,
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                }
                // res.send({ data: info });
                // console.log(info);
            });
            
            return res.status(200).json({
                "verificationCode": verificationCode
            });
        }
        catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    },

    emailCheck: async (req, res) => {
        const { email } = req.body;
        const emailCheck = await user.findOne({
            where: {
                email: email
            }
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