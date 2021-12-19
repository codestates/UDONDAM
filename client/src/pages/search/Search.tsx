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
import { isPostContentHandler } from '../../redux/modules/IsPostContent';
import { faHandPointUp } from "@fortawesome/free-solid-svg-icons";


library.add(faChevronUp);
library.add(faChevronDown);

const qs = require('qs');

const tagdummyData = [
    '여행', '게임', '소문', '유머', '산책', '자랑', '놀라운', '직장', '학교', '운동', '반려동물', '만화', '고민', '비밀', '음악', '흥미', '사고', '독서', '식사', '취미', '도움', '나눔', '연애', '만남', '자소서', '스포츠', '잡담', '알림', '질문', '일상','잡담','후기','영화','디자인','상담','취업','이력서','환경','맛집','데이트','화장실','건강','병원','공연','나눔','버스킹','사진','학생','버스','초콜릿','발렌타인','크리스마스','설날','명절','데일리','패션','카페','브런치','디저트','커피','tea','해외','부모','효도','학원','공부','코딩','꿀팁','잇템','책','스트리밍','방송','전기','자격증','영업','주식','코인','비트코인','담배','전자담배','액상담배','앨범','전자기기','컴퓨터','노트북','전화','월드컵','로또','rpg','fps','pc게임','콘솔게임','보드게임','코로나','오징어게임','자가진단','요소수','주유소','기름','세차','카센타','로블록스','의사','한식','중식','일식','양식','트렌드','구글','야구','축구','농구','인사','신화','병법','유튜브']
