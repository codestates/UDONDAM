const {post, tag, user, comment, likes, post_tag,sequelize} = require('../models/index');
const { Op } = require("sequelize");
module.exports = {
    postTag : async (req, res) => {
        req.userId = req.userId || 1;
        req.query.tag = req.query.tag || '["대전","스포츠"]';
        const  queryTag = JSON.parse(req.query.tag);

        const posts = await post.findAll({
            include: [
                {
                    model: user,
                    attributes: ['nickname'],
                    required: true
                },
                {
                    model: tag,
                    attributes: ['content'],
                    where: {
                        content: queryTag
                    }
                },
                {
                    model: likes,
                    attributes: ['userId']
                },
                {
                    model: comment,
                    attributes: ['id']
                }
            ],
            order: [['createAt','DESC']],
            limit: 10
        })
        if(posts.length === 0) {
            return res.status(200).send(posts);
        }
        let resPosts = [];
        posts.map((post)=> {
            const {id, content, createAt, public, userId, user, tags, likes, comments} = post;
            const tag = [];
            for (let el of tags) {
                tag.push(el.content)
            }
            let likeCheck = false;
            for(let like of likes) {
                if(like.userId === req.userId) {
                    likeCheck = true;
                }
            }
            resPosts.push({
                id: id,
                userId: userId,
                nickname: user.nickname,
                content: content,
                tag: tag,
                commentCount: comments.length,
                likeCount: likes.length,
                likeCheck: likeCheck,
                createAt: createAt,
                public: public
            });
        });
                return res.status(200).send(resPosts);
    },

    postUser : async (req, res) => {
        req.userId = req.userId || 1;
        const posts = await post.findAll({
            attributes: ['id', 'content', 'createAt'],
            where: {
                userId: req.userId
            },
            include:[
                {
                    model: likes,
                    attributes: ['id']
                },
                {
                    model: comment,
                    attributes: ['id']
                }
            ]
        });
        if(posts.length === 0) {
            return res.status(200).json(posts);
        }
        let resPosts = [];
        posts.map((post)=> {
            const {id, content, createAt, likes, comments} = post;
            resPosts.push({
                id:id,
                content: content,
                createAt: createAt,
                likeCount: likes.length,
                commentCount: comments.length
            })
        })
        res.status(200).send(resPosts);
    },
    postPick : async (req,res) => {
        req.params.postId = req.params.postId || 1;
        const re = await post.findOne({
            where:{
                id: req.params.postId
            },
            include:[
                {
                    model: user,
                    attributes: ['nickname']
                },
                {
                    model: tag,
                    attributes: ['content'],
                    required: true
                },
                {
                    model: comment,
                    required: true
                }
            ]
        });
        try{
        const {id, userId, public, content, createAt, user, tags, comments} = re
        let tag = [];
        for(let el of tags) {
            tag.push(el.content)
        }
        
        let arr = [];
            comments.map((el)=>{
            if(el.dataValues.commentId === null) {
                el.dataValues.comment = [];
                arr.push(el.dataValues);
            }
            else {
                for(let as of arr) {
                    if(as.id === el.dataValues.commentId) {
                        as.comment.push(el.dataValues)
                    }
                }
            }
        })
        
        console.log(arr)
        let b = {
            id: id,
            userId: userId,
            nickname: user.nickname,
            content: content,
            public: public,
            createAt: createAt,
            tag: tag,
            comment:arr
        }
        res.status(200).send(b);
        } catch(err) {
            console.log(err);
            res.status(400).send("asd")
        }
    },
    postCreate : (req, res) => {
        res.status(200).send("postPost");
    },
    postDelete : (req, res) => {
        res.status(200).send("postDelete");
    }
}