import { combineReducers } from 'redux';
import UserInfoReducer from './UserInfo';
import IsLoginReducer from './IsLogin';
import ValidationReducer from './Validation';
import IsMobileReducer from './IsMobile';
import MainPageReducer from './MainPageHandle';


const rootReducer = combineReducers({
    UserInfoReducer,
    IsLoginReducer,
    ValidationReducer,
    IsMobileReducer,
    MainPageReducer
  });  
  
  export default rootReducer;
  export type RootState = ReturnType<typeof rootReducer>;