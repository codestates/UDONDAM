const e = require("express");
const { user, recentsearch } = require("../models");
module.exports = {
    get: async(req, res) => {
        const userId = req.userId || 2;
        let userInfo = await user.findOne({
            where: {
                id: userId
            }
        });
        const recent = await recentsearch.findAll({
            attributes:['id','userId','tag','notTag'],
            where:{
                userId: userId
            },
            order: [['createAt','DESC']],
            limit: 3
        });
        if(!userInfo){
            res.status(401).json({ "message" : "token doesn't exist" });
        }
        else {
            if(recent.length === 0){
                return res.status(200).json(recent);
            }
            else {
                const result = recent.map((el,idx) =>{
                    const { tag, notTag, createAt } = el;
                    if(notTag !== null){
                        return {
                            id: idx+1,
                            tag: tag.split(','),
                            notTag: notTag.split(','),
                            createAt: createAt
                        };
                    }
                    else{
                        return {
                            id: idx+1,
                            tag: tag.split(','),
                            notTag: null,
                            createAt: createAt
                        };
                    }
                });
                return res.status(200).json(result);
            }
        }
    },
    post: async(req, res) => {
        const userId = req.userId || 2;
        const { tag, notTag } = req.body;
        let stringNotTag = null;
        if(notTag !== null){
            stringNotTag = notTag.join();
        }
        const stringTag = tag.join();
        let userInfo = await user.findOne({
            where: {
                id: userId
            }
        });
        if(!userInfo){
            res.status(401).json({ "message" : "token doesn't exist" });
        }
        else {
            const recent = await recentsearch.findAll({
                attributes:['id','userId','tag','notTag'],
                where:{
                    userId: userId
                },
                order: ['createAt']
            });
    
            if(recent.length > 3){
                await recentsearch.destroy({
                    where: {
                        id: recent[0].id,
                    }
                });
            }

            let overlapCheck = await recentsearch.findOne({
                attributes: ['id'],
                where: {
                    userId: userId,
                    tag: stringTag,
                    notTag: stringNotTag
                }
            });

            if(overlapCheck){
                try {
                    await recentsearch.destroy({
                        where: {
                            id: overlapCheck.id
                        }
                    });
                    await recentsearch.create({
                        userId: userId,
                        tag: stringTag,
                        notTag: stringNotTag
                    });
                    res.status(200).json({ "message" : "recentsearch created" });
                }
                catch(err) {
                    console.log(err);
                    return res.status(500).json({ "message" : "Server Error" });
                }
            }
            else{
                await recentsearch.create({
                    userId: userId,
                    tag: stringTag,
                    notTag: stringNotTag
                });
                res.status(200).json({ "message" : "recentsearch created" });
            }
        }
        
    }
}