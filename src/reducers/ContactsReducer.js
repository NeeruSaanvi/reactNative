const INITIAL_STATE = { contacts: [],inviteContacts:[],index:null };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "GET_CONTACTS":          
            return { ...state , [action.payload.prop]: action.payload.value};
        // case  "INVITE_SUCCESS":
        //     var payload = action.payload.value;
        //     state.inviteContacts[action.index] = {
        //         ...state.inviteContacts[action.index],
        //         ...payload
        //     }
        //     return _.cloneDeep(state) ;
        default:
            return state;
    }
} 