import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearchLocation, faListAlt, faPenSquare, faUser } from "@fortawesome/free-solid-svg-icons";
    //네비게이션바 로그인/게스트 분리할것, 홈,로그인,회원가입창에선 안나옴
    
function Nav () {
    const NavContainer = styled.div`
        background-color:gray;
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 3px;
        width: 100%;
    `;

    return(
                <NavContainer className='nav_link_box'>
                    <Link to = './Search' >
                    <FontAwesomeIcon icon={faSearchLocation} size='2x'></FontAwesomeIcon>
                    </Link>
                    &nbsp;&nbsp;
                    <Link to='../Interest' >
                    <FontAwesomeIcon icon={faListAlt} size='2x'></FontAwesomeIcon>
                    </Link>
                    &nbsp;&nbsp;
                    <Link to='../Postcontent' >
                    <FontAwesomeIcon icon={faPenSquare} size='2x'></FontAwesomeIcon>
                    </Link>
                    &nbsp;&nbsp;
                    <Link to='../Mypage' >
                    <FontAwesomeIcon icon={faUser} size='2x'></FontAwesomeIcon>
                    </Link>
                </NavContainer>
                
            
    )
}

export default Nav