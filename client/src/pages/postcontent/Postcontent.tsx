import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import 'dotenv/config'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { UserInfoHandler } from '../../redux/modules/UserInfo';
import './Postcontent.css'
    //게시글 작성

   

let arr:any = []
const Postcontent: React.FC = () => {
    const dispatch = useDispatch()
    const his = useHistory()
    const loginUserInfo = useSelector((state: RootStateOrAny)=>state.UserInfoReducer)
    let a = ''
    const isMobile = useSelector((state: RootStateOrAny)=>state.IsMobileReducer.isMobile)

    const [contentText, setContentText] = useState<any>('')
    const [contentGiftTag, setContentGiftTag] = useState<any>([])
    const [contentViewTag, setContentViewTag] = useState<any>([])
    const [searchText, setSearchText] = useState<any>('')
    const [filterTag, setFilterTag] = useState<any>([])
    const [falseMessage, setFalseMessage] = useState<any>('')
    const [charNum, setCharNum] = useState<any>(0) 
    const [charNumError, setCharNumError] = useState<any>('') 

    

    const [tag, setTag] = useState<any>([
        '여행', '게임', '소문', '유머', '산책', '자랑', '놀라운', '직장', '학교', '운동', '반려동물', '만화', '고민', '비밀', '음악', '흥미', '사고', '독서', '식사', '취미', '도움', '나눔', '연애', '만남', '자소서', '스포츠', '잡담', '알림', '질문', loginUserInfo.area, loginUserInfo.area2])

    const contentTextChange = (event:any) => {
        const max = 300;
        const textValue = event.target.value;
        const textLength = textValue.length
        let num = 0
        for(let i =0; i<textLength; i++){
            //하 유니코드 체크..
            let char = textValue.charAt(i)
            let uniChar = encodeURI(char)
            if(uniChar.length>4){
                //한글은 2
                num = num + 2
            }else{
                //영문 숫자 1
                num = num + 1
            }
        }
        setCharNum(num)
        if(max < num){
            setCharNumError('글자 제한 수를 초과하셨습니다.')
        }
        else{
            setContentText(event.target.value)
            setCharNumError('')
        }
       
    }
    const searchTextChange2 = (event:any) => {
        setSearchText(event.target.value)
    }
    const searchHandleKeyPress2 = (event:any) => {
        handleSearchButton()
    }
    const handleSearchButton = () => {
        const a = tag.filter((el:any) => 
            !el.indexOf(searchText)
        )
        if(loginUserInfo.area !== '인증해주세요'){
            a.unshift(loginUserInfo.area)
        }
        if(loginUserInfo.area2 !== '인증해주세요'){
            a.unshift(loginUserInfo.area2)
        }
        setFilterTag(a)
    }
    const giftTagHandle2 = (event:any) => {
        a = event.target.textContent
        setSearchText('')
        setTagHandle()
    }
    const setTagHandle = () => {
        if(arr.indexOf(a) === -1 && a !== ''){
            arr.push(a)
        }
        console.log(arr)
        setContentGiftTag(arr)
        // arr.map((el:any) => {
        //     return a = a + `#${el} `})
        
    }
    const giftTagDeleteHandle = (data:any) => {
        if(searchText === '1'){
            arr.splice(arr.indexOf(data),1)
            a = ''
            setContentGiftTag(arr)
            setSearchText('2')
            setTagHandle()
        }
        arr.splice(arr.indexOf(data),1)
        a = ''
        setContentGiftTag(arr)
        setSearchText('1')
        setTagHandle()
    }

    const compleatContentHandle = async () => {
        console.log(contentText, contentGiftTag)
        
        //줄바꿈 적용 하고 싶다
        const replaceHandle = () => {
            return contentText.replaceAll('<br>','₩r₩n')
        }

        if(contentGiftTag.includes(loginUserInfo.area) || contentGiftTag.includes(loginUserInfo.area2)){
            await axios.post(`${process.env.REACT_APP_API_URL}/post`,{
                content: replaceHandle(),
                public: false,
                tag: contentGiftTag
            },{withCredentials: true}).then((respone) => {
                console.log(respone)
            })
            his.push({
                pathname: `./Search`,
            })
        }
        else {
            setFalseMessage('지역 태그가 최소 1개가 필요합니다.')
        }
    }

    useEffect(() => {
        handleSearchButton()
        setTagHandle()
    }, [searchText])



    

    return(
            <div className='post-contanier-contanier'>
                <div className='post-contanier'>
                    <div className='logo-contanier2'>
                        <img className='logo-logo-logo' src = '로고-우동담-Dark-글자만-배경o.png'/>
                    </div>
                    <div className={`title-text ${isMobile ? 'po2' : null}`}>
                        <div className='title-text-center'>
                            {contentText.split('\n')[0]}
                        </div>
                    </div>
                    <div>
                        <div className='contanier-area-title-box3'>
                            <textarea className={`textarea-input ${isMobile ? 'po1' : null}`} onChange={contentTextChange} value={contentText} placeholder='제목은 엔터키 및 줄바꿈시 적용됩니다.'/>
                        </div>
                        <div >
                        {charNumError === '' ? <div className={`charNum2 ${isMobile ? 'po3' : null}`}>
                                {`${charNum} /300 byte`}
                            </div>
                            :
                            <div className={`charNum-Red2 ${isMobile ? 'po3' : null}`}>
                                {`${charNum} /300 byte`}
                            </div>
                            }
                            
                        {charNumError === '' ? null : <div className={`error-charnum ${isMobile ? 'po3' : null}`}>{charNumError}</div>}
                        </div>
                    </div>
                    <div className='tag-box-box-box'>
                        <div className='tag-box'>
                            {contentGiftTag.map((el:any) => {
                                return <button className={`select-tag ${isMobile ? 'po4' : null}`} onClick={() => giftTagDeleteHandle(el)}>{`# ${el}`}</button>
                            })}
                        </div>
                    </div>
                    
                    <div>
                        <input className={`tag-input ${isMobile ? 'po5' : null}`} type="text" value={searchText} onChange={searchTextChange2} placeholder="최소 한개의 지역 태그가 필요합니다." onKeyPress= {searchHandleKeyPress2} />
                    </div>
                    <div className='tag-box-box-box'>
                        {searchText === '' ? null
                            :filterTag.map((el:any) => {
                                return <button className={`tag-button ${isMobile ? 'po6' : null}`} onClick = {giftTagHandle2}>{el}</button>
                            })
                            }
                    </div>
                    <div className='compelete-button-box'>
                        <button className={`compelete-button ${isMobile ? 'po7' : null}`} onClick={compleatContentHandle}>게시글 업로드</button>
                        
                    </div>
                    <div className={`contanier-area-title-box3 ${isMobile ? 'po8' : null}`} >
                        {falseMessage}
                    </div>
                    
                </div>
            </div>
    )
}

export default Postcontent