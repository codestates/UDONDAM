import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { IProps } from '../../pages/Login';

    export const ModalContainer = styled.div`
    display:grid;
    justify-items: center;
    //justify-content:center;
    //align-items:center;
    //align-self:center;
    //align-content:center;
    
  `;
  
  export const ModalBackdrop = styled.div`
   position:absolute;
   top:0;
   left:0;
   z-index: 999;
   background-color: rgba(117, 190, 218, 0.3);
   
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
  width: 20em;
  //height: 20em;
  border-radius: 10px;
  text-align: center;
  border: solid 1px black;
  
  .close-btn{
    position:relative;
    color:red;
    bottom:3rem;
    left:9rem;
  }
  
  & .modal_text{
    position:relative;
    bottom: 3rem;
    font-size:1.5rem;
    line-height:7rem
    
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
                  <div className='modal_text'>회원가입 없이 서비스를 체험하세요!</div>
                  <div className='submit_container'>
                   <button>확인</button>
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