import React from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from 'axios';
import Content from '../../pages/Content';
import './style.css'
//날짜별로 나눠야함

export default function InterestPost({ post }: any) {
    //api 넣어야 함
    const history = useHistory()
    const clickHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
        const postId = e.currentTarget.id;
        console.log(postId)
        try {
            const mypost = await axios.get(`${process.env.REACT_APP_API_URL}/post/${postId}`, { withCredentials: true })
            console.log(mypost.data)
            if(mypost.status === 200){
                history.push({
                    pathname: '/Content'
                })
            }
            // history.push({
            //     pathname: '/Content'
            // })
            return ;
        } catch (error:any) {
            if(error.response.status === 500){
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
    return (
        <div>
            {post.map((el: any) => {
                for (let key in el[0]) {
                    return (//년-월별 컨테이너
                        <div className={`container_${key}`} key={key}>
                            <div onClick={onOffHandler(`${key}`)} >{key}</div>
                            <div>{el[0][key].map((value: any) => {
                                return (//내용물
                                    <div className={`container_value_${key} hide`} key={value.id} id={value.id} onClick={clickHandler}>
                                        <span >{value.createAt}</span>
                                        <span >{value.content}</span>
                                    </div>
                                )
                            })}</div>< br />
                        </div>
                    )
                }
            })}
        </div>



    )
}

