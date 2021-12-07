import { combineReducers } from 'redux';
import UserInfoReducer from './UserInfo';
import IsLoginReducer from './IsLogin';
import ValidationReducer from './Validation';
import IsMobileReducer from './IsMobile';


const rootReducer = combineReducers({
    UserInfoReducer,
    IsLoginReducer,
    ValidationReducer,
    IsMobileReducer
  });  
  
  export default rootReducer;
  export type RootState = ReturnType<typeof rootReducer>;