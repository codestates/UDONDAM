import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { IProps } from '../../pages/Login';
import { IsGuestHandler } from '../../redux/modules/IsGuest';
import { UserInfoHandler } from '../../redux/modules/UserInfo';

    export const ModalContainer = styled.div`
    display:grid;
    justify-items: center;
    width:100%;
    color:black;
    //justify-content:center;
    //align-items:center;
    //align-self:center;
    //align-content:center;
    
  `;
  
  export const ModalBackdrop = styled.div`
   position:absolute;
   position:fixed;
   top:0;
   left:0;
   z-index: 999;
   background-color: rgba(107, 112, 114, 0.37);
   
   width: 100%;
   height: 100%;
   
  `;
  
  
  export const ModalView = styled.div.attrs(props => ({
    role: 'dialog'
  }))`
  
  position:relative;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding:40px;
  width: 18em;
  max-width: 90vw;
  //height: 20em;
  border-radius: 10px;
  text-align: center;
  border: solid 1px black;
  display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
  
  .close-btn{
    position:relative;
    color:black;
    bottom:2rem;
    left:7rem;
    font-size:1.7rem
  }
  
  & .modal_text{
    position:relative;
    bottom: 3rem;
    font-size:1.3rem;
    height:15rem;
    /* line-height:7rem */
    display:flex;
    flex-direction:column;
    justify-content: center;
    
  }
  & .modal_title{
    position:relative;
    bottom:2rem;
  }
  
  & .long{
    position:relative;
    line-height:2.5rem
  }
  
  & .modal_text_password{
    position:relative;
    font-size:2rem;
  }
  
  & .input_password{
    position:relative;
    right:0.5rem;
    height: 18px;
    bottom:1px
  }
  & button {
    margin:5px
  }
  
  
  `;



function GuestLoginModal (props:any) {
    const dispatch = useDispatch();
    const history = useHistory();
    const closeGuestModal = props.closeGuestModal
    const [isOpen, setIsOpen] = useState(true);
    
    const openModalHandler = () => {
      setIsOpen(false)
      closeGuestModal()
    };

    const guestLogin = async() => {
      try {
        
      setIsOpen(false)
      if(document.querySelector('.logo_nav')?.classList.contains('hide')===true){
            // console.log('.맨처음 로그인 하이드 작동')
            document.querySelector('.logo_nav')?.classList.remove('hide')
            document.querySelector('#nav_bar')?.classList.remove('hide')
            document.querySelector('#nav_bar_desktop')?.classList.remove('hide')
            document.querySelector('.logo_nav_place')?.classList.remove('hide')
        }
        const guestLogin = await axios.post(`${process.env.REACT_APP_API_URL}/guest`, {withCredentials: true })
        // console.log(guestLogin)
        const guestInfo = guestLogin.data.data
        dispatch(UserInfoHandler({
          userId: 5,
          email: guestInfo.email || 'guest',
          nickname: guestInfo.nickname || null,
          // area: guestInfo.area !== null ? guestInfo.area : '인증해주세요',
          // area2: guestInfo.area2 !== null ? guestInfo.area2 : '인증해주세요',
           area: '인증해주세요',
           area2: '인증해주세요',
          manager: guestInfo.manager || false, 
          socialType: guestInfo.socialType || null
      }))
      //세션 관련
      const changeJson:string = JSON.stringify({
        userId: 5,
        email: guestInfo.email || 'guest',
        nickname: guestInfo.nickname || null,
        area: '인증해주세요',
        area2: '인증해주세요',
        manager: guestInfo.manager || false, 
        socialType: guestInfo.socialType || null
    })
    const areadata:string = JSON.stringify(['인증해주세요','인증해주세요'])
    // console.log('세션작동:',changeJson)
    sessionStorage.setItem('user',changeJson)
    sessionStorage.setItem('areaData',areadata)
        closeGuestModal()
        dispatch(IsGuestHandler(true))
      history.push('/Search')
      } catch (error:any) {
        // console.log(error.response)
      }
      
    }

    
    return (
        <>
    
          {!isOpen ? null :
            <ModalContainer>
              <ModalBackdrop >
                <ModalView onClick={(e) => e.stopPropagation()}>
                  <div>
                    <span className='modal_title' >게스트 로그인</span>
                    <span className="close-btn" onClick={openModalHandler}>&times;</span>
                  </div>
                  <div className='modal_text'>회원가입 없이<br /> 서비스를 체험하세요!<br /><br />읽기만 가능합니다!</div>

                  <div className='submit_container'>
                   <button onClick={guestLogin}>확인</button>
                   <button onClick={openModalHandler}>취소</button>
                  </div>
                </ModalView>
              </ModalBackdrop>
            </ModalContainer>
          }
        </>
      );
}

export default GuestLoginModal