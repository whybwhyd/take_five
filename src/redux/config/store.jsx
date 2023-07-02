import { createStore } from 'redux';
import { combineReducers } from 'redux';
import userId from '../modules/UserId';
import userInfo from '../modules/UserInfo';
import userWrite from '../modules/UserWrite';
import LoginModule from '../modules/LoginModule';
import editDetail from '../modules/DetailInfo';

const rootReducer = combineReducers({
  userId,
  userInfo,
  userWrite,
  LoginModule,
  editDetail,
});

const store = createStore(rootReducer);

export default store;
