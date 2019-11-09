import { UPDATE_ROOT_INFO,SHOW_LOADER, HIDE_LOADER, UPDATE_REPLY,COMMENT_SUCCESS, REFRESH_INBOX, REFRESH_COMMENTS, POLICY_SUCCESS,UPDATE_BENEFICIARY_INFO,DELETE_BENEFICIARY_INFO } from "./Types";
import { Actions } from "react-native-router-flux";
import axios from "axios";
//import {CustomException} from "../actions/LogActions"
import {ShowToast} from "../Helper";
//import { LogEvent, SetUserProperties } from "./EventLogActions";
export const UpdateRootInfo = ({ prop, value}) => {

    return{

        type: UPDATE_ROOT_INFO,
        payload: {prop, value}
    }
}

export const ClearIncentive = () =>{
    return (dispatch) =>{
        dispatch({type:"RESET_INCENTIVE"})
    }
}

export const GetIncentive = (data, isRefresh, previousData = []) =>{
     return(dispatch)=>{
        console.log(data);
        axios.post('analytic/inbox/refresh',data)
          .then(function (response) {
            console.log(JSON.stringify(response.data));

            if(response.data){
                dispatch({type:REFRESH_INBOX, payload:{
                    'earnCount' : response.data.totalcounts,
                    'cursor' : response.data.cursor,
                    'inbox' : previousData.concat(response.data.inboxitems || [])
                }})
            }

          })
          .catch(function (err) {
              //CustomException(err)
              ShowToast(err.message, 'danger');
        });
     }
}

export const GetEarnedIncentive = (data, isRefresh, previousData = []) =>{
    return(dispatch)=>{
        console.log(data);
       axios.post('analytic/inbox/earned',data)
         .then(function (response) {
           console.log(response);

           if(response.data){
                dispatch({type:REFRESH_INBOX, payload:{
                    'earnedCount' : response.data.totalcounts,
                    'earnedCursor' : response.data.cursor,
                    'earned' : previousData.concat(response.data.inboxitems || [])
                }})
            }

         })
         .catch(function (err) {
             //CustomException(err)
             ShowToast(err.message, 'danger');
       });
    }
}

export const SendAction = (data) => {

    return(dispatch)=>{
       // dispatch({ type: SHOW_LOADER })
        axios.post('/analytic/incentives/action',data)
        .then(function (response) {
        //  dispatch({ type: HIDE_LOADER })
          console.log(response);
          //LogEvent('User Performed Action', {id:data.id, action:data.actiontype})
        })
        .catch(function (err) {
            //CustomException(err)
            ShowToast(err.message, 'danger');
      });
    }

}

export const MarkRead = (data) => {

    return(dispatch)=>{

        axios.post('/analytic/inbox/markread',data)
        .then(function (response) {

          console.log(response);
          //LogEvent('User read card', data);
        
        })
        .catch(function (err) {
            console.log(err.response);

            ShowToast(err.message, 'danger');
      });
    }

}

export const GetComment = (data , index, previousData = []) => {
    return(dispatch)=>{
        console.log(data);

        if(index == undefined)
            delete data.parentcommentid;

        if(previousData.length == 0)
            dispatch({ type: SHOW_LOADER })

        axios.post('/analytic/incentives/readcomments',data)
        .then(function (response) {

        if(index)
            dispatch({
                type: UPDATE_REPLY, payload: {
                    'viewReply': true,
                    'replies': previousData.concat(response.data.comments || []),
                    'repliesCount': response.data.totalcounts,
                    'repliesCursor': response.data.cursor
                }, index : index
            });
        else
            dispatch({type:REFRESH_COMMENTS,payload: {
                'comments' : previousData.concat(response.data.comments || []),
                'commentsCount' : response.data.totalcounts,
                'commentsCursor' : response.data.cursor
            }});

        console.log(response);
        dispatch({ type: HIDE_LOADER })
        })
        .catch(function (err) {
            //CustomException(err);
            dispatch({ type: HIDE_LOADER })
            ShowToast(err.message, 'danger');
      });
    }

}

export const SendComment = (data) => {

    return(dispatch)=>{
        console.log(data);
       // dispatch({ type: SHOW_LOADER })
        axios.post('/analytic/incentives/comments',data)
        .then(function (response) {
        //  dispatch({ type: HIDE_LOADER })
            dispatch({ type: COMMENT_SUCCESS })
          console.log(response);

            //LogEvent('User Commented on a card', {incentiveid: data.incentiveid, category: data.category, subcatogory: data.subcategory})

        })
        .catch(function (err) {
            //CustomException(err)
          //  dispatch({ type: HIDE_LOADER })
            ShowToast(err.message, 'danger');
      });
    }

}

export const UpdateProfile = (data) => {

    return(dispatch)=>{
        axios.post('profiles/photouploaded',data)
        .then(function (response) {
            dispatch({
                type:"UPDATE_USER_INFO",
                payload: {prop:"displayname", value:data.displayname}
            })
            ShowToast('Profile Updated Successfuly', 'success');
            //LogEvent('User Updated Profile');
        })
        .catch(function (err) {
            //CustomException(err)
            ShowToast(err.message, 'danger');
      });
    }

}

export const UpdatePersonalInfo = (data) => {

    return(dispatch)=>{
        dispatch({ type: SHOW_LOADER });
        axios.post('/profiles/update',data)
        .then(function (response) {
            dispatch({
                type:"UPDATE_USER_INFO",
                payload: {prop:"displayname", value:data.displayname}
            })
            dispatch({ type: HIDE_LOADER });
            ShowToast('Your personal information is successfully updated', 'success');
            //LogEvent('User personal information updated');
        })
        .catch(function (err) {
            dispatch({ type: HIDE_LOADER });
            //CustomException(err)
            ShowToast(err.message, 'danger');
      });
    }

}

export const UpdateEditProfileInfo = ({ prop, value}) => {

    return{

        type:"UPDATE_USER_INFO",
        payload: {prop, value}
    }
}

export const GetProfile = (profileid) =>{
    return(dispatch)=>{
        dispatch({ type: SHOW_LOADER });
        axios.get(`profiles/${profileid}`)
        .then(function (response) {
            console.log("editUserInfo" + response.data);
            dispatch({
                type:UPDATE_ROOT_INFO,
                payload: {prop:"editUserInfo", value:response.data}
            })
            dispatch({ type: HIDE_LOADER });
        })
        .catch(function (err) {
            //CustomException(err)
            dispatch({ type: HIDE_LOADER });
            ShowToast(err.message, 'danger');
        });
    }
}

export const GetPolicy = (data) => {
    return(dispatch)=>{
        console.log(data);

       axios.post('/policyadmin/policy', data)
         .then(function (response) {
           console.log(response);

           if(response.data) {
             dispatch({type:POLICY_SUCCESS,policy: {
               'defaultduration': response.data[0].defaultduration,
               'defaultfacevalue': response.data[0].defaultfacevalue,
               'duration': response.data[0].duration,
               'earnedfacevalue': response.data[0].earnedfacevalue,
               'issuedate': response.data[0].issuedate,
               'profileid': response.data[0].profileid,
             }});
             //SetUserProperties({facevalue:response.data[0].earnedfacevalue})
            }

         })
         .catch(function (err) {
             //CustomException(err)
             ShowToast(err.message, 'danger');
       });
    }
}

export const GetBeneficiary = () => {
    const data = [{
        name:"Alice",
        relationship:"Wife",
        dob:"1992-10-01",
        percentage:"40"
    },{
        name:"David",
        relationship:"Father",
        dob:"1969-10-01",
        percentage:"20"
    },{
        name:"Marry",
        relationship:"Mother",
        dob:"1969-12-01",
        percentage:"20"
    },{
        name:"Peter",
        relationship:"Son",
        dob:"2018-01-01",
        percentage:"20"
    }]

    return{

        type:UPDATE_ROOT_INFO,
        payload: {prop:"beneficiaryInfo", value:data}
    }
}

export const UpdateBeneficaiaryInfo = (data,index) => {
    console.log(data);
    console.log(typeof index);

    return{

        type:UPDATE_BENEFICIARY_INFO,
        payload: data,
        index: index
    }
}

export const DeleteBeneficairyInfo = (index) => {
    return{

        type:DELETE_BENEFICIARY_INFO,
        index: index
    }
}

