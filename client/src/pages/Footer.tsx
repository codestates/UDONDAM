import React from 'react'
import { Link } from 'react-router-dom'
import './styles/FooterStyle.css'
//네비게이션바 로그인/게스트 분리할것, 홈,로그인,회원가입창에선 안나옴
function Footer() {

    const teamMembers = [
        {id:1, name:'김석규', git:'ksg9482'},
        {id:2, name:'정동교', git:'wjdehdry3'},
        {id:3, name:'이선영', git:'siri-syl'},
        {id:4, name:'정동현', git:'wjddbgn'},
    ]

    return (
        <footer className='grid_footer_container'>
            <div className='grid_footer_about_place'>
                <div className='grid_footer_about_box'>
                <div className='grid_footer_about'>
                    UDONDAM - 우리 동네 이야기
                </div>
                </div>
            </div>
            <div className='grid_footer_copyright_place'>
            <div className='grid_footer_copyright_box'>
                <div className='grid_footer_copyright'>
                    copyright
                </div>
                </div>
            </div>
            <div className='grid_footer_member_place'>
                <div className='grid_footer_member_box'>
                    {teamMembers.map((memeber)=>{
                        return(
                            <div className='grid_footer_member' key={memeber.id}>
                                <div className='grid_footer_member_name footer_text'>{memeber.name}</div>&nbsp;&nbsp;
                                <div className='grid_footer_member_git footer_text'>https://github.com/{memeber.git}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </footer>

    )
}

export default Footer