import React from 'react'
//첫화면
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/modules/reducer'
import { UserInfoHandler } from '../redux/modules/UserInfo'
import { useHistory } from 'react-router'
function Intro() {
    const history = useHistory()
    //리덕스 내용 보는법(밑은 리듀서 내용 보기
    //RootStateOrAny 루트의 스테이트 혹은 전부
    //RootState 루트의 스테이트만

    const introHandler = function () {
        history.push('/Login')
    }

    return (
        <div>
            <div>내 동네를 설정하고 이야기를 나눠보세요!</div>
            
            <button onClick={introHandler}>로그인/회원가입</button>

        </div>
    )
}

export default Intro