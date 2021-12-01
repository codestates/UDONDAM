import React from 'react'
import { useHistory } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
//import EmailCheck from '../components/Signup/EmailCheck' //이메일 인증 분리
    //회원가입

export interface signupInfoState {
    email: string,
    password: string,
    passwordCheck: string,
    mailNumber: any
};

export interface checkState {
    passEmail:boolean,
    passPassword:boolean,
    passNumber:boolean,
    passText:boolean
};



function Signup() {

    const dispatch = useDispatch()
    const history = useHistory()
    const [signupInfo, setSignupInfo] = useState<signupInfoState>({
        email: '',
        password:'',
        passwordCheck:'',
        mailNumber: null
    }); 
    const [passCheck, setPassCheck] = useState<checkState>({
        passEmail:false,
        passPassword:false,
        passNumber:false,
        passText:false
    }); //다 통과되야 회원가입가능(유효성검사와 체크여부)
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>(''); 
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>(''); 
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>(''); 
    const [numberErrorMessage, setNumberErrorMessage] = useState<string>(''); 
    const inputHandler = (key:string)=>(e:React.ChangeEvent<HTMLInputElement>) => {
        setSignupInfo({...signupInfo, [key]:e.target.value})
    }
    const passHandler = ()=>{
        
    }


    return(
            <div>
                <div className='signup_title'>회원가입</div>
                <div className='signup_input_box'>
                    <input type="text" placeholder='이메일' onChange={inputHandler('email')}/>{emailErrorMessage}
                    <input type="password" placeholder='비밀번호' onChange={inputHandler('password')}/>{passwordErrorMessage}
                    <input type="password" placeholder='비밀번호 확인' onChange={inputHandler('passwordCheck')}/>{passwordCheckErrorMessage}
                </div>
                <div className='email_check_box'>
                    <input type="number" placeholder='인증번호 입력' />
                    {numberErrorMessage}
                    <button>전송 요청</button>{/*누르면 타이머로 바뀜 */}
                    <button>확인</button>
                </div>
                <div className='signup_text'></div>
                <button>회원가입</button>
            </div>
    )
}

export default Signup