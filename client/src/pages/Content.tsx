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
import CommentDeleteModal from '../components/Content/CommentDeleteModal'
import { commentIdDataHandler } from '../redux/modules/CommentIdData';
import { useHistory } from 'react-router'
import PostDeleteModal from '../components/Content/PostDeleteModal';

const qs = require('qs');

let contentDataParsing:any = []
library.add(faCommentDots);
let a:string = ''
let b:string = ''
    //게시글
function Content({ history }: RouteComponentProps) {
    const {ida}:any = history.location.state
    let hisData:any = history.location.state
    const his = useHistory()
    const dispatch = useDispatch()
    const loginUserInfo = useSelector((state: RootStateOrAny)=>state.UserInfoReducer)
    const commentIdData = useSelector((state: RootStateOrAny)=>state.commentIdDataReducer)
    const isGuest = useSelector((state: RootStateOrAny)=>state.IsGuestReducer.isGuest)
    console.log(loginUserInfo)

    //게시글 데이터 가져오기
    const dataParsingHandle = async () => {
         await axios.get(`${process.env.REACT_APP_API_URL}/post/${ida}`, {withCredentials: true}).then((respone) => {
            contentDataParsing.pop()
            contentDataParsing.push(respone.data)
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

    const likeTrue = {
        color: "blue",
        cursor: 'pointer'
    }
    const Writer = {
        color: "blue",
    }
 
    const pointerTrue = {
        cursor: 'pointer'
    }
    const boxBorder = {
        marginBottom: '1rem',
        border: '1px solid black'

    }
    const boxBorder2 = {
        border: '1px solid black',
        marginBottom: '1rem',

        display: 'inline-block'
    }
    // 게시글에 관한 모든 데이터
    const [postDataDetail, setPostDataDetail] = useState<any>(contentDataParsing)

    //댓글 인풋 체인지 함수
    const commentTextChange = (event:any) => {
        setCommentText(event.target.value)

        setGiftComment([{
            postId : postDataDetail[0].id,
            content : event.target.value
        }])
    }

    //대댓글 인풋 체인지 함수
    const cCommentTextChange = (event:any) => {
        setCCommentText(event.target.value)
        setGiftCComment([
            {
                postId : postDataDetail[0].id,
                content : event.target.value,
                commentId : cCommentView
            }
        ])
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
        console.log(data)
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
        his.push({
            pathname: `./Search`,
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

    
    // console.log(giftComment)
    // console.log(giftCComment)

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
            <div>

                {postDataDetail && postDataDetail.map((el: { nickname: string,createAt: string ,content:string, tag:Array<string>, id:number, commentCount:number, likeCount:number, userId:number, comment:string}) => {
                return (

                <div>
                    {el.userId === loginUserInfo.userId ? 
                    <div>
                        <div onClick={backTimeLineHandle}>뒤로..</div>
                        <div>
                            
                            <div>{`${el.nickname} -글쓴이`}</div>
                            <div>{createAtDesign(el.createAt)}
        
                            <span onClick={() =>PostDeleteModalHandle(el.id)}> 삭제  </span>
                            {changePostModal ? null:<PostDeleteModal postDeleteHandle = {postDeleteHandle} PostDeleteModalHandle = {PostDeleteModalHandle}></PostDeleteModal>}
                            <span> 신고 </span>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div>{el.nickname}</div>
                        <div>{createAtDesign(el.createAt)}
         
                        <span> 신고 </span>
                    </div>
                    </div>}

                <div>{el.content}</div>
                {el.tag.map((le: string) => {
                    return (<span>#{le} </span>)
                })
                }
                <div>
                    <span style = {pointerTrue} onClick={commentViewHandle}>
                        <FontAwesomeIcon icon={faCommentDots} data-fa-transform="flip-v"></FontAwesomeIcon>
                        {el.commentCount}
                    </span>
                    {postDataDetail && postDataDetail.map((el:any) => el.likeCheck ?
                    
                        <span style={likeTrue} onClick={likeChangeHandle}>
                            <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                            {el.likeCount}
                        </span>
                        : isGuest ? 
                        <span>
                            <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                            {el.likeCount}
                        </span>
                        :
                        <span style = {pointerTrue} onClick={likeChangeHandle}>
                            <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                            {el.likeCount}
                        </span>
                        )
                    }
                </div>
                </div>
               
                )
            }) }

            {commentView ? postDataDetail[0].comment.map((el:any) => {
                return (
                <div>
                    
                    <div style={boxBorder}>
                        {el.content === '삭제 된 댓글 입니다' ?
                            <div>
                                <div>
                                    {el.content}
                                </div>
                            </div>
                            :
                            <div>
                                <div>
                                    {el.userId === loginUserInfo.userId ? 
                                    <span>{`${el.nickname} -본인`}</span>
                                    :
                                        el.userId === postDataDetail[0].userId ?
                                        <span>{`${el.nickname} -글쓴이`}</span>
                                        :
                                        <span>{el.nickname}</span>
                                    }
                                    <span>
                                        {  createAtDesign(el.createAt) }
                                    </span>
                                    {
                                        isGuest ? null :
                                        <span>
                                            <span style = {pointerTrue}  onClick={() => commentCommentViewHandle(el.id)}>
                                                댓글
                                            
                                            </span>
                                            <span onClick={() => CommentDeleteModalHandle(el.id)}>
                                            삭제
                                            {changeCommentModal ? null:<CommentDeleteModal CommentDeleteHandle = {CommentDeleteHandle} CommentDeleteModalHandle = {CommentDeleteModalHandle}></CommentDeleteModal>}
                                            </span>
                                            <span>
                                                신고
                                            </span>
                                        </span>
                                    }
                                    

                                    
                                </div>
                                <div>
                                    {el.content}
                                </div>
                            </div>
                
                        }
                        
                    </div>
                    {
                        cCommentView === el.id ? 
                        <div>
                            <input type="text" value={cCommentText} onChange={cCommentTextChange} placeholder="댓글에 댓글을 달아보세요" />
                            <button onClick={giftCCommentHandle}>확인</button>
                        </div>
                        :
                        null
                    }
                    {el.comment === [] ? null : 
                    el.comment && el.comment.map((le:any) => {
                        return (
                            <div>
                                <FontAwesomeIcon  icon={faGreaterThan} data-fa-transform="flip-v"/>

                                <div style={boxBorder2}>
                                {le.content === '삭제 된 댓글 입니다' ?
                                    <div>
                                        <div>
                                            {le.content}
                                        </div>
                                    </div>
                                    :
                                        <div>
                                            <div>
                                            {el.userId === loginUserInfo.userId ? 
                                                <span>{`${le.nickname} -본인`}</span>
                                                :
                                                    le.userId === postDataDetail[0].userId ?
                                                    <span>{`${le.nickname} -글쓴이`}</span>
                                                    :
                                                    <span>{le.nickname}</span>
                                            }
                                                <span>
                                                 {  createAtDesign(le.createAt) }
                                                </span>
                                                
                                                <span  onClick={() => CommentDeleteModalHandle(le.id)}>
                                                    삭제
                                                    {changeCommentModal ? null:<CommentDeleteModal CommentDeleteHandle = {CommentDeleteHandle} CommentDeleteModalHandle = {CommentDeleteModalHandle}></CommentDeleteModal>}
                                                </span>
                                                <span>
                                                    신고
                                                </span>
                                            </div>
                                            <div>
                                                {le.content}
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
            :
            null
            }
            {
                !commentView ? null
                :isGuest ? null
                :
                <div>
                    <input type="text" value={commentText} onChange={commentTextChange} placeholder="게시물에 댓글을 달아보세요" />
                    <button onClick={giftCommentHandle}>확인</button>
                </div>
                
            }
            </div>
    )
}

export default Content