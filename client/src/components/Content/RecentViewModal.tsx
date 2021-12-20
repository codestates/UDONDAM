import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { UserInfoHandler } from '../../redux/modules/UserInfo';
import { IsLoginHandler } from '../../redux/modules/IsLogin';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { IProps } from '../../pages/Mypage';


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
const ContanierBox = styled.div`
  border: '2px solid black';
  
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


//모달창 유무, 태그로 검색, 태그수정 핸들러, 낫태그수정 핸들러
function RecentViewModal ({recentSearchHandle,selectTagSearchHandle,setGiftTag,setNotGiftTag}: any) {
    const boxBorder = {
        border: '1px solid black',
    }
  
    const dispatch = useDispatch();
    const history = useHistory();
    const userInfo = useSelector((state: RootStateOrAny) => state.UserInfoReducer);
    const [recentDataParsing, setRecentDataParsing] = useState<any>([])

    const dataParsingHandle = async () => {
         await axios.get(`${process.env.REACT_APP_API_URL}/recent`,{withCredentials: true}).then((respone) => {
             console.log(respone)
            return setRecentDataParsing(respone.data)
         })
    }
    console.log(recentDataParsing)
    const recentTagSearchHandle = (data:any) => {
        if(data.notTag === null){
            setGiftTag(data.tag)
        }else{
            setGiftTag(data.tag)
            setNotGiftTag(data.notTag)
        }
        
        selectTagSearchHandle()
        recentSearchHandle()
   }
   

    useEffect(() => {
        dataParsingHandle()
    },[])

    return (
        <>
            <ModalContainer>
            <ModalBackdrop >
            <ModalView onClick={(e) => e.stopPropagation()}>
                <div>
                <span className='modal_title' >최근 검색 내역</span>
                </div>
                <div className='modal_text_long'>최근 3개의 검색 내역을 표시합니다.</div>

                {recentDataParsing && recentDataParsing.map((el:any) => {

                    return (<div style={boxBorder} onClick={() => recentTagSearchHandle(el)}>
                        <div>{`태그 : ${el.tag}`}</div>
                        {el.notTag === null ? null 
                        :
                        <div>{`금지태그 : ${el.notTag}`}</div>
                        }

                    </div>)
                })}
                <button onClick={recentSearchHandle} className='modal_text_password'>취소</button>

            </ModalView>
            </ModalBackdrop>
          </ModalContainer>
          
        </>
    );
}

export default RecentViewModal