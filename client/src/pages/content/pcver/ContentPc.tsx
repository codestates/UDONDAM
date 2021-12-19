import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Link } from 'react-router-dom'
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { userInfo } from 'os';
import CommentDeleteModal from '../../../components/Content/CommentDeleteModal'
import { commentIdDataHandler } from '../../../redux/modules/CommentIdData';
import { useHistory } from 'react-router'
import PostDeleteModal from '../../../components/Content/PostDeleteModal';
import './ContentPc.css'

const qs = require('qs');

let contentDataParsing:any = []
library.add(faCommentDots);

    //게시글
    
function ContentPc({ contentPropsData }: any) {
    const {ida}:any = contentPropsData.state
    let hisData:any = contentPropsData.state
    console.log(ida)
    const his = useHistory()
    const dispatch = useDispatch()
    const loginUserInfo = useSelector((state: RootStateOrAny)=>state.UserInfoReducer)
    const commentIdData = useSelector((state: RootStateOrAny)=>state.commentIdDataReducer)
    const isGuest = useSelector((state: RootStateOrAny)=>state.IsGuestReducer.isGuest)
    const isMobile = useSelector((state: RootStateOrAny)=>state.IsMobileReducer.isMobile)
    const isPost = useSelector((state: RootStateOrAny)=>state.IsPostContentReducer.isPostContent)

    console.log(isMobile)
    const [test1, setTest1] = useState<any>('');
    //게시글 데이터 가져오기
    let wg:any = ''
    const dataParsingHandle = async () => {
         await axios.get(`${process.env.REACT_APP_API_URL}/post/${ida}`, {withCredentials: true}).then((respone) => {
            contentDataParsing.pop()
            contentDataParsing.push(respone.data)
            setPostDataDetail(contentDataParsing)
            wg = respone.data
            setTest1(wg.commentCount)
            setLikeChangeData(!likeChangeData)
        })
    }
    
    const [giftTag, setGiftTag] = useState<any>(hisData.tag);
    const [notGiftTag, setNotGiftTag] = useState<any>(hisData.notTag);

    const [commentView, setCommentView] = useState<boolean>(false);
    const [commentText, setCommentText] = useState<string>('');
    const [giftComment, setGiftComment] = useState<any>([]);
    const [cCommentView, setCCommentView] = useState<any>(0);
    const [cCommentText, setCCommentText] = useState<string>('');
    const [giftCComment, setGiftCComment] = useState<any>([]);
    const [likeChangeData, setLikeChangeData] = useState<boolean>(false);
    const [testChangeData, setTestChangeData] = useState<boolean>(false);
    const [changeCommentModal, setChangeCommentModal] = useState<boolean>(true);
    const [changePostModal, setChangePostModal] = useState<boolean>(true);

    const [charNum, setCharNum] = useState<number>(0);
    const [charNumError, setCharNumError] = useState<any>('');

    const [cCharNum, setCCharNum] = useState<number>(0);
    const [cCharNumError, setCCharNumError] = useState<any>('');

    // 게시글에 관한 모든 데이터
    const [postDataDetail, setPostDataDetail] = useState<any>(contentDataParsing)

    //댓글 인풋 체인지 함수
    const commentTextChange = (event:any) => {
        const max = 100;
        const textValue = event.target.value;
        const textLength = textValue.length
        let num = 0
        for(let i =0; i<textLength; i++){
            //하 유니코드 체크..
            let char = textValue.charAt(i)
            let uniChar = encodeURI(char)
            if(uniChar.length>4){
                //한글은 2
                num = num + 2
            }else{
                //영문 숫자 1
                num = num + 1
            }
        }
        
        setCharNum(num)
        if(max < num){
            setCharNumError('글자 제한 수를 초과하셨습니다.')
        }
        else{
            setCommentText(event.target.value)
            setCharNumError('')
            setGiftComment([{
            postId : postDataDetail[0].id,
            content : event.target.value
        }])
        }
    }

    //대댓글 인풋 체인지 함수
    const cCommentTextChange = (event:any) => {
        const max2 = 100;
        const textValue2 = event.target.value;
        const textLength2 = textValue2.length
        let num2 = 0
        for(let i =0; i<textLength2; i++){
            //하 유니코드 체크..
            let char2 = textValue2.charAt(i)
            let uniChar2 = encodeURI(char2)
            if(uniChar2.length>4){
                //한글은 2
                num2 = num2 + 2
            }else{
                //영문 숫자 1
                num2 = num2 + 1
            }
        }
        
        setCCharNum(num2)
        if(max2 < num2){
            setCCharNumError('글자 제한 수를 초과하셨습니다.')
        }
        else{
            setCCommentText(event.target.value)
            setCCharNumError('')
            setGiftCComment([
                {
                    postId : postDataDetail[0].id,
                    content : event.target.value,
                    commentId : cCommentView
                }
            ])
        }
        // setCCommentText(event.target.value)
        // setGiftCComment([
        //     {
        //         postId : postDataDetail[0].id,
        //         content : event.target.value,
        //         commentId : cCommentView
        //     }
        // ])
    }

    //대댓글 생성시 인풋창 유무
    const commentCommentViewHandle = (data:any) => {
        if(data === cCommentView){
            setCCommentView(0)
        }else{
            setCCommentView(data)
        }
    }

    //댓글 삭제
    const CommentDeleteHandle = async (data:any) => {

        await axios(
            {
                url: `${process.env.REACT_APP_API_URL}/comment/${data}`,
                method: 'delete',
                withCredentials: true,
                paramsSerializer: params => {
                        return qs.stringify(params, {arrayFormat: 'brackets'})
                    } 
            }
            )
            .then((respone) => {
                console.log(respone)
            })
        setTestChangeData(!testChangeData)
        setChangeCommentModal(true)
    }

    //댓글 삭제 모달창 유무
    const CommentDeleteModalHandle = (data:any) => {
        dispatch(commentIdDataHandler(data))
        setChangeCommentModal(!changeCommentModal)
        // commentIdData
    }

    //게시글 삭제 모달창 유무
    const PostDeleteModalHandle = (data:any) => {
        dispatch(commentIdDataHandler(data))
        setChangePostModal(!changePostModal)
    }

    //댓글창 유무
    const commentViewHandle = () => {
        setCommentView(!commentView)
    }

    //대댓글 생성
    const giftCCommentHandle = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/comment`,giftCComment[0],{withCredentials: true}).then((respone) => {
            console.log(respone)
        })
        setCCommentView(null)
        setLikeChangeData(!likeChangeData)
        setCCommentText('')
        setGiftComment([])
    }

    //댓글 생성
    const giftCommentHandle = async () => {
        console.log(giftComment)
        await axios.post(`${process.env.REACT_APP_API_URL}/comment`,giftComment[0],{withCredentials: true}).then((respone) => {
            console.log(respone)
        })
        setCommentText('')
        setLikeChangeData(!likeChangeData)
        setGiftComment([])
    }

     //게시글 삭제
     const postDeleteHandle = async (data:number) => {

        await axios.delete(`${process.env.REACT_APP_API_URL}/post/${data}`,{withCredentials: true}).then((respone) => {
            console.log(respone)
        })
        
    }

    // 뒤로가기
    const backTimeLineHandle = async () => {
        let AllTagHandleData:any = []
        if(giftTag.length === 0 || giftTag === null){
            await axios(
                {
                    url: `${process.env.REACT_APP_API_URL}/post`,
                    method: 'get',
                    params: {
                        tag: [loginUserInfo.area,loginUserInfo.area2],
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
        else if(notGiftTag === null || notGiftTag.length === 0){

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
            ).then((respone) => {
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
                ).then((respone) => {
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
    

    const likeChangeHandle = async () => {
        if(postDataDetail[0].likeCheck){
            postDataDetail[0].likeCheck = false
            postDataDetail[0].likeCount = postDataDetail[0].likeCount - 1
            await axios.delete(`${process.env.REACT_APP_API_URL}/likes/?userId=${loginUserInfo.userId}&postId=${postDataDetail[0].id}`,{withCredentials: true}).then((respone) => {
                console.log(respone)
            })
            //대충 액시오스로 서버로 따봉 딜리트 요청 보낸다는것
        } 
        else{
            postDataDetail[0].likeCheck = true
            postDataDetail[0].likeCount++
            await axios.post(`${process.env.REACT_APP_API_URL}/likes`,{
                postId : postDataDetail[0].id,
                userId : loginUserInfo.userId
            },{withCredentials: true}).then((respone) => {
                console.log(respone)
            })
            //대충 액시오스로 서버로 따봉 포스트 요청 보낸다는것
        }
        setPostDataDetail(postDataDetail)
        setLikeChangeData(!likeChangeData)
    }

    //서버에서 받아온 createAt을 보기 좋게 수정해주는 핸들러
    const createAtDesign = (data:string) => {
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
        // if(days < 3){
        //     return `${Math.floor(days)}일 전`}
        
        const WEEKDAY = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
        let week = WEEKDAY[new Date(data).getDay()];

        let ac:any = ''
        let bc = ''
        let cc:any = ''
        
        ac = new Date(data)
        cc = new Date(ac.getTime() - (ac.getTimezoneOffset() * 60000)).toISOString()
        ac = cc.slice(0,10)
        bc = bc + ac
        ac = cc.slice(11,16)
        bc = bc + ' ' + ac + ' ' + week 

        return bc
    }

    
    // console.log(giftComment)
    // console.log(giftCComment)

    useEffect(() => {
        dataParsingHandle()
    },[ida])
    useEffect(() => {
        dataParsingHandle()
    },[])
    useEffect(() => {
        dataParsingHandle()
    },[giftComment])
    useEffect(() => {
        dataParsingHandle()
    },[giftCComment])
    useEffect(() => {
        dataParsingHandle()
    },[testChangeData])
 
    console.log(postDataDetail)
    return(
        <div className={`contanier-main-contanierp ${isMobile ? 'c1p' : null}`}>
            <div className='hidden-over'>
            {isMobile ? 
            <button className={`back-buttonp ${isMobile ? 'c2p' : null}`} onClick={backTimeLineHandle}>뒤로..</button>
            :
            null
            }

            <div className='contanier-mainp'>

                {postDataDetail && postDataDetail.map((el: { nickname: string,createAt: string ,content:string, tag:Array<string>, id:number, commentCount:number, likeCount:number, userId:number, comment:string}) => {
                return (

                <div>
                    {el.userId === loginUserInfo.userId ? 
                    <div>
                        
                        <div>
                            
                            <div className={`writer-truep ${isMobile ? 'c3' : null}`}>{`${el.nickname} -본인글`}</div>
                            <div >{createAtDesign(el.createAt)}
        
                            <span className='delete-buttonp' onClick={() =>PostDeleteModalHandle(el.id)}> 삭제</span>
                            {changePostModal ? null:<PostDeleteModal postDeleteHandle = {postDeleteHandle} PostDeleteModalHandle = {PostDeleteModalHandle}></PostDeleteModal>}
                            <span className='delete-buttonp'> 신고 </span>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className={`writer-falsep ${isMobile ? 'c3p' : null}`}>{el.nickname}</div>
                        <div>{createAtDesign(el.createAt)}
         
                        <span className='delete-buttonp'> 신고 </span>
                    </div>
                    </div>}

                <div className={`content-mainp ${isMobile ? 'c1p' : null}`}>{
                // /n을 기준으로 줄바꿈을 만듬
                el.content.split('\n').map((le:any) => {
                    return (<span>{le}<br /></span>)
                })
                }
                </div>
                <div>
                    {el.tag.map((le: string) => {
                        return (<span>#{le} </span>)
                    })
                    }
               
                    
                    <span className='icon-boxp'>
                    <span className='comment-iconp' onClick={commentViewHandle}>
                        <FontAwesomeIcon icon={faCommentDots} data-fa-transform="flip-vp"></FontAwesomeIcon>
                        {` ${el.commentCount}`}
                    </span>


                    {postDataDetail && postDataDetail.map((el:any) => el.likeCheck ?
                    
                        <span className='like-icon-truep' onClick={likeChangeHandle}>
                            <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                            {` ${el.likeCount}`}
                        </span>
                        : isGuest ? 
                        <span className='like-iconp'>
                            <FontAwesomeIcon  icon={faThumbsUp}></FontAwesomeIcon>
                            {` ${el.likeCount}`}
                        </span>
                        :
                        <span className='like-iconp' onClick={likeChangeHandle}>
                            <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                            {` ${el.likeCount}`}
                        </span>
                        )
                    }
                    
                    </span>
                </div>

                </div>
               
                )
            }) }
            <div className='comment-contanierp'>
            {
            commentView ? 
                 postDataDetail[0].comment.map((el:any,idx:any) => {
                
                return (
                    
                <div className='asp'>
                    <div>
                        {el.content ===  null || el.content === '삭제 된 댓글 입니다'?
                            <div className='comment-boxp'>
                                <div>
                                    {el.content}
                                </div>
                            </div>
                            :
                            <div className='comment-boxp'>
                                <div className='margin-comment-boxp'>
                                    {el.userId === loginUserInfo.userId ? 
                                    <div className='createAt-box-boxp'>
                                        <span>{`${el.nickname} -본인`}</span>
                                        {
                                            isGuest ? null :
                                            <span>
                                                <span className='comment-optionp'  onClick={() => commentCommentViewHandle(el.id)}>
                                                    댓글
                                                
                                                </span>
                                                <span className='comment-option-deletep' onClick={() => CommentDeleteModalHandle(el.id)}>
                                                삭제
                                                {changeCommentModal ? null:<CommentDeleteModal CommentDeleteHandle = {CommentDeleteHandle} CommentDeleteModalHandle = {CommentDeleteModalHandle}></CommentDeleteModal>}
                                                </span>
                                                <span className='comment-option-deletep'>
                                                    신고
                                                </span>
                                            </span>
                                        }
                                    </div>
                                    :
                                        el.userId === postDataDetail[0].userId ?
                                        
                                        <div className='createAt-box-boxp'>
                                            <span className='writer-commentp'>{`${el.nickname} -글쓴이`}</span>
                                            {
                                            isGuest ? null :
                                            <span>
                                                <span className='comment-optionp'  onClick={() => commentCommentViewHandle(el.id)}>
                                                    댓글
                                                
                                                </span>
                                                <span className='comment-option-deletep' onClick={() => CommentDeleteModalHandle(el.id)}>
                                                삭제
                                                {changeCommentModal ? null:<CommentDeleteModal CommentDeleteHandle = {CommentDeleteHandle} CommentDeleteModalHandle = {CommentDeleteModalHandle}></CommentDeleteModal>}
                                                </span>
                                                <span className='comment-option-deletep'>
                                                    신고
                                                </span>
                                            </span>
                                        }
                                        </div>
                                        :
                                        <span>{el.nickname}</span>
                                    }
                                    <span className={`comment-createAtp ${isMobile ? 'c4p' : null}`}>
                                        {  createAtDesign(el.createAt) }
                                    </span>
                                </div>
                                <div>
                                    {el.content.split('\n').map((le:any) => {
                                        return (<span>{le}<br /></span>)
                                    })}
                                </div>
                            </div>
                
                        }
                        
                    </div>
                    

                    {
                        cCommentView === el.id ? 
                        // <div>
                        //     <input type="text" value={cCommentText} onChange={cCommentTextChange} placeholder="댓글에 댓글을 달아보세요" />
                        //     <button onClick={giftCCommentHandle}>확인</button>
                        // </div>
                        <div className='input-commentp-box'>
                            <textarea className={`input-commentp ${isMobile ? 'c5p' : null}`} value={cCommentText} onChange={cCommentTextChange} />
                            {charNumError === '' ? <div className='charNump'>
                                {`${cCharNum} /100 byte`}
                            </div>
                            :
                            <div className='charNum-Redp'>
                                {`${cCharNum} /100 byte`}
                            </div>
                            }
                            
                            {charNumError === '' ? null : <div>{cCharNumError}</div>}
                            <div className='complete-comment-boxp'>
                                <button className={`complete-comment-buttonp ${isMobile ? 'c1p' : null}`} onClick={giftCCommentHandle}>대댓글 작성 완료</button>
                            </div>
                        </div>
                        :
                        null
                    }
                    {el.comment === [] ? null : 
                    el.comment && el.comment.map((le:any) => {
                        return (
                            <div>
                                <FontAwesomeIcon className='icon-ccomentp'  icon={faGreaterThan} data-fa-transform="flip-v"/>

                                <div className='ccomment-boxp' >
                                {le.content === '삭제 된 댓글 입니다' ?
                                    <div className='comment-box2p'>
                                        <div>
                                            {le.content}
                                        </div>
                                    </div>
                                    :
                                        <div className='comment-box2p'>
                                            <div className='margin-comment-boxp'>
                                            {el.userId === loginUserInfo.userId ? 
                                                <div className='createAt-box-boxp'>
                                                    <span>{`${le.nickname} -본인`}</span>
                                                    {
                                                        isGuest ? null :
                                                        <span>
                                            
                                                            <span className='comment-option-deletep'  onClick={() => CommentDeleteModalHandle(le.id)}>
                                                                삭제
                                                                {changeCommentModal ? null:<CommentDeleteModal CommentDeleteHandle = {CommentDeleteHandle} CommentDeleteModalHandle = {CommentDeleteModalHandle}></CommentDeleteModal>}
                                                            </span>
                                                            <span className='comment-option-deletep'>
                                                                신고
                                                            </span>
                                                        </span>
                                                    }
                                                </div>
                                                :
                                                    le.userId === postDataDetail[0].userId ?
                                                    <div className='createAt-box-boxp'>
                                                        <span className='writer-commentp'>{`${le.nickname} -글쓴이`}</span>
                                                        {
                                                        isGuest ? null :
                                                        <span>
                                            
                                                            <span className='comment-option-deletep'  onClick={() => CommentDeleteModalHandle(le.id)}>
                                                                삭제
                                                                {changeCommentModal ? null:<CommentDeleteModal CommentDeleteHandle = {CommentDeleteHandle} CommentDeleteModalHandle = {CommentDeleteModalHandle}></CommentDeleteModal>}
                                                            </span>
                                                            <span className='comment-option-deletep'>
                                                                신고
                                                            </span>
                                                        </span>
                                                    }
                                                    </div>
                                                    :
                                                    <span>{le.nickname}</span>
                                            }
                                                     
                                                
                                            
                                            <span className={`comment-createAtp ${isMobile ? 'c4p' : null}`}>
                                                 {  createAtDesign(le.createAt) }
                                            </span>

                                            </div>
                                            <div>
                                            {le.content.split('\n').map((el:any) => {
                                                return (<span>{el}<br /></span>)
                                            })}
                                            </div>
                                        </div>
                                }
                                </div>
                            </div>
                        )
                            
                    })
                    
                    }
                
                </div>)
            
            })
            
            :test1 > 0 ? null : <div className='comment-boxp'>댓글이 없습니다. 첫 댓글을 달아보세요!</div>
            
        }
            </div>
            {
                !commentView ? null
                :isGuest ? null
                :
                <div>
                    <textarea className={`input-commentp ${isMobile ? 'c5p' : null}`} value={commentText} onChange={commentTextChange} />
                    {charNumError === '' ? <div className='charNump'><div>
                        {`${charNum} /100 byte`}
                    </div></div>
                    :
                    <div className='charNum-Redp'>
                        {`${charNum} /100 byte`}
                    </div>
                     }
                    
                    {charNumError === '' ? null : <div>{charNumError}</div>}
                    <div className='complete-comment-boxp'>
                        <button className={`complete-comment-buttonp ${isMobile ? 'c1p' : null}`} onClick={giftCommentHandle}>댓글 작성 완료</button>
                    </div>
                </div>
                
            }
            </div>
            </div>
        </div>
    )
}

export default ContentPc