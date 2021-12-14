import { combineReducers } from 'redux';
import UserInfoReducer from './UserInfo';
import IsLoginReducer from './IsLogin';
import ValidationReducer from './Validation';
import IsMobileReducer from './IsMobile';
import MainPageReducer from './MainPageHandle';
import IsGuestReducer from './IsGuest';
import CommentIdData from './CommentIdData';


const rootReducer = combineReducers({
    UserInfoReducer,
    IsLoginReducer,
    ValidationReducer,
    IsMobileReducer,
    MainPageReducer,
    IsGuestReducer,
    CommentIdData
  });  
  
  export default rootReducer;
  export type RootState = ReturnType<typeof rootReducer>;