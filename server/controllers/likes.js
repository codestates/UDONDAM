const { comment, likes, post_tag, post, tag, user } = require("../models");
const { sequelize } = require("sequelize");
const { isAuthorized } = require('../controllers/token.js');
module.exports = {
    likesUser: async (req, res) => {
        const { email } = req.query;
        let userInfo = await user.findOne({
            where: {
                email: email
            }
        })
        if(!userInfo){
            res.status(401).json({ "message" : "token doesn't exist" });
        }
        else {
            const result = await post.findAll({
                include: [{
                    model: likes,
                    group: 'postId',
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
            // console.log(result)
            // if(result.length === 0) {
                return res.status(200).send("구현 중입니다");
            // }
            // let result2 = [];

            // result.map((post)=> {
            //     const { id, content, createAt, likes, comments } = post;
            //     console.log(likes)
            //     result2.push({
            //         id: id,
            //         content: content,
            //         createAt: createAt,
            //         likeCount: likes.length,
            //         commentCount: comments.length
            //     });
            // });
            // return res.status(200).send(result2);
        }
    },
    likesCreate: async (req, res) => {
        const { email, postId } = req.body;
        let userInfo = await user.findOne({
            where: {
                email: email
            }
        });
        if(!userInfo){
            res.status(401).json({ "message" : "token doesn't exist" });
        }
        else {
            await likes.create({
                userId: userInfo.id,
                postId: postId
            })
            res.status(200).json({ "message" : "created" });
        }
    },
    likesDelete: async (req, res) => {
        const { email, postId } = req.body;
        let userInfo = await user.findOne({
            where: {
                email: email
            }
        });
        if(!userInfo){
            res.status(401).json({ "message" : "token doesn't exist" });
        }  
        else{
            try{
                await likes.destroy({
                where: { userId: userInfo.id,
                    postId : postId }
                })
                return res.status(200).json({ "message" : "delete!" });  
            } catch(err) {
                console.log(err);
                return res.status(500).json({ "message" : "Server Error" });
            }
        }
    },
}