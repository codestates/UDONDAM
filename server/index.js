const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const PORT = 8080;
const app = express();
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');
const commentRouter = require('./routers/comment');
const likesRouter = require('./routers/likes');
const authRouter = require('./routers/auth');
const recentRouter = require('./routers/recent')

app.use(cors({
    origin:['http://localhost:3000','https://udondam.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE' ,'OPTIONS']
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', (req, res)=> {
    res.status(200).send("get 응답")
})

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/likes', likesRouter);
app.use('/', authRouter);
app.use('/recent', recentRouter)

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