import React from "react";
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import '@fortawesome/fontawesome-free/js/all.js'
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { useHistory } from 'react-router'

const AreaSelete = styled.div`
    background-color: darkgray;
`;
const AreaUnSelete = styled.div`
    display: none;
`;
const FixedScroll = styled.div`
    position: fixed;
    top : 0;
    left : 0;
`;
const TagContainerDiv = styled.div`
    position: relative;
    
    width: 20vw;
    height: 50vh;
`;

const LogoImg = styled.img`
    box-sizing: border-box;
    width: 10vw;
    height: 10vh;
    color:white;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`;

//지역에 관한 필터링
function Search() {
    const loginUserInfo = useSelector((state: RootStateOrAny)=>state.UserInfoReducer)
    const his = useHistory()
    console.log(loginUserInfo)
    const selectButtonStyle = {
        background: "blue",
        color: "white",
        width: '10vw',
        height: '7vh'
    }
    const unSelectButtonStyle = {
        background: "lightgray",
        width: '10vw',
        height: '7vh'
    }
    const notRed = {
        background: "red",
        color: "white"
    }
    const notTagRed = {
        background: "red",
        color: "white",
        width: '10vw',
        height: '7vh'
    }
    const [userAreaData, setUserAreaData] = useState<any>([
        // 유저 정보에서 area,area2를 받아서 한 배열로 병합할거임
        // 그럼 지역정보 바꾸고 나서 바로 서버쪽에서 다시 유저정보 줘야겠네
        // 예 ) 유저정보.area, ...유저정보.area2
        "서울",loginUserInfo.area2
    ])
    const [tag, setTag] = useState<any>([
        '여행', '게임', '소문', '유머', '산책', '자랑', '놀라운', '직장', '학교', '운동', '반려동물', '만화', '고민', '비밀', '음악', '흥미', '사고', '독서', '식사', '취미', '도움', '나눔', '연애', '만남', '자소서'])
    const [tagData, setTagData] = useState<any>([
        // 여기도 수정될 예정 
        // 예 ) 유저정보.area, ...유저정보.area2
        userAreaData[0],userAreaData[1],...tag])
    const [notTagData, setNotTagData] = useState<any>([
        // 여기도 수정될 예정 
        // 예 ) 유저정보.area, ...유저정보.area2
        userAreaData[0],userAreaData[1],...tag])
    const [giftTimeLineData, setGiftTimeLineData] = useState<any>({})

    const [isAreaActive, setIsAreaActive] = useState<any>([false])

    const [searchText, setSearchText] = useState<any>('')

    const [giftTag, setGiftTag] = useState<any>([])

    const [filterTag, setFilterTag] = useState<any>([])

    const [tagSeletView, setTagSeletView] = useState<any>('')

    const [notTagSeletView, setNotTagSeletView] = useState<any>('')

    const [notGiftTag, setNotGiftTag] = useState<any>([])

    const [notModeTag, setNotModeTag] = useState<any>(true)

    const [errorTag, setErrorTag] = useState<any>()

    const areaSeleteClick = (event:any) => {
        if(isAreaActive){
            event.target.textContent = 'u'
        }else{
            event.target.textContent = 'n'
        }

        setIsAreaActive(!isAreaActive)
    }

    const searchTextChange = (event:any) => {
        setSearchText(event.target.value)
    }

    const searchHandleKeyPress = (event:any) => {
        if(event.type === 'keypress' && event.code === 'Enter') {
            handleSearchButton()
        }
    }

    const handleSearchButton = () => {
        if(notModeTag){
            const a = tagData.filter((el:any) => 
                !el.indexOf(searchText)
            )
            setFilterTag(a)
        }
        else
        {
            const a = notTagData.filter((el:any) => 
                !el.indexOf(searchText)
            )
            setFilterTag(a)
        }
        // if(filterTag[0] === []){
        //     setFilterTag(['해당 태그는 없습니다.'])
        // }
    }
    const giftTagHandle = (event:any) => {

        if(notModeTag){
            if(giftTag.indexOf(event.target.textContent) === -1){
                setGiftTag([...giftTag,event.target.textContent])
                event.target.style.backgroundColor = 'blue'
                setTagHandle()
            }else{
                giftTag.splice(giftTag.indexOf(event.target.textContent),1)
                setGiftTag(giftTag)
                event.target.style.backgroundColor = ''
                setTagHandle()
            }
        }else
        {
            if(notGiftTag.indexOf(event.target.textContent) === -1){
                setNotGiftTag([...notGiftTag,event.target.textContent])
                event.target.style.backgroundColor = 'red'
                if(giftTag.indexOf(event.target.textContent) !== -1){
                    giftTag.splice(giftTag.indexOf(event.target.textContent),1)
                    setGiftTag(giftTag)
                }
                setTagHandle()
                let dummyTag = tagData.slice()
                dummyTag.map((el:any,idx:any)=> {
                    if(el === event.target.textContent)
                       return dummyTag.splice(idx,1)
                    }
                )
                
                setTagData(dummyTag)
            }else{
                notGiftTag.splice(notGiftTag.indexOf(event.target.textContent),1)
                setNotGiftTag(notGiftTag)
                event.target.style.backgroundColor = ''
                setTagHandle()
                tagData.push(event.target.textContent)
                setTagData(tagData)
            }
        }
    }
    // console.log(tagData)

    const setTagHandle = () => {
        if(notModeTag){
            let b = ''
            giftTag.map((el:any) => {
                return b = b + `#${el} `})
            setTagSeletView(() => {
                return b
            })
        }
        else
        {
            let b = ''
            notGiftTag.map((el:any) => {
                return b = b + `#${el} `})
            setNotTagSeletView(() => {
                return b
            })
        }
    }

    const selectTagReSet = () => {
        setGiftTag([])
        setNotGiftTag([])
        setNotTagSeletView('')
        setTagSeletView('')
        setTagData(notTagData)
    }

    const notTagHandle = () => {
        setNotModeTag(!notModeTag)
    }
    
    const selectTagSearchHandle = async () => {
        let a = false
        giftTag.map((el:any) => {
            if(userAreaData.indexOf(el) === -1){
                return
            }
            if(userAreaData.indexOf(el) !== -1){
                return a = true
            }
           
        })
        if(a){
            setErrorTag('잘했다')
            if(notGiftTag.length === 0){
                
                await axios.get(`${process.env.REACT_APP_API_URL}/post?tag=${giftTag}`, {withCredentials: true}).then((respone) => {
                    console.log(respone)
                    setGiftTimeLineData(respone)
                })
                his.push('/Timeline')
            }else{
                let j = {}
                const y = JSON.stringify(['대전'])
                const u = JSON.stringify(['스포츠'])
                await axios.get(`${process.env.REACT_APP_API_URL}/post?tag=${y}&notTag=${u}`, {withCredentials: true}).then((respone) => {
                    console.log(respone)
                    j = respone.data
                })
                his.push({
                    pathname: `./Timeline`,
                    state: [
                    j
                    ]
                })
            }
        }
        else{
            setErrorTag('지역은 필수')
        }
    }  
    const timeLineAllTagHandle = async () => {
        const timeLineAllTagHandleData = JSON.stringify(["대전","서울"])
        console.log(timeLineAllTagHandleData)
        let AllTagHandleData = {}
        await axios.get(`${process.env.REACT_APP_API_URL}/post?tag=${timeLineAllTagHandleData}`, {withCredentials: true}).then((respone) => {
            console.log(respone)
            AllTagHandleData = respone.data
        })
        his.push({
            pathname: `./Timeline`,
            state: [
                AllTagHandleData
            ]
        })
    }
    

    useEffect(() => {
        handleSearchButton()
        setTagHandle()
    }, [giftTag])

    useEffect(() => {
        handleSearchButton()
        setTagHandle()
    }, [searchText])
    useEffect(() => {
        handleSearchButton()
        setTagHandle()
    }, [notGiftTag])



    console.log(giftTag)
    console.log(notGiftTag)

    return (
    <div>

        <span>
            지역
            <button onClick = {areaSeleteClick}>
                n
            </button>
            {isAreaActive ? 
            <AreaUnSelete>
            </AreaUnSelete>
            :
            <AreaSelete>
                <ul>
                    {userAreaData.map((el:any, idx:any) => {
                        if(el === '인증해주세요'){
                            return <div>인증해주세요<Link to={{
                                pathname: `./Area`,
                                state: {
                                id: idx,
                            }
                        }}>인증</Link></div>
                        }else{
                            return <div>{el}<Link to={{
                                    pathname: `./Area`,
                                    state: {
                                    id: idx,
                                }
                            }}>인증</Link></div>
                        }
                    })}
                </ul>
            </AreaSelete>
            }

        </span>
        <LogoImg src = '로고-우동담-Dark-모양만-배경o.png' />
        <div>
            <input type="text" value={searchText} onChange={searchTextChange} placeholder="태그 검색" onKeyPress={searchHandleKeyPress} />
            <button onClick={handleSearchButton}>검색</button>
        </div>
    
        {
            notModeTag ? 
        
        <div>
            <div>
                <button onClick = {notTagHandle}>
                    금지 태그 설정
                </button>
                <button onClick = {selectTagReSet}>
                    태그 초기화
                </button>
            </div>
            <div>
                <button onClick = {selectTagSearchHandle}>
                    설정한 태그로 타임라인 검색
                </button>
                <div>{errorTag}</div>
            </div>
            <div>
                <button onClick={timeLineAllTagHandle}>
                    타임라인 전체 보기
                </button>
            </div>
            <div>
                {tagSeletView}
            </div>
            
            <TagContainerDiv>
                {searchText === '' ? tagData.map((el:any) => {
                    if(giftTag.indexOf(el) === -1){
                        if(el === '인증해주세요'){
                            return
                        }
                        else{
                            return <button style={unSelectButtonStyle} onClick = {giftTagHandle}>{el}</button>
                        }
                    }else{
                        if(el === '인증해주세요'){
                            return
                        }
                        else
                        {
                            return <button style={selectButtonStyle} onClick = {giftTagHandle}>{el}</button>
                        }
                    }
                })
                :
                filterTag.map((el:any) => {
                    if(giftTag.indexOf(el) === -1){
                        return <button style={unSelectButtonStyle} onClick = {giftTagHandle}>{el}</button>
                    }else{
                        return <button style={selectButtonStyle} onClick = {giftTagHandle}>{el}</button>
                    }
                    // console.log(el)
                    // return <button onClick = {giftTagHandle}>{el}</button>
                })
                }
                
            </TagContainerDiv>
        </div>

        :

        <div>
            <div>
                <button style = {notRed} onClick = {notTagHandle}>
                    금지 태그 설정 해제
                </button>
                <button onClick = {selectTagReSet}>
                    태그 초기화
                </button>
            </div>
            <div>
                <button>
                    타임라인 전체 보기
                </button>
            </div>
            <div>
                {notTagSeletView}
            </div>
            <TagContainerDiv>
                {searchText === '' ? notTagData.map((el:any) => {
                    if(notGiftTag.indexOf(el) === -1){
                        if(giftTag.indexOf(el) === -1){
                            if(el === '인증해주세요'){
                                return
                            }else{
                                return <button style={unSelectButtonStyle} onClick = {giftTagHandle}>{el}</button>
                            }
                        }
                        else{
                            if(el === '인증해주세요'){
                                return
                            }else{
                            return <button style={selectButtonStyle} onClick = {giftTagHandle}>{el}</button>
                            }
                        }
                    }else{
                        if(el === '인증해주세요'){
                            return
                        }else{
                        return <button style={notTagRed} onClick = {giftTagHandle}>{el}</button>
                        }
                    }
                })
                :
                filterTag.map((el:any) => {
                    if(notGiftTag.indexOf(el) === -1){
                        if(el === '인증해주세요'){
                            return
                        }else{
                        return <button style={unSelectButtonStyle} onClick = {giftTagHandle}>{el}</button>
                        }
                    }else{
                        if(el === '인증해주세요'){
                            return
                        }else{
                            return <button style={notTagRed} onClick = {giftTagHandle}>{el}</button>
                        }
                    }
                    // console.log(el)
                    // return <button onClick = {giftTagHandle}>{el}</button>
                })
                }
                
            </TagContainerDiv>
        </div>
        }
        
        
    </div>
    )
}
export default Search;