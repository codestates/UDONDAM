import { createAction, ActionType, createReducer  } from 'typesafe-actions';

//스테이트 정의
  //스테이트 타입

export interface guestState  {
    isGuest:boolean
}

  //스테이트 기본값
export const isGuestInitialState: guestState = {
    isGuest:false
}


//액션 정의
  //액션 타입 정의
  //액션은 '앱이름/reducer이름/Acction_type' 형태
const ISGUEST = 'UDONDAM/IsGuest/ISGUEST';
  //액션 생성자 정의 및 export
export const IsGuestHandler = createAction(ISGUEST)<boolean>();

const actions = {IsGuestHandler}; 

export type GuestAction = ActionType<typeof actions>

const IsGuestReducer = createReducer<guestState, GuestAction>(isGuestInitialState, {
  
  [ISGUEST]: (state, action) => {
    return Object.assign({},state,{
        isGuest:action.payload
    })
  }
});
//export default로 export 한다
export default IsGuestReducer