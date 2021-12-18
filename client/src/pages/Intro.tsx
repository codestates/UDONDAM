import React, { useEffect } from 'react'
//첫화면
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/modules/reducer'
import { UserInfoHandler } from '../redux/modules/UserInfo'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import './styles/IntroStyle.css'
import { WhiteSolidButton } from '../components/utils/Buttons';
import { WhiteLineButton } from '../components/utils/Buttons';
function Intro() {
    const history = useHistory()
    //리덕스 내용 보는법(밑은 리듀서 내용 보기
    //RootStateOrAny 루트의 스테이트 혹은 전부
    //RootState 루트의 스테이트만

    const introHandler = (key: string) => () => {
        if (key === 'signUp') {
            history.push('/SignUp')
        } else if (key === 'logIn') {
            history.push('/Login')
        }

    }

    if (useSelector((state: RootStateOrAny) => state.IsLoginReducer.isLogin) === true) {
        history.push('/Search')
    }

    const test = function () {
        //document.querySelector('.nav_link_box')?.classList.add('hide')
        console.log(document.baseURI)
        console.log(document.location.href)
    }

    const isLogin = useSelector((state: RootStateOrAny) => state.IsLoginReducer.isLogin)
    const isMobile = useSelector((state: RootStateOrAny) => state.IsMobileReducer.isMobile)
    const hideLogo = function () {
        if (isLogin === false) {
            console.log('isLogin:', isLogin)
            console.log('인트로 하이드 작동')
            if (document.querySelector('.logo_nav')?.classList.contains('hide') === false) {
                document.querySelector('.logo_nav_place')?.classList.toggle('hide')
               
                document.querySelector('.logo_nav')?.classList.toggle('hide')
                document.querySelector('#nav_bar')?.classList.toggle('hide')
                document.querySelector('#nav_bar_desktop')?.classList.toggle('hide')

            }
        }

    }
    const MobileVeiw = function () {
        return (
            <div id='intro_container_mobile'>
                <div className='intro_img_place'>
                    <div className='intro_img_box'>
                        <img className='logo_page intro_img' src="로고-우동담-Dark-배경x.png" alt="logo" />
                    </div>
                </div>
                <div className='intro_text_place'>
                    <div className='intro_text_box'>
                        <div className='intro_text intro_text_big'>우리동네 이야기, 우동담</div><br />
                        <div className='intro_text'>내 동네를 설정하고 <br />무슨 이야기가 있는지 살펴봐요!</div><br />
                    </div>
                </div>
                <div className='intro_button_place'>
                    <div id='intro_button_box'>
                        <button className='intro_button whiteline_button' onClick={introHandler('signUp')}>회원가입</button>
                        <div className='intro_text text_middle' onClick={introHandler('logIn')}>이미 계정이 있나요? 로그인</div><br />
                    </div>
                </div>
            </div>
        )
    };

    const PcVeiw = function () {
        return (
            
            <div id='intro_container' >
                <div className='intro_top_place'>
                    <div className='intro_top_box'>
                        <div className='intro_logo_box'>
                        <img className='intro_img' src="로고-우동담-Dark-모양만-배경x.png" alt="logo" />
                        <img className='intro_img' src="로고-우동담-Dark-글자만-배경x.png" alt="logo" />
                        </div>
                        <div className='intro_top_button_box'>
                            <WhiteSolidButton onClick={introHandler('logIn')}>로그인</WhiteSolidButton>
                            <WhiteLineButton onClick={introHandler('signUp')}>회원가입</WhiteLineButton>
                        </div>
                    </div>
                </div>
                <div className='intro_text_place'>
                    <div className='intro_text_box'>
                        <div className='intro_text intro_text_big'>우리동네 이야기, 우동담</div><br />
                    </div>
                </div>
                <div className='intro_content_place'>
                    <div id='intro_content_box'>
                        <div className='intro_content_item'>
                            <div className='intro_text text_middle' >내 동네를 2곳까지<br /> 지정 할 수 있어요!</div><br />
                            <div className='intro_content_image_box'>
                                <img className='intro_content_image' src="my_location_icon.png" alt="img" />
                            </div>
                        </div>
                        <div className='intro_content_item'>
                            <div className='intro_text text_middle' >원하는 주제 태그로<br /> 우리동네의 이야기를<br /> 골라서 볼 수 있어요!</div><br />
                            <div className='intro_content_image_box'>
                                <img className='intro_content_image' src="search_icon.png" alt="img" />
                            </div>
                        </div>
                        <div className='intro_content_item'>
                            <div className='intro_text text_middle' >익명이라 더 편하게<br /> 즐길 수 있어요!</div><br />
                            <div className='intro_content_image_box'>
                                <img className='intro_content_image' src="annimous_icon.png" alt="img" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
const save1 = document.querySelector('.intro_content_place')?.clientHeight
const save2 = document.querySelector('#intro_container')?.clientHeight
  const heightContlor = function(save1:number,save2:number){
      console.log(save1, save2)
      if(save1 < save2) {
          const height = save1 - save2
      }
      
  }
  if(typeof save1 === 'number' && typeof save2 === 'number'){
      heightContlor(save1,save2)
  }

    hideLogo()
    return (
        <div className='container'>
            {isMobile ? <MobileVeiw /> : <PcVeiw />}

        </div>
    )
}

export default Intro