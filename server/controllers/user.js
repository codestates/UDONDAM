const {user} = require('../models/index');

module.exports = {
    userInfo : async (req, res) => { 
        req.userId = req.userId || 1
        try {
            const userInfo = await user.findOne({
            attributes: [['id','userId'],'email', 'nickname', 'area', 'area2', 'socialType', 'manager'],
            where: { id: req.userId }
            })
            return res.status(200).json(userInfo);
        } catch(err) {
            console.log(err);
            return res.status(500).json({ "message": "Server Error"});
        }
    },

    userPatch : async (req, res) => {
        req.userId = req.userId || 1;
        const {nickname, password} = req.body;
        try{
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
        } catch(err) {
            console.log(err);
            return res.status(500).json({"message": "Server Error"})
        }
    },

    areaPatch : async (req, res) => {
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
                return res.status(400).json({"message": "area checked!"})
            }
            const userInfo = await user.findOne({
                attributes:['area'],
                where:{
                    id: req.userId
                },
                raw:true
            })
            // res.clearCookie('jwt');
            // const patchToken = generateAccessToken(userInfo);
            // sendAccessToken(res, patchToken, userInfo);
            res.status(200).json(userInfo)
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
                attributes:['area2'],
                where:{
                    id: req.userId
                },
                raw:true
            })
            // res.clearCookie('jwt');
            // const patchToken = generateAccessToken(userInfo);
            // sendAccessToken(res, patchToken, userInfo);
            res.status(200).json(userInfo)
        }
        } catch(err) {
            console.log(err);
            return res.status(500).json({"message": "Server Error"})
        }
    },
    
    userDelete : async (req, res) => {
            req.userId = req.userId || 1        
        try{
            await user.destroy({
            where: {id: req.userId}
        })
            return res.status(200).clearCookie('jwt').json({"message" : 'delete!'})  
        } catch(err) {
            console.log(err);
            return res.status(500).json({"message" : "Server Error"});
        }
    },
}