//지역에 관한 필터링
function Search() {
    const loginUserInfo = useSelector((state: RootStateOrAny)=>state.UserInfoReducer)
    const his = useHistory()
    let AllTagHandleData = {}
    const timeLineAllTagHandleData = []
    console.log(loginUserInfo)
    const isMobile = useSelector((state: RootStateOrAny)=>state.IsMobileReducer.isMobile)
    const dispatch = useDispatch()
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

    const [notAreaHandle, setNotAreaHandle] = useState<any>(false)

    

    const areaSeleteClick = (event:any) => {
        // if(isAreaActive){
        //     event.target.textContent = 'u'
        // }else{
        //     event.target.textContent = 'n'
        // }

        setIsAreaActive(!isAreaActive)
        setNotAreaHandle(false)
        setIsAreaActive(true)
    }

    const searchTextChange = (event:any) => {
        setSearchText(event.target.value)
        setNotAreaHandle(false)
        setIsAreaActive(true)
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
                       return el.includes(searchText)
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
        setErrorTag('')
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
        }
        else
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
        setNotAreaHandle(false)
        setIsAreaActive(true)
    }
    

    const timeLineAllTagHandle = async () => {
        if((loginUserInfo.area.length < 2 && loginUserInfo.area2.length < 2) || (loginUserInfo.area === '인증해주세요' && loginUserInfo.area2 === '인증해주세요')){
            setErrorTag('지역인증부터 해주세요')
            setIsAreaActive(false)
            setNotAreaHandle(true)
        }
        else{

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
    useEffect(() => {
        dispatch(isPostContentHandler(false))
    }, [])
    

    console.log(giftTag)
    console.log(notGiftTag)

    return (
    <div className='search-page-container'>
        <div className="header-container-main">
        <span className="header-container">
            
            <span className={`header-container-area ${isMobile ? 's1' : null}`}>
                지역  
                {isAreaActive? <button className={`header-container-area-button ${isMobile ? 's2' : null}`} onClick = {areaSeleteClick}>
                    <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                    
                    
                </button>
                :
                <button className={`header-container-area-button ${isMobile ? 's2' : null}`} onClick = {areaSeleteClick}>
                    <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
                    
                </button>
                }
            </span>
            
        </span>
            {isAreaActive ? 
            <div>
            </div>
            :
            <div>
                <div className={`header-container-area-box ${isMobile ? 's3' : null}`}>
                    {userAreaData.map((el:any, idx:any) => {
                        if(el === '인증해주세요'){
                            return <div>{`인증해주세요  `}<Link className={`header-container-area-box-link  ${isMobile ? 's4' : null}`} to={{
                                pathname: `./Area`,
                                state: {
                                ida: idx,
                            }
                        }}>인증</Link>
                        </div>
                        }else{
                            return <div>{`${el}  `}<Link className={`header-container-area-box-link  ${isMobile ? 's4' : null}`} to={{
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
        
        <button className={`header-container-recent ${isMobile ? 's5' : null}`} onClick = {recentSearchHandle}>
                이전 검색 내역
            </button>
            {
                notAreaHandle ? <div className={`not-area-handle ${isMobile ? 'sc1' : null}`}><FontAwesomeIcon icon={faHandPointUp}></FontAwesomeIcon></div>
                :
                null
            }
        
        {changeRecentSearchModal ? null:<RecentViewModal recentSearchHandle = {recentSearchHandle} selectTagSearchHandle = {selectTagSearchHandle} setGiftTag = {setGiftTag} setNotGiftTag = {setNotGiftTag}> </RecentViewModal>}
        
    </div>
    
        <div className="header-container-img-box">
                <img className="header-container-img" src = '로고-우동담-Dark-모양만-배경o.png' />
            </div>
    
        {
            notModeTag ?
        <div className="header-container-tag-mode">
            <div className="header-container-main2">
                
                <div className="header-container-tag-mode-box">
                    <div><button className={`header-container-tag-mode-button2 ${isMobile ? 's6' : null}`} onClick={timeLineAllTagHandle}>
                        타임라인 전체 보기
                    </button></div>
                    <div>
                    <button className={`header-container-tag-mode-button2 ${isMobile ? 's6' : null}`} onClick = {selectTagSearchHandle}>
                        설정한 태그로 타임라인 검색
                    </button>
                    </div>
                
                    <div>
                        <button className={`header-container-tag-mode-button-left ${isMobile ? 's6' : null}`} onClick = {notTagHandle}>
                            금지 태그 설정
                        </button>
                        
                        <button className={`header-container-tag-mode-button-right ${isMobile ? 's6' : null}`}  onClick = {selectTagReSet}>
                            태그 초기화
                        </button>
                    </div>
                    <div className="header-container-search-box">
                    <input className={`header-container-search-input ${isMobile ? 's9' : null}`}   type="text" value={searchText} onChange={searchTextChange} placeholder="태그 검색" onKeyPress={searchHandleKeyPress} />
                
                </div>
                <div className={`tag-view ${isMobile ? 's3' : null}`}>
                    {tagSeletView}
                    {
                    notGiftTag.length !== 0 ?
                    <div className={`tag-view-title ${isMobile ? 's3' : null}`}>금지 설정한 태그 
                        <div>{notTagSeletView}</div>
                    </div>
                    
                    : null
                    }
                </div>
                </div>

                <div className={`error-tag ${isMobile ? 's7' : null}`}>{errorTag}</div>
            </div>
            

            <div className="box-contanier">
                <div>
                
                
                {tagData.map((el:any) => {
                    if(giftTag.indexOf(el) !== -1){
                        
                        
                        return <button className={`select box box-contanier2 ${isMobile ? 's8' : null}`} onClick = {giftTagHandle}>{el}</button>
                        
                    }
                })}
                </div>
                
                {searchText === '' ? tagData.map((el:any) => {
                    if(giftTag.indexOf(el) === -1){
                        if(el === '인증해주세요'){
                            return
                        }
                        else{
                            return <button className={`un-select box ${isMobile ? 's8' : null}`} onClick = {giftTagHandle}>{el}</button>
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
                        return <button className={`un-select box ${isMobile ? 's8' : null}`} onClick = {giftTagHandle}>{el}</button>
                    }
                    
                    else if (giftTag.indexOf(el) !== -1){
                        return <button className={`select box ${isMobile ? 's8' : null}`} onClick = {giftTagHandle}>{el}</button>
                    }
                })
                

                }
                
            </div>
        </div>

        :

        <div className="header-container-tag-mode">
            <div className="header-container-main2">
            
            <div className="header-container-tag-mode-box">
                <button className={`header-container-tag-mode-button2 ${isMobile ? 's6' : null}`} onClick={timeLineAllTagHandle}>
                    타임라인 전체 보기
                </button>
            </div>

            <div className="header-container-tag-mode-box">
                <button className={`header-container-tag-mode-button2 ${isMobile ? 's6' : null}`} onClick = {selectTagSearchHandle}>
                    설정한 태그로 타임라인 검색
                </button>
            </div>
            

            <div className="header-container-tag-mode-box">
                <button className={`header-container-tag-mode-button-left ${isMobile ? 's6' : null}`}onClick = {notTagHandle}>
                    금지 태그 설정 해제
                </button>
                <button className={`header-container-tag-mode-button-right ${isMobile ? 's6' : null}`} onClick = {selectTagReSet}>
                    태그 초기화
                </button>
            </div>
                <div className="header-container-search-box">
                    <input className={`header-container-search-input ${isMobile ? 's9' : null}`} type="text" value={searchText} onChange={searchTextChange} placeholder="태그 검색" onKeyPress={searchHandleKeyPress} />
                
                </div>

                {notTagData.map((el:any) => {
                    if(notGiftTag.indexOf(el) !== -1){
                        
                        
                        return <button className={`not-select box box-contanier2 ${isMobile ? 's8' : null}`} onClick = {giftTagHandle}>{el}</button>
                        
                    }
                })}
                <div className={`tag-view ${isMobile ? 's3' : null}`}>
                    {notTagSeletView}
                </div >
                <div className={`error-tag ${isMobile ? 's7' : null}`}>{errorTag}</div>
            </div>

            <div className="box-contanier">
                
                
                {searchText === '' ? notTagData.map((el:any) => {

                    if(notGiftTag !== null && notGiftTag.indexOf(el) === -1){
                        if(giftTag.indexOf(el) === -1){
                            if(el === '인증해주세요'){
                                return
                            }else{
                                return <button className={`un-select box ${isMobile ? 's8' : null}`} onClick = {giftTagHandle}>{el}</button>
                            }
                        }
                        else{
                            if(el === '인증해주세요'){
                                return
                            }else{
                            return <button className={`select box ${isMobile ? 's8' : null}`} onClick = {giftTagHandle}>{el}</button>
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
                        return <button className={`un-select box ${isMobile ? 's8' : null}`} onClick = {giftTagHandle}>{el}</button>
                        }
                    }else{
                        if(el === '인증해주세요'){
                            return
                        }else{
                            return <button className={`not-select box ${isMobile ? 's8' : null}`} onClick = {giftTagHandle}>{el}</button>
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