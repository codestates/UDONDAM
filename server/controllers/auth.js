const db = require('../models');
const { user } = require("../models");
const nodemailer = require('nodemailer');
const { generateAccessToken, sendAccessToken, deleteRefreshToken, isAuthorized } = require('../controllers/token.js');
//const axios = require('axios');
//const qs = require('qs');
module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;
        let userInfo = await user.findOne({
            where: {
                email: email,
                password: password
            }
        });

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
        console.log("@@@@@@@@@@@@@@@")
        console.log(req.cookies)
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
        console.log('emailCheck:',emailCheck)
        if (emailCheck) {
            res.status(409).json({ "message": "Email already exists"});
            return;
        }
        else {
            res.status(200).json({ "message": "ok!"})
        }
    },
    passwordCheck: async (req, res) => {
        const { email, password } = req.body;
        const checkPassword = await user.findOne({
            where: { email: email, password: password}
        })
        
        if(!checkPassword) {
            res.status(401).json({ "message": "Invalid password"});
            return ;
        }
        else if(checkPassword) {
            res.status(200).json({ "message": "ok!"});
            return ;
        }
        else {
            res.status(500).json({ "message": "Server Error"})
        }
    },
    tempp: async (req, res) => {
        const { email } = req.body;
        const emailCheck = await user.findOne({
            where: {
                email: email
            }
        });
        if (emailCheck) { // 이메일이 잘 있다면
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
    
                const verificationCode = generateRandomCode(8);
    
                const mailOptions = {
                    from: `[UDONDAM] <${process.env.NODEMAILER_USER}>`,
                    to: email,
                    subject: `[UDONDAM] 임시 비밀번호를 확인해주세요`,
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
                    <h3 style="text-align: left; color:white;">로그인을 하시려면 비밀번호 란에 <b>임시 비밀번호</b>를 입력해주세요.</h3>
                    <h3 style="color:white;">기존 비밀번호가 아닌 발급드린 임시 비밀번호를 입력하셔야만 로그인이 됩니다.</h3>
                    <h3 style="color:white;">UDONDAM 임시 비밀번호 : <u>${verificationCode}</u></h3>
                    </div></div></div>`,
                };
    
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(err);
                    }
                    // res.send({ data: info });
                    // console.log(info);
                });

                await user.update({
                    email: email,
                    password: verificationCode,
                },
                {
                    where: {
                        email: email,
                    },
                })
                .then(() => {
                    return res.status(200).json({
                        "message" : "resend password!"
                    });
                });
            }
            catch (err) {
                console.log(err);
                res.sendStatus(500);
            }
        }
        else {
            res.status(401).json({ "message" : "email check" })
        }
    },
    google: async (req, res) => {
        return res.redirect(
            // 구글 로그인 화면 리다이렉트
            `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&client_id=${process.env.GOOGLE_CLIENT_ID}`
        );
    },
    googlecallback: async (req, res) => {
        const code = req.query.code; // authorization code
        try {
            const result = await axios.post(
                // authorization code를 이용해서 access token 요청
                `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`
            );
            const userInfo = await axios.get(
                // access token으로 유저정보 요청
                `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${result.data.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${result.data.access_token}`,
                    },
                }
            );
            const user = await user.findOrCreate({
                where: {
                    email: userInfo.data.email,
                    socialType: 'google',
                },
                defaults: {
                    email: userInfo.data.email,
                    password: '',
                    socialType: 'google'
                },
            });

            const { id, nickname, area, area2, manager, socialType } = user[0].dataValues;
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

            res.redirect(`${process.env.CLIENT_URI}/temp`);
        } catch (error) {
            res.sendStatus(500);
        }
    },
    naver: (req, res) => {
        res.status(200).send('소셜 네이버');
    },
    kakao: async (req, res) => {
        // const kakao = {
        //     clientID: process.env.clientID,
        //     clientSecret: process.env.clientSecret,
        //     redirectUrl: process.env.redirectUrl
        // }
        //     const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile,account_email`;
        // return  res.redirect(kakaoAuthURL);
        // console.log(req.query)
        // for(let el of req.query.tag) {
        //     console.log(el)
        //     console.log(typeof el)
        // }
        // res.send(req.query)
        try{
        for(let el of req.query.tag) {
            console.log(el)
        }
        return res.send(req.query)
        } catch(err) {
            console.log(err)
            return res.send('ssss')
        }
    },
    kakaoCallback: async (req, res) => {
        console.log('bbb')
        try{//access토큰을 받기 위한 코드
            let token = await axios({//token
                method: 'POST',
                url: 'https://kauth.kakao.com/oauth/token',
                headers:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                data: qs.stringify({
                    grant_type: 'authorization_code',//특정 스트링
                    client_id:kakao.clientID,
                    client_secret:kakao.clientSecret,
                    redirectUri:kakao.redirectUri,
                    
                })//객체를 string 으로 변환
            })
            console.log('aaa')
            return res.send('asd')
        }catch(err){
            res.json(err.data);
        }
        
    }
}