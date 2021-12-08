import React from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { UserInfoHandler } from '../../redux/modules/UserInfo';
import { IsLoginHandler } from '../../redux/modules/IsLogin';
    //모든 리덕스 초기화. 로그아웃 or 회원탈퇴



export const StateInitialize = () => {

const test = useSelector((state: RootStateOrAny)=>state.IsLoginReducer)
    
    const Init = function(){
    console.log(test)
    }
    
    //dispatch(IsLoginHandler(false))
    //history.push('/');
    return ;
}

