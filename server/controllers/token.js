require('dotenv').config()
const { sign } = require('jsonwebtoken');
const DOMAIN = process.env.DOMAIN || 'localhost'

module.exports = {
    generateAccessToken: (data) => {
        return sign(data, process.env.ACCESS_SECRET, { expiresIn: "4h" });
        
      },
    sendAccessToken: (res, token, userData) => {
        userData = userData || {data: null};
        res.status(200).cookie("jwt", token,{
          domain: DOMAIN,
          path: '/',
          secure: false,
          httpOnly: true,
          sameSite: 'none'
    }).json(userData);
    return ;
    },
    deleteRefreshToken: (res) => {
      res.clearCookie("refreshToken");
    },
    isAuthorized: (req) => {
        const authorization = req.headers["authorization"];
        if (!authorization) {
          return null;
        }
        const token = authorization.split(" ")[1];
        try {
          return verify(token, process.env.ACCESS_SECRET);
        }
        catch (err) {
          // return null if invalid token
          return null;
        }
    }
};