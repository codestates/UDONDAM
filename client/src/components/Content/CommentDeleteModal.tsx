import React from 'react'
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import { useHistory } from 'react-router-dom';

import styled from 'styled-components';




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
  width: 19em;
  max-width: 90vw;
  //height: 20em;
  border-radius: 10px;
  text-align: center;
  border: solid 1px black;
  
  .close-btn{
    position:relative;
    color:red;
    bottom:2rem;
    left:8rem;
    font-size:1.3rem
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
    font-size:2rem;
  }
  
  & .long{
    position:relative;
    line-height:2.5rem
    
  }
  
  & .modal_text_password{
    position:relative;
    font-size:1.5rem;
    margin:10px
  }
  
  & .input_password{
    position:relative;
    right:0.5rem;
    height: 18px;
    bottom:1px
  }
  & .we{
    position:relative;

    font-size:1.2rem;

  }
  & .we2{
    position:relative;

    font-size:1.2rem;
  }
  & .we3{
    position:relative;

    font-size:1.2rem;
  }
  
  `;



function CommentDeleteModal ({CommentDeleteModalHandle,CommentDeleteHandle}: any) {
    const dispatch = useDispatch();
    const commentIdData = useSelector((state: RootStateOrAny) => state.CommentIdData)
    const history = useHistory();
    const userInfo = useSelector((state: RootStateOrAny) => state.UserInfoReducer);
    const isMobile = useSelector((state: RootStateOrAny)=>state.IsMobileReducer.isMobile)
    console.log(commentIdData.commentIdData)
 

    
    return (
        <>
    
    
            <ModalContainer>
              <ModalBackdrop >
                <ModalView onClick={(e) => e.stopPropagation()}>
    
                  <div>
                    <span className='modal_title' >댓글 삭제 확인</span>
                    <span className="close-btn"></span>
                  </div>
                  <div className={`modal_text ${isMobile ? 'we' : null}`}>정말로 댓글을 삭제 하시겠습니까?</div>
                  <div className={`modal_text long ${isMobile ? 'we2' : null}`}>댓글 삭제시 유저 정보</div>
                  <div className={`modal_text long ${isMobile ? 'we2' : null}`}>삭제 및 댓글 내용을 수정합니다</div>
                  <div className='password_submit'>
                  <button onClick={() => CommentDeleteHandle(commentIdData.commentIdData)} className={`modal_text_password ${isMobile ? 'we2' : null}`}>확인</button>
                  <button onClick={CommentDeleteModalHandle} className={`modal_text_password ${isMobile ? 'we2' : null}`}>취소</button>
                  <div className='submit_container'>
                  
                  </div>
                   
                  </div>
                </ModalView>
              </ModalBackdrop>
            </ModalContainer>
          
        </>
      );
}

export default CommentDeleteModal