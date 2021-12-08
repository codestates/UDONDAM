import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearchLocation, faListAlt, faPenSquare, faUser } from "@fortawesome/free-solid-svg-icons";
    //네비게이션바 로그인/게스트 분리할것, 홈,로그인,회원가입창에선 안나옴
    
function Nav () {
    const NavContainer = styled.div`
        position: relative;
        background-color:gray;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        /* padding: 3px; */
        width: 100%;
        height: 100%;
    `;

const test = function(){
    //document.querySelector('.nav_link_box')?.classList.add('hide')
    console.log(document.baseURI)
    console.log(document.location.href)
}
useEffect(()=>{
  test()  
},[])


    return(
                <NavContainer className='nav_link_box'>
                    <Link to = './Search' >
                    <FontAwesomeIcon icon={faSearchLocation} size='3x'></FontAwesomeIcon>
                    </Link>
                    &nbsp;&nbsp;
                    <Link to='../Interest' >
                    <FontAwesomeIcon icon={faListAlt} size='3x'></FontAwesomeIcon>
                    </Link>
                    &nbsp;&nbsp;
                    <Link to='../Postcontent' >
                    <FontAwesomeIcon icon={faPenSquare} size='3x'></FontAwesomeIcon>
                    </Link>
                    &nbsp;&nbsp;
                    <Link to='../Mypage' >
                    <FontAwesomeIcon icon={faUser} size='3x'></FontAwesomeIcon>
                    </Link>
                </NavContainer>
                
            
    )
}

export default Nav