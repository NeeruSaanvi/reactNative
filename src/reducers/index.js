import { combineReducers } from 'redux';
import BotReducer from './BotReducer';
import LoaderReducer from './LoaderReducer';
import AuthReducer from './AuthReducer';
import RootReducer from './RootReducer';
import ContactsReducer from './ContactsReducer';
import YodleeReducer from './YodleeReducer';
import GetStartReducer from './GetStartReducer';

export default combineReducers({
    bot: BotReducer,
    auth: AuthReducer,
    loader: LoaderReducer,
    root: RootReducer,
    contacts: ContactsReducer,
    yodleeInfo: YodleeReducer,
    getstart: GetStartReducer,
});