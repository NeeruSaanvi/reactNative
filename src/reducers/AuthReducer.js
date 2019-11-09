
import { UPDATE_USER_INFO, SIGNIN_USER_SUCCESS,UPDATE_SIGNUP_INFO, VERIFICATION_SUCCESS, UPDATE_PASSWORD,SIGNIN_USER_ERROR, VERIFICATION_SUCCESS_SIGNIN, SIGNUP_USER_SUCCESS,VERIFICATION_FAILED,SIGNUP_USER_FAILED,SIGNIN_SUCCESS_SIGNUP,CREATE_PROFILE } from "../actions/Types";

const INITIAL_STATE = { displayname:'',email:'',password: '', fistname:'',lastname:'',gender: false,pin:null,repin:null,secretpin:null};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UPDATE_USER_INFO:          
            return { ...state , [action.payload.prop]: action.payload.value};
        case SIGNIN_USER_SUCCESS:
            return{ ...state, ...INITIAL_STATE }
        // case SIGNUP_USER_SUCCESS:
        //     return{ ...state, ...INITIAL_STATE }
        case SIGNIN_USER_ERROR:
            return{ ...state, password: '' }
        case VERIFICATION_SUCCESS:
            return{ ...state,  ...INITIAL_STATE }
        case VERIFICATION_SUCCESS_SIGNIN:
            return{ ...state, signIn: true , random: action.randomString}
        case CREATE_PROFILE:
            return{ ...state,createProfile: true, userCode: action.userCode, random: action.randomString}
        case VERIFICATION_FAILED:
            return{ ...state,  verifyFailed: true }
        case UPDATE_PASSWORD:
            return{ ...state, ...INITIAL_STATE }
        case SIGNUP_USER_SUCCESS:
            return { ...state , asyncStatus: true , random: action.randomString, asyncRequestDone: action.asyncRequestDone || null};
        case SIGNUP_USER_FAILED:
            return { ...state , asyncStatus: false, random: action.randomString};
        default:
            return state;
    }
} 
