/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {useState, useRef} from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Link } from 'react-router-dom'
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { NONAME } from "dns";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import './TimeLinePost.css'

library.add(faCommentDots);
library.add(faArrowAltCircleDown);


// {
//     id: 1, //postId
//     nickname: "oh", //유저 닉네
//     content: "그.....", //게시글내
//     tag: ['서울' , '운동' , '식사', '독서'], //태그
//     commentCount: 20, //댓글 
//     likeCount: 10, //따봉 수
//     likeCheck: false,  //따봉 눌렀는지 체
//     createAt: '2020-10-10 09:10',  //생성날
//     public: true  // 1 대 1 채팅 활성화, 비활성화
//    }

function TimeLinePost({postData,userData,addSelectTagSearchHandle,createAtDesign,notGiftTag,giftTag}: any) {
    console.log(postData)
 
  
    
    return (
        <div className="contanier">
            

            {postData.map((el: { nickname: any,createAt: any ,content:any, tag:any, id:any, commentCount:any, likeCount:any, userId:any, likeCheck:any}) => {
        
                return (
                    //여기다 탈퇴한 회원정보 3항 연산자 쓰면 됨
                    <div className="content-box">
                        <div className="content-box-main">
                        <Link className="link-content-box" to={{
                            pathname: `./Content`,
                            state: {
                            ida: el.id,
                            tag: giftTag,
                            notTag: notGiftTag,
                            }
                            
                        }}>
                        <div>
                            {userData.userId === el.userId ? <div className="writer-true">{`${el.nickname} -글쓴이`}</div> : <div>{el.nickname}</div>}
                            <div>{createAtDesign(el.createAt)}
                            <span className="report">신고</span>
                        </div>
                        <div className="content">{el.content}</div>
                        {el.tag.map((le: {tag: any}) => {
                            return (<span>#{le} </span>)
                        })
                        }
                        <div className="Thumb-box">
                            <span className="thumb-contanier">
                                <FontAwesomeIcon icon={faCommentDots} data-fa-transform="flip-v"></FontAwesomeIcon>
                                {el.commentCount}
                            </span>
                            {el.likeCheck ? 
                            <span className="thumb-contanier likeTrue">
                                <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                                {el.likeCount}
                            </span>
                            :
                            <span className="thumb-contanier">
                                <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                                {el.likeCount}
                            </span>
                            }

                        </div>
                        </div>
                        </Link>
                        
                        </div>
                    </div>
                    
                )
                
            }
            
            )
            
            }
            <div className="add-box">
            {
                postData.map((el:any , idx:any) => {
                    return postData.length === idx+1 ? <button className="add-content-button" onClick={addSelectTagSearchHandle}>
                    <FontAwesomeIcon className="add-button-img" icon={faArrowAltCircleDown}></FontAwesomeIcon>
                    </button>
                    :
                    null
                })
            }
            </div>
            
        </div>
    )

}

export default TimeLinePost;