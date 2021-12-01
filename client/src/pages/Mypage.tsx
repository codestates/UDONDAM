import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootStateOrAny } from 'react-redux';
import { UserInfoHandler } from '../redux/modules/UserInfo';
    //마이페이지

export interface onOffState {
    onModal:boolean,
    onRequest:boolean,
    onChange:boolean
};

export interface userDataState {
    email: string, //로그인 단계에서 입력을 가져옴
    nickname: string, //받음
    password: string,
    passwordCheck: string
};

function Mypage () {
    const userInfo = useSelector((state: RootStateOrAny) => state.UserInfoReducer);
    console.log(userInfo)
    const [userData, setUserData] = useState()
    const [onOff, setOnOff] = useState<onOffState>({
        onModal:false,
        onRequest:false,
        onChange:false
    })
    console.log(onOff)
    const onOffHandler = (key:string)=>(e:React.MouseEvent<HTMLButtonElement>) => {
        if(key === 'onRequest'){
            setOnOff({...onOff, [key]:!onOff.onRequest})
        } else if(key === 'onModal'){
            setOnOff({...onOff, [key]:!onOff.onModal})
        }else if(key === 'onChange'){
            setOnOff({...onOff, [key]:!onOff.onChange})
        };
        console.log(onOff)
    }



    return(
            <div>
                <div>logo</div>
                <div className='mypage_request_box'>
                    <button onClick={onOffHandler('onRequest')}>문의하기</button>
                    {onOff.onRequest ? 
                    <div className='mypage_button_box'>
                    <button>태그추가 요청</button>
                    <button>신고처리현황</button>
                    </div> : null}
                </div>
                <button onClick={onOffHandler('onChange')}>회원정보수정</button>
                <div className='mypage_userinfo_box'>
                    <div>이메일</div>
                    <input type="text" />
                    <div>닉네임</div>
                    <input type="text" />
                </div>
                <div className='mypage_button_box'>
                    <button>로그아웃</button>
                    <button onClick={onOffHandler('onModal')}>회원탈퇴</button>
                </div>
            </div>
    )
}

export default Mypage