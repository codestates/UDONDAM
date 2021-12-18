import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import 'dotenv/config'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { UserInfoHandler } from '../../redux/modules/UserInfo';
import './Area.css'


    //지역인증
let falseArr:any = ''
function Area({ history }: RouteComponentProps) {
    const dispatch = useDispatch()
    const his = useHistory()
    const {ida}:any = history.location.state
    console.log(ida)
    const isGuest = useSelector((state: RootStateOrAny)=>state.IsGuestReducer.isGuest)
    const loginUserInfo = useSelector((state: RootStateOrAny)=>state.UserInfoReducer)

    const [filterTag, setFilterTag] = useState<any>([])
    const [searchText, setSearchText] = useState<any>('')
    const [giftTag2, setGiftTag2] = useState<any>([])
    const [firstLocal, setFirstLocal] = useState<any>(false)
    const [secondLocal, setSecondLocal] = useState<any>(false)
    const [threeLocal, setThreeLocal] = useState<any>(false)
    const [areaSearch, setAreaSearch] = useState<any>('검색중...')
    const [localTagData, setLocalTagData] = useState<any>([
        '서울특별시', '부산광역시', '대구광역시','인천광역시','광주광역시','대전광역시','울산광역시','세종특별자치시','수원시','성남시','의정부시','안양시','부천시','광명시','동두천시','평택시','안산시','고양시','과천시','구리시','남양주시','오산시','시흥시','군포시','의왕시','하남시','용인시','파주시','이천시','안성시','김포시','화성시','광주시','양주시','포천시','여주시','연천군','가평군','양평군','춘천시','원주시','강릉시','동해시','태백시','속초시','삼척시','홍천군','횡성군','영월군','평창군','정선군','철원군','화천군','양구군','인제군','고성군','양양군','청주시','충주시','제천시','보은군','옥천군','영동군','증평군','진천군','괴산군','음성군','단양군','천안시','공주시','보령시','아산시','서산시','논산시','계룡시','당진시','금산군','부여군','서천군','청양군','홍성군','예산군','태안군','전주시','군산시','익산시','정읍시','남원시','김제시','완주군','진안군','무주군','장수군','임실군','순창군','고창군','부안군','목포시','여수시','순천시','나주시','광양시','담양군','곡성군','구례군','고흥군','보성군','화순군','장흥군','강진군','해남군','영암군','무안군','함평군','영광군','장성군','완도군','진도군','신안군','포항시','경주시','김천시','안동시','구미시','영주시','영천시','상주시','문경시','경산시','군위군','의성군','청송군','영양군','영덕군','청도군','고령군','성주군','칠곡군','예천군','봉화군','울진군','울릉군','창원시','진주시','통영시','사천시','김해시','밀양시','거제시','양산시','의령군','함안군','창녕군','고성군','하동군','산청군','함양군','거창군','합천군','제주시','서귀포시'
    ])

    const searchTextChange2 = (event:any) => {
        setSearchText(event.target.value)
    }
    const searchHandleKeyPress2 = (event:any) => {
        if(event.type === 'keypress' && event.code === 'Enter') {
            handleSearchButton()
        }
    }
    const handleSearchButton = () => {
        const a = localTagData.filter((el:any) => 
            !el.indexOf(searchText)
        )
        setFilterTag(a)
    }
    const giftTagHandle2 = (event:any) => {
        setGiftTag2([event.target.textContent])
    }
    const myLocalHandle = () => {
        setFirstLocal(!firstLocal)
        navigator.geolocation.getCurrentPosition(async function(pos) {
            let a = pos.coords.latitude
            let b = pos.coords.longitude
            
            await axios
            .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${a},${b}&language=ko&key=${process.env.REACT_APP_API_KEY}`)
            .then((respone1) => {
                console.log(respone1.data)
               return respone1.data.results[4].address_components.map((el:any) => {
               if(localTagData.indexOf(el.long_name) !== -1){
                    return setAreaSearch(el.long_name)
               }else if(localTagData.indexOf(el.short_name) !== -1){
                   return setAreaSearch(el.short_name)
               }
            })
            
            })
          
            try {}
            catch (err) {
                setAreaSearch('죄송합니다. 직접 지역을 선택해주세요')
            }
        })
    }
    console.log(giftTag2)
    const yesMyLocalHandle = () => {
        if(threeLocal){
            setThreeLocal(false)
            setSecondLocal(false)
        }
        setSecondLocal(true)
        setThreeLocal(false)
    }

    const noMyLocalHandle = () => {
        if(secondLocal){
            setSecondLocal(false)
            setThreeLocal(false)
        }
        setThreeLocal(true)
        setSecondLocal(false)
    }
    
    const areaSelectHandle = async () => {
        if(isGuest){
            if(ida === 0){
                dispatch(UserInfoHandler({
                    userId: loginUserInfo.userId,
                    email: loginUserInfo.email,
                    nickname: loginUserInfo.nickname,
                    area: areaSearch || null,
                    area2: loginUserInfo.area2 || null,
                    manager: loginUserInfo.manager, 
                    socialType: loginUserInfo.socialType
                }))
                his.push({
                    pathname: `./Search`,
                })
            }else{
                dispatch(UserInfoHandler({
                    userId: loginUserInfo.userId,
                    email: loginUserInfo.email,
                    nickname: loginUserInfo.nickname,
                    area: loginUserInfo.area || null,
                    area2: areaSearch || null,
                    manager: loginUserInfo.manager, 
                    socialType: loginUserInfo.socialType
                }))
                his.push({
                    pathname: `./Search`,
                })
            }
        }else
        {
            if(ida === 0){
                await axios.patch(`${process.env.REACT_APP_API_URL}/user/area`, {
                    area : areaSearch
                },{withCredentials: true}).then((respone:any) => {
                    console.log(respone.data)
                    dispatch(UserInfoHandler({
                        userId: loginUserInfo.userId,
                        email: loginUserInfo.email,
                        nickname: loginUserInfo.nickname,
                        area: respone.data.area || null,
                        area2: loginUserInfo.area2 || null,
                        manager: loginUserInfo.manager, 
                        socialType: loginUserInfo.socialType
                    }))
                })
                his.push({
                    pathname: `./Search`,
                })
            }else{
                await axios.patch(`${process.env.REACT_APP_API_URL}/user/area`, {
                    area2 : areaSearch
                },{withCredentials: true}).then((respone:any) => {
                    console.log(respone.data)
                    dispatch(UserInfoHandler({
                        userId: loginUserInfo.userId,
                        email: loginUserInfo.email,
                        nickname: loginUserInfo.nickname,
                        area: loginUserInfo.area || null,
                        area2: respone.data.area2 || null,
                        manager: loginUserInfo.manager, 
                        socialType: loginUserInfo.socialType
                    }))
                })
                his.push({
                    pathname: `./Search`,
                })
            }
        }
        

    }

    const selectAreaSelectHandle = async () => {
        
        if(isGuest){
            if(ida === 0){
                dispatch(UserInfoHandler({
                    userId: loginUserInfo.userId,
                    email: loginUserInfo.email,
                    nickname: loginUserInfo.nickname,
                    area: giftTag2[0] || null,
                    area2: loginUserInfo.area2 || null,
                    manager: loginUserInfo.manager, 
                    socialType: loginUserInfo.socialType
                }))
                his.push({
                    pathname: `./Search`,
                })
            }else{
                dispatch(UserInfoHandler({
                    userId: loginUserInfo.userId,
                    email: loginUserInfo.email,
                    nickname: loginUserInfo.nickname,
                    area: loginUserInfo.area || null,
                    area2: giftTag2[0] || null,
                    manager: loginUserInfo.manager, 
                    socialType: loginUserInfo.socialType
                }))
                his.push({
                    pathname: `./Search`,
                })
            }
        }else
        {
            if(ida === 0){
                await axios.patch(`${process.env.REACT_APP_API_URL}/user/area`, {
                    area : giftTag2[0]
                },{withCredentials: true}).then((respone:any) => {
                    console.log(respone)
                    dispatch(UserInfoHandler({
                        userId: loginUserInfo.userId,
                        email: loginUserInfo.email,
                        nickname: loginUserInfo.nickname,
                        area: respone.data.area || null,
                        area2: loginUserInfo.area2 || null,
                        manager: loginUserInfo.manager, 
                        socialType: loginUserInfo.socialType
                    }))
                })
                his.push({
                    pathname: `./Search`,
                })
            }else{
                await axios.patch(`${process.env.REACT_APP_API_URL}/user/area`, {
                    area2 : giftTag2[0]
                },{withCredentials: true}).then((respone:any) => {
                    console.log(respone)
                    dispatch(UserInfoHandler({
                        userId: loginUserInfo.userId,
                        email: loginUserInfo.email,
                        nickname: loginUserInfo.nickname,
                        area: loginUserInfo.area || null,
                        area2: respone.data.area2 || null,
                        manager: loginUserInfo.manager, 
                        socialType: loginUserInfo.socialType
                    }))
                })
                his.push({
                    pathname: `./Search`,
                })
            }
        }
    }
    
    

    useEffect(() => {
        handleSearchButton()
    }, [searchText])

    

    return(
            <div className='contanier-area'>
                <div className='contanier-area-title-box'>
                    <div className='contanier-area-title'>
                        지역인증
                    </div>
                    
                </div>
                <div className='contanier-area-title-box'>
                    <div>
                        내 위치 확인을 누르시면 자동으로 위치를 검색합니다.
                    </div>
                </div>
                <div className='contanier-area-title-box'>
                    <button className='area-auto-button' onClick = {myLocalHandle}>
                        내 위치 확인
                    </button>
                    <button className='area-auto-button' onClick = {noMyLocalHandle}>직접 할래요</button>
                </div>
                {
                    firstLocal ?
                    <div>
                        <div className='contanier-area-title-box'>
                            {areaSearch}
                        </div>
                        {areaSearch === '검색중...' ? null 
                        :
                        <div >
                            <span className='contanier-area-title-box'>이 위치가 맞습니까?  </span>
                            {areaSearch === '죄송합니다. 직접 지역을 선택해주세요' ? null 
                            :   <div className='contanier-area-title-box'>
                                    <button className='yes-button' onClick = {yesMyLocalHandle}>예</button>
                                    <button className='yes-button' onClick = {noMyLocalHandle}>아니오</button>
                                </div>
                            }
                            
                        </div>
                        }
                    </div>
                    :
                    null
                }
                {
                    threeLocal ? 
                    <div>
                        <div className='contanier-area-title-box'>
                            직접 지역설정
                        </div>
                        <div className='contanier-area-title-box2'> # {giftTag2}
                        </div>
                        <div className='contanier-area-title-box'>
                            <input className='input-search-tag' type="text" value={searchText} onChange={searchTextChange2} placeholder="지역 검색, 시 군단위로 나뉩니다." onKeyPress= {searchHandleKeyPress2} />
                        </div>
                        <div className='contanier-area-title-box'>
                            {searchText === '' ? null
                        :filterTag.map((el:any) => {

                                return <button className='tag-area-button'  onClick = {giftTagHandle2}>{el}</button>
                            
                        })
                        }
                        </div>
                    </div>
                    :
                    null
                }
                {
                    secondLocal ?
                    <div>
                        <div className='contanier-area-title-box'>
                            지역설정 완료 후 한달간 변경은 불가능 합니다
                        </div>
                        <div className='contanier-area-title-box'>
                            <button className='yes-button' onClick={areaSelectHandle}>위치 설정 완료</button>
                        </div>
                    </div>
                    :
                    null
                }
                {
                    giftTag2.length === 1 ? 
                    <div>
                        <div className='contanier-area-title-box'>
                            지역설정 완료 후 한달간 변경은 불가능 합니다
                        </div>
                        <div className='contanier-area-title-box'>
                            <button className='yes-button' onClick={selectAreaSelectHandle}>위치 설정 완료</button>
                        </div>
                    </div>
                    :
                    null
                }
                
            </div>
    )
}

export default Area