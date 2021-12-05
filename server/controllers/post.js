const {post, tag, user, comment, likes, post_tag,sequelize} = require('../models/index');
const { Op } = require("sequelize");
module.exports = {
    postTag : async (req, res) => {
        req.userId = req.userId || 1
        req.query.tag = req.query.tag || ['대전','스포츠']
        let  queryTag = JSON.parse(req.query.tag)

        let a = await post.findAll({
            include: [
                {
                    model: user,
                    attributes:['nickname'],
                    required: true
                },
                {
                    model: tag,
                    attributes:['content'],
                    where: {
                        content: queryTag
                    }
                },
                {
                    model: likes,
                    attributes:['id']
                },
                {
                    model: comment,
                    attributes:['id']
                }
            ]
        })
        
        let b = [];
        a.map((el)=> {
            const {id, content, createAt, public, userId, user, tags, likes, comments} = el;
            let tag = [];
            for (let el of tags) {
                tag.push(el.content)
            }
            let likeCheck = false;
            if(req.userId === userId) {
                likeCheck = true;
            }
            b.push({
                id: id,
                userId: userId,
                nickname: user.nickname,
                content: content,
                tag: tag,
                commentCount: comments.length,
                likeCount: likes.length,
                likeCheck: likeCheck,
                createAt: createAt,
                public: public,

            })
        })
        
        res.status(200).send(b);
    },
    postUser : async (req, res) => {
        let [result, data]= await sequelize.query(queryString)
        console.log(result)
        res.status(200).send("postUser");
    },
    postPick : async (req,res) => {
        let a = await user.findAll({
            include: [{
                model: post
            }]
        })
        res.status(200).send(a);
    },
    postCreate : (req, res) => {
        res.status(200).send("postPost");
    },
    postDelete : (req, res) => {
        res.status(200).send("postDelete");
    }
}