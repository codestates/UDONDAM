import React, { useEffect, useRef, useState } from 'react'
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { UserInfoHandler, InitUserInfo } from '../redux/modules/UserInfo';
import { useHistory } from 'react-router';
import MypageModal from '../components/Mypage/MypageModal';
import { IsLoginHandler } from '../redux/modules/IsLogin';
import styled from 'styled-components';
import axios from 'axios';
import LoadingIndicator from '../components/utils/LoadingIndicator';
import './styles/MypageStyle.css'
import { SmallGrayButton } from '../components/utils/Buttons';


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
    const history = useHistory()
    const dispatch = useDispatch()
    if(useSelector((state: RootStateOrAny) => state.IsGuestReducer.isGuest === true)){
       
        history.push('/Search')
    }
    
    //리덕스 관련
    const userInfo = useSelector((state: RootStateOrAny) => state.UserInfoReducer);

        //스테이트 설정
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
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //스테이트 핸들링
    const onOffHandler = (key: string) => () => {
        if (key === 'onRequest') {
            setOnOff({ ...onOff, [key]: !onOff.onRequest })
        } else if (key === 'onModal') {
            setOnOff({ ...onOff, [key]: !onOff.onModal })
        } else if (key === 'onChange') {
            if(userInfo.socialType !== 'basic'){
                return ;
            } else {
               setOnOff({ ...onOff, [key]: !onOff.onChange }) 
            }
        };
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
        const checkeResult = changeCheck(userData.password, userData.passwordCheck);
        if (checkeResult !== true) {
            setErrorMessage('수정된 비밀번호와 비밀번호 확인이 같아야 합니다')
            return;
        } else if (checkeResult === true) {
            //비밀번호 수정인지 아닌지 구분
            try {
                const body = { nickname: userData.nickname, password: userData.password }
                const userDataChange = await axios.patch(`${process.env.REACT_APP_API_URL}/user`, body, { withCredentials: true })
                const getUserData = await axios.get(`${process.env.REACT_APP_API_URL}/user`, { withCredentials: true })
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
                //세션 관련
                const changeJson:string = JSON.stringify({
                    userId: userInfo.userId,
                    email: userInfo.email,
                    nickname: getUserData.data.nickname,
                    area: userInfo.area,
                    area2: userInfo.area2,
                    manager: userInfo.manager,
                    socialType: userInfo.socialType
                })
                sessionStorage.setItem('user',changeJson)
                setUserData({
                    email: userInfo.email,
                    nickname: getUserData.data.nickname,
                    password: '',
                    passwordCheck: ''
                });
                setOnOff({ ...onOff, ['onChange']: !onOff.onChange })

            } catch (error: any) {
            }
        }
    }
    //구글 로그인 관련
    const getData = async () => {
        const tempData = await axios.get(`${process.env.REACT_APP_API_URL}/user`, { withCredentials: true })
        dispatch(UserInfoHandler({
            email: tempData.data.email,
            userId: tempData.data.userId,
            //닉네임만 바꿈. 리덕스는 읽기 체계라 다 바꿔야함
            nickname: tempData.data.nickname,
            area: tempData.data.area,
            area2: tempData.data.area2,
            manager: tempData.data.manager,
            socialType: tempData.data.socialType
        }))
        //세션 관련
        const changeJson:string = JSON.stringify({
            userId: tempData.data.userId,
            email: tempData.data.email,
            nickname: tempData.data.nickname,
            area: tempData.data.area,
            area2: tempData.data.area2,
            manager: tempData.data.manager,
            socialType: tempData.data.socialType
        })
        sessionStorage.setItem('user',changeJson)
        dispatch(IsLoginHandler(true))
        setUserData({
            email: tempData.data.email,
            nickname: tempData.data.nickname,
            password: '',
            passwordCheck: ''
        });
        const areadata:string = JSON.stringify([tempData.data.area,tempData.data.area2])
        sessionStorage.setItem('areaData',areadata)
        return tempData;
    }
    useEffect(()=>{
        getData()
    },[])
    

    const logoutHandler = async function () {
        try {
            setIsLoading(true)
            const logoutResult = await axios.get(`${process.env.REACT_APP_API_URL}/logout`, { withCredentials: true })
            setIsLoading(false)

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
            //세션삭제
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('areaData')
            history.push('/');
        } catch (err) {
            setIsLoading(false)
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

    
    
//유즈이펙트
    return (
        <div className='container'>
            {isLoading? <LoadingIndicator />: 
            <div id='mypage_container'>
                    {onOff.onModal ? <MypageModal closeModal={closeModal} /> : null}
                    <div className='mypage_request_box'>
                        <div className='mypage_request_box_container'>
                        <div className='mypage_request_button'>
                        <SmallGrayButton onClick={onOffHandler('onRequest')}>문의하기</SmallGrayButton>
                        </div>
                        {onOff.onRequest ?
                            <div className='mypage_request_button_box'>
                                <button className='mypage_request_button_detail gray_button'>준비중입니다</button>
                            </div> : <div className='mypage_request_button_box'>
                            <button className='mypage_request_button_detail gray_button hide'>준비중입니다</button>
                            </div> }
                            </div>
                    </div>
                    <div className='change_button_box'>
                    {!onOff.onChange ? <button className='gray_button' onClick={onOffHandler('onChange')}>회원정보수정</button> : null}
                    </div>
                    {onOff.onChange ?
                        <div className='mypage_userinfo_box mypage_userinfo_box_true'>
                            <div className='mypage_userinfo_input'>
                            <div className='mypage_input_box'>
                            <div style={{fontSize : '1.8rem'}}>닉네임 변경</div>
                            <input type="text" style={{width: '15rem'}} value={userData.nickname} onChange={userDataHandler('nickname')} />
                            </div>
                            <div className='mypage_input_box'>
                            <div style={{fontSize : '1.8rem'}}>비밀번호 수정</div>
                            <input type="text" style={{width: '15rem'}} value={userData.password} onChange={userDataHandler('password')} />
                            {errorMessage}
                            </div>
                            <div className='mypage_input_box'>
                            <div style={{fontSize : '1.8rem'}}>비밀번호 수정 확인</div>
                            <input type="text"  style={{width: '15rem'}} value={userData.passwordCheck} onChange={userDataHandler('passwordCheck')} />
                            {errorMessage}
                            </div>
                            </div>
                            <div className='mypage_button_box mypage_button_box_true'>
                                <button className='gray_button' onClick={changeComplete}>수정확인</button>
                                <button className='gray_button' onClick={cancleHandler}>취소</button>
                            </div>
                        </div> :
                        <div className='mypage_userinfo_box mypage_userinfo_box_false'>
                            <div className='mypage_userinfo_input'>
                            <div className='mypage_input_box'>
                                <div style={{fontSize : '1.8rem'}}>이메일</div>
                                <input type="text" style={{width: '15rem'}} value={userData.email} disabled />
                            </div>
                            <div className='mypage_input_box'>
                                <div style={{fontSize : '1.8rem'}}>닉네임</div>
                                <input type="text" style={{width: '15rem'}} value={userData.nickname} disabled />
                            </div>
                            </div>
                            <div className='mypage_button_box mypage_button_box_false'>
                                <button className='gray_button' onClick={logoutHandler}>로그아웃</button>
                                <button className='gray_button' onClick={onOffHandler('onModal')}>회원탈퇴</button>
                            </div>
                        </div>}
                

        
            </div>}
            
        </div>
    )
}


export default Mypage