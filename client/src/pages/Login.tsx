import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from 'axios';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { IsLoginHandler } from '../redux/modules/IsLogin';
import { UserInfoHandler } from '../redux/modules/UserInfo';
import { IsGuestHandler } from '../redux/modules/IsGuest';
import SearchPassword from '../components/Login/SearchPassword';
import GuestLoginModal from '../components/Login/GuestLoginModal';
import './styles/IntroStyle.css';

export interface loginInfoState {
    email: string,
    password: string
};

export interface IProps {
    modlaOnOff: any
}

export interface modalOnOffState {
    guestModal: boolean,
    seaerchPasswordModal: boolean
}


function Login() {
    const dispatch = useDispatch()
    const history = useHistory()
    dispatch(IsGuestHandler(false))
    if (useSelector((state: RootStateOrAny) => state.IsLoginReducer.isLogin) === true) {
        console.log('로그인 트루')
        if (document.querySelector('.logo_nav')?.classList.contains('hide') === true) {
            console.log('.맨처음 로그인 하이드 작동')
            document.querySelector('.logo_nav')?.classList.toggle('hide')
            document.querySelector('#nav_bar')?.classList.toggle('hide')

        }
        history.push('/Search')

    }
    const [loginInfo, setLoginInfo] = useState<loginInfoState>({
        email: '',
        password: ''
    })
    const [modalOnOff, setModalOnOff] = useState<modalOnOffState>({
        guestModal: false,
        seaerchPasswordModal: false
    })

    const [errorMessage, setErrorMessage] = useState<string>('')
    const inputHandler = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({ ...loginInfo, [key]: e.target.value })
    }

    const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (loginInfo.email === '' || loginInfo.password === '') {
            setErrorMessage('이메일 혹은 비밀번호를 확인해주세요')
        }
        e.preventDefault();
        const body = { email: loginInfo.email, password: loginInfo.password }

        try {
            const loginInfoPost = await axios.post(`${process.env.REACT_APP_API_URL}/login`, body, { withCredentials: true })
            const userInfo = loginInfoPost.data.data
            console.log(userInfo.userId)
            dispatch(UserInfoHandler({
                userId: userInfo.userId,
                email: loginInfo.email,
                nickname: userInfo.nickname,
                area: userInfo.area || null,
                area2: userInfo.area2 || null,
                manager: userInfo.manager,
                socialType: userInfo.socialType
            }))
            dispatch(IsLoginHandler(true))
            dispatch(IsGuestHandler(false))
            hideLogo()
            document.querySelector('#nav_bar_desktop')?.classList.remove('hide')
            history.push('/Search')

        } catch (error: any) {
            if (error.response.status === 401) {
                console.log('이메일이나 비밀번호가 맞지 않습니다')
            }
            console.log(error)
            return;
        }



    }

    const loginUserInfo = useSelector((state: RootStateOrAny) => state.UserInfoReducer);
    console.log(loginUserInfo)



    const guestModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setModalOnOff({ ...modalOnOff, ['guestModal']: !modalOnOff.guestModal })
    }

    const passwordSearchModalHandler = function () {
        setModalOnOff({ ...modalOnOff, ['seaerchPasswordModal']: !modalOnOff.seaerchPasswordModal })
    }

    const socialLoginHandler = (key: string) => async (e: React.MouseEvent<HTMLSpanElement/*이거 바뀜 */>) => {
        if (key === 'kakao') {
            console.log('kakao');
            window.location.href = `${process.env.REACT_APP_API_URL}/kakao`
        } else if(key === 'google'){
            console.log('kakao')
            window.location.href = `${process.env.REACT_APP_API_URL}/google`
        } else {
            console.log(key)
            const socialLoginResponse = await axios.get(`${process.env.REACT_APP_API_URL}/${key}`, { withCredentials: true })
            console.log(socialLoginResponse)
        }


    }


    //스테이트 프롭스 전달 관련
    const offSeaerchPasswordModal = () => {
        setModalOnOff({ ...modalOnOff, ['seaerchPasswordModal']: false })
    };
    const closeSeaerchPasswordModal = function () {
        offSeaerchPasswordModal()
    };
    const offGuestModalModal = () => {
        setModalOnOff({ ...modalOnOff, ['guestModal']: false })
    };
    const closeGuestModal = function () {
        offGuestModalModal()
    };

    const hideLogoFirsf = function () {
        if (document.querySelector('.logo_nav')?.classList.contains('hide') === false) {
            document.querySelector('.logo_nav')?.classList.toggle('hide')
            document.querySelector('#nav_bar')?.classList.toggle('hide')
            document.querySelector('#nav_bar_desktop')?.classList.add('hide')
        }
    }

    const hideLogo = function () {
        console.log('로그인 하이드 작동')
        if (document.querySelector('.logo_nav')?.classList.contains('hide') === true) {
            document.querySelector('.logo_nav')?.classList.toggle('hide')
            document.querySelector('#nav_bar')?.classList.toggle('hide')

        }

    }

    const inSignUp = function () {
        history.push('/Signup')
    }
    useEffect(() => {
        hideLogoFirsf()
    }, [])

    return (
        <div className='container'>
            {modalOnOff.seaerchPasswordModal ? <SearchPassword closeSeaerchPasswordModal={closeSeaerchPasswordModal} /> : null}
            {modalOnOff.guestModal ? <GuestLoginModal closeGuestModal={closeGuestModal} /> : null}
            <div className='login_container'>
                <div className='login_img_place'>
                    <div className='logo_page_div'>
                        <img className='logo_page' src="로고-우동담-Dark-배경x.png" alt="logo" />
                    </div>
                </div>
                <form className='submit_box'>
                    <div className='submit_box_input'>
                        <input type="text" onChange={inputHandler('email')} placeholder='이메일' />
                        <input type="password" onChange={inputHandler('password')} placeholder='비밀번호' />
                        {errorMessage !== '' ? 
                        <div>{errorMessage}</div> 
                        : <br />}
                    </div>
                    <div className='login_button_box'>
                        <button className='login_button' onClick={submitHandler}>로그인</button>
                        <button className='login_button' onClick={guestModalHandler}>게스트로그인</button>
                    </div>

                </form>
                <div className='userguide_box'>
                    <ul>
                        <li className='login_li' onClick={inSignUp}>회원가입</li>
                        <li className='login_li' onClick={passwordSearchModalHandler}>비밀번호를 잊으셨나요?</li>
                    </ul>
                </div>
                <div className='social'>
                    <div className='social_container'>
                        <div className='social_button_container social_google_container' onClick={socialLoginHandler('google')}>
                            <img className='social_button social_google' src='btn_google_signin_light_normal_web.png' alt='social' />
                        </div>
                        <div className='social_button_container social_naver_container' onClick={socialLoginHandler('naver')}>
                            <img className='social_button social_naver' src='btnW_완성형.png' alt='social' />
                        </div>
                        <div className='social_button_container social_kakao_container' onClick={socialLoginHandler('kakao')}>
                            <img className='social_button social_kakao' src='kakao_login_large_narrow.png' alt='social' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login