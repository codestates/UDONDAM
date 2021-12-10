const {user} = require('../models/index');
const{ generateAccessToken, sendAccessToken} = require('./token');

module.exports = {
    userInfo : async (req, res) => { 
        req.userId = req.userId || 1
            const userInfo = await user.findOne({
            attributes: ['email', 'nickname'],
            where: { id: req.userId }
        })
        if(!userInfo) {
            return res.status(500).json({ "message": "Server Error"});
        }
        return res.status(200).json(userInfo);
    },

    userPatch : async (req, res) => {
        req.userId = req.userId || 1
        console.log("(((((((((((((((((")
        console.log(req.cookies)
        console.log(req.body)
        const {nickname, password} = req.body;
        if(nickname && password) {
            await user.update({
                nickname: nickname,
                password: password
            },
            {
                where: {id: req.userId}
            })
            return res.status(200).json({"message": "user patched!"})
        } 
        else if(nickname) {
            await user.update({
                nickname: nickname
            },
            {
                where: {id: req.userId}
            })
            return res.status(200).json({"message": "nickname patched!"})
        }
        else if(password) {
            await user.update({
                password: password
            },
            {
                where: {id: req.userId}
            })
            return res.status(200).json({"message": "password patched!"})
        }
    },

    areaPatch : async (req, res) => {
        console.log("(((((((((((((((((")
        console.log(req.cookies)
        console.log(req.body)
        req.userId = req.userId || 1
        const {area, area2} = req.body;
        try{
        if(area) {
            const patchCheck = await user.update({
                area : area
            },
            {
                where: {
                    id: req.userId
                }
            })
            if(!patchCheck) {
                return res.status(400).json({"message": "area2 checked!"})
            }
            const userInfo = await user.findOne({
                attributes:[['id','userId'], 'area', 'area2', 'email', 'nickname', 'manager', 'socialType'],
                where:{
                    id: req.userId
                },
                raw:true
            })
            res.clearCookie('jwt');
            const patchToken = generateAccessToken(userInfo);
            sendAccessToken(res, patchToken, userInfo);
        }
        else if(area2) {
            const patchCheck = await user.update({
                area2 : area2
            },
            {
                where: {
                    id: req.userId
                }
            })
            if(!patchCheck) {
                return res.status(400).json({"message": "area2 checked!"})
            }
            const userInfo = await user.findOne({
                attributes:[['id','userId'], 'area', 'area2', 'email', 'nickname', 'manager', 'socialType'],
                where:{
                    id: req.userId
                },
                raw:true
            })
            res.clearCookie('jwt');
            const patchToken = generateAccessToken(userInfo);
            sendAccessToken(res, patchToken, userInfo);
        }
        } catch(err) {
            console.log(err);
            return res.status(500).json({"message": "Server Error"})
        }
    },
    
    userDelete : async (req, res) => {
        console.log("(((((((((((((((((")
        console.log(req.cookies)
            req.userId = req.userId || 1        
        try{
            await user.destroy({
            where: {id: req.userId}
        })
            res.status(200).clearCookie('jwt').json({"message" : 'delete!'})  
            return;
        } catch(err) {
            console.log(err);
            return res.status(500).json({"message" : "Server Error"});
        }
    },
}