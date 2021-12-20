import { createAction, ActionType, createReducer  } from 'typesafe-actions';

//스테이트 정의
  //스테이트 타입

export interface commentIdDataState  {
    commentIdData:any
};

  //스테이트 기본값
export const commentIdDataInitialState: commentIdDataState = {
    commentIdData:0
};


//액션 정의
  //액션 타입 정의
  //액션은 '앱이름/reducer이름/Acction_type' 형태
const COMMENTID = 'UDONDAM/CommentIdData/COMMENTID';


  //액션 생성자 정의 및 export
export const commentIdDataHandler = createAction(COMMENTID)<any>();


const actions = {commentIdDataHandler}; 

export type commentIdDataAction = ActionType<typeof actions>

const CommentIdDataReducer = createReducer<commentIdDataState, commentIdDataAction>(commentIdDataInitialState, {
  

  [COMMENTID]: (state, action) => {
    // console.log(action.payload)
    return Object.assign({},state,{
        commentIdData:action.payload
    })
  }
});
//export default로 export 한다
export default CommentIdDataReducer