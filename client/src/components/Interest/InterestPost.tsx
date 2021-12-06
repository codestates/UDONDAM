import React, {useState} from 'react'
import './style.css'
//날짜별로 나눠야함

export default function InterestPost({post}: any) {
    //api 넣어야 함
    const clickHandler = function(e:React.MouseEvent<HTMLDivElement>){
        const postId = e.currentTarget.id;
        console.log(postId)
    }
    
    const onOffHandler = (key:string)=>(e:React.MouseEvent<HTMLDivElement>)=>{
        const list = document.getElementsByClassName(`container_value_${key}`)

        for(let i = 0; i <= list.length-1; i++){
            list[i].classList.toggle('hide')
        }
    }
    return (
        <div>
            {post.map((el:any) => {
                for(let key in el[0]){
                    return(
                    <div className={`container_${key}`} key={key}>
                        <div onClick={onOffHandler(`${key}`)} >{key}</div>
                        <div>{el[0][key].map((value:any)=>{
                            return(
                                <div className={`container_value_${key} hide`} key={value.id} id={value.id} onClick={clickHandler}>
                                    <span >{value.createAt}</span>
                                    <span >{value.content}</span>
                                </div>
                            )
                        })}</div>< br/>
                    </div>
                    )
                }
            })}
        </div>



    )
}

