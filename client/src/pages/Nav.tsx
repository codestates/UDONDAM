import React from 'react'
import { Link } from 'react-router-dom'
    //네비게이션바 로그인/게스트 분리할것, 홈,로그인,회원가입창에선 안나옴
function Nav () {

    return(
            <div >
                <div className='nav_link_box'>
                    <Link to='./Search' >검색</Link>
                    &nbsp;&nbsp;
                    <Link to='./Login' >로그인</Link>
                    &nbsp;&nbsp;
                    <Link to='./Signup' >회원가입</Link>
                    &nbsp;&nbsp;
                    <Link to='./Mypage' >마이페이지</Link>
                </div>
                
            </div>
            
    )
}

export default Nav