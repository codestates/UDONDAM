const { comment, likes, post_tag, post, tag, user } = require("../models");
const { isAuthorized } = require('../controllers/token.js');
module.exports = {
    likesUser: async (req, res) => {
        const { email } = req.body;
        let userInfo = await user.findOne({
            where: {
                email: email
            }
        })
        if(!userInfo){
            res.status(401).json({"message" : "token doesn't exist"});
        }
        res.status(200).send("likesUser");
    },
    likesCreate: (req, res) => {
        res.status(200).send("likesCreate");
    },
    likesDelete: (req, res) => {
        res.status(200).send("likesDelete");
    },
}