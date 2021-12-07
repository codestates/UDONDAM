const {post, tag, user, comment, likes, post_tag,sequelize} = require('../models/index');
const { Op } = require("sequelize");
module.exports = {
    postTag : async (req, res) => {
        req.userId = req.userId || 1;
        req.query.tag = req.query.tag || '["대전","스포츠"]';
        req.query.notTag = req.query.notTag || '["대전"]';
        const  queryTag = JSON.parse(req.query.tag);
        const  queryNotTag = JSON.parse(req.query.notTag);

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
        const resPosts =  posts.map((post)=> {
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
            return {
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
            };
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
            ],
            order: [['createAt','DESC']]
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
        req.userId = req.userId || 1
        req.params.postId = req.params.postId || 1;
        const postPick = await post.findOne({
            where:{
                id: req.params.postId
            },
            include:[
                {
                    model: user,
                    attributes: ['nickname'],
                    required: true
                },
                {
                    model: tag,
                    attributes: ['content'],
                    required: true
                },
                {
                    model: comment,
                    include:[
                        {
                            model: user,
                            attributes:['nickname'],
                            required:true
                        }
                    ]
                },
                {
                    model: likes,
                    attributes: ['userId']
                }
            ]
        });
        try{
        const {id, userId, public, content, createAt, user, tags, comments, likes} = postPick
        let tag = [];
        for(let el of tags) {
            tag.push(el.content)
        }
        let likeCheck = false;
        for(let el of likes) {
            if(el.userId === req.userId) {
                likeCheck = true;
            }
        }
        let commentArr = [];
        if(comments.length !== 0) {
            comments.map((el)=>{
                const {id, content, userId, postId, commentId, createAt, user} = el.dataValues
            if(commentId === null) {
                commentArr.push({
                    id: id,
                    content: content,
                    nickname: user.nickname,
                    userId: userId,
                    postId: postId,
                    commentId: commentId,
                    createAt:createAt,
                    comment: []
                });
            }
            else {
                for(let comment of commentArr) {
                    if(comment.id === commentId) {
                        comment.comment.push({
                            id: id,
                            content: content,
                            nickname: user.nickname,
                            userId: userId,
                            postId: postId,
                            commentId: commentId,
                            createAt:createAt
                        })
                    }
                }
            }
        })
        }
        const resPost = {
            id: id,
            userId: userId,
            nickname: user.nickname,
            content: content,
            public: public,
            likeCount: likes.length,
            commentCount: comments.length,
            likeCheck: likeCheck,
            createAt: createAt,
            tag: tag,
            comment: commentArr
        }
        return res.status(200).send(resPost);
        } catch(err) {
            console.log(err);
            res.status(500).send("Server Error")
        }
    },

    postCreate : async (req, res) => {
        req.userId = req.userId || 1;
        const {content, public} = req.body;

        try{
            let Post = await post.create({
                content: content, public: public, userId: req.userId
            })
            const tagArr = await tag.findAll({
                attributes:['id','content'],
                raw: true,
                where: {
                    content: req.body.tag
                }
            })
            for(let el of tagArr) {
                await post_tag.create({
                    postId: Post.id, tagId: el.id
                })
            }
            return res.status(200).json({"message" : "create!"});
            
        } catch(err) {
            console.log(err);
            return res.status(500).send("Server Error")
        }
        
    },
    postDelete : async (req, res) => {
        req.userId = req.userId || 1,
        req.params.postId = req.params.postId || 14;
        try{
            const postDelete = await post.destroy({
            where: {
                id: req.params.postId, userId:req.userId
            }
        })
        if(postDelete === 1) {
            return res.status(200).json({"message": "delete!"});
        }
            return res.status(400).json({"message": "post doesn't exist"})
        } catch(err) {
            console.log(err);
            return res.status(500).send("Server Error")
        }
    }
}