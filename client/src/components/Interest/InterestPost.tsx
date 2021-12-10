import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';
import Content from '../../pages/Content';
import styled from 'styled-components';
import './style.css'
//날짜별로 나눠야함

export default function InterestPost({ post }: any) {
    //api 넣어야 함
    const history = useHistory()
    const isMobile = useSelector((state: RootStateOrAny) => state.IsMobileReducer.isMobile)
    const clickHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
        const postId = e.currentTarget.id;
        console.log(postId)
        try {
            const mypost = await axios.get(`${process.env.REACT_APP_API_URL}/post/${postId}`, { withCredentials: true })
            console.log(mypost.data)
            console.log(isMobile)
            if (isMobile) {
                //모바일인 경우
                if(mypost.status === 200){
                history.push({
                    pathname: '/Content',
                    state:{ida: postId}
                })
                }
                console.log('모바일작동')
            }

            return;
        } catch (error: any) {
            if (error.response.status === 500) {
                return console.log('서버이상')
            }
            console.log(error.response)
        }

        //이거 컨텐트로 보내야 됨

    }

    const onOffHandler = (key: string) => (e: React.MouseEvent<HTMLDivElement>) => {
        const list = document.getElementsByClassName(`container_value_${key}`)

        for (let i = 0; i <= list.length - 1; i++) {
            list[i].classList.toggle('hide')
        }
    }




    const YearMonth = styled.div`
        background-color: #33272232;
        padding:2px;
    `;
    return (
        <div className='interest_post_detail_container'>
            {post.map((el: any) => {
                for (let key in el[0]) {
                    return (//년-월별 컨테이너
                        <div className={`container_${key}`} key={key}>
                            <div className ='interest_post_detail_container'>
                            <YearMonth className='interest_post_box' onClick={onOffHandler(`${key}`)} >{key}</YearMonth>
                            </div>
                            <div>{el[0][key].map((value: any) => {
                                return (//내용물
                                    <div>
                                        <div className={`container_value_${key} hide`} key={value.id} id={value.id} onClick={clickHandler}>
                                            <div >{value.createAt}</div>
                                            <div >{value.content}</div>
                                        </div><br />
                                    </div>
                                )
                            })}</div><br />
                        </div>
                    )
                }
            })}
        </div>



    )
}

