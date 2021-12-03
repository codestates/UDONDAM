require('dotenv').config()
const { sign } = require('jsonwebtoken');
const DOMAIN = process.env.DOMAIN || 'localhost'
//dddiary-imply.s3-website.ap-northeast-2.amazonaws.com
module.exports = {
    generateAccessToken: (data) => {

    let Access = sign(data, process.env.ACCESS_SECRET, { expiresIn:'2d'})
    
    return Access
    
    },
    sendAccessToken: (res, token, userData) => {

    res.status(200).cookie("jwt", token,{
        domain: DOMAIN,
        path: '/',
        secure: false,
        httpOnly: true,
        sameSite: 'none'
    }).json(userData);
    return ;
    }
};