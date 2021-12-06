const { comment, likes, post_tag, post, tag, user } = require("../models");
const { isAuthorized } = require('../controllers/token.js');
module.exports = {
    likesUser: async (req, res) => {
        const { email } = req.body;
        let userInfo = await user.findOne({
            where: {
                email: email
            }
        })
        if(!userInfo){
            res.status(401).json({"message" : "token doesn't exist"});
        }
        else {
            const result = await post.findAll({
                include: [{
                    model: likes,
                    attributes: ['userId'],
                    required: true,
                    where: {
                        userId: userInfo.id
                    }
                },
                {
                    model: comment,
                    attributes: ['id'],
                    required: true
                }],
                order: [['createAt','DESC']],
                limit: 10
            })
            if(result.length === 0) {
                return res.status(200).send(posts);
            }
            let result2 = [];

            result.map((post)=> {
                const { id, content, createAt, likes, comments } = post;
                console.log(likes)
                result2.push({
                    id: id,
                    content: content,
                    createAt: createAt,
                    likeCount: likes.length,
                    commentCount: comments.length
                });
            });
            return res.status(200).send(result2);
        }
    },
    likesCreate: async (req, res) => {
        const { email, postId } = req.query;
        let userInfo = await user.findOne({
            where: {
                email: email
            }
        });
        if(!userInfo){
            res.status(401).json({"message" : "token doesn't exist"});
        }
        else {
            await likes.create({
                userId: userInfo.id,
                postId: postId
            })
            res.status(200).send("likesCreate");
        }
    },
    likesDelete: (req, res) => {
        res.status(200).send("likesDelete");
    },
}