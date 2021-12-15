
module.exports = {
    get: async(req, res) => {
        res.send('recentGet');
    },
    post: async(req, res) => {
        res.send('recentPost')
    }
}