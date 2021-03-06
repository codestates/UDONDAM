import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ArrayTypeNode } from 'typescript'
import styled from 'styled-components'
import './styles/Interest.css'
import InterestPost from '../components/Interest/InterestPost'
//게시글관리
function Interest() {
    //로딩중 안내 추가필요
    //페이지관리:targetPage로 관리. 네비 누르면 상태바뀜.
    //상태에 해당하는 포스트를 서버에 요청해서 받음
    //받은 데이터를 맵으로 뿌림. 날짜별 분리. 월단위. 6개월 이상 넘어가면 밑에 더보기 버튼. 
    //같은 월에 해당하는 포스트는 하나로 묶는다. 미리보기 클릭하면 그 포스트로 보냄.
    //일단 mypost는 먼저 불러와야함. 맨처음 페이지 열자마자 클릭 안해도 나와있음.

    //리덕스에 interestList 만듦. 그 리덕스 내용을 불러와서 뿌림.
    const [targetPage, setTargetPage] = useState<string>('my_post')
    const [result, setResult] = useState<object>([])
    const [changeForm, setChangeForm] = useState<object>([])
    //console.log(targetPage)

    const InterestList = async function (key: string) {
        //클릭별로 바뀜
        if(key === 'my_interest'){
            const mypost = await axios.get(`${process.env.REACT_APP_API_URL}/${key}`,{withCredentials: true})
            // console.log(mypost)
            formChange(mypost.data)
            return mypost
        }else{
            const mypost = await axios.get(`${process.env.REACT_APP_API_URL}/${key}`,{withCredentials: true})
            // console.log(mypost)
            formChange(mypost.data)
            return mypost
        }
        
      
    };

    const formChange = (origin: Array<any>) => {
        let yearArray: Array<any> = [];
        let sortedArray: Array<any> = [];


        const createAtDesign = (data:string) => {
            const timeStamp = Date.now() - new Date(data).getTime()
            const second = timeStamp / 1000
            const minute = second / 60
            const hour = minute / 60
            const days = hour / 24
            if(second < 60){
                return '방금 전'}
            if(minute < 60){
                return `${Math.floor(minute)}분 전`}
            if(hour < 24){
                return `${Math.floor(hour)}시간 전`}
            // if(days < 7){
            //     return `${Math.floor(days)}일 전`}
            
            const WEEKDAY = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
            let week = WEEKDAY[new Date(data).getDay()];
    
            let a:any = ''
            let b = ''
            let c:any = ''
            
            a = new Date(data)
            c = new Date(a.getTime() - (a.getTimezoneOffset() * 60000)).toISOString()
            a = c.slice(0,10)
            b = b + a
            a = c.slice(11,16)
            b = b + ' ' + a + ' ' + week 
    
            return b
        }

        


        const splitNum = function (createAt: string) {

            const splited:Array<any> = createAt.split('-');
            
            if (yearArray[yearArray.length - 1] !== `${splited[0]}-${splited[1]}`) {
                yearArray.push(`${splited[0]}-${splited[1]}`)
            }

            return `${splited[0]}-${splited[1]}`
        };
        const changedArray = origin.map((el) => {
            function chancgeCreateAt (createAt:string) {
                const yearMonthDay:string = createAt.split('T')[0]
                const splitedTime = createAt.split('T')[1].split(':')
                const hourMinuts:string = `${splitedTime[0]}:${splitedTime[1]}`
                const createAtForm:string = yearMonthDay +' ' + hourMinuts
                
                return createAtForm
            }
            return {
                id: el.id,
                createAtYearMonth: splitNum(el.createAt),
                createAt: createAtDesign(el.createAt),
                content: el.content
            }
        });
        
        const arrayToObject = function(input:Array<string>) {
            
            let result:any = []
            let object:any = {}
            const toObject = input.map((el:string)=>{
                object[`${el}`] = []
                result.push(object)
                object = {} // 내용 초기화
                return result
            })
            sortedArray = result ;
        }

        const insertYearArray = function(yearlist:Array<any>, value:Array<any>) {
        
            let count = 0
            const createobject = value.map((el)=>{
                for(let i = 0; i <= yearlist.length-1; i++){
                    if(yearlist[i][el.createAtYearMonth]){
                        yearlist[i][el.createAtYearMonth].push(el)
                    }
                }
            })
            const result = yearlist.map((el)=>{
                return el = [el]
            })
            // console.log(result)
            
            return setResult(result)
        }
        arrayToObject(yearArray)
        insertYearArray(sortedArray, changedArray)
    }



    const CreateMyChat = (): JSX.Element => {
        //const mypost = await axios.get(`${process.env.REACT_APP_API_URL}/like`,{withCredentials: true})
        return (
            <div className='interest_chat'>준비중입니다</div>
        )

    };

    const targetHandler = (key: string) => (e: React.MouseEvent<HTMLSpanElement>) => {
        setTargetPage(key)
        if (key === 'my_post') {
            InterestList('post/user')
        } else if (key === 'my_comment') {
            InterestList('comment')
        } else if (key === 'my_interest') {
            InterestList('likes')
        } else if (key === 'my_chat') {
            CreateMyChat()
        }
    }

    const InterestNav = styled.div`
        font-size: 1.5rem;

        
        .interest_nav_box_${targetPage}{
            border-bottom: solid 2px gray;
           
        }
        & .margin_b_8{
            margin-bottom:8px
        }
    `;

    useEffect(()=>{
        InterestList('post/user')
    },[])

    //여기에 포스트상세를 넣어서 움직일수 있게 한다? 모바일에선 가능.데스크탑에선?
    return (
            <div className='container'>
                <div className='interest_cotainer' >
            <InterestNav className='interest_nav_cotainer'>
                <div className='interest_nav_box interest_nav_box_my_post ' onClick={targetHandler('my_post')}>
                <span className='my_post border_line_my_post margin_b_8' >내 작성글</span>
                </div>
                <div className='interest_nav_box interest_nav_box_my_comment ' onClick={targetHandler('my_comment')}>
                <span className='my_comment border_line_my_comment margin_b_8' >댓글</span>
                </div>
                <div className='interest_nav_box interest_nav_box_my_interest' onClick={targetHandler('my_interest')}>
                <span className='my_interest border_line_my_interest margin_b_8' >따봉</span>
                </div>
                <div className='interest_nav_box interest_nav_box_my_chat margin_b_8' onClick={targetHandler('my_chat')}>
                <span className='my_chat border_line_my_chat' >1:1쪽지</span>
                </div>
            </InterestNav> <br />
            {targetPage === 'my_post' ? <InterestPost post={result}  /> : null}
            {targetPage === 'my_comment' ? <InterestPost post={result}  /> : null}
            {targetPage === 'my_interest' ? <InterestPost post={result}  /> : null}
            {targetPage === 'my_chat' ? <CreateMyChat /> : null}
            </div>
            </div>

    )
}

export default Interest