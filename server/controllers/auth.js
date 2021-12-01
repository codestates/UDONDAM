
module.exports = {
    login: (req, res) => {
        res.status(200).send('login');
    },
    logout: (req, res) => {
        res.status(200).send('logout');
    },
    signup: (req, res) => {
        res.status(200).send('shinup');
    },
    email: (req, res) => {
        res.status(200).send('email인증');
    },
    emailCheck: (req, res) => {
        res.status(200).send('email체크');
    },
    passwordCheck: (req, res) => {
        res.status(200).send('비밀번호 체크');
    },
    tempp: (req, res) => {
        res.status(200).send('임시비밀번호 발송');
    },
    google: (req, res) => {
        res.status(200).send('소셜 구글');
    },
    naver: (req, res) => {
        res.status(200).send('소셜 네이버');
    },
    kakao: (req, res) => {
        res.status(200).send('소셜 카카오');
    },
}