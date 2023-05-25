import { createStore, combineReducers} from 'redux';
import LoginReducer from './reducers/loginReducer';
 
const rootReducer = combineReducers({
  isLogged: LoginReducer,
});
 
export const store = createStore(rootReducer);