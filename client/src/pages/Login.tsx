import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import axios from 'axios'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { LoginHandler } from '../redux/modules/IsLogin'
import LoginModal from '../components/Login/LoginModal'

export interface loginInfoState {
        email: string,
        password: string
    };
   
function Login(){
    const dispatch = useDispatch()
    const history = useHistory()
    const [loginInfo, setLoginInfo] = useState<loginInfoState>({
        email: '',
        password:''
    })
    const [errorMessage, setErrorMessage] = useState<string>('')
    const inputHandler = (key:string)=>(e:React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({...loginInfo, [key]:e.target.value})
    }
    
    const submitHandler = async (e:React.MouseEvent<HTMLButtonElement>) =>{
        if(loginInfo.email === '' || loginInfo.password === ''){
            setErrorMessage('void')
        }
        e.preventDefault();
        const body = {email:loginInfo.email, password:loginInfo.password }
        try {
            const loginInfoPost = await axios.post(`${process.env.REACT_APP_API_URL}/login`, body, {withCredentials: true})
            dispatch(LoginHandler(true))
            //history.push('/Timeline')
        } catch (error) {
            console.log(error)
        }
      
        
    }
    const loginState = useSelector((state: RootStateOrAny)=>state.IsLoginReducer);
    console.log(loginState)

    const guestHandler = function(){

    }
    return(
        <div>
            <div className='logo'>logo</div>
            <form className='submit_box'>
                <div>
                <input type="text" onChange={inputHandler('email')} placeholder='이메일' /> <br />
                <input type="password" onChange={inputHandler('password')} placeholder='비밀번호' /> <br />
                {errorMessage}
                </div>
                <button className='login_button' onClick={submitHandler}>로그인</button>
                <button className='guest_button' onClick={guestHandler}>게스트로그인</button>
            </form>
            <div className='userguide_box'>
                <div>
                    <ul>
                        <li><Link to='/Signup'>회원가입</Link> </li>
                        <li>비밀번호를 잊으셨나요?</li>
                    </ul>
                </div>
            </div>
            <div className='social'>소셜로그인 아이콘</div>
        </div>
           
    )
}

export default Login