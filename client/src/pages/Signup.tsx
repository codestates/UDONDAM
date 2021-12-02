import React, { useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { emailCheckHandler, passwordCheckHandler, passwordSameCheckHandler, numberCheckHandler } from '../redux/modules/Validation'


//import EmailCheck from '../components/Signup/EmailCheck' //이메일 인증 분리
//회원가입

export interface signupInfoState {
    email: string,
    password: string,
    passwordCheck: string,
    mailNumber: any
};

export interface checkState {
    passEmail: boolean,
    passPassword: boolean,
    passNumber: boolean,
    passText: boolean
};



function Signup() {
    const Validation = useSelector((state: RootStateOrAny) => state.ValidationReducer);
    console.log(Validation)
    const dispatch = useDispatch()
    const history = useHistory()
    const [signupInfo, setSignupInfo] = useState<signupInfoState>({
        email: '',
        password: '',
        passwordCheck: '',
        mailNumber: null
    });
    const [passCheck, setPassCheck] = useState<checkState>({
        passEmail: false,
        passPassword: false,
        passNumber: false,
        passText: false
    }); //다 통과되야 회원가입가능(유효성검사와 체크여부)
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
        if (Validation.validEmail === false || Validation.validNumber === false || Validation.validPassword === false || Validation.validPasswordCheck !== false) {
            console.log('다안됐음')
            return;
        } else {
            const body = { email: signupInfo.email, password: signupInfo.password }
            try {
                const SignupInfoPost = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, body, { withCredentials: true })
                //history.push('/')
            } catch (error) {
                console.log(error)
            }
        }

    }

    console.log(Validation)
    console.log(emailErrorMessage, passwordErrorMessage, passwordCheckErrorMessage, numberErrorMessage)

    return (
        <div>
            <div className='signup_title'>회원가입</div>
            <div className='signup_input_box'>
                <input type="text" placeholder='이메일' onChange={inputHandler('email')} /><br />{emailErrorMessage}<br />
                <input type="password" placeholder='비밀번호' onChange={inputHandler('password')} /><br />{passwordErrorMessage}<br />
                <input type="password" placeholder='비밀번호 확인' onChange={inputHandler('passwordCheck')} /><br />{passwordCheckErrorMessage}<br />
            </div>
            <div className='email_check_box'>
                <input type="text" placeholder='인증번호 입력' onChange={inputHandler('mailNumber')} />
                <br />{numberErrorMessage}<br />
                <button>전송 요청</button>{/*누르면 타이머로 바뀜 */}
                <button>확인</button>
            </div>
            <br />
            <div className='signup_text'></div>
            <button onClick={submitHandler}>회원가입</button>
        </div>
    )
}

export default Signup