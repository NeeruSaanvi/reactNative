import { GETSTART_USER_INFO, SHOW_LOADER, HIDE_LOADER, FB_PERMISSION, UPDATE_ROOT_INFO, USER_PROFILE_CREATION_SUCCESS } from "./Types";
import { Actions } from "react-native-router-flux";
import Contacts from "react-native-contacts";
import axios from "axios";
import { ShowToast } from "../Helper";

export const UpdateStartInfo = ({ prop, value }) => {

    console.log(prop + " " + value);
    return {

        type: GETSTART_USER_INFO,
        payload: { prop, value }
    }
}

export const GetConfig = () => {
    return (dispatch) => {
        //dispatch({ type: SHOW_LOADER });
        axios.get('/configs/dataaggregatorappdetails')
            .then(function (response) {
                // dispatch({ type: HIDE_LOADER })
                dispatch({
                    type: GETSTART_USER_INFO,
                    payload: { prop: 'socialdataConfig', value: response.data[0].configs }
                })
                console.log(response.data[0].configs);
            })
            .catch(function (err) {
                //CustomException(err)
                //dispatch({ type: HIDE_LOADER })
                ShowToast(err.message, 'danger');
            });
    }
}

export const ConnectToDataSource = (userInfo, cardInfo, dataSourceDto, datasourceconfig) => {
    return (dispatch) => {
        var socialdata = {
            "profileid": userInfo.profileid,
            "categoryid": "Social",
            "subcategoryid": cardInfo.inboxitem.subcategoryname,
            "isconnected": true,
            "sourcetype": cardInfo.inboxitem.properties.filter((x) => x.key.toLowerCase() == "sourcetype").map((x) => x.value)[0],
            "createddate": getDate(),
            "connectionstatus": 1,
            "datasourceconfig": JSON.stringify(datasourceconfig),
            "endpoint": ""
        }
        axios.post('/profiles/datasources', socialdata)
            .then(function (response) {
                const { inboxitem } = cardInfo;
                console.log(cardInfo);
                Actions.pop({refresh: {refresh:Math.random()}});
                //MarkRead({ id: inboxitem.id, amount: inboxitem.amount }, dispatch);
                //LogEvent('User connected a datasource', {socialdata: socialdata.sourcetype})
            }, function (error) {
                CustomException(error)
            })
    }
}


getDate = () => {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    console.log([year, month, day].join('-'));
    return [year, month, day].join('-');
}




