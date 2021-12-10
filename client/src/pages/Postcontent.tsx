import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import 'dotenv/config'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { UserInfoHandler } from '../redux/modules/UserInfo';
    //게시글 작성
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
    const TextArea = styled.textarea`
    width: 100%;
    height: 40rem;
    resize: none;
    font-size: 2em;
    `


const Postcontent: React.FC = () => {
    const dispatch = useDispatch()
    const his = useHistory()
    const loginUserInfo = useSelector((state: RootStateOrAny)=>state.UserInfoReducer)
    let a = ''
    let arr = []

    const [contentText, setContentText] = useState<any>('')
    const [contentGiftTag, setContentGiftTag] = useState<any>([])
    const [contentViewTag, setContentViewTag] = useState<any>([])
    const [searchText, setSearchText] = useState<any>('')
    const [filterTag, setFilterTag] = useState<any>([])
    const [handleTrue, setHandleTrue] = useState<any>(false)

    

    const [tag, setTag] = useState<any>([
        '여행', '게임', '소문', '유머', '산책', '자랑', '놀라운', '직장', '학교', '운동', '반려동물', '만화', '고민', '비밀', '음악', '흥미', '사고', '독서', '식사', '취미', '도움', '나눔', '연애', '만남', '자소서', '스포츠', '잡담', '알림', '질문'])

    const contentTextChange = (event:any) => {
        setContentText(event.target.value)
    }
    const searchTextChange2 = (event:any) => {
        setSearchText(event.target.value)
    }
    const searchHandleKeyPress2 = (event:any) => {

            handleSearchButton()
        
    }
    const handleSearchButton = () => {
        const a = tag.filter((el:any) => 
            !el.indexOf(searchText)
        )
        setFilterTag(a)
    }
    const giftTagHandle2 = (event:any) => {
        a = event.target.textContent
        setSearchText('')
    }
    const setTagHandle = () => {
        contentGiftTag.map((el:any) => {
            return a = a + `#${el} `})
        if(contentGiftTag.indexOf(a) === -1){
            arr = [...contentViewTag,a]
        }
    }

    useEffect(() => {
        handleSearchButton()
        setTagHandle()
    }, [searchText])


    return(
            <div>
                <Container>
                    <CharacterImg src = '로고-우동담-Dark-글자만-배경o.png'/>
                </Container>
                <div>
                    <TextArea onChange={contentTextChange} value={contentText}></TextArea>
                </div>
                <div>
                    {contentViewTag.map((el:any) => {
                        return <button>{el}</button>
                    })}
                </div>
                <div>
                    <button>태그 추가</button>                
                </div>
                <div>
                    <input type="text" value={searchText} onChange={searchTextChange2} placeholder="태그를 검색하세요" onKeyPress= {searchHandleKeyPress2} />
                </div>
                <div>
                    {searchText === '' ? null
                        :filterTag.map((el:any) => {
                            return <button onClick = {giftTagHandle2}>{el}</button>
                        })
                        }
                </div>
            </div>
    )
}

export default Postcontent