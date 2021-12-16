const e = require('express');
const {post, tag, user, comment, likes, post_tag} = require('../models/index');
module.exports = {
    postTag : async (req, res) => {
        req.query.page = req.query.page || 0;
        req.query.size = req.query.size || 5;
        req.userId = req.userId || 1;
        req.query.tag = req.query.tag || ["부산광역시","서울특별시",'대구광역시'];
        req.query.notTag = req.query.notTag || null;
        let page = Number(req.query.page);
        let size = Number(req.query.size)
        try{
            let  resultPostId;
        const postId = await post.findAll({
            attributes:['id'],
            include:[
                {
                    model: tag,
                    attributes:[],
                    where:{
                        content: req.query.tag
                    }
                }
            ]
        })
        if(postId.length === 0) {
            return res.status(200).json(postId)
        }
        const tagId = postId.map((el)=>{
            return el.dataValues.id
        })
        if(req.query.notTag) {
        const notPostId = await post.findAll({
            attributes:['id'],
            include:[
                {
                    model: tag,
                    attributes:[],
                    where:{
                        content: req.query.notTag
                    }
                }
            ]
        })
        const notTagId = notPostId.map((el)=>{
            return el.dataValues.id
        })             
        resultPostId = tagId.filter((el) => {
            let check = notTagId.findIndex((ele)=> el === ele)
            return check === -1
        })
        }
        else{
            resultPostId= tagId;
        }
        if(resultPostId.length === 0) {
            return res.status(200).json(resultPostId)
        }
        const posts = await post.findAll({
            where:{
                id:resultPostId
            },
            include: [
                {
                    model: user,
                    attributes: ['nickname'],
                    required: true
                },
                {
                    model: tag,
                    attributes:['content'],
                    required:true
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
            limit: [page, size]
        })
        const resPosts =  posts.map((post)=> {
            const {id, content, createAt, public, userId, user, likes, tags, comments} = post;
            let tag = [];
            for(let el of tags) {
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
        return res.status(200).send(resPosts)
        } catch(err) {
            console.log(err);
            return res.status(500).json({"message": "Server Error"})
        }
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
            console.log(postPick)
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
        let deleteArr = [];
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
                    }else{
                        deleteArr.push({
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
        let idxArr = [];
        if(deleteArr.length !== 0) {
            for(let el of deleteArr) {
                let idx = commentArr.findIndex((ele)=> el.commentId < ele.id);
                idxArr.push(idx)
            }
            let bb = [];
            for(let i = 0; i < idxArr.length; i++) {
            if(idxArr[i] === -1 && !bb[idxArr[i]]) {
                bb.push({
                    id: deleteArr[i].commentId,
                    content: '탈퇴한 회원의 댓글입니다',
                    nickname: null,
                    userId: null,
                    postId: deleteArr[i].postId,
                    commentId: null,
                    createAt: null,
                    comment: []
                });
                }
            else if(idxArr[i] === -1 && bb[idxArr[i]]) {
                bb[idxArr[i]].comment.push(deleteArr[i])
            }
            else if (bb[idxArr[i]]) {
                bb[idxArr[i]].comment.push(deleteArr[i])
            } 
            else if(!bb[idxArr[i]]) {
                bb[idxArr[i]] = {
                    id: deleteArr[i].commentId,
                    content: '탈퇴한 회원의 댓글입니다',
                    nickname: null,
                    userId: null,
                    postId: deleteArr[i].postId,
                    commentId: null,
                    createAt: null,
                    comment: []
                }
            }
            }
            let count = 0;
            for(let el of commentArr) {
                if(bb[count]) {
                    bb.push(el);
                    count = count + 2
                }
                else if (!bb[count]) {
                    bb[count] = el;
                    count++
                }
            }
            commentArr = bb
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