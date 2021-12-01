import { createAction, ActionType, createReducer  } from 'typesafe-actions';

//스테이트 정의
  //스테이트 타입

export interface loginState  {
  isLogin:boolean
}

  //스테이트 기본값
export const isLoginInitialState: loginState = {
  isLogin:false
}


//액션 정의
  //액션 타입 정의
  //액션은 '앱이름/reducer이름/Acction_type' 형태
const LOGIN = 'UDONDAM/IsLogin/LOGIN';
const LOGOUT = 'UDONDAM/IsLogin/LOGOUT';
  //액션 생성자 정의 및 export
export const LoginHandler = createAction(LOGIN)<boolean>();
export const LogOutHandler = createAction(LOGOUT)<boolean>();

const actions = {LoginHandler,LogOutHandler}; 

export type LoginAction = ActionType<typeof actions>

const IsLoginReducer = createReducer<loginState, LoginAction>(isLoginInitialState, {
  
  [LOGIN]: (state, action) => {
    return Object.assign({},state,{
      isLogin:action.payload
    })
  }
});
//export default로 export 한다
export default IsLoginReducer