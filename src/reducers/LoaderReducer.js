import { SHOW_LOADER, HIDE_LOADER } from "../actions/Types";

const INITIAL_STATE = { loading: false };

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch(action.type){
        case SHOW_LOADER:
            return { ...state, loading: true}
        case HIDE_LOADER:
            return { ...state, loading: false}
        default:
            return state;
    }
} 