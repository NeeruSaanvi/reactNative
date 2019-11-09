
import Contacts from "react-native-contacts";
//import { CustomException } from "../actions/LogActions"
//import { SetUserId, LogEvent } from "./EventLogActions";
import axios from "axios"
import { ShowToast, RemoveDupsFromArray } from "../Helper";

export const GetContactsList = (invite) => {
    return (dispatch) => {
        Contacts.checkPermission((err, permission) => {
            if (permission === 'undefined') {
                Contacts.requestPermission((err, permission) => {
                    readContacts(dispatch,invite);
                })
            }
            if (permission === 'authorized') {
                readContacts(dispatch,invite);

            }
            if (permission === 'denied') {
                console.log('denird');
            }
        });
    }
}

export const GetSelectedContacts = (lContacts) => {
    return (dispatch) => {
        dispatch({
            type: "USER_GROUP_GET_SELECTED_CONTACTS",
            payload: lContacts
        })
    }
}

export const UpdateGroupInfo = (name, participants) => {
    return (dispatch) => {
        dispatch({
            type: "GROUP_INFO",
            payload: { name: name, participants: participants }
        })
    }
}

export const CreateGroup = (userInfo, groupName, participants) => {
    return (dispatch) => {
        let payload = {
            "primary": "",
            "follow": "",
            "contactNumber": "",
            "accepted": true,
            "groupname": groupName,
            "profileid": userInfo.profileid,
            "isadmin": true,
            "items": participants.map(user => Object.assign(user, { groupname: groupName }))
        }

        axios.post('/profiles/groups/create', payload)
            .then(function (response) {
                //LogEvent('User Group Created', payload)
                ShowToast("Group created successfully", 'success');
            }, function (error) {
                ShowToast(error.message, 'danger');
                //CustomException(error)
            })
    }
}

export const CreateInvite = (index,data) => {
    return (dispatch) => {

        axios.post('/profiles/createinvited', [data])
            .then(function (response) {
                dispatch({
                    type: "GET_CONTACTS",
                    payload: {prop:"index", value:index}
                })
                //LogEvent('User Invited', data)
                //ShowToast("Group created successfully", 'success');
            }, function (error) {
                ShowToast(error.message, 'danger');
                //CustomException(error)
            })
    }
}




/**
 * Read Contacts, List names by unique phone number
 * Adding profile id to existing list to by sending list of numbers
 * [lContacts] and [response.data] order/index are same, using which profile id concatination has done
 * 
 **/

readContacts = (dispatch,invite) => {
    var URL = invite ? '/profiles/state': 'profiles/groups/contactprofiles';
    var PROP = invite ? 'inviteContacts' : "contacts"
    Contacts.getAll((err, contacts) => {
        if (err === 'denied') {
            // error
        } else {
            console.log(contacts);

            let compareString = function (a, b) {
                if (a.givenname < b.givenname)
                    return -1;
                if (a.givenname > b.givenname)
                    return 1;
                return 0;
            }

            var lContacts = [];

            contacts.forEach((contact) => {
                contact.phoneNumbers.forEach((phoneNumber) => {
                    lContacts.push({
                        primary: "",
                        follow: "",
                        contactnumber: phoneNumber.number,
                        accepted: false,
                        groupname: "",
                        isadmin: false,
                        familyname: contact.familyName,
                        givenname: contact.givenName,
                        thumbnailpath: contact.thumbnailPath
                    })
                })
            });
            lContacts = RemoveDupsFromArray(lContacts);
            axios.post(URL, lContacts.map(x => x.contactnumber))
                .then(function (response) {
                    console.log(response)
                    if (response.data)
                        lContacts = response.data.map(
                            (contact, index) => Object.assign(lContacts[index], contact)
                        )
                    dispatch({
                        type: "GET_CONTACTS",
                        payload: {prop:PROP, value:lContacts.sort(compareString)}
                    })
                })
                .catch(function (err) {
                    //CustomException(err)
                    ShowToast(err.message, 'danger');
                });
        }
    })
}



