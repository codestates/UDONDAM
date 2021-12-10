
import React from "react";
import { useRef, useState, useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import styled from "styled-components";
import '@fortawesome/fontawesome-free/js/all.js'
import TimeLinePost from '../../components/timeLinePost/TimeLinePost'
import { RouteComponentProps } from 'react-router-dom';

//   '로고-우동담-Dark-글자만-배경o.png'
function TimeLine({ history }: RouteComponentProps){
    console.log(history.location.state)
    const loginUserInfo = useSelector((state: RootStateOrAny)=>state.UserInfoReducer)
    const [postData, setPostData] = useState<any>(history.location.state);
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

    const [userData, setUserData] = useState<any>(loginUserInfo);


    console.log(loginUserInfo)
    return (
        <div>
            <div>{userData.nickname}님 안녕하세요</div>
            <Container>
                <CharacterImg src = '로고-우동담-Dark-글자만-배경o.png'/>
            </Container>
            <TimeLinePost postData = {postData[0]} userData = {userData}/>
        </div>
    )
}
export default TimeLine;