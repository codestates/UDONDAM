
module.exports = {
    postTag : (req, res) => {
        res.status(200).send("postTag");
    },
    postUser : (req, res) => {
        res.status(200).send("postUser");
    },
    postCreate : (req, res) => {
        res.status(200).send("postPost");
    },
    postDelete : (req, res) => {
        res.status(200).send("postDelete");
    }
}