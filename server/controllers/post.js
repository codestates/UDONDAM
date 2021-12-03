const {post, tag, user, comment, like} = require('../models/index');
const sequelize = require('sequelize')
module.exports = {
    postTag : async (req, res) => {
        let a = await post.findAll({
            include: [
                {
                    model: user,
                    attributes:['nickname']
                },
                {
                    model: tag,
                    attributes:['content']
                },
            ]
        })
        let b = [];
        a.map((el)=> {
            const {id, content, createAt, public, userId, user, tags} = el;
            let tag = [];
            for (let el of tags) {
                tag.push(el.content)
            }
            b.push({
                id: id,
                content: content,
                createAt: createAt,
                public: public,
                userId: userId,
                nickname: user.nickname,
                tag: tag
            })
        })
        console.log(b)
        res.status(200).send(b);
    },
    postUser : (req, res) => {
        res.status(200).send("postUser");
    },
    postPick : (req,res) => {
        res.status(200).send("postPick");
    },
    postCreate : (req, res) => {
        res.status(200).send("postPost");
    },
    postDelete : (req, res) => {
        res.status(200).send("postDelete");
    }
}