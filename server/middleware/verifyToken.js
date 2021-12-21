const { user } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuth = (req, res, next) => {
    const token = req.cookies['jwt'];
    if (!token) {
        return res.status(401).json({ "message": "token doesn't exist" });
    }
    try {
        jwt.verify(token, process.env.ACCESS_SECRET , async (err, encoded) => {
            if (err) {
                return res.status(401).json({ "message": "token doesn't exist" });
            }
            const usersInfo = await user.findOne({ where: { id: encoded.userId } });
            if (!usersInfo) {
                return res.status(401).json({ "message": "user doesn't exist" });
            }
            req.userId = encoded.userId;
            return next();
        });
    } catch (error) {
        //console.log(error);
        return res.status(500).json({ "message": "Server Error" });
    }
};

module.exports = isAuth;