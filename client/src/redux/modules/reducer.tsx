import { combineReducers } from 'redux';
import UserInfoReducer from './UserInfo';
import IsLoginReducer from './IsLogin';
import ValidationReducer from './Validation';


const rootReducer = combineReducers({
    UserInfoReducer,
    IsLoginReducer,
    ValidationReducer
  });  
  
  export default rootReducer;
  export type RootState = ReturnType<typeof rootReducer>;