import { createAction, ActionType, createReducer  } from 'typesafe-actions';

//스테이트 정의
  //스테이트 타입

export interface isMobileState  {
  isMobile:boolean
}

  //스테이트 기본값
export const IsMobileInitialState: isMobileState = {
  isMobile:false
}


//액션 정의
  //액션 타입 정의
  //액션은 '앱이름/reducer이름/Acction_type' 형태
const ISMOBILE = 'UDONDAM/IsMobile/LOGIN';
  //액션 생성자 정의 및 export
export const IsMobileHandler = createAction(ISMOBILE)<boolean>();

const actions = {IsMobileHandler}; 

export type IsMobileAction = ActionType<typeof actions>

const IsMobileReducer = createReducer<isMobileState, IsMobileAction>(IsMobileInitialState, {
  
  [ISMOBILE]: (state, action) => {
    return Object.assign({},state,{
      isMobile:action.payload
    })
  }
});
//export default로 export 한다
export default IsMobileReducer