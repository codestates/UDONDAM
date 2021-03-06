const { comment, likes, post, user } = require("../models");
const { sequelize } = require("sequelize");
const { isAuthorized } = require('../controllers/token.js');
module.exports = {
    likesUser: async (req, res) => {
        const userId = req.userId || 1;
        //const { userId } = req.query;
        let userInfo = await user.findOne({
            where: {
                //id: userId
                id: userId
            }
        })
        if(!userInfo){
            res.status(401).json({ "message" : "token doesn't exist" });
        }
        else {
            const tempLikeCount = await post.findAll({
                attributes: ['id'],
                include: [{
                    model: likes,
                    required: true,
                    attributes: ['postId'],
                }]
            });

            const result = await post.findAll({
                include: [{
                    model: likes,
                    required: true,
                    attributes: ['postId'],
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
                // limit: 10
            });
            // let likeCount = await likes.count({ where: {postId: id} });
            
            if(result.length === 0){
                return res.status(200).json(result);
            }
            else{
                let likesCount = [];
                tempLikeCount.map((count) => {
                    let { likes } = count;
                    likesCount.push(likes.length);
                })

                const response = result.map((post, idx) => {
                    let { id, content, createAt, comments } = post;
                    
                    return {
                        id: id,
                        content: content,
                        createAt: createAt,
                        likeCount: likesCount[idx],
                        commentCount: comments.length
                    };
                });
                
                // return res.status(200).json({likesCount: temp});
                return res.status(200).json(response);
            }
            
        }
    },
    likesCreate: async (req, res) => {
        const userId = req.userId || 2;
        const { postId } = req.body;
        let userInfo = await user.findOne({
            where: {
                id: userId
            }
        });
        let overlapCheck = await likes.findOne({
            where: {
                userId: userId,
                postId: postId
            }
        });

        if(!userInfo){
            res.status(401).json({ "message" : "token doesn't exist" });
        }
        else {
            if(!overlapCheck){
                await likes.create({
                    userId: userId,
                    postId: postId
                })
                res.status(200).json({ "message" : "created" });
            }
            else{
                res.status(200).json({ "message" : "?????? ????????? ??? ???????????????." });
            }
        }
    },
    likesDelete: async (req, res) => {
        const userId = req.userId || 2;
        const { postId } = req.query;
        let userInfo = await user.findOne({
            where: {
                id: userId
            }
        });
        let overlapCheck = await likes.findOne({
            where: {
                userId: userId,
                postId: postId
            }
        });

        if(!userInfo){
            res.status(401).json({ "message" : "token doesn't exist" });
        }  
        else{
            if(!overlapCheck){
                return res.status(200).json({ "message" : "?????? ????????? ????????? ???????????????." });
            }
            else {
                try{
                    await likes.destroy({
                        where: {
                            userId: userId,
                            postId : postId
                        }
                    });
                    return res.status(200).json({ "message" : "delete!" });  
                } catch(err) {
                    //console.log(err);
                    return res.status(500).json({ "message" : "Server Error" });
                }
            }
        }
    },
}