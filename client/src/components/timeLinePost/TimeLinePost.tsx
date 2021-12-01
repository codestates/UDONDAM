/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {useState, useRef} from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

library.add(faCommentDots);


const WhyUser = styled.div`
    color: #ff4006;
`;

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

function TimeLinePost({postData,userData}: any) {



    return (
        <div>
            {postData.map((el: { nickname: any,createAt: any ,content:any, tag:any, id:any, commentCount:any, likeCount:any, userId:any}) => {
                return (
                <div>
                    {userData.id === el.userId ? <WhyUser>{el.nickname}</WhyUser> : <div>{el.nickname}</div>}
                    <div>{el.createAt}
                    <span>신고</span>
                </div>
                <div>{el.content}</div>
                {el.tag.map((le: {tag: any}) => {
                    return (<span>#{le} </span>)
                })
                }
                <div>
                    <span>
                        <FontAwesomeIcon icon={faCommentDots} data-fa-transform="flip-v"></FontAwesomeIcon>
                        {el.commentCount}
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                        {el.likeCount}
                    </span>

                </div>
                </div>)
            }) }
        </div>
    )

}

export default TimeLinePost;