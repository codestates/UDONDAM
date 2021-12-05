const {post, tag, user, comment, like, post_tag,sequelize} = require('../models/index');
const { Op } = require("sequelize");
const queryString = `SELECT post.id, post.content, post.createAt, post.public, user.nickname FROM post_tag 
LEFT JOIN post ON post_tag.postId = post.id
LEFT JOIN user ON post.userId = user.id
`;
module.exports = {
    postTag : async (req, res) => {
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
                }
            ]
        })
        let b = [];
        a.map( async (el)=> {
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
                tag: tag,
            })
        })
        
        res.status(200).send(b);
    },
    postUser : async (req, res) => {
        let [result, data]= await sequelize.query(queryString)
        console.log(result)
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