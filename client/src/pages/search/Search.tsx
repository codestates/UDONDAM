import React from "react";
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import '@fortawesome/fontawesome-free/js/all.js'
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { useHistory } from 'react-router'
import jQuery from 'jquery'
import { decodedTextSpanIntersectsWith } from "typescript";
import RecentViewModal from '../../components/Content/RecentViewModal';
import './Search.css'
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faChevronUp);
library.add(faChevronDown);

const qs = require('qs');

const tagdummyData = [
    '여행', '게임', '소문', '유머', '산책', '자랑', '놀라운', '직장', '학교', '운동', '반려동물', '만화', '고민', '비밀', '음악', '흥미', '사고', '독서', '식사', '취미', '도움', '나눔', '연애', '만남', '자소서', '스포츠', '잡담', '알림', '질문']
//지역에 관한 필터링
function Search() {
    const loginUserInfo = useSelector((state: RootStateOrAny)=>state.UserInfoReducer)
    const his = useHistory()
    let AllTagHandleData = {}
    const timeLineAllTagHandleData = []
    console.log(loginUserInfo)
    
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
    sessionStorage.getItem('areaData')
    const areaData = String(sessionStorage.getItem('areaData')) 
    const formChange = JSON.parse(areaData)
    console.log(formChange)
    const [userAreaData, setUserAreaData] = useState<any>(loginUserInfo.area.length > 1 ?[
        loginUserInfo.area,loginUserInfo.area2
    ]:[formChange[0],formChange[1]] 
    )
    

    const [tag, setTag] = useState<any>(tagdummyData.sort())
    const [tagData, setTagData] = useState<any>([
        // 여기도 수정될 예정 
        // 예 ) 유저정보.area, ...유저정보.area2
        userAreaData[0],userAreaData[1],...tag.sort()])
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

    const [changeRecentSearchModal, setChangeRecentSearchModal] = useState<any>(true)

   

    const areaSeleteClick = (event:any) => {
        // if(isAreaActive){
        //     event.target.textContent = 'u'
        // }else{
        //     event.target.textContent = 'n'
        // }

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
            
                const a = tagData.filter((el:any) => {
                    if(el !== null){
                       return !el.indexOf(searchText)
                    }
                    else{
                        return
                    }
                })
                setFilterTag(a)
        }
        else
        {
            if(tagData.length !== 0){
            const a = notTagData.filter((el:any) => 
                !el.indexOf(searchText)
            )
            setFilterTag(a)
            }
        }
        // if(filterTag[0] === []){
        //     setFilterTag(['해당 태그는 없습니다.'])
        // }
    }
    const giftTagHandle = (event:any) => {

        if(notModeTag){
            if(giftTag.indexOf(event.target.textContent) === -1){
                let elTagData:any = tagData.indexOf(event.target.textContent)
                tagData.splice(elTagData,1)
                tagData.unshift(event.target.textContent)
                setTagData(tagData)
                setGiftTag([...giftTag,event.target.textContent])

                // event.target.style.backgroundColor = 'blue'
                setTagHandle()
            }else{
                giftTag.splice(giftTag.indexOf(event.target.textContent),1)
                setGiftTag(giftTag)
                event.target.style.backgroundColor = ''
                setTagData([userAreaData[0],userAreaData[1],...tag.sort()])
                setTagHandle()
            }
        }else
        {
            if(notGiftTag.indexOf(event.target.textContent) === -1){
                setNotGiftTag([...notGiftTag,event.target.textContent])
                // event.target.style.backgroundColor = 'red'
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
            console.log(notGiftTag)
            if(notGiftTag === null || notGiftTag.length === 0){

                await axios(
                    {
                        url: `${process.env.REACT_APP_API_URL}/post`,
                        method: 'get',
                        params: {
                            tag: giftTag,
                            size: 10,
                            page: 0
                        },
                        withCredentials: true,
                        paramsSerializer: params => {
                                return qs.stringify(params, {arrayFormat: 'brackets'})
                            }
                        }
                )
                .then((respone) => {
                    console.log(respone)
                    AllTagHandleData = respone.data
                })
     
                await axios.post(`${process.env.REACT_APP_API_URL}/recent`, {tag:giftTag, notTag: null}, { withCredentials: true })
            


                his.push({
                    pathname: './Timeline',
                    state: {
                        data : AllTagHandleData,
                        tag: giftTag,
                        notTag: notGiftTag,
                    }
                })
            }else{
                await axios(
                    {
                        url: `${process.env.REACT_APP_API_URL}/post`,
                        method: 'get',
                        params: {
                            tag: giftTag,
                            notTag: notGiftTag,
                            size: 10,
                            page: 0
                        },
                        withCredentials: true,
                        paramsSerializer: params => {
                                return qs.stringify(params, {arrayFormat: 'brackets'})
                            }
                        }
                    )
                    .then((respone) => {
                        console.log(respone)
                        AllTagHandleData = respone.data
                    })
                    
                       await axios.post(`${process.env.REACT_APP_API_URL}/recent`,{
                            tag: giftTag,
                            notTag: notGiftTag
                        },{withCredentials: true})
                 
                    his.push({
                        pathname: './Timeline',
                        state: {
                            data : AllTagHandleData,
                            tag: giftTag,
                            notTag: notGiftTag,
                        }
                    })
            }
        }
        else{
            setErrorTag('지역은 필수')
        }
    }  

    const recentSearchHandle = () => {
        setChangeRecentSearchModal(!changeRecentSearchModal)
    }
    

    const timeLineAllTagHandle = async () => {

        await axios(
        {
            url: `${process.env.REACT_APP_API_URL}/post`,
            method: 'get',
            params: {
                tag: userAreaData,
                size: 10,
                page: 0
            },
            withCredentials: true,
            paramsSerializer: params => {
                    return qs.stringify(params, {arrayFormat: 'brackets'})
                }
            }
        )
        .then((respone) => {
            console.log(respone)
            AllTagHandleData = respone.data
        })

        
        his.push({
            pathname: './Timeline',
            state: {
                data : AllTagHandleData,
                tag: giftTag,
                notTag: notGiftTag,
            }
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
    <div className='search-page-container'>
        <div className="header-container-main">
        <span className="header-container">
            <span className='header-container-area'>
                지역  
                {isAreaActive? <button className="header-container-area-button" onClick = {areaSeleteClick}>
                    <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                </button>
                :
                <button className="header-container-area-button" onClick = {areaSeleteClick}>
                    <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
                </button>
                }
                
            </span>
            <button className="header-container-recent" onClick = {recentSearchHandle}>
                이전 검색 내역
            </button>
        </span>
            {isAreaActive ? 
            <div>
            </div>
            :
            <div>
                <div className="header-container-area-box">
                    {userAreaData.map((el:any, idx:any) => {
                        if(el === '인증해주세요'){
                            return <div>인증해주세요<Link className="header-container-area-box-link" to={{
                                pathname: `./Area`,
                                state: {
                                ida: idx,
                            }
                        }}>인증</Link></div>
                        }else{
                            return <div>{el}<Link className="header-container-area-box-link" to={{
                                    pathname: `./Area`,
                                    state: {
                                    ida: idx,
                                }
                            }}>인증</Link></div>
                        }
                    })}
                </div>
            </div>
            }
            <div className="header-container-img-box">
                <img className="header-container-img" src = '로고-우동담-Dark-모양만-배경o.png' />
            </div>
        
        
        {changeRecentSearchModal ? null:<RecentViewModal recentSearchHandle = {recentSearchHandle} selectTagSearchHandle = {selectTagSearchHandle} setGiftTag = {setGiftTag} setNotGiftTag = {setNotGiftTag}> </RecentViewModal>}
    </div>
        
    
        {
            notModeTag ?
        <div className="header-container-tag-mode">
            <div className="header-container-main2">
                
                <div className="header-container-tag-mode-box">
                    <button className="header-container-tag-mode-button2" onClick={timeLineAllTagHandle}>
                        타임라인 전체 보기
                    </button>
                </div>
                <div className="header-container-tag-mode-box">
                    <button className="header-container-tag-mode-button2" onClick = {selectTagSearchHandle}>
                        설정한 태그로 타임라인 검색
                    </button>
                     
                </div>
                <div className="header-container-tag-mode-box">
                    
                        <button className="header-container-tag-mode-button-left" onClick = {notTagHandle}>
                            금지 태그 설정
                        </button>
                        <button className="header-container-tag-mode-button-right" onClick = {selectTagReSet}>
                            태그 초기화
                        </button>
                    
                </div>
            
                <div className="header-container-search-box">
                    <input className="header-container-search-input" type="text" value={searchText} onChange={searchTextChange} placeholder="태그 검색" onKeyPress={searchHandleKeyPress} />
                
                </div>
                <div className="error-tag">{errorTag}</div>
                
                {tagData.map((el:any) => {
                    if(giftTag.indexOf(el) !== -1){
                        
                        
                        return <button className="select box box-contanier2" onClick = {giftTagHandle}>{el}</button>
                        
                    }
                })}
                <div className="tag-view">
                    {tagSeletView}
                    {
                    notGiftTag.length !== 0 ?
                    <div className="tag-view-title">금지 설정한 태그 
                        <div>{notTagSeletView}</div>
                    </div>
                    
                    : null
                    }
                </div>
            </div>
            
            <div className="box-contanier">
                
                
                {searchText === '' ? tagData.map((el:any) => {
                    if(giftTag.indexOf(el) === -1){
                        if(el === '인증해주세요'){
                            return
                        }
                        else{
                            return <button className="un-select box" onClick = {giftTagHandle}>{el}</button>
                        }
                    }else{
                        if(el === '인증해주세요'){
                            return
                        }
                        
                    }
                })
                :
                filterTag.map((el:any) => {
                    if(giftTag.indexOf(el) === -1){
                        return <button className="un-select box" onClick = {giftTagHandle}>{el}</button>
                    }
                    
                    else if (giftTag.indexOf(el) !== -1){
                        return <button className="select box" onClick = {giftTagHandle}>{el}</button>
                    }
                })
                

                }
                
            </div>
        </div>

        :

        <div className="header-container-tag-mode">
            <div className="header-container-main2">
            
            <div className="header-container-tag-mode-box">
                <button className="header-container-tag-mode-button2">
                    타임라인 전체 보기
                </button>
            </div>

            <div className="header-container-tag-mode-box">
                <button className="header-container-tag-mode-button2" onClick = {selectTagSearchHandle}>
                    설정한 태그로 타임라인 검색
                </button>
                <div>{errorTag}</div>
            </div>
            

            <div className="header-container-tag-mode-box">
                <button className="not-tag-mode header-container-tag-mode-button-left" onClick = {notTagHandle}>
                    금지 태그 설정 해제
                </button>
                <button className="header-container-tag-mode-button-right" onClick = {selectTagReSet}>
                    태그 초기화
                </button>
            </div>
                <div className="header-container-search-box">
                    <input className="header-container-search-input" type="text" value={searchText} onChange={searchTextChange} placeholder="태그 검색" onKeyPress={searchHandleKeyPress} />
                
                </div>
                {notTagData.map((el:any) => {
                    if(notGiftTag.indexOf(el) !== -1){
                        
                        
                        return <button className="not-select box box-contanier2" onClick = {giftTagHandle}>{el}</button>
                        
                    }
                })}
                <div className="tag-view">
                    {notTagSeletView}
                </div >
            </div>
            <div className="box-contanier">
                
                
                {searchText === '' ? notTagData.map((el:any) => {

                    if(notGiftTag !== null && notGiftTag.indexOf(el) === -1){
                        if(giftTag.indexOf(el) === -1){
                            if(el === '인증해주세요'){
                                return
                            }else{
                                return <button className="un-select box" onClick = {giftTagHandle}>{el}</button>
                            }
                        }
                        else{
                            if(el === '인증해주세요'){
                                return
                            }else{
                            return <button className="select box" onClick = {giftTagHandle}>{el}</button>
                            }
                        }
                    }else{
                        if(el === '인증해주세요'){
                            return
                        }else{
                        return  
                        }
                    }
                })
                :
                filterTag.map((el:any) => {
                    if(notGiftTag.indexOf(el) === -1){
                        if(el === '인증해주세요'){
                            return
                        }else{
                        return <button className="un-select box" onClick = {giftTagHandle}>{el}</button>
                        }
                    }else{
                        if(el === '인증해주세요'){
                            return
                        }else{
                            return <button className="not-select box" onClick = {giftTagHandle}>{el}</button>
                        }
                    }
                })
                }
                
            </div>
        
        </div>
        }
        
    </div>
    )
}
export default Search;