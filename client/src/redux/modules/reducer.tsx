import { combineReducers } from 'redux';
//import UserInfoReducer from './UserInfo';

const rootReducer = combineReducers({
    //UserInfoReducer
  });  
  
  export default rootReducer;
  export type RootState = ReturnType<typeof rootReducer>;