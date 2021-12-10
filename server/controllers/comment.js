const {comment, post, likes} = require('../models/index')

module.exports = {
    commentUser: async (req, res) => {
        req.userId = req.userId || 1;
        try{
        let a = await post.findAll({
                include:[
                    {
                        model:comment,
                        attributes:[],
                        where: {
                            userId:req.userId
                        }
                    },
                    {
                        model:likes,
                        attributes:['id']
                    }

                ]
        })
        if(a.length === 0) {
            return res.status(200).json(a)
        }
        // let b = a.map((el)=> {
        //     const {id, content, createAt, likes, comments} = el.dataValues;
        //     return ({
        //         id:id,
        //         content: content,
        //         createAt: createAt,
        //         likeCount: likes.length,
        //         commentCount: comments.length
        //     })
        // })
        let b = [];
        for(let el of a) {
            const {id, content, createAt, likes} = el.dataValues;
            let c = await comment.count({
                where:{
                    postId: id
                }
            })
            b.push(
                {
                id:id,
                content: content,
                createAt: createAt,
                likeCount: likes.length,
                commentCount: c
                })
        }
            return res.send(b)
        } catch(err) {
            console.log(err);
            return res.status(500).json({"message": "Server Error"})
        }        
    },
    commentCreate: async (req, res) => {
        req.userId = req.userId || 1;
        const {postId, content, commentId} = req.body;
        try{
            if(postId && content && commentId) {
                await comment.create({
                    userId: req.userId, postId: postId, content:content, commentId: commentId
                })
                return res.status(201).json({"message": "created!"})
            }
                await comment.create({
                    userId: req.userId, postId: postId, content: content
                })
                return res.status(201).json({"message": "created!"})
        } catch(err) {
            console.log(err);
            return res.status(500).json({"message": "Server Error"})
        }
    },
    commentDelete: async (req, res) => {
        req.userId = req.userId || 2;
        req.params.commentId = req.query.commentId || 5;
        try {
            const commentDelete = await comment.update(
                {
                    content: '삭제 된 댓글 입니다'
                },
                {
                    where:{
                        id: req.params.commentId, userId:req.userId
                    }
                }
            )
            if(commentDelete === 0) {
                return res.status(400).json({"message": "comment doesn't exist"})
            }
            return res.status(200).json({"message": "delete!"});
        } catch(err) {
            console.log(err);
            return res.status(500).json({"message": "Server Error"})
        }
    }
}