import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { IProps } from '../../pages/Login';
    //지역인증

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
  
  /* & .modal_text{
    position:relative;
    bottom: 3rem;
    font-size:1rem;
    //line-height:7rem
    
  } */
  & .modal_title{
    position:relative;
    bottom:2rem;
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



function SearchPassword (props:any) {
    const dispatch = useDispatch();
    const history = useHistory();
    const closeSeaerchPasswordModal = props.closeSeaerchPasswordModal
    const [isOpen, setIsOpen] = useState(true);
    const [inputValue, setInputValue] = useState({
        email:'',
        number:''
    });
    const [errMessage, setErrMessage] = useState('');
    const [valid, setValid] = useState({
        validEmail:false,
        validNumber:false
    })
    const openModalHandler = () => {
      setIsOpen(false)
      closeSeaerchPasswordModal()
    };
    const validHandler = (key: string) => {
        if (key === 'validEmail') {
            setValid({ ...valid, [key]: !valid.validEmail })
        } else if(key === 'validNumber'){
            setValid({ ...valid, [key]: !valid.validNumber })
        }
        
    }
    const inputValueHandler = (key:string)=>(e:React.ChangeEvent<HTMLInputElement>) => {
        setInputValue({...inputValue, [key]: e.target.value })
    }

    const emailCheckHandler = function(){
      //이메일 스테이트 전송->
      //true- validEmail:true로. 아니면 안내 
      validHandler('validEmail')
    }
    const getNumberHandler = function(){
      //이메일에 숫자전송->버튼이 카운트다운으로 바뀜
    }
    const numberCheckHandler = function(){
      //카운트다운이 0:0이 되지 않았다 && 입력한 번호와 지정된 번호가 같다
      //validNumber:true로.
      validHandler('validNumber')
    }
    const valueInitialize = function() {
        setValid({ ...valid, ['validEmail']: false, ['validNumber']: false });
        setInputValue({...inputValue, ['email']:'', ['number']:''});
        setIsOpen(false)
        closeSeaerchPasswordModal()
    }
    const submitHandler = function(){
      //validEmail && validNumber가 true가 되어야 동작
      if(valid.validEmail !== true || valid.validNumber !== true){
        console.log('통과하지 못했음')
      } else {
        console.log('통과')
        valueInitialize()
        console.log(inputValue,valid,isOpen)
      }
    }
    console.log(inputValue,valid)
    return (
        <>
    
          {!isOpen ? null :
            <ModalContainer>
              <ModalBackdrop >
                <ModalView onClick={(e) => e.stopPropagation()}>
                  <div>
                    <span className='modal_title' >비밀번호 확인</span>
                    <span className="close-btn" onClick={openModalHandler}>&times;</span>
                  </div>
                  <div className='modal_text'>
                  가입한 이메일로 비밀번호를 전송합니다. <br />
                  가입되어 있는 이메일인지 확인합니다</div>
                  <div className='email_check_box' onChange={inputValueHandler('email')}>
                    <input type="text" placeholder='이메일'/>
                    <button onClick={emailCheckHandler}>확인</button>
                  </div> 
                  <br />
                  <div className='number_check_box'>
                    <input type="text" placeholder='인증번호 입력' onChange={inputValueHandler('number')}/>
                    <button onClick={getNumberHandler}>전송요청</button>
                    <button onClick={numberCheckHandler}>확인</button>
                  </div>
                  <div className='modal_text long'>이메일인증 완료 후 이메일로 비밀번호를 전송합니다</div>
                   <button onClick={submitHandler}>확인</button>
                 
                </ModalView>
              </ModalBackdrop>
            </ModalContainer>
          }
        </>
      );
}

export default SearchPassword