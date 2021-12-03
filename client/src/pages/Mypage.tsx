import React, { useState } from 'react'
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { UserInfoHandler } from '../redux/modules/UserInfo';
import { useHistory } from 'react-router';
import MypageModal from '../components/Mypage/MypageModal';
import { LoginHandler } from '../redux/modules/IsLogin';
import axios from 'axios';

//인터페이스 관련
export interface onOffState {
    onModal: boolean,
    onRequest: boolean,
    onChange: boolean
};
export interface userDataState {
    email: string, //로그인 단계에서 입력을 가져옴
    nickname: string, //받음
    password: string,
    passwordCheck: string
};
export interface IProps {
    offModal: any
}

function Mypage() {
    const history = useHistory()
    const dispatch = useDispatch()
    //리덕스 관련
    const userInfo = useSelector((state: RootStateOrAny) => state.UserInfoReducer);

    //스테이트 설정
    const [userData, setUserData] = useState<userDataState>({
        email: '',
        nickname: '',
        password: '',
        passwordCheck: ''
    })
    const [onOff, setOnOff] = useState<onOffState>({
        onModal: false,
        onRequest: false,
        onChange: false
    })
    const [errorMessage, setErrorMessage] = useState<string>('')

    //스테이트 핸들링
    const onOffHandler = (key: string) =>()=> {
        if (key === 'onRequest') {
            setOnOff({ ...onOff, [key]: !onOff.onRequest })
        } else if (key === 'onModal') {
            setOnOff({ ...onOff, [key]: !onOff.onModal })
        } else if (key === 'onChange') {
            setOnOff({ ...onOff, [key]: !onOff.onChange })
        };
        console.log(onOff)
    };
    const userDataHandler = (key:string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, [key]: e.target.value })
    };

    //스테이트 프롭스 전달 관련
    const offModal = () => { 
        setOnOff({ ...onOff, onModal: false })
    }
    const closeModal = function () { 
        offModal()
    }

    //동작
    //비밀번호 체크
    const changeCheck = function(password: string, passwordCheck: string){
        if(password === passwordCheck){
            return true
        }else if(password !== passwordCheck){
            return false
        }
    }

    const changeComplete = ()=> async (password: string, passwordCheck: string) => {
        const checkeResult = changeCheck(password, passwordCheck);
        if(checkeResult !== true){
            setErrorMessage('수정된 비밀번호와 비밀번호 확인이 같아야 합니다')
                    return;
        }else if(checkeResult === true){
            try {
                const body = {nickname:userData.nickname,password:userData.password}
                const passwordCheckResp = await axios.post(`${process.env.REACT_APP_API_URL}/passwordcheck`, {password:userData.password}, { withCredentials: true })
                const userDataChange = await axios.patch(`${process.env.REACT_APP_API_URL}`, body, { withCredentials: true })
                const getUserData = await axios.get(`${process.env.REACT_APP_API_URL}`, { withCredentials: true })
                onOffHandler('onChange')
            } catch (error) {
                console.log(error)
            }
        }
    }

    const logoutHandler = async function () {
        try {
            const logoutResult = await axios.post(`${process.env.REACT_APP_API_URL}/logout`, { withCredentials: true })
            // const logoutResult = await axios.post('http://localhost:4000/oauth/logout', { accept: "application/json", withCredentials: true })
            // console.log('logoutResult:', logoutResult)
            dispatch(LoginHandler(false))
            history.push('/');
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {onOff.onModal ? <MypageModal closeModal={closeModal} /> : null}
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
            {onOff.onChange ?
                <div className='mypage_userinfo_box_true'>
                    <div>닉네임 변경</div>
                    <input type="text" value={userData.nickname} onChange={userDataHandler('nickname')}/>
                    <div>비밀번호 수정</div>
                    <input type="text" value={userData.password} onChange={userDataHandler('password')}/>
                    {errorMessage}
                    <div>비밀번호 수정 확인</div>
                    <input type="text" value={userData.passwordCheck} onChange={userDataHandler('passwordCheck')}/>
                    {errorMessage}
                    <div className='mypage_button_box_true'>
                        <button onClick={changeComplete}>수정확인</button>
                        <button>취소</button>
                    </div>
                </div> :
                <div className='mypage_userinfo_box_false'>
                    <div>이메일</div>
                    <input type="text" value={userData.email} disabled />
                    <div>닉네임</div>
                    <input type="text" value={userData.nickname} disabled />
                    <div className='mypage_button_box_false'>
                        <button onClick={logoutHandler}>로그아웃</button>
                        <button onClick={onOffHandler('onModal')}>회원탈퇴</button>
                    </div>
                </div>}
        </div>
    )
}

export default Mypage