import { GETSTART_USER_INFO,USER_PROFILE_CREATION_SUCCESS } from "../actions/Types";

const INITIAL_STATE = {  fistname:'',lastname:'', selectedContacts:[], contacts:[],socialdatasource:[] };
var _ = require('lodash');

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch(action.type){
        case GETSTART_USER_INFO:
            if(action.payload.prop === 'socialdatasource'){
                return { ...state , [action.payload.prop]: [...state.socialdatasource , action.payload.value]}
            }
                     
            return { ...state , [action.payload.prop]: action.payload.value};
        case GETSTART_USER_INFO:      
            return { ...state , ...INITIAL_STATE};
        
        default:
            return state;
    }
} 