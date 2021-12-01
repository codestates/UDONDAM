import { createAction, ActionType, createReducer  } from 'typesafe-actions';

//스테이트 정의
  //스테이트 타입

export interface validationState  {
  validEmail:boolean,
  validPassword:boolean,
  validPasswordCheck:boolean,
  validNumber:boolean
};

  //스테이트 기본값
export const validationInitialState: validationState = {
  validEmail:true,
  validPassword:true,
  validPasswordCheck:true,
  validNumber:true
};


//액션 정의
  //액션 타입 정의
  //액션은 '앱이름/reducer이름/Acction_type' 형태
const MAILCHECK = 'UDONDAM/Validation/VALIDCHECK';
const PASSWORDCHECK = 'UDONDAM/Validation/PASSWORDCHECK';
const PASSWORDSAMECHECK = 'UDONDAM/Validation/PASSWORDSAMECHECK';
const NUMBERCHECK = 'UDONDAM/Validation/NUMBERCHECK';

  //액션 생성자 정의 및 export
export const emailCheckHandler = createAction(MAILCHECK)<boolean>();
export const passwordCheckHandler = createAction(PASSWORDCHECK)<boolean>();
export const passwordSameCheckHandler = createAction(PASSWORDSAMECHECK)<boolean>();
export const numberCheckHandler = createAction(NUMBERCHECK)<boolean>();

const actions = {
  emailCheckHandler,
  passwordCheckHandler,
  passwordSameCheckHandler,
  numberCheckHandler
}; 

export type validationAction = ActionType<typeof actions>

const ValidationReducer = createReducer<validationState, validationAction>(validationInitialState, {
  
  [MAILCHECK]: (state, action) => {
    return Object.assign({},state,{
      validEmail:action.payload,
    })
  },
  [PASSWORDCHECK]: (state, action) => {
    return Object.assign({},state,{
      validPassword:action.payload
    })
  },
  [PASSWORDSAMECHECK]: (state, action) => {
    return Object.assign({},state,{
      validPasswordCheck:action.payload
    })
  },
  [NUMBERCHECK]: (state, action) => {
    return Object.assign({},state,{
      validNumber:action.payload
    })
  }
});
//export default로 export 한다
export default ValidationReducer