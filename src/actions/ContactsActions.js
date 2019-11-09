import { GETSTART_USER_INFO, SHOW_LOADER, HIDE_LOADER, FB_PERMISSION, UPDATE_ROOT_INFO, USER_PROFILE_CREATION_SUCCESS } from "./Types";
import { Actions } from "react-native-router-flux";
import Contacts from "react-native-contacts";
import axios from "axios";
import { ShowToast } from "../Helper";

export const GetContacts = () => {
    return (dispatch) => {
        Contacts.checkPermission((err, permission) => {

            if (permission === 'undefined') {
                Contacts.requestPermission((err, permission) => {
                    console.log("got persmission");
                    readContactBook();
                })
            }
            if (permission === 'authorized') {
                console.log('is der');
                readContactBook(dispatch);

            }
            if (permission === 'denied') {
                console.log('denird');
            }
        });
    }

}

readContactBook = (dispatch) => {
    Contacts.getAll((err, contacts) => {
        if (err === 'denied') {
            // error
        } else {
            console.log(contacts);

            let compareString = function (a, b) {
                if (a.givenName < b.givenName)
                    return -1;
                if (a.givenName > b.givenName)
                    return 1;
                return 0;
            }
            contacts = contacts.sort(compareString)

            //this.props.UpdateStartInfo({prop: 'contacts', value:contacts});
            UpdateStartInfo({ prop: 'contacts', value: contacts })
            // return{

            //     type: GETSTART_USER_INFO,
            //     payload: {prop, value}
            // }
            dispatch({
                type: GETSTART_USER_INFO,
                payload: { prop: 'contacts', value: contacts }
            })
            // console.log(this.props.contacts);
        }
    })
}



