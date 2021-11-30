import React from 'react'
    //첫화면
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/modules/reducer'
import { UserInfoHandler } from '../redux/modules/UserInfo'
const Intro: React.FC = () => {
    //리덕스 내용 보는법(밑은 리듀서 내용 보기
    //RootStateOrAny 루트의 스테이트 혹은 전부
    //RootState 루트의 스테이트만
    const userState = useSelector((state: RootStateOrAny)=>state.UserInfoReducer);
    console.log(userState)
   

    const dispatch = useDispatch();
    //리덕스 내용 넣는 법
    const testHandler = function(){
        dispatch(UserInfoHandler({nickname: '1', area: '2', area2: '3', manager: true, socialType: '5'}))
    } 

    return(<div>
            <div>Intro</div>
            <button onClick={testHandler}>click</button>
            </div>
    )
}

export default Intro