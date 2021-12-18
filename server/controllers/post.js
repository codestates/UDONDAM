const {post, tag, user, comment, likes, post_tag} = require('../models/index');
module.exports = {
    postTag : async (req, res) => {
        req.query.page = req.query.page || 0;
        req.query.size = req.query.size || 5;
        req.userId = req.userId || 1;
        req.query.tag = req.query.tag || ["부산광역시", "대구광역시"];
        req.query.notTag = req.query.notTag || null;
        let page = Number(req.query.page);
        let size = Number(req.query.size)
        const areaTag = req.query.tag.filter((el) => {
            return el[el.length-1] === '시' || el[el.length-1] === '군'
        })
        const contentTag = req.query.tag.filter((el) => {
            return el[el.length-1] !== '시' && el[el.length-1] !== '군' && el[el.length-1] !== '요'
        })
        try{
        const areaPosts = await post.findAll({
            attributes:['id'],
            include:[
                {
                    model: tag,
                    attributes:[],
                    where:{
                        content: areaTag
                    }
                }
            ],
        })
        if(areaPosts.length === 0) {
            return res.status(200).json(areaPosts);
        }
        let areaPostId = areaPosts.map((el)=>{
            return el.dataValues.id
        })
        if(contentTag.length !== 0) {
            const areaPostTags = await post.findAll({
            where:{
                id: areaPostId
            },
            include:[
                {
                    model: tag,
                    attributes:['content'],
                }
            ]
            })
            const postTags = areaPostTags.filter((el)=> {
            const {tags} = el.dataValues;
            let tagCheck = false;
            const tagArr = [];
            for(let tag of tags) {
                tagArr.push(tag.content)
                if(tag.content[tag.content.length-1] !== '시' && tag[tag.content.length-1] !== '군') {
                        for(let el of contentTag) {
                            if(el === tag.content) {
                            tagCheck = true;
                            }
                        }
                }
            }
            if(req.query.notTag) {
                let notTagCheck = true;
                for(let el of tagArr) {
                    for(let not of req.query.notTag) {
                        if(not === el) {
                            notTagCheck = false;
                        }
                    }
                }
                return tagCheck === true && 
                        notTagCheck === true
            }
            return tagCheck === true
            })
            areaPostId = postTags.map((el)=> {
                return el.id
            })
        }
        if(req.query.notTag && contentTag.length === 0) {
            const areaNotTags = await post.findAll({
                where:{
                    id: areaPostId
                },
                include:[
                    {
                        model: tag,
                        attributes:['content'],
                    }
                ]
                })
            const areaNotTagFilter = areaNotTags.filter((el)=> {
                const {tags} = el.dataValues;
                let notCheck = true;
                for(let el of tags) {
                    for(let not of req.query.notTag) {
                        if(el.content === not) {
                            notCheck = false;
                        }
                    }
                }
                return notCheck === true
            })
            areaPostId = areaNotTagFilter.map((el) => {
                return el.id
            })
        }
        const posts = await post.findAll({
            where:{
                id:areaPostId
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
        return res.status(200).json(resPosts)
        } catch(err) {
            console.log(err)
            return res.status(500).json({"message" : "Server Error"})
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
                let commentCheck = false;
                for(let comment of commentArr) {
                    if(comment.id === commentId) {
                        commentCheck= true;
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
                if(!commentCheck) {
                    if(deleteArr.length !== 0) {
                        for(let el of deleteArr) {
                            if(el.id === commentId) {
                                el.comment.push({
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
                    else {
                    deleteArr.push({
                        id: commentId,
                        content: '탈퇴 한 회원이 작성한 댓글입니다',
                        nickname: null,
                        userId: null,
                        postId: postId,
                        commentId: null,
                        createAt:null,
                        comment: [{
                            id: id,
                            content: content,
                            nickname: user.nickname,
                            userId: userId,
                            postId: postId,
                            commentId: commentId,
                            createAt:createAt
                        }]
                    })
                    }
                }
            }
        })
        }
        if(deleteArr.length !== 0) {
            for(let el of deleteArr) {
                let idx = commentArr.findIndex((ele)=> el.id < ele.id);
                if(idx === -1) {
                    commentArr.push(el)
                }
                else{
                    let left = commentArr.slice(0, idx);
                    let right = commentArr.slice(idx, commentArr.length);
                    commentArr = [...left, el, ...right]
                }
            }
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
        return res.status(200).json(resPost);
        } catch(err) {
            console.log(err);
            res.status(500).json({"message" : "Server Error"})
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