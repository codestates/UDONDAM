
import React from "react";
import { useState, useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import '@fortawesome/fontawesome-free/js/all.js'
import TimeLinePost from '../../components/timeLinePost/TimeLinePost'
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import './TimeLine.css'
import ContentPc from '../content/pcver/ContentPc'
import Postcontent from '../postcontent/Postcontent'
import LoadingIndicator from '../../components/utils/LoadingIndicator';
const qs = require('qs');

//   '로고-우동담-Dark-글자만-배경o.png'
function TimeLine({ history }: RouteComponentProps){
    const isMobile = useSelector((state: RootStateOrAny)=>state.IsMobileReducer.isMobile)
    let hisData:any = history.location.state
    const loginUserInfo = useSelector((state: RootStateOrAny)=>state.UserInfoReducer)
    const isPost = useSelector((state: RootStateOrAny)=>state.IsPostContentReducer.isPostContent)
    const [postData, setPostData] = useState<any>(hisData.data);
    const [giftTag, setGiftTag] = useState<any>(hisData.tag);
    const [notGiftTag, setNotGiftTag] = useState<any>(hisData.notTag);

    const [userData, setUserData] = useState<any>(loginUserInfo);
    const [pageCount, setPageCount] = useState<number>(1);
    const [datapa, setDatapa] = useState<any>(true);
    const [isLoding, setIsLoding] = useState<any>(false);

    //컨텐트 페이지 보여줄거야?
    const [handlePageContent, setHandlePageContent] = useState<any>(false);
 
    const [contentPropsData, setContentPropsData] = useState<any>({
        state: {
        ida: '',
        tag: giftTag,
        notTag: notGiftTag,
        }
    });
   

    const createAtDesign = (data:any) => {

        const timeStamp = Date.now() - new Date(data).getTime()
        const second = timeStamp / 1000
        const minute = second / 60
        const hour = minute / 60
        const days = hour / 24
        if(second < 60){
            return '방금 전'}
        if(minute < 60){
            return `${Math.floor(minute)}분 전`}
        if(hour < 24){
            return `${Math.floor(hour)}시간 전`}
        // if(days < 7){
        //     return `${Math.floor(days)}일 전`}
        
        const WEEKDAY = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
        let week = WEEKDAY[new Date(data).getDay()];

        let a:any = ''
        let b = ''
        let c:any = ''
        
        a = new Date(data)
        c = new Date(a.getTime() - (a.getTimezoneOffset() * 60000)).toISOString()
        a = c.slice(0,10)
        b = b + a
        a = c.slice(11,16)
        b = b + ' ' + a + ' ' + week 
        return b
    }
    

    const addSelectTagSearchHandle = async () => {
        setPageCount(pageCount+1)
       
            if(giftTag.length === 0 || giftTag === null){
                setIsLoding(true)
                await axios(
                    {
                        url: `${process.env.REACT_APP_API_URL}/post`,
                        method: 'get',
                        params: {
                            tag: [userData.area,userData.area2],
                            size: 10,
                            page: pageCount
                        },
                        withCredentials: true,
                        paramsSerializer: params => {
                                return qs.stringify(params, {arrayFormat: 'brackets'})
                            }
                        }
                )
                .then((respone:any) => {
                    
                    setPostData(postData.concat(respone.data))
    
                })
                try {setIsLoding(false)}
                catch (err) {
                
            }
                
            }
            else if(notGiftTag === null || notGiftTag === undefined || notGiftTag.length === 0){
                setIsLoding(true)
                await axios(
                    {
                        url: `${process.env.REACT_APP_API_URL}/post`,
                        method: 'get',
                        params: {
                            tag: giftTag,
                            size: 10,
                            page: pageCount
                        },
                        withCredentials: true,
                        paramsSerializer: params => {
                                return qs.stringify(params, {arrayFormat: 'brackets'})
                            }
                        }
                )
                .then((respone:any) => {
     
                    setPostData(postData.concat(respone.data))
                })
                try {setIsLoding(false)}
                catch (err) {
                
            }
                
            }else{
                setIsLoding(true)
                await axios(
                    {
                        url: `${process.env.REACT_APP_API_URL}/post`,
                        method: 'get',
                        params: {
                            tag: giftTag,
                            notTag: notGiftTag,
                            size: 10,
                            page: pageCount
                        },
                        withCredentials: true,
                        paramsSerializer: params => {
                                return qs.stringify(params, {arrayFormat: 'brackets'})
                            }
                        }
                    )
                    .then((respone:any) => {
         
                        setPostData(postData.concat(respone.data))
                    })
                    try {setIsLoding(false)}
            catch (err) {
                
            }
            }
    }

    
   


    
    return (
        isLoding ? <LoadingIndicator></LoadingIndicator>
        :
        <div className="show-width-all etet">
            <div className="show-box">
                {isMobile? <div className={`show-nickname ${isMobile ? 't1' : null}`}>{userData.nickname}님 안녕하세요</div>
                :
                <div className="show-nickname">{userData.nickname}님 안녕하세요</div>
                }
 
            </div>
            <div className="logo-contanier">
                <img className="logo" src = '로고-우동담-Dark-글자만-배경o.png'/>
            </div>
            
            <div className="page-handle-where">
            <TimeLinePost postData = {postData} userData = {userData} addSelectTagSearchHandle={addSelectTagSearchHandle} createAtDesign={createAtDesign} giftTag={giftTag} notGiftTag={notGiftTag} setContentPropsData={setContentPropsData} setHandlePageContent={setHandlePageContent} handlePageContent={handlePageContent} datapa={datapa}/>
            {isMobile ? null
            :!handlePageContent ? null
            :
            isPost ? null
            :
            <ContentPc contentPropsData = {contentPropsData}></ContentPc>
            
            }
            {isMobile ? null
            :isPost ?
            <Postcontent setPostData={setPostData} giftTag={giftTag} notGiftTag={notGiftTag}></Postcontent>
            :
            null
            }
            
            </div>
        </div>
    )
}
export default TimeLine;