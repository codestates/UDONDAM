const {comment, post, likes} = require('../models/index')

module.exports = {
    commentUser: async (req, res) => {
        req.userId = req.userId || 2;
        try{
        let a = await post.findAll({
                include:[
                    {
                        model:comment,
                        attributes:['id'],
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
        let b = a.map((el)=> {
            const {id, content, createAt, likes, comments} = el.dataValues;
            return ({
                id:id,
                content: content,
                createAt: createAt,
                likeCount: likes.length,
                commentCount: comments.length
            })
        })
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
                let a = await comment.create({
                    userId: req.userId, postId: postId, content:content, commentId: commentId
                })
                return res.json({"message": "created!"})
            }
                let b = await comment.create({
                    userId: req.userId, postId: postId, content: content
                })
            return res.json(b)
        } catch(err) {
            console.log(err);;
            return res.status(500).json({"message": "Server Error"})
        }
    },
    commentDelete: async (req, res) => {
        req.userId = req.userId || 1;
        req.query.commentId = req.query.commentId || 10;
        res.status(200).send("commentDelete");
    },
}