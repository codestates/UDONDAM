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

library.add(faCommentDots);

    //게시글
function Content({ history }: RouteComponentProps) {
    const {id}:any = history.location.state
    console.log(id)
    const [commentView, setCommentView] = useState<any>(false);
    const [commentText, setCommentText] = useState<any>('');
    const [giftComment, setGiftComment] = useState<any>([]);
    const [cCommentView, setCCommentView] = useState<any>(0);
    const [cCommentText, setCCommentText] = useState<any>('');
    const [giftCComment, setGiftCComment] = useState<any>([]);
    
    const [postDataDetail, setPostDataDetail] = useState<any>([
        {
        id: 1, //postId
        userId: 5, //유저아이디
        nickname: "oh", //유저 닉네임
        content: "그.....", //게시글내용
        tag: ['서울' , '운동' , '식사', '독서'], //태그
        commentCount: 20, //댓글 
        likeCount: 10, //따봉 수
        likeCheck: false,  //따봉 눌렀는지 체크
        createAt: '2020-10-10 09:10',  //생성날짜
        public: true, //채팅창 활성화 비활성화
        comment: [
                    {id:1,
                    content: "나는", 
                    createAt:'2020-10-10 10:20',
                    nickname:"익명",
                    comment:[
                            {
                                id:1,
                                content: "나는2", 
                                createAt:'2020-10-10 10:20',
                                nickname:"익명",
                                comment:[]//대댓글이 없으면 빈배
                            }  //대댓글이 없으면 빈배열
                            ,
                            {
                                id:1,
                                content: "나는나는3", 
                                createAt:'2020-10-10 10:20',
                                nickname:"익명2",
                                comment:[]//대댓글이 없으면 빈배
                            }  //대댓글이 없으면 빈배열
                    
                    ]  
                }
                ,{id:2,
                    content: "우리는", 
                    createAt:'2021-12-11 10:25',
                    nickname:"익명",
                    comment:[]  
                }
                
            ]
        }
    ])
    const commentTextChange = (event:any) => {
        setCommentText(event.target.value)
    }
    const cCommentTextChange = (event:any) => {
        setCCommentText(event.target.value)
    }
    const commentCommentViewHandle = (data:any) => {
        setCCommentView(data)
    }

    const commentViewHandle = () => {

        setCommentView(!commentView)

    }
    const giftCCommentHandle = () => {
        setGiftCComment([
            {
                postId : postDataDetail[0].id,
                content : cCommentText,
                commnetId : cCommentView
            }
        ])
        setCCommentView(null)
        setCCommentText('')
    }

    const giftCommentHandle = () => {
        setGiftComment([
            {
                postId : postDataDetail[0].id,
                content : commentText
            }
        ])

        setCommentText('')
    }
    console.log(giftComment)
    console.log(giftCComment)

    return(
            <div>
                {postDataDetail.map((el: { nickname: any,createAt: any ,content:any, tag:any, id:any, commentCount:any, likeCount:any, userId:any, comment:any}) => {
                return (
                <div>
                    <div>{el.nickname}</div>
                    <div>{el.createAt}
                    <span> 삭제 </span>
                    <span> 신고 </span>
                </div>
                <div>{el.content}</div>
                {el.tag.map((le: {tag: any}) => {
                    return (<span>#{le} </span>)
                })
                }
                <div>
                    <span onClick={commentViewHandle}>
                        <FontAwesomeIcon icon={faCommentDots} data-fa-transform="flip-v"></FontAwesomeIcon>
                        {el.commentCount}
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                        {el.likeCount}
                    </span>
                </div>
                </div>
               
                )
            }) }

            {commentView ? postDataDetail[0].comment.map((el:any) => {
                return (
                <div>
                    <div>
                        <div>
                            <span>
                                {el.nickname}
                            </span>
                            <span>
                                {el.createAt}
                            </span>
                            <span onClick={() => commentCommentViewHandle(el.id)}>
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
                    el.comment.map((le:any) => {
                        return (
                            <div>
                                <FontAwesomeIcon icon={faGreaterThan} data-fa-transform="flip-v"></FontAwesomeIcon>
                                    <span>
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
                                    </span>
                                    <div>
                                        {le.content}
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