import React, { useState, useEffect } from "react";
import styled from "styled-components"
import Interest from "./Interest";
import TimeLine from "./timeLine/TimeLine";
import Content from "./Content";
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { MainPageHandler } from "../redux/modules/MainPageHandle";

export interface pageOnOffState {
    interestOn: boolean
    timeLineOn: boolean,
    contentOn: boolean
}

function MainPage () {
    const test = useSelector((state: RootStateOrAny)=>state.MainPageReducer)
    console.log(useSelector((state: RootStateOrAny)=>state.MainPageReducer))

    const dispatch = useDispatch()
    const [pageOnOff, setPageOnOff] = useState<pageOnOffState>({
        interestOn: false,
        timeLineOn: true,
        contentOn: false
    })
    const [contentPage, setContentPage] = useState<any>(<Interest />)
    const [triger, setTriger] = useState<boolean>(false)
    const MainPageContainer = styled.div`
        display: flex;
        flex-direction: row;
    `;
    const InterestContainer =styled.div``;
    const TimeLineContainer =styled.div``;
    const ContentContainer =styled.div``;
    
    console.log('interestBoxOn내용:',useSelector((state: RootStateOrAny)=>state.MainPageReducer).interestBoxOn)
    useEffect(()=>{
        console.log('useEffect작동')
        
    },[triger])
    
    
    const InterestHandler = function(){
        setTriger(!triger)
        setPageOnOff({...pageOnOff, interestOn:!pageOnOff.interestOn})
        dispatch(MainPageHandler({
            interestBoxOn: true,
            interestBox:<Interest/>,
            contentBoxOn:false,
            contentBox:null
        }))
    }

    // const contentPageHandler = function(){
    //     setContentPage(<TimeLine />)

    // }

    return(
        <div>
            <button onClick={InterestHandler}>관심글테스트</button>
        <MainPageContainer>
            
            {useSelector((state: RootStateOrAny)=>state.MainPageReducer).interestBoxOn ? 
            <InterestContainer>
                <Interest />
            </InterestContainer>
            : null }
            {pageOnOff.timeLineOn ? 
            <TimeLineContainer>
                {/* <TimeLine /> */}
            </TimeLineContainer>
            : null }
            {/* {pageOnOff.timeLineOn ? 
            <ContentContainer>
                <Content  />
            </ContentContainer>
            : null } */}
            {pageOnOff.timeLineOn ? 
            <TimeLineContainer>
                {contentPage}
            </TimeLineContainer>
            : null }
        </MainPageContainer>
        </div>
    )

}

export default  MainPage