
import React from "react";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import '@fortawesome/fontawesome-free/js/all.js'
import TimeLinePost from '../../components/timeLinePost/TimeLinePost'
import { Link } from 'react-router-dom'

//   '로고-우동담-Dark-글자만-배경o.png'
const TimeLine = () => {

    const Container = styled.div`
    box-sizing: border-box;
    width: 30vw;
    display: grid;
    grid-template-areas: 
     "nav nav nav"
     ". center ."
     "foot foot foot";
    `;

    const CharacterImg = styled.img`
    box-sizing: border-box;
        width: 30vw;
        display: grid;
        color:white;
    `;

    const [userData, setUserData] = useState<any>({name : 'gang', id : 1});
    const [postData, setPostData] = useState<any>([
        {
         id: 1, //postId
         nickname: "oh", //유저 닉네
         content: "그.....", //게시글내
         tag: ['서울' , '운동' , '식사', '독서'], //태그
         commentCount: 20, //댓글 
         likeCount: 10, //따봉 수
         likeCheck: false,  //따봉 눌렀는지 체
         createAt: '2020-10-10 09:10',  //생성날
         public: true  // 1 대 1 채팅 활성화, 비활성화
        },
        {
         id: 2,
         nickname: "gang",
         content: "나...",
         userId: 1,
         tag: ['서울' , '운동'],
         commentCount: 10,
         likeCount: 5 ,
         likeCheck: false,
         createAt: '2020-10-15 10:10',
         public: false
        },
        {
         id: 5,
         nickname: "kim",
         content: "잘...",
         tag: ['서울' , '독서'],
         commentCount: 5,
         likeCount: 2,
         likeCheck: false,
         createAt: '2020-10-20 11:10',
         public: true
         }
    ])

    return (
        <div>
                <div>{userData.name}님 안녕하세요</div>
                <Container>
                    <CharacterImg src = '로고-우동담-Dark-글자만-배경x.png'/>
                </Container>
                <TimeLinePost postData = {postData} userData = {userData}/>
        </div>
    )
}
export default TimeLine;