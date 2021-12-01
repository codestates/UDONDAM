
module.exports = {
    userInfo : (req, res) => {
        res.status(200).send("userInfo")
    },
    userPatch : (req, res) => {
        res.status(200).send("userPatch")
    },
    areaPatch : (req, res) => {
        res.status(200).send("areaPatch")
    },
    userDelete : (req, res) => {
        res.status(200).send("userDelete")
    },
}