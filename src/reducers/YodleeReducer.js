import { UPDATE_YODLEE_USER_INFO, SIGNUP_YODLEE_USER, SIGNIN_YODLEE_USER,LOAD_YODLEE_FASTLINK} from "../actions/Types";

const INITIAL_STATE = { username:"",password:"",cobrandInfo:{},loadFastLink:false,userSession:{},linkedAccounts:{}};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    
    switch(action.type){
        case UPDATE_YODLEE_USER_INFO:          
            return { ...state , [action.payload.prop]: action.payload.value};
        case SIGNIN_YODLEE_USER:
            return{ ...state, ...INITIAL_STATE }
        case SIGNUP_YODLEE_USER:
            return{ ...state, ...INITIAL_STATE }
        case LOAD_YODLEE_FASTLINK:
            return{ ...state, loadFastLink:true }
        default:
            return state;
    }
} 