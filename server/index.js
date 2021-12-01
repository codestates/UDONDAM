const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const PORT = 8080;
const app = express();
const userRouter = require('./roters/user');
const postRouter = require('./roters/post');
const commentRouter = require('./roters/comment');
const likeRouter = require('./roters/like');
const authRouter = require('./roters/auth');
const models = require("./models/index.js");

models.sequelize.sync().then( () => {
    console.log(" DB 연결 성공");
}).catch(err => {
    console.log("연결 실패");
    console.log(err);
})

app.use(cors({
    origin:'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE' ,'OPTIONS']
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/', (req, res)=> {
    res.status(200).send("get 응답")
})

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/like', likeRouter);
app.use('/', authRouter);

let server ;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
    server = https
    .createServer(
        {
        key: fs.readFileSync(__dirname + `/` + 'key.pem', 'utf-8'),
        cert: fs.readFileSync(__dirname + `/` + 'cert.pem', 'utf-8'),
        },
        app
    )
    .listen(PORT, ()=> {
        console.log(`https://localhost:${PORT} 로 실행`)
    });
    }
else {
server = app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT} 로 실행`)
})
}