import React,{useEffect} from 'react'
//첫화면
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/modules/reducer'
import { UserInfoHandler } from '../redux/modules/UserInfo'
import { useHistory } from 'react-router'
import styled from 'styled-components'
function Intro() {
    const history = useHistory()
    //리덕스 내용 보는법(밑은 리듀서 내용 보기
    //RootStateOrAny 루트의 스테이트 혹은 전부
    //RootState 루트의 스테이트만

    const introHandler = function () {
        history.push('/Login')
    }

    const test = function(){
        //document.querySelector('.nav_link_box')?.classList.add('hide')
        console.log(document.baseURI)
        console.log(document.location.href)
    }
    useEffect(()=>{
      test()  
    },[])
    
    return (
        <div className='container'>
            <img className='logo_page' src="로고-우동담-Dark-모양만-배경o.png" alt="logo" />
            <div>내 동네를 설정하고 이야기를 나눠보세요!</div>
            <button onClick={introHandler}>로그인/회원가입</button>
        </div>
    )
}

export default Intro