import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ArrayTypeNode } from 'typescript'

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
        //const mypost = await axios.get(`${process.env.REACT_APP_API_URL}/${key}`,{withCredentials: true})
        //console.log(mypost)
        //setResult(mypost.data)
        //더미데이터
        const post = [
            {
                id: 1, //postId
                nickname: "oh", //유저 닉네
                content: "그.....", //게시글내
                tag: ['서울', '운동', '식사', '독서'], //태그
                commentCount: 20, //댓글 
                likeCount: 10, //따봉 수
                likeCheck: false,  //따봉 눌렀는지 체
                createAt: '2019-10-10 09:10',  //생성날
                public: true  // 1 대 1 채팅 활성화, 비활성화
            },
            {
                id: 2,
                nickname: "gang",
                content: "나...",
                userId: 1,
                tag: ['서울', '운동'],
                commentCount: 10,
                likeCount: 5,
                likeCheck: false,
                createAt: '2020-10-15 10:10',
                public: false
            },
            {
                id: 5,
                nickname: "kim",
                content: "잘...",
                tag: ['서울', '독서'],
                commentCount: 5,
                likeCount: 2,
                likeCheck: false,
                createAt: '2020-10-20 12:10',
                public: true
            },
            {
                id: 11,
                nickname: "kim",
                content: "이거...",
                tag: ['서울', '독서'],
                commentCount: 5,
                likeCount: 2,
                likeCheck: false,
                createAt: '2020-10-21 11:10',
                public: true
            },
            {
                id: 21,
                nickname: "kim",
                content: "왜...",
                tag: ['서울', '독서'],
                commentCount: 5,
                likeCount: 2,
                likeCheck: false,
                createAt: '2021-01-20 11:55',
                public: true
            }
        ]
        //setResult(post)
        formChange(post)
        //더미데이터
    };

    const formChange = (origin: Array<any>) => {
        let yearArray: Array<any> = [];
        let sortedArray: Array<any> = [];
        const splitNum = function (createAt: string) {

            const splited:Array<any> = createAt.split('-');
            
            if (yearArray[yearArray.length - 1] !== `${splited[0]}-${splited[1]}`) {
                yearArray.push(`${splited[0]}-${splited[1]}`)
            }

            return `${splited[0]}-${splited[1]}`
        };
        const changedArray = origin.map((el) => {
            return {
                id: el.id,
                createAtYearMonth: splitNum(el.createAt),
                createAt: el.createAt,
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
            console.log(result)
            
            return setResult(result)
        }
        arrayToObject(yearArray)
        insertYearArray(sortedArray, changedArray)
    }



    const CreateMyChat = (): JSX.Element => {
        //const mypost = await axios.get(`${process.env.REACT_APP_API_URL}/like`,{withCredentials: true})
        return (
            <div>준비중입니다</div>
        )

    };

    const targetHandler = (key: string) => (e: React.MouseEvent<HTMLSpanElement>) => {
        setTargetPage(key)
        if (key === 'my_post') {
            InterestList('post/user')
        } else if (key === 'my_comment') {
            InterestList('comment')
        } else if (key === 'my_interest') {
            InterestList('like')
        } else if (key === 'my_chat') {
            CreateMyChat()
        }
    }


    return (
        <div>
            <div className='interest_nav_container'>
                <span className='my_post' onClick={targetHandler('my_post')}>내 작성글</span>&nbsp;&nbsp;
                <span className='my_comment' onClick={targetHandler('my_comment')}>댓글</span>&nbsp;&nbsp;
                <span className='my_interest' onClick={targetHandler('my_interest')}>따봉</span>&nbsp;&nbsp;
                <span className='my_chat' onClick={targetHandler('my_chat')}>1:1</span>
            </div> <br />
            {targetPage === 'my_post' ? <InterestPost post={result}  /> : null}
            {targetPage === 'my_comment' ? <InterestPost post={result}  /> : null}
            {targetPage === 'my_interest' ? <InterestPost post={result}  /> : null}
            {targetPage === 'my_chat' ? <CreateMyChat /> : null}
            <div></div>
        </div>

    )
}

export default Interest