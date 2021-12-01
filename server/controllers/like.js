
module.exports = {
    likeUser: (req, res) => {
        res.status(200).send("likeUser");
    },
    likeCreate: (req, res) => {
        res.status(200).send("likeCreate");
    },
    likeDelete: (req, res) => {
        res.status(200).send("likeDelete");
    },
}