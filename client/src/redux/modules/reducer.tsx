import { combineReducers } from 'redux';
import UserInfoReducer from './UserInfo';
import IsLoginReducer from './IsLogin';


const rootReducer = combineReducers({
    UserInfoReducer,
    IsLoginReducer
  });  
  
  export default rootReducer;
  export type RootState = ReturnType<typeof rootReducer>;