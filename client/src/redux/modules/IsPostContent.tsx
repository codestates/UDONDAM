import { createAction, ActionType, createReducer  } from 'typesafe-actions';

//스테이트 정의
  //스테이트 타입

export interface isPostContentState  {
    isPostContent:any
};

  //스테이트 기본값
export const IsPostContentInitialState: isPostContentState = {
    isPostContent:false
};


//액션 정의
  //액션 타입 정의
  //액션은 '앱이름/reducer이름/Acction_type' 형태
const ISPOSTCON = 'UDONDAM/IsPostContent/ISPOST';


  //액션 생성자 정의 및 export
export const isPostContentHandler = createAction(ISPOSTCON)<any>();


const actions = {isPostContentHandler}; 

export type isPostContentAction = ActionType<typeof actions>

const IsPostContentReducer = createReducer<isPostContentState, isPostContentAction>(IsPostContentInitialState, {
  

  [ISPOSTCON]: (state, action) => {
    // console.log(action.payload)
    return Object.assign({},state,{
        isPostContent:action.payload
    })
  }
});
//export default로 export 한다
export default IsPostContentReducer