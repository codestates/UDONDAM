import React, { useEffect, useRef, useState } from 'react'
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { UserInfoHandler, InitUserInfo } from '../redux/modules/UserInfo';
import { useHistory } from 'react-router';
import MypageModal from '../components/Mypage/MypageModal';
import { IsLoginHandler } from '../redux/modules/IsLogin';
import styled from 'styled-components';
import axios from 'axios';
import './styles/MypageStyle.css'
import { SmallGrayButton } from '../components/utils/Buttons';

//로그인하시고 이용해주세요

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

function Mypage(props:any) {
    const data = props
    console.log(data)
    const history = useHistory()
    const dispatch = useDispatch()
    if(useSelector((state: RootStateOrAny) => state.IsGuestReducer.isGuest === true)){
        // 모달창으로 로그인하라 안내
        console.log('로그인하시고 이용해주세요')
        history.push('/Search')
    }
    console.log(useSelector((state: RootStateOrAny) => state))
    
    // if(useSelector((state: RootStateOrAny) => state.IsLoginReducer.isLogin === false)){
    //     // 모달창으로 로그인하라 안내
    //     console.log('로그인하시고 이용해주세요')
    //     history.push('/Search')
    // }
    
    //리덕스 관련
    const userInfo = useSelector((state: RootStateOrAny) => state.UserInfoReducer);
    console.log(userInfo)
    //스테이트 설정
    // const info = useRef<userDataState>({
    //     email: userInfo.email,
    //     nickname: userInfo.nickname,
    //     password: '',
    //     passwordCheck: ''
    // })
    const [userData, setUserData] = useState<userDataState>({
        email: userInfo.email|| '',
        nickname: userInfo.nickname || '',
        password: '',
        passwordCheck: ''
    })

    const [userDataSave, setUserDataSave] = useState({
        email: userInfo.email || '',
        nickname: userInfo.nickname || ''
    })
    const [onOff, setOnOff] = useState<onOffState>({
        onModal: false,
        onRequest: false,
        onChange: false
    })
    const [errorMessage, setErrorMessage] = useState<string>('')

    //스테이트 핸들링
    const onOffHandler = (key: string) => () => {
        console.log('핸들러 작동')
        if (key === 'onRequest') {
            setOnOff({ ...onOff, [key]: !onOff.onRequest })
        } else if (key === 'onModal') {
            setOnOff({ ...onOff, [key]: !onOff.onModal })
        } else if (key === 'onChange') {
            setOnOff({ ...onOff, [key]: !onOff.onChange })
        };
        console.log(onOff)
    };
    const userDataHandler = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [key]: e.target.value })
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
    const changeCheck = function (password: string, passwordCheck: string) {
        if (password === passwordCheck) {
            return true
        } else if (password !== passwordCheck) {
            return false
        }
    }

    const changeComplete = async () => {

        console.log('작동')
        const checkeResult = changeCheck(userData.password, userData.passwordCheck);
        if (checkeResult !== true) {
            setErrorMessage('수정된 비밀번호와 비밀번호 확인이 같아야 합니다')
            return;
        } else if (checkeResult === true) {
            //비밀번호 수정인지 아닌지 구분
            //aaa@naver.com의 닉네임 수정을 하면 aaa의 닉네임이 바뀜
            try {
                const body = { nickname: userData.nickname, password: userData.password }
                //const passwordCheckResp = await axios.post(`${process.env.REACT_APP_API_URL}/passwordcheck`, {password:userData.password}, { withCredentials: true })
                const userDataChange = await axios.patch(`${process.env.REACT_APP_API_URL}/user`, body, { withCredentials: true })
                const getUserData = await axios.get(`${process.env.REACT_APP_API_URL}/user`, { withCredentials: true })
                console.log(userDataChange)
                console.log(getUserData)
                dispatch(UserInfoHandler({
                    email: userInfo.email,
                    userId: userInfo.userId,
                    //닉네임만 바꿈. 리덕스는 읽기 체계라 다 바꿔야함
                    nickname: getUserData.data.nickname,
                    area: userInfo.area,
                    area2: userInfo.area2,
                    manager: userInfo.manager,
                    socialType: userInfo.socialType
                }))
                setUserData({
                    email: userInfo.email,
                    nickname: getUserData.data.nickname,
                    password: '',
                    passwordCheck: ''
                });
                setOnOff({ ...onOff, ['onChange']: !onOff.onChange })

            } catch (error: any) {

                console.log(error.response)
            }
        }
    }

    const logoutHandler = async function () {
        try {
            const logoutResult = await axios.get(`${process.env.REACT_APP_API_URL}/logout`, { withCredentials: true })

            console.log('logoutResult:', logoutResult)

            dispatch(UserInfoHandler({
                userId: 0,
                email: '',
                nickname: '',
                area: '',
                area2: '',
                manager: false,
                socialType: ''
            }))
            dispatch(IsLoginHandler(false))

            history.push('/');
        } catch (err) {
            console.log(err)
        }
    }

    const cancleHandler = function () {
        setUserData({
            email: userDataSave.email,
            nickname: userDataSave.nickname,
            password: '',
            passwordCheck: ''
        });

        setOnOff({ ...onOff, ['onChange']: !onOff.onChange })
    }

   
    const MypageContainer = styled.div`
    display:flex;
    flex-direction: row;
    `;
    const MypageContainer2 = styled.div`
    `;

    console.log(onOff)

    console.log(useSelector((state: RootStateOrAny) => state.UserInfoReducer))
    console.log(userData)
    const refresh = function(){
        if(userData.email === ''){
            
            console.log('바뀜')
            setUserData({
            email: userInfo.email,
            nickname: userInfo.nickname,
            password: '',
            passwordCheck: ''
            })
        }
    }
    useEffect(()=>{
        refresh()
    },[userData])
//유즈이펙트
    return (
        <div className='container'>
            <div id='mypage_container'>
                
                    {onOff.onModal ? <MypageModal closeModal={closeModal} /> : null}
                    <div className='mypage_request_box'>
                        <div className='mypage_request_box_container'>
                        <div className='mypage_request_button'>
                        <SmallGrayButton onClick={onOffHandler('onRequest')}>문의하기</SmallGrayButton>
                        </div>
                        {onOff.onRequest ?
                            <div className='mypage_request_button_box'>
                                <button className='mypage_request_button_detail gray_button'>태그추가 요청</button>
                                <button className='mypage_request_button_detail gray_button'>신고처리현황</button>
                            </div> : <div className='mypage_request_button_box'>
                                <button className='mypage_request_button_detail gray_button hide'>태그추가 요청</button>
                                <button className='mypage_request_button_detail gray_button hide'>신고처리현황</button>
                            </div> }
                            </div>
                    </div>
                    <div className='change_button_box'>
                    {!onOff.onChange ? <button className='gray_button' onClick={onOffHandler('onChange')}>회원정보수정</button> : null}
                    </div>
                    {onOff.onChange ?
                        <div className='mypage_userinfo_box mypage_userinfo_box_true'>

                            <div className='mypage_input_box'>
                            <div>닉네임 변경</div>
                            <input type="text" value={userData.nickname} onChange={userDataHandler('nickname')} />
                            </div>
                            <div className='mypage_input_box'>
                            <div>비밀번호 수정</div>
                            <input type="text" value={userData.password} onChange={userDataHandler('password')} />
                            {errorMessage}
                            </div>
                            <div className='mypage_input_box'>
                            <div>비밀번호 수정 확인</div>
                            <input type="text" value={userData.passwordCheck} onChange={userDataHandler('passwordCheck')} />
                            {errorMessage}
                            </div>
                            <div className='mypage_button_box mypage_button_box_true'>
                                <button className='gray_button' onClick={changeComplete}>수정확인</button>
                                <button className='gray_button' onClick={cancleHandler}>취소</button>
                            </div>
                        </div> :
                        <div className='mypage_userinfo_box mypage_userinfo_box_false'>
                            <div className='mypage_userinfo_input'>
                            <div className='mypage_input_box'>
                                <div>이메일</div>
                                <input type="text" value={userData.email} disabled />
                            </div>
                            <div className='mypage_input_box'>
                                <div>닉네임</div>
                                <input type="text" value={userData.nickname} disabled />
                            </div>
                            </div>
                            <div className='mypage_button_box mypage_button_box_false'>
                                <button className='gray_button' onClick={logoutHandler}>로그아웃</button>
                                <button className='gray_button' onClick={onOffHandler('onModal')}>회원탈퇴</button>
                            </div>
                        </div>}
                

        
            </div>
        </div>
    )
}


export default Mypage