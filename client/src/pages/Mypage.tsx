import React from 'react'
import { useState } from 'react'
    //마이페이지

export interface onOffState {
    onModal:boolean,
    onRequest:boolean,
    onChange:boolean
};

function Mypage () {

    const [onOff, setOnOff] = useState<onOffState>({
        onModal:false,
        onRequest:false,
        onChange:false
    })


    return(
            <div>
                <div>logo</div>
                <div className='mypage_request_box'>
                    <button>문의하기</button>
                        <div className='mypage_button_box'>
                        <button>태그추가 요청</button>
                        <button>신고처리현황</button>
                    </div>
                </div>
                <button>회원정보수정</button>
                <div className='mypage_userinfo_box'>
                    <div>이메일</div>
                    <input type="text" />
                    <div>닉네임</div>
                    <input type="text" />
                </div>
                <div className='mypage_button_box'>
                    <button>로그아웃</button>
                    <button>회원탈퇴</button>
                </div>
            </div>
    )
}

export default Mypage