//const {user} = require("./models/index.js");
module.exports = {
    userInfo : (req, res) => {
        res.status(200).send("userInfo")
    },
    userPatch : (req, res) => {
        res.status(200).send("userPatch")
    },
    areaPatch : (req, res) => {
        res.status(200).send("areaPatch")
    },
    userDelete : async (req, res) => {
        if(req.userId) {
            await user.destroy({
                where: {id: userId}
            })
            return res.status(200).clearCookie("jwt").json({"message" : "delete!"});
        }
        else {
            return res.status(401).json({"message" : "token doesn't exist"})
        }
    },
}