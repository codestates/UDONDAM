const {user} = require('../models/index');

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
        // req.userId = req.userId || 1
        // const {area, area2} = req.body;
        // if(area && area2) {
        //     await user.update({
        //         area: area,
        //         area2: area2
        //     },
        //     {
        //         where: {id: req.userId}
        //     })
        //     return res.status(200).json({"message": "patched!"})
        // } 
        // let areaAttribute = Object.keys(req.body)[0];
        //     console.log(typeof areaAttribute)
        //     await user.update({
        //         areaAttribute: req.body[areaAttribute]
        //     },
        //     {
        //         where: {id: req.userId}
        //     })
            return res.status(200).json({"message": "patched!1"})
    },
    areaPatch : (req, res) => {
        res.status(200).send("areaPatch")
    },
    userDelete : async (req, res) => {
        // req.userId = req.userId || 1
        // await user.destroy({
        //     where: {id: req.userId}
        // })
        // res.status(200).clearCookie('jwt').json({"message" : 'delete!'})
    },
}