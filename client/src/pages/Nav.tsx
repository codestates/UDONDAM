import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import IsGuestReducer from '../redux/modules/IsGuest';
import { UserInfoHandler } from '../redux/modules/UserInfo';
import styled from 'styled-components';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearchLocation, faListAlt, faPenSquare, faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

//네비게이션바 로그인/게스트 분리할것, 홈,로그인,회원가입창에선 안나옴

function Nav() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [guestMod, setGuestMod] = useState<boolean>(false)
    const NavContainer = styled.div`
        position: relative;
        background-color:black;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        /* padding: 3px; */
        width: 100%;
        height: max-content;

        .nav_link_container{
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: max-content;
            width: ${useSelector((state: RootStateOrAny) => state.IsMobileReducer.isMobile) === true ?
            '80%' : '100%'
        };
            /* width:80%; */
            
            /* align-content:space-between; */
        }

        @media(min-width: 641px){
            grid-area: logo;
        /* position: relative;
        background-color:gray;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 3px; */
        /* .nav_link_container{
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: max-content;
            width:80%;
            
            /* align-content:space-between; */
        //} */
        width: ${useSelector((state: RootStateOrAny) => state.IsMobileReducer.isMobile) === true ?
            'auto;' : '100%;'/*'max-content' */
        }
        max-width:250px;
        /* height: max-content; */
        /* left: 35.5%;
        bottom: 6.9%; */
        }
        
    `;
    console.log(useSelector((state: RootStateOrAny) => state.IsMobileReducer.isMobile))

    const test = function () {
        //document.querySelector('.nav_link_box')?.classList.add('hide')
        console.log(document.baseURI)
        console.log(document.location.href)
    }

    const navColor = 'rgb(197, 196, 196)';

    const sessionControl = function() {
        dispatch(UserInfoHandler({
            userId: 0,
            email: '',
            nickname: '',
            area: '',
            area2: '',
            manager: false,
            socialType: ''
        }))
        //세션삭제
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('areaData')
    }

    const LoginNav = function () {
        return (
            <div className='nav_link_container'>
                <div className='nav_link_detail'>
                    <Link to='./Search' >
                        <FontAwesomeIcon icon={faSearchLocation} size='3x' color = {navColor}></FontAwesomeIcon>
                    </Link>
                </div>
                <div className='nav_link_detail'>
                    <Link to='../Interest' >
                        <FontAwesomeIcon icon={faListAlt} size='3x' color = {navColor}></FontAwesomeIcon>
                    </Link>
                </div>
                <div className='nav_link_detail'>
                    <Link to='../Postcontent' >
                        <FontAwesomeIcon icon={faPenSquare} size='3x' color = {navColor}></FontAwesomeIcon>
                    </Link>
                </div>
                <div className='nav_link_detail'>
                    <Link to={{
                        pathname:'../Mypage',
                        state:{key:'data123'}
                    }}
                     >
                        <FontAwesomeIcon icon={faUser} size='3x' color = {navColor}></FontAwesomeIcon>
                    </Link>
                </div>
            </div>
        )
    };

    

    const GuestNav = function () {
        return (
            <div className='nav_link_container'>
                <div className='nav_link_detail'>
                    <Link to='./Search' >
                        <FontAwesomeIcon icon={faSearchLocation} size='3x' color = {navColor}></FontAwesomeIcon>
                    </Link>
                </div>
                <div className='nav_link_detail'>
                    <Link to='../Login' >
                        <FontAwesomeIcon icon={faSignInAlt} size='3x' color = {navColor} onClick={sessionControl}></FontAwesomeIcon>
                    </Link>
                </div>
            </div>
        )
    };

    const isGuest = useSelector((state: RootStateOrAny)=>state.IsGuestReducer.isGuest)
    console.log('isGuest:',isGuest)

console.log(useSelector((state: RootStateOrAny)=>state.IsGuestReducer.isGuest))


    useEffect(() => {
        test()
    }, [])


    return (
        <NavContainer className='nav_link_box'>
            {isGuest ? <GuestNav /> : <LoginNav /> }
        </NavContainer>


    )
}

export default Nav