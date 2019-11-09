import { UPDATE_BOT_INFO, HIDE_BOT_LOADER, SHOW_BOT_LOADER, RESET_BOT_INFO,UPDATE_BOT_ANSWER, UPDATE_USER_QUESTIONS,SIGN_UP_SUCCESS } from "../actions/Types";
var _ = require('lodash');
const INITIAL_STATE = { botData:{} , botQA:[], userQuestions:[], requestapi:"",responseapi:"", botLoader: true, received: false};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch(action.type){
        case UPDATE_BOT_INFO:
            return { ...state , [action.payload.prop]: action.payload.value};
        case UPDATE_BOT_ANSWER:
            const newState = {...state};
            console.log(action.payload.value.index);
            var i = newState[action.payload.prop].splice(action.payload.value.index, 1, action.payload.value.answer);
            console.log(i);
            return newState ;
        case UPDATE_USER_QUESTIONS:
        console.log(action.payload.index + "bot load");
        console.log(state.userQuestions);
            if(action.payload.index != null){

                if(action.payload.index == -1){
                    //delete last
                    return { 
                        ...state,
                        [action.payload.prop]: [
                            ...state[action.payload.prop].slice(action.payload.index),
                            ...state[action.payload.prop].slice(action.payload.index + 1),
                        ]
                    }
                }
                else{
                    var payload = action.payload.value;
                    state[action.payload.prop][action.payload.index] = {
                        ...state[action.payload.prop][action.payload.index],
                        ...payload
                    }
                    return {...state} ;
                }
            }
            return { 
                ...state,
                [action.payload.prop]:[...state[action.payload.prop], action.payload.value]
            } ;
        case HIDE_BOT_LOADER:
            return { ...state , botLoader: false};
        case RESET_BOT_INFO:
            return INITIAL_STATE;
        case SHOW_BOT_LOADER:
            return { ...state , botLoader: true};
        case "received":
            return { ...state , received: true};
        default:
            return state;
    }
} 