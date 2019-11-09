import { UPDATE_ROOT_INFO,UPDATE_REPLY, COMMENT_SUCCESS, REFRESH_INBOX, REFRESH_COMMENTS, POLICY_SUCCESS, UPDATE_BENEFICIARY_INFO,DELETE_BENEFICIARY_INFO } from "../actions/Types";
var _ = require('lodash');
const INITIAL_STATE = { userInfo: {},editUserInfo: {},activeTab:'home',inbox:undefined, earned:undefined , comments:[] , beneficiaryInfo:[], refresh: false };

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch(action.type){
        case UPDATE_ROOT_INFO:
            return { ...state , [action.payload.prop]: action.payload.value};
        case UPDATE_REPLY:
            state["comments"][action.index] = {...state["comments"][action.index], ...action.payload}
            return _.cloneDeep(state) ;
        case REFRESH_COMMENTS:
            return {...state, ...action.payload}
        case REFRESH_INBOX:
            return {...state, ...action.payload}
        case COMMENT_SUCCESS:
            return { ...state , refresh: true};
        case POLICY_SUCCESS:
            return { ...state , ...action.policy};
        case "UPDATE_USER_INFO":
            // return { ...state , editUserInfo: {...state.editUserInfo, [action.payload.prop]: action.payload.value}}

            if(action.payload.prop == 'address'){
                return { ...state , editUserInfo: {...state.editUserInfo, [action.payload.prop]: action.payload.value}}
            }

            return {
                ...state,
                editUserInfo: {
                  ...state.editUserInfo,
                  personal: {
                    ...state.editUserInfo.personal,
                    [action.payload.prop]: action.payload.value
                  }
                }
              }
        case "RESET_INCENTIVE":
            return {...state, inbox:[],earned:[], cursor:{}, earnCount:0, earnedCount:0}

        case UPDATE_BENEFICIARY_INFO:
            if(action.index != null){

                var payload = action.payload;
                state.beneficiaryInfo[action.index] = {
                    ...state.beneficiaryInfo[action.index],
                    ...payload
                  }

                  console.log(state.beneficiaryInfo);
                  return _.cloneDeep(state) ;
            }
            return { 
                    ...state,
                    beneficiaryInfo: [
                        ...state.beneficiaryInfo.slice(0, 0),
                        action.payload,
                        ...state.beneficiaryInfo.slice(0),
                    ],
            }
        case DELETE_BENEFICIARY_INFO:
            return { 
                ...state,
                beneficiaryInfo: [
                    ...state.beneficiaryInfo.slice(0, action.index),
                    ...state.beneficiaryInfo.slice(action.index + 1),
                ],
            }
        default:
            return state;
    }
}
