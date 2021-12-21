import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UserInfoHandler } from '../redux/modules/UserInfo';

function SocialGoogleLogin(props:any) {
    const history = useHistory()
    const dispatch = useDispatch()
    // let googleClientId:string=process.env.REACT_APP_CLIENT_ID||"";
    let googleClientId:string='81058434699-ruep3ttm3lkdabq2762moochmnptfcjl.apps.googleusercontent.com'||"";
  //만약에 성공하면 클라이언트 아이디 env로 관리
    
  //사용자 정보를 담아둘 userObj
  const [userObj, setUserObj]=React.useState({
    email:""
  })
  const onLoginSuccess=(res:any)=>{
      console.log(res)
    setUserObj({...userObj,
      email:res.profileObj.email,
    })
    // const userCheck = async function(res:any){
        
    //         console.log(res.profileObj.email)
    //         const emailCheck = await axios.post(`${process.env.REACT_APP_API_URL}/emailCheck`, { email: res.profileObj.email }, { withCredentials: true })
    //         .then((resp)=>{
    //              console.log(resp)
    //              if(resp.status === 200){
    //             const SignupInfoPost = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {email: res.profileObj.email, password:null}, { withCredentials: true })
    //         console.log(SignupInfoPost)
    //         const getUserData = await axios.get(`${process.env.REACT_APP_API_URL}/user`, { withCredentials: true })
    //         console.log(getUserData)
    //         //가입을 시켰으면 들여보내야함->필요한거? 이메일, 닉네임, 에리어 데이터, 유저아이디 등. 결국 가입된 내용을 받아와야함
    //         //리덕스, 세션에 넣고 보냄
    //         //로그인 여부등도 제어해야함
    //         history.push('/Mypage')
    //         } else if(emailCheck.status === 409){
    //             const getUserData = await axios.get(`${process.env.REACT_APP_API_URL}/user`, { withCredentials: true })
    //         console.log(getUserData)
    //         history.push('/Mypage')
    //         }
    //         })
           
    //         //이메일이 없으면 가입시켜야함. 근데 소셜로그인이라 비밀번호가 없음. null로 보내도 문제가 없나? 
            
            
    //         // if (error.response.data.message === 'Email already exists'){
    //         //    //등록된 이메일->이메일 보내서 유저정보 받기. 문제는 서버에서 진위여부를 토큰으로 함. 근데 토큰이 없음.왜? 아직 로그인하지 않았으니까
    //         //    //유저정보 받음.
    //         //    //리덕스, 세션에 넣고 보냄.
    //         //    const getUserData = await axios.get(`${process.env.REACT_APP_API_URL}/user`, { withCredentials: true })
    //         //    console.log(getUserData)
    //         //    history.push('/Mypage')
    //         // }
        
       
    // }

    // userCheck(res)
    //가입 한 적 없는데 소셜로그인->받아온 정보를 보내서 회원가입 시킴->그 정보 받아서 뿌림
    //가입하고 소셜로그인으로 접속->받아온 이메일->서버쪽에 보내서 아이디 확인->유저정보 받아서 뿌림
    
}

      return (
        <div>
        <GoogleLogin
          clientId = {googleClientId}
          buttonText="Google"
          onSuccess={result=>onLoginSuccess(result)}
          onFailure={result => console.log()}
        />
  
      </div>
      )
    }
    
export default SocialGoogleLogin