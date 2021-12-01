import React from "react";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import '@fortawesome/fontawesome-free/js/all.js'

const AreaSelete = styled.div`
    background-color: darkgray;
`;
const AreaUnSelete = styled.div`
    display: none;
`;
const LogoImg = styled.img`
  box-sizing: border-box;
    width: 30vw;
    color:white;
    background-color: black;
`;

//지역에 관한 필터링
function Search() {
    const [userAreaData, setUserAreaData] = useState<any>([
        // 유저 정보에서 area,area2를 받아서 한 배열로 병합할거임
        // 그럼 지역정보 바꾸고 나서 바로 서버쪽에서 다시 유저정보 줘야겠네
        // 예 ) 유저정보.area, ...유저정보.area2
        '서울특별시','부산광역시'
    ])
    const [tag, setTag] = useState<any>([
        '여행', '게임', '소문', '유머', '산책', '자랑', '놀라운', '직장', '학교', '운동', '애완동물', '만화', '고민', '비밀', '음악', '흥미', '사고', '독서', '식사', '취미', '도움', '나눔', '연애', '만남'])
    const [tagData, setTagData] = useState<any>([
        // 여기도 수정될 예정 
        // 예 ) 유저정보.area, ...유저정보.area2
        userAreaData[0],userAreaData[1],...tag])

    const [localTagData, setLocalTagData] = useState<any>([
        '서울특별시', '부산광역시', '대구광역시','인천광역시','광주광역시', '대전광역시','울산광역시','세종특별자치시','수원시','성남시','의정부시','안양시','부천시','광명시','동두천시','평택시','안산시','고양시','과천시','구리시','남양주시','오산시','시흥시','군포시','의왕시','하남시','용인시','파주시','이천시','안성시','김포시','화성시','광주시','양주시','포천시','여주시','연천군','가평군','양평군','춘천시','원주시','강릉시','동해시','태백시','속초시','삼척시','홍천군','횡성군','영월군','평창군','정선군','철원군','화천군','양구군','인제군','고성군','양양군','청주시','충주시','제천시','보은군','옥천군','영동군','증평군','진천군','괴산군','음성군','단양군','천안시','공주시','보령시','아산시','서산시','논산시','계룡시','당진시','금산군','부여군','서천군','청양군','홍성군','예산군','태안군','전주시','군산시','익산시','정읍시','남원시','김제시','완주군','진안군','무주군','장수군','임실군','순창군','고창군','부안군','목포시','여수시','순천시','나주시','광양시','담양군','곡성군','구례군','고흥군','보성군','화순군','장흥군','강진군','해남군','영암군','무안군','함평군','영광군','장성군','완도군','진도군','신안군','포항시','경주시','김천시','안동시','구미시','영주시','영천시','상주시','문경시','경산시','군위군','의성군','청송군','영양군','영덕군','청도군','고령군','성주군','칠곡군','예천군','봉화군','울진군','울릉군','창원시','진주시','통영시','사천시','김해시','밀양시','거제시','양산시','의령군','함안군','창녕군','고성군','하동군','산청군','함양군','거창군','합천군','제주시','서귀포시'
    ])

    const [isAreaActive, setIsAreaActive] = useState<any>([false])

    const [searchText, setSearchText] = useState<any>('')

    const [giftTag, setGiftTag] = useState<any>([])

    const areaSeleteClick = () => {
        setIsAreaActive(!isAreaActive)
    }

    const searchTextChange = (event:any) => {
        setSearchText(event.target.value)
    }

    const searchHandleKeyPress = (event:any) => {
        if(event.type === 'keypress' && event.code === 'Enter') {
            handleSearchButton()
        }
    }
    
    const handleSearchButton = () => {
        setGiftTag([searchText])
    }

    return (
    <div>
        <span>
            지역
            <button onClick = {areaSeleteClick}>
                ㅁ
            </button>
            {isAreaActive ? 
            <AreaUnSelete>
            </AreaUnSelete>
            :
            <AreaSelete>
                <ul>
                    {userAreaData.map((el:any) => {
                        return <div>{el}</div>
                    })}
                </ul>
            </AreaSelete>
            }

        </span>
        <LogoImg src = '로고-우동담-Dark-모양만-배경o.png' />
        <div>
            <input type="text" value={searchText} onChange={searchTextChange} placeholder="태그 검색" onKeyPress={searchHandleKeyPress} />
        </div>
        <div>
            <button>
                금지 태그 설정
            </button>
            <button>
                태그 초기화
            </button>
        </div>
        <div>
            <button>
                설정한 태그로 타임라인 검색
            </button>
        </div>
        <div>
            <button>
                타임라인 전체 보기
            </button>
        </div>
        <div>
            {tagData.map((el:any) => {
                return <button>{el}</button>
            })}
        </div>
        
    </div>
    )
}
export default Search;