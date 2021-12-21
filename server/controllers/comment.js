const {comment, post, likes} = require('../models/index')

module.exports = {
    commentUser: async (req, res) => {
        req.userId = req.userId || 1;
        try{
        let posts = await post.findAll({
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
                ],
                order:[['createAt', 'DESC']]
        })
        if(posts.length === 0) {
            return res.status(200).json(posts)
        }
        let commentPost = [];
        for(let el of posts) {
            const {id, content, createAt, likes} = el.dataValues;
            let commentCount = await comment.count({
                where:{
                    postId: id
                }
            })
            commentPost.push(
                {
                id:id,
                content: content,
                createAt: createAt,
                likeCount: likes.length,
                commentCount: commentCount
                })
        }
            return res.send(commentPost)
        } catch(err) {
            //console.log(err);
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
            //console.log(err);
            return res.status(500).json({"message": "Server Error"})
        }
    },
    commentDelete: async (req, res) => {
        req.userId = req.userId || 1;
        req.params.commentId = req.params.commentId || 5;
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
            //console.log(err);
            return res.status(500).json({"message": "Server Error"})
        }
    }
}