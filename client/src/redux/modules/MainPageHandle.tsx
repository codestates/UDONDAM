import { createAction, ActionType, createReducer  } from 'typesafe-actions';
import Interest from '../../pages/Interest';

//스테이트 정의
  //스테이트 타입

export interface MainPageState  {
  interestBoxOn:boolean,
  interestBox:any,
  contentBoxOn:boolean,
  contentBox?:any
}

  //스테이트 기본값
export const MainPageInitialState: MainPageState = {
  interestBoxOn:false,
  interestBox:<Interest/>,
  contentBoxOn:false,
  contentBox:null
}


//액션 정의
  //액션 타입 정의
  //액션은 '앱이름/reducer이름/Acction_type' 형태
const MAINPAGE = 'UDONDAM/MainPageHandle/MAINPAGE';
  //액션 생성자 정의 및 export
export const MainPageHandler = createAction(MAINPAGE)<any>();

const actions = {MainPageHandler}; 

export type MainPageHandleAction = ActionType<typeof actions>

const MainPageReducer = createReducer<MainPageState, MainPageHandleAction>(MainPageInitialState, {
  
  [MAINPAGE]: (state, action) => {
    return Object.assign({},state,{
      interestBoxOn:action.payload,
      isLogin:action.payload
    })
  }
});
//export default로 export 한다
export default MainPageReducer