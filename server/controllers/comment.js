const {comment, post} = require('../models/index')

module.exports = {
    commentUser: async (req, res) => {
        req.userId = req.userId || 1;
        let a = await comment.findAll({
                where:{
                    userId: req.userId
                }
        })
        console.log(a)
        res.send(a)
    },
    commentCreate: (req, res) => {
        res.status(200).send("commentCreate");
    },
    commentDelete: (req, res) => {
        res.status(200).send("commentDelete");
    },
}