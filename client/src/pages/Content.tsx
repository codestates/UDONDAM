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

let contentDataParsing:any = []
library.add(faCommentDots);

    //게시글
function Content({ history }: RouteComponentProps) {
    const {ida}:any = history.location.state
 
    const loginUserInfo = useSelector((state: RootStateOrAny)=>state.UserInfoReducer)
    console.log(loginUserInfo)
    const dataParsingHandle = async () => {
         await axios.get(`${process.env.REACT_APP_API_URL}/post/${ida}`, {withCredentials: true}).then((respone) => {
            contentDataParsing.pop()
            contentDataParsing.push(respone.data)
            setLikeChangeData(!likeChangeData)
        })
    }


    const [commentView, setCommentView] = useState<any>(false);
    const [commentText, setCommentText] = useState<any>('');
    const [giftComment, setGiftComment] = useState<any>([]);
    const [cCommentView, setCCommentView] = useState<any>(0);
    const [cCommentText, setCCommentText] = useState<any>('');
    const [giftCComment, setGiftCComment] = useState<any>([]);
    const [likeChangeData, setLikeChangeData] = useState<any>(false);


    const likeTrue = {
        color: "blue",
        cursor: 'pointer'
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
    
    const [postDataDetail, setPostDataDetail] = useState<any>(contentDataParsing)

    const commentTextChange = (event:any) => {
        setCommentText(event.target.value)

        setGiftComment([{
            postId : postDataDetail[0].id,
            content : event.target.value
        }])
    }
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
    const commentCommentViewHandle = (data:any) => {
        if(data === cCommentView){
            setCCommentView(0)
        }else{
            setCCommentView(data)
        }
    }

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
    const likeChangeHandle = async () => {
        if(postDataDetail[0].likeCheck){
            postDataDetail[0].likeCheck = false
            postDataDetail[0].likeCount = postDataDetail[0].likeCount - 1
            await axios.delete(`${process.env.REACT_APP_API_URL}/likes/${postDataDetail[0].id}`,{withCredentials: true}).then((respone) => {
                console.log(respone)
            })
            //대충 액시오스로 서버로 따봉 딜리트 요청 보낸다는것
        }
        else{
            postDataDetail[0].likeCheck = true
            postDataDetail[0].likeCount++
            await axios.post(`${process.env.REACT_APP_API_URL}/likes`,{
                postId : postDataDetail[0].id,
                email : loginUserInfo.email
            },{withCredentials: true}).then((respone) => {
                console.log(respone)
            })
            //대충 액시오스로 서버로 따봉 포스트 요청 보낸다는것
        }
        setPostDataDetail(postDataDetail)
        setLikeChangeData(!likeChangeData)
    }
   

    
    // console.log(giftComment)
    // console.log(giftCComment)
    console.log(postDataDetail)
    useEffect(() => {
        dataParsingHandle()
    },[])
    useEffect(() => {
        dataParsingHandle()
    },[giftComment])
    useEffect(() => {
        dataParsingHandle()
    },[giftCComment])

 
    return(
            <div>
                {postDataDetail && postDataDetail.map((el: { nickname: any,createAt: any ,content:any, tag:any, id:any, commentCount:any, likeCount:any, userId:any, comment:any}) => {
                return (
                <div>
                    <div>{el.nickname}</div>
                    <div>{el.createAt}
                    {/* {postDataDetail[0].userId}  유저 데이터 가져오면 삭제버튼 유무*/}
                    <span> 삭제 </span>
                    <span> 신고 </span>
                </div>
                <div>{el.content}</div>
                {el.tag.map((le: {tag: any}) => {
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
                        <div>
                            <span>
                                {el.nickname}
                            </span>
                            <span>
                                {el.createAt}
                            </span>
                            <span style = {pointerTrue}  onClick={() => commentCommentViewHandle(el.id)}>
                                댓글
                            </span>
                            <span>
                                삭제
                            </span>
                            <span>
                                신고
                            </span>
                        </div>
                        <div>
                            {el.content}
                        </div>
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
                                    <div>
                                        <span>
                                            {le.nickname}
                                        </span>
                                        <span>
                                            {le.createAt}
                                        </span>
                                        <span>
                                            삭제
                                        </span>
                                        <span>
                                            신고
                                        </span>
                                    </div>
                                    <div>
                                        {le.content}
                                    </div>
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
                commentView ? 
                <div>
                    <input type="text" value={commentText} onChange={commentTextChange} placeholder="게시물에 댓글을 달아보세요" />
                    <button onClick={giftCommentHandle}>확인</button>
                </div>
                :
                null
            }
            </div>
    )
}

export default Content