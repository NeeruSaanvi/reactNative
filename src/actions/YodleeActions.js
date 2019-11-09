import {UPDATE_YODLEE_USER_INFO,
    SIGN_YODLEE_USER,
    REGISTER_YODLEE_USER,
    COBRAND_USER,
    COBRAND_PASSWORD,
    LOAD_YODLEE_FASTLINK,
    SHOW_LOADER,
    HIDE_LOADER,
    API_KEY,
    BASE_URL,
    YODLEE_API,} from "./Types";
import {ShowToast} from "../Helper";

import { Actions } from "react-native-router-flux";

import axios from "axios";
//import { LogEvent } from "./EventLogActions";

const YodleeHeader = {
    headers : {
         "Api-Version": 1.1,
        "Cobrand-Name": "restserver",
    }
}




export const UpdateYodleeUserInfo = ({ prop, value}) => {

console.log(prop +" "+value)
return{

    type: UPDATE_YODLEE_USER_INFO,
    payload: {prop, value}
}
}

export const YodleeUserSession = (userInfo) =>{
    return(dispatch) =>{
        console.log(userInfo);
        dispatch({ type: SHOW_LOADER });
        axios.post('aggregrator/financial/yodlee/sessions',userInfo)
        .then(function(response){
    
            console.log(response.data);
            dispatch({type:UPDATE_YODLEE_USER_INFO,payload: {prop: 'userSession', value: response.data}});
            dispatch({type:LOAD_YODLEE_FASTLINK}); 
            dispatch({ type: HIDE_LOADER });
            GetUserAccouts(dispatch,response.data);
            //LogEvent('User conneted to yodlee');
    
        })
        .catch(function (error) {
            //handle error
            console.log(error);
            console.log(error.response);
            dispatch({ type: HIDE_LOADER });
            ShowToast(error.message, 'danger');
            //GetUserAccouts(dispatch);
        });
    }

}

// export const CobrandSignIn = () =>{
//     return(dispatch)=>{
//         dispatch({ type: SHOW_LOADER });
//         const cobrandData = {
//             "cobrand":      {
//               "cobrandLogin": "sbCobdca13540a3c140187834e5ada45e89851a",
//               "cobrandPassword": "5059df2f-add4-4d02-8480-c901e9639f8b",
//               "locale": "en_US"
//              }
//         }
//         console.log(cobrandData);

//         axios.post(YODLEE_API+'cobrand/login',cobrandData,YodleeHeader)
//         .then(function (response) {
//               console.log(response);
//               dispatch({type:UPDATE_YODLEE_USER_INFO,payload: {prop: 'cobrandInfo', value: response.data}});
//                 dispatch({ type: HIDE_LOADER });
            
//         })
//         .catch(function (err) {
//           console.log(err);
//             dispatch({ type: HIDE_LOADER });
          
//           ShowToast(err.message, 'danger');
//         });
//     }
// }


// export const SignInYodleeUser = ({username, password,cobrandSession}) =>{
//     return(dispatch)=>{
//         dispatch({ type: SHOW_LOADER });
        
//         const userAuthData = {
//             "user":      {
//               "loginName": "sbMemdca13540a3c140187834e5ada45e89851a1",
//               "password": "sbMemdca13540a3c140187834e5ada45e89851a1#123",
//               "locale": "en_US"
//              }
//         }
//         YodleeHeader.headers['Authorization'] = "{cobSession="+cobrandSession+"}";
//         console.log(userAuthData);
//         console.log(YodleeHeader);
//         axios.post(YODLEE_API+'user/login',userAuthData,YodleeHeader
//         )
//         .then(function (response) {
//             console.log(response);
//             dispatch({type:UPDATE_YODLEE_USER_INFO,payload: {prop: 'userInfo', value: response.data}});            
//             GetAccessToken(dispatch,cobrandSession,response.data.user.session.userSession)
          
//         },function(err){
//             dispatch({ type: HIDE_LOADER });           
//             console.log(err.response);
//             ShowToast(err.message, 'danger');
            
//         })
//     }
// }

// SendToDataSource = (userAuthData)=> {
//     { "userid":"","password":"","locale":"" }
// }

// GetAccessToken = (dispatch,cobrandSession,userSession) =>{
//    // return(dispatch)=>{

//         YodleeHeader.headers['Authorization'] = "{cobSession="+cobrandSession+",userSession="+userSession+"}";
    
//         console.log(YodleeHeader);
//         axios.get(YODLEE_API+'user/accessTokens?appIds=10003600',
//         YodleeHeader
//         )
//         .then(function (response) {
//             console.log(response);
//           dispatch({type:UPDATE_YODLEE_USER_INFO,payload: {prop: 'rSession', value: response.data}});
//           dispatch({type:LOAD_YODLEE_FASTLINK, payload: {prop: 'rSession', value: response.data}});          
//           dispatch({ type: HIDE_LOADER });           
          
          
//         },function(err){
//             console.log(err.response);
//             dispatch({ type: HIDE_LOADER });           
            
//             ShowToast(err.response.data.errorMessage, 'danger');
            
//         })
//    // }
// }

GetUserAccouts = (dispatch,sessionInfo) =>{
    const userAccountInfo = {
        "account": [
          {
            "availableCash": {
              "amount": 600,
              "currency": "USD"
            },
            "includeInNetWorth": true,
            "availableCredit": {
              "amount": 1363,
              "currency": "USD"
            },
            "accountName": "CREDIT CARD",
            "accountType": "OTHER",
            "isManual": false,
            "accountNumber": "************8614",
            "accountStatus": "ACTIVE",
            "lastUpdated": "2018-03-12T07:45:36Z",
            "isAsset": false,
            "createdDate": "2018-03-12T07:45:30Z",
            "balance": {
              "amount": 1636.44,
              "currency": "USD"
            },
            "aggregationSource": "USER",
            "totalCashLimit": {
              "amount": 600,
              "currency": "USD"
            },
            "providerId": "16441",
            "providerAccountId": 10758579,
            "CONTAINER": "creditCard",
            "id": 11463907,
            "totalCreditLine": {
              "amount": 3000,
              "currency": "USD"
            },
            "providerName": "Dag Site"
          },
          {
            "includeInNetWorth": true,
            "accountName": "TESTDATA1",
            "currentBalance": {
              "amount": 9044.78,
              "currency": "USD"
            },
            "accountType": "SAVINGS",
            "isManual": false,
            "displayedName": "accountHolder",
            "accountNumber": "503-5623xxx",
            "availableBalance": {
              "amount": 65454.78,
              "currency": "USD"
            },
            "accountStatus": "ACTIVE",
            "lastUpdated": "2018-03-12T07:45:30Z",
            "isAsset": true,
            "createdDate": "2018-03-12T07:45:30Z",
            "balance": {
              "amount": 9044.78,
              "currency": "USD"
            },
            "aggregationSource": "USER",
            "providerId": "16441",
            "providerAccountId": 10758579,
            "CONTAINER": "bank",
            "id": 11463906,
            "providerName": "Dag Site"
          },
          {
            "includeInNetWorth": true,
            "accountName": "TESTDATA",
            "currentBalance": {
              "amount": 44.78,
              "currency": "USD"
            },
            "accountType": "CHECKING",
            "isManual": false,
            "displayedName": "accountHolder",
            "accountNumber": "503-1123xxx",
            "availableBalance": {
              "amount": 54.78,
              "currency": "USD"
            },
            "accountStatus": "ACTIVE",
            "lastUpdated": "2018-03-12T07:45:30Z",
            "isAsset": true,
            "createdDate": "2018-03-12T07:45:30Z",
            "balance": {
              "amount": 44.78,
              "currency": "USD"
            },
            "aggregationSource": "USER",
            "providerId": "16441",
            "providerAccountId": 10758579,
            "CONTAINER": "bank",
            "id": 11463905,
            "providerName": "Dag Site"
          }
        ]
      }
       dispatch({type:UPDATE_YODLEE_USER_INFO,payload: {prop: 'linkedAccounts', value: userAccountInfo}});
      dispatch({type:LOAD_YODLEE_FASTLINK}); 
       dispatch({ type: HIDE_LOADER });  
    //   YodleeHeader.headers['Authorization'] = "{cobSession="+sessionInfo.cobrandsession+",userSession="+sessionInfo.usersession+"}";
    // axios.get(YODLEE_API+'/accounts',
    // YodleeHeader
    // )
    // .then(function (response) {
    //     console.log(response);
    //     dispatch({type:UPDATE_YODLEE_USER_INFO,payload: {prop: 'linkedAccounts', value: response.data}});
    //     dispatch({type:LOAD_YODLEE_FASTLINK}); 
    //     dispatch({ type: HIDE_LOADER });          
      
      
    // },function(err){
    //     console.log(err.message);
    //     dispatch({ type: HIDE_LOADER });           
        
    //     ShowToast(err.message, 'danger');
        
    // })
}

