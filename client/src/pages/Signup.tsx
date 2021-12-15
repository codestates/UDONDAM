import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { emailCheckHandler, passwordCheckHandler, passwordSameCheckHandler, numberCheckHandler } from '../redux/modules/Validation'
import EmailTimer from '../components/Signup/EmailTimer'
import './styles/SignUpStyle.css'
import { setInterval } from 'timers'
import { JsxElement } from 'typescript'

//import EmailCheck from '../components/Signup/EmailCheck' //이메일 인증 분리

//이메일 중복확인
//메일인증 전송 
//숫자 맞으면 허가
//다 되면 통과

export interface signupInfoState {
    email: string,
    password: string,
    passwordCheck: string,
    mailNumber: string
};

export interface checkState {
    passEmail: boolean,
    passPassword: boolean,
    passNumber: boolean,
    passText: boolean
};



function Signup() {
    //Validation 테스트 아니면 기본 false로 바꾸기
    const dispatch = useDispatch()
    const history = useHistory()
    if (useSelector((state: RootStateOrAny) => state.IsLoginReducer.isLogin) === true) {
        history.push('/Search')
    }
    const Validation = useSelector((state: RootStateOrAny) => state.ValidationReducer);
    const [signupInfo, setSignupInfo] = useState<signupInfoState>({
        email: '',
        password: '',
        passwordCheck: '',
        mailNumber: ''
    });
    const [passEmail, setPassEmail] = useState(false);
    const [number, setNumber] = useState('');
    const [timerOnOff, setTimerOnOff] = useState<JSX.Element>(
        <>인증요청</>
    )
    

    //다 통과되야 회원가입가능(유효성검사와 체크여부)
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');
    const [numberErrorMessage, setNumberErrorMessage] = useState<string>('');

    const inputHandler = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignupInfo({ ...signupInfo, [key]: e.target.value })

        const { value } = e.target;
        // 이메일 검사
        if (key === 'email' && value !== '') {
            if (value.includes('@') && value.includes('.') && value[value.length - 1] !== '.') {
                setEmailErrorMessage('');
                dispatch(emailCheckHandler(true))
            } else {
                setEmailErrorMessage('이메일 형식이 잘못되었습니다.');
                dispatch(emailCheckHandler(false))
            }
        };

        //비밀번호 검사
        if (key === 'password' && value !== '') {
            const chkNum = value.search(/[0-9]/g);
            const chkEng = value.search(/[a-zA-Z]/ig);
            const spe = value.search(/[!@#$%^*+=-]/gi);

            if (!/^[a-zA-Z0-9!@#$%^*+=-]{8,16}$/.test(value) || chkNum < 0 || chkEng < 0 || spe < 0) {
                if (/(\w)\1\1\1/.test(value)) {
                    if (value !== signupInfo.passwordCheck && signupInfo.passwordCheck !== '') {
                        setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
                    }
                    else {
                        setPasswordCheckErrorMessage('');
                    }
                    setPasswordErrorMessage("같은 문자를 4번 이상 사용하실 수 없습니다.");
                    dispatch(passwordCheckHandler(false));
                }
                else {
                    if (value !== signupInfo.passwordCheck && signupInfo.passwordCheck !== '') {
                        setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
                    }
                    else {
                        setPasswordCheckErrorMessage('');
                    }
                    setPasswordErrorMessage("8~16자 숫자, 영/특수문자를 사용하세요.");
                    dispatch(passwordCheckHandler(false));
                }
            }
            else {
                if (/(\w)\1\1\1/.test(value)) {
                    if (value !== signupInfo.passwordCheck && signupInfo.passwordCheck !== '') {
                        setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
                    }
                    else {
                        setPasswordCheckErrorMessage('');
                    }
                    setPasswordErrorMessage("같은 문자를 4번 이상 사용하실 수 없습니다.");
                    dispatch(passwordCheckHandler(false));
                }
                else {
                    if (value !== signupInfo.passwordCheck && signupInfo.passwordCheck !== '') {
                        setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
                    }
                    else {
                        setPasswordCheckErrorMessage('');
                    }
                    setPasswordErrorMessage('');
                    dispatch(passwordCheckHandler(true));
                }
            }
        };

        // 비밀번호 확인 검사
        if (key === 'passwordCheck' && value !== '') {
            if (value !== signupInfo.password) {
                setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
                dispatch(passwordSameCheckHandler(false));
            }
            else {
                setPasswordCheckErrorMessage('');
                dispatch(passwordSameCheckHandler(true));
            }
        };
    };
    const submitHandler = async () => {
        if (Validation.validEmail === false || Validation.validNumber === false || Validation.validPassword === false || Validation.validPasswordCheck === false || passEmail === false) {
            console.log('다안됐음')
            return;
        } else {
            const body = { email: signupInfo.email, password: signupInfo.password }
            try {
                const SignupInfoPost = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, body, { withCredentials: true })
                console.log(SignupInfoPost)
                history.push('/')
                console.log('됐음')
            } catch (error) {
                console.log(error)
            }
        }

    };

    const emailSameCheck = async function () {
        if (Validation.validEmail === false) {
            console.log('이메일 형식이 잘못되었습니다.')
            setEmailErrorMessage('이메일 형식이 잘못되었습니다.');
        } else {
            try {
                const emailSameCheck = await axios.post(`${process.env.REACT_APP_API_URL}/emailCheck`, { email: signupInfo.email }, { withCredentials: true })
                setPassEmail(true);
                setEmailErrorMessage('사용 할 수 있는 이메일입니다')
                console.log('체크완료')
            } catch (error: any) {
                if (error.response.data.message === 'Email already exists') {
                    setPassEmail(false);
                    setEmailErrorMessage('이미 있는 이메일입니다')
                    console.log('이미 있는 이메일입니다')
                }
            }
        }
    };

    

    const emailNumberCheck = (key: string) => async () => {


        if (key === 'post') {
            if(Validation.validEmail === false){
                setNumberErrorMessage('이메일을 확인해주세요')
            } else{
                const emailNumberCheck = await axios.post(`${process.env.REACT_APP_API_URL}/email`, { email: signupInfo.email }, { withCredentials: true })
                const emailNumber = emailNumberCheck.data.verificationCode //여기에 숫자저장
                setNumber(emailNumber);
                setTimerOnOff(<EmailTimer />)
            }
            
        } else if (key === 'check') {
            if (signupInfo.mailNumber !== number) {
                console.log('인증번호가 다릅니다')
                setNumberErrorMessage('인증번호가 다릅니다')
            } else if (signupInfo.mailNumber === number && signupInfo.mailNumber !== '' && number !== '') {
                setPassEmail(true)
                dispatch(numberCheckHandler(true))
                setNumberErrorMessage('인증성공')
            } else {
                setNumberErrorMessage('올바른 번호를 입력해주세요')
                console.log('기타오류')
            }
        }
    };



    return (
        <div className='container'>
            <div className='signup_container grid_container'>
                <div className='signup_title'>
                    회원가입
                </div>
                {/* <div className='signup_input_box'> */}
                <div className='grid_email_input'>
                    <div className='emailAndCheck_box'>
                        <input className='email_input' type="text" placeholder='이메일' onChange={inputHandler('email')} />
                        <button className='email_same_check gray_button' onClick={emailSameCheck}>중복확인</button>
                    </div>
                    <div className='error_box'>
                        {emailErrorMessage}
                    </div>
                </div>
                <div className='passwordAndCheck_box'>
                    <div className='password_error_box'>
                        <input type="password" placeholder='비밀번호' onChange={inputHandler('password')} />
                        <div className='error_box'>
                            {/* {passwordErrorMessage !== '' ? passwordErrorMessage : <br/>} */}
                            {passwordErrorMessage}
                        </div>
                    </div>
                    <div className='password_error_box'>
                        <input type="password" placeholder='비밀번호 확인' onChange={inputHandler('passwordCheck')} />
                        <div className='error_box'>
                            {passwordCheckErrorMessage}
                        </div>
                    </div>
                </div>
                <div className='email_check_container'>
                <div className='email_check_box'>
                    <div className='email_check_input_box'>
                        <input type="text" placeholder='인증번호 입력' onChange={inputHandler('mailNumber')} />
                        <div className='error_box'>
                            {numberErrorMessage}
                        </div>
                    </div>
                    <div className='signup_button_box'>
                        <button className='timer_button gray_button' onClick={emailNumberCheck('post')}>
                        {timerOnOff}
                            </button>{/*누르면 타이머로 바뀜 */}
                        <button className='gray_button' onClick={emailNumberCheck('check')}>확인</button>
                    </div>
                </div>
                </div>
                <div className='grid_submit'>
                    <button className='gray_button' onClick={submitHandler}>회원가입</button>
                </div>
            </div>
        </div>
    )
}

export default Signup