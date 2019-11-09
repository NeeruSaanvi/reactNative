import {UPDATE_USER_INFO,
    SIGNIN_USER_SUCCESS,
    UPDATE_SIGNUP_INFO,
    POOL_DATA,
    SHOW_LOADER,
    HIDE_LOADER,
    VERIFICATION_SUCCESS,
    UPDATE_PASSWORD,
    SIGNIN_USER_ERROR,
    REGION,
    POOL_IDENTITY,
    VERIFICATION_SUCCESS_SIGNIN,
    API_KEY,
    BASE_URL,
    UPDATE_ROOT_INFO,
    SIGNUP_USER_SUCCESS,
    VERIFICATION_FAILED,
    SIGNUP_USER_FAILED,
    SIGNIN_SUCCESS_SIGNUP,
    CREATE_PROFILE} from "./Types";
import {ShowToast} from "../Helper";

import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import AWS from "aws-sdk";

import { Actions } from "react-native-router-flux";

import axios from "axios";

// import {CustomException, CSLog} from "../actions/LogActions"
// import { SetUserId, LogEvent } from "./EventLogActions";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['x-api-key'] = API_KEY;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const cognitoUser = null;
const userPool = new CognitoUserPool(POOL_DATA);
AWS.config.region = REGION;

export const UpdateUserInfo = ({ prop, value}) => {
    return{
        type: UPDATE_USER_INFO,
        payload: {prop, value}
    }
}


export const CheckUserLogin = () =>{
    return(dispatch)=> {
        userPool.storage.sync(function(err, result) {
            if (err) { }
            else if (result === 'SUCCESS') {
              cognitoUser = userPool.getCurrentUser();
              console.log(cognitoUser)
                if (cognitoUser != null) {
                    cognitoUser.getSession(function(err, session) {
                        if (err) {
                            Actions.reset('auth');
                            return;
                        }
                        console.log('session validity: ' + session.isValid());
                        if(session.isValid()){

                        }
                        updateUserCreds(session,dispatch)
                        refreshToken();       
                    });
                }
                else{
                    Actions.reset('auth');
                    return;
                }

            }
        });
    }
}

export const SignInUser = ({email, password , reqFrom}) =>{
   console.log('sign in called')
    return(dispatch)=> {
        dispatch({ type: SHOW_LOADER });
        console.log(email , password)
        var authenticationData = {
            Username : email,
            Password : password,
        };

        var userData = {
            Username: email,
            Pool: userPool
        }

        var authenticationDetails = new AuthenticationDetails(authenticationData);

        cognitoUser = new CognitoUser(userData);
        console.log(cognitoUser);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                
                console.log('access token + ' + result.getAccessToken().getJwtToken());
                console.log('idToken + ' + result.idToken.jwtToken);

                // if( reqFrom == 'signup')
                //     dispatch({type:SIGNIN_SUCCESS_SIGNUP, randomString: new Date().getTime()})
                // else   
                    updateUserCreds(result,dispatch)  
            },    
            onFailure: function(err) {
                dispatch({ type: HIDE_LOADER })
                console.log(err.code);

                if( err.code === 'UserNotConfirmedException'){
                    dispatch({ type: HIDE_LOADER });
                    console.log("verify");
                    Actions.verifyAccount();
                }
                else{
                    dispatch({ type: SIGNIN_USER_ERROR });
                    dispatch({ type: HIDE_LOADER })
                    ShowToast(err.message, 'danger');

                }
                
            },
    
        });
    }
}

export const ForgotPwd = ({email}) =>{
    return(dispatch) =>{
        dispatch({ type: SHOW_LOADER })
        var userData = {
            Username: email,
            Pool: userPool
        }
        cognitoUser = new CognitoUser(userData);
        cognitoUser.forgotPassword({
            onSuccess: function (result) {
                dispatch({ type: HIDE_LOADER })
                console.log('call result: ' + result);
            },
            onFailure: function(err) {
                console.log(err);
                dispatch({ type: HIDE_LOADER })
                ShowToast(err.message, 'danger');
            },
            inputVerificationCode() {
                console.log('in verfiry')
                dispatch({ type: HIDE_LOADER })
                Actions.changePassword();   
            }
        });
    }
}

export const UpdatePwd = ({code, newPassword}) =>{
    return(dispatch) =>{
        dispatch({ type: SHOW_LOADER })
        cognitoUser.confirmPassword(code, newPassword, {
            onSuccess: function (result) {
                dispatch({ type: HIDE_LOADER })
                ShowToast("Your password is updated", 'success');
                Actions.popTo('login');
                console.log(result)
                
            },    
            onFailure: function(err) {
                dispatch({ type: HIDE_LOADER })
                ShowToast(err.message, 'danger');
                
            },

        });
    }
}

export const ChangePwd = ({oldPassword, newPassword}) =>{
    return(dispatch) =>{
        dispatch({ type: SHOW_LOADER })
        cognitoUser.changePassword(oldPassword, newPassword, function(err, result) {
            if (err) {
               
                dispatch({ type: HIDE_LOADER })
                ShowToast(err.message, 'danger');
                return;
            }
            dispatch({ type: UPDATE_PASSWORD });
            dispatch({ type: HIDE_LOADER })
            ShowToast("Your password is updated", 'success'); 
        });
    }
}

export const AddPIN = (pin) =>{

    let attributeList = [];
    let dataName = {
        Name: "custom:secretpin",
        Value: pin
    }

    attributeList.push( new CognitoUserAttribute(dataName)); 


    return(dispatch) =>{
        dispatch({ type: SHOW_LOADER })
        cognitoUser.updateAttributes(attributeList, function(err, result) {
            if (err) {
                dispatch({ type: HIDE_LOADER })
                ShowToast(err.message, 'danger');
                return;
            }
            dispatch({ type: HIDE_LOADER });
            dispatch({type:UPDATE_PASSWORD});
            ShowToast("Your profile is secured by pin", 'success'); 
        });
    }
}


export const SignUp = ({fullname,email,contactnumber,password}) =>{
    
    
    let attributeList = [];
    let dataName = {
        Name: "name",
        Value: fullname
    }
    // let dataDOB= {
    //     Name: "birthdate",
    //     Value: dob
    // }
    // let dataGender= {
    //     Name: "gender",
    //     Value: gender
    // }
    // let dataWeight= {
    //     Name: "weight",
    //     Value: weight
    // }
    // let dataHeight= {
    //     Name: "height",
    //     Value: height
    // }    
    // let dataAddress= {
    //     Name: "address",
    //     Value: address
    // }
    let dataEmail = {
        Name: "email",
        Value: email
    }
    let dataPhoneNumber = {
        Name: "phone_number",
        Value: `+1${contactnumber}`
    }

    attributeList.push( new CognitoUserAttribute(dataName)); 
    // attributeList.push( new CognitoUserAttribute(dataDOB));    
    // attributeList.push( new CognitoUserAttribute(dataGender));          
    // attributeList.push( new CognitoUserAttribute(dataWeight));
    // attributeList.push( new CognitoUserAttribute(dataHeight));    
    // attributeList.push( new CognitoUserAttribute(dataAddress)); 
    attributeList.push( new CognitoUserAttribute(dataEmail));
    attributeList.push( new CognitoUserAttribute(dataPhoneNumber));
    
    // attributeList.push(attributeName);
    // attributeList.push(attributeEmail);
    // attributeList.push(attributePhoneNumber);
    // attributeList.push(attributeDOB);
    
    console.log(attributeList);
    return(dispatch) =>{
       //dispatch({ type: SHOW_LOADER });
      // dispatch({ type: SIGNUP_USER_SUCCESS})
        userPool.signUp(email, password, attributeList, null, function(err, result){
            if (err) {
                dispatch({ type: SIGNUP_USER_FAILED, randomString: new Date().getTime() })
                ShowToast(err.message, 'danger');
                return;
            }
            else{
                //dispatch({ type: SIGNUP_USER_SUCCESS, randomString: new Date().getTime()})
                dispatch({type:CREATE_PROFILE, userCode: result.userSub,randomString: new Date().getTime()})
                console.log(result);
                cognitoUser = result.user;
                //Actions.verifyReg();
                
            }

        });
    }
}

export const ConfirmRegistration = ({email,password,verificationCode,reqFrom}) =>{
    return(dispatch) =>{
        if(reqFrom == 'login')
            dispatch({ type: SHOW_LOADER })
        cognitoUser.confirmRegistration(verificationCode,true, function(err, result){
            if (err) {
                //debugger;
                if(reqFrom == 'login')
                    dispatch({ type: HIDE_LOADER });
                ShowToast(err.message, 'danger');
                dispatch({ type: SIGNUP_USER_FAILED,randomString: new Date().getTime() })
               
               // return;
            }
            if(result == "SUCCESS"){
                dispatch({ type: HIDE_LOADER });
                if(reqFrom == 'login'){
                    ShowToast("Congratualations! Your account is ready to go!", 'success');
                    dispatch({ type: VERIFICATION_SUCCESS_SIGNIN , randomString: new Date().getTime() });
                }
                    

                else{
                    dispatch({ type: SIGNUP_USER_SUCCESS, randomString: new Date().getTime()})
                }
                    
                //dispatch({ type: SIGNUP_USER_SUCCESS})
                // if(!password){
                //     dispatch({ type: VERIFICATION_SUCCESS });
                //     //Actions.reset('start');
                //     return;
                // }
                // else{
                //     console.log("here in signIn");
                //     console.log(email,password);
                //     //dispatch({ type: HIDE_LOADER });
                //     dispatch({ type: VERIFICATION_SUCCESS_SIGNIN });
                //     //SignInUser({email,password})
                //     //return;
                //     //return(SignInUser({email,password}));
                //     //SignInUser({email,password})
                // }
                
            }
               
        });
    }
}

export const ResendCode = () =>{
    return(dispatch) =>{
        dispatch({ type: SHOW_LOADER })
        cognitoUser.resendConfirmationCode(function(err,result){
            if(err){
                dispatch({ type: HIDE_LOADER })
                ShowToast(err.message, 'danger');
                return;
            }

            console.log(result);
            dispatch({ type: HIDE_LOADER })
            ShowToast("Verification code is sent to "+result.CodeDeliveryDetails.Destination, 'success');
            
        });
    }
}

export const SignOut = () =>{
    // cognitoUser.signOut(function(){
    // });
    return(dispatch) =>{
        cognitoUser.signOut();
        Actions.reset('auth');
        //LogEvent('User logged out');
    }
   
}

export const CurrentAWSUser = () =>{
    console.log(cognitoUser);
    return cognitoUser;
}

export const CreateUserProfile = (userinfo) => {
    return (dispatch) => {
        //dispatch({ type: SHOW_LOADER });

        console.log(JSON.stringify(userinfo));
       
        

            
                axios.post('/profiles/create', userinfo)
                .then(function (response) {
                    //dispatch({ type: USER_PROFILE_CREATION_SUCCESS });
                    //dispatch({ type: HIDE_LOADER });
                    console.log(response);
                    if (response.data.profileid) {
                        dispatch({
                            type: UPDATE_ROOT_INFO,
                            payload: { prop: 'userInfo', value: response.data }
                        });
                        dispatch({ type: SIGNUP_USER_SUCCESS, randomString: new Date().getTime(), asyncRequestDone: 'createprofile'})
                        //Actions.reset('main');

                        //LogEvent('User Profile Created');
                        //SetUserId(response.data.profileid)
                    }
                })
                .catch(function (error) {
                    ShowToast(error.message, 'danger')
                    //CustomException(error)
                });
    }
}


updateUserCreds = (result, dispatch)=>{
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId : POOL_IDENTITY , // your identity pool id here
        Logins : {
            // Change the key below according to the specific region your user pool is in.
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_4BNnwkQdj' : result.getIdToken().getJwtToken()
        }
    });

    console.log(result);
    axios.defaults.headers.common['Authorization'] = result.idToken.jwtToken;
    axios.post('/profiles/exists', {
        identity: result.idToken.payload.sub
    })
    .then(function (response) {
        console.log(response);
        dispatch({type: SIGNIN_USER_SUCCESS});
        dispatch({type:HIDE_LOADER}); 

        if(response.data.profileid === ''){
            Actions.reset('main');
        }
        else if(response.data.profileid){
            dispatch({
            type: UPDATE_ROOT_INFO,
            payload: {prop: 'userInfo', value:response.data}
            })
            //SetUserId(response.data.profileid);
            let previousWeekStart = new Date();
            previousWeekStart.setDate(previousWeekStart.getDate() - 7 - previousWeekStart.getDay());

            let previousWeekEnd = new Date();
            previousWeekEnd.setDate(previousWeekEnd.getDate() - previousWeekEnd.getDay());

            let aggPayload = {
                profileid : response.data.profileid,
                dataaggtype : 1,
                end: previousWeekStart.toISOString().split("T")[0], // start of last week
                start: previousWeekEnd.toISOString().split("T")[0] // end of last week
            }
            
            console.log(aggPayload)
            axios.post('/analytic/incentives/aggregate',aggPayload).then(function(response){
                console.log("agg run succesfully");
                //LogEvent('User logged in');                
                getUserAttributes(dispatch);
            }).catch(function (error) {
                //CustomException(error)
            })
            
            

        }           

    })
    .catch(function (error) {
        dispatch({type:HIDE_LOADER});
        //CustomException(error)
    });
    
}


// createUserProfile = (result, dispatch)=>{
//     AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//         IdentityPoolId : POOL_IDENTITY , // your identity pool id here
//         Logins : {
//             // Change the key below according to the specific region your user pool is in.
//             'cognito-idp.us-east-1.amazonaws.com/us-east-1_4BNnwkQdj' : result.getIdToken().getJwtToken()
//         }
//     });

//     console.log(result);
    
    
// }

refreshToken = ()=>{
    AWS.config.credentials.refresh((error) => {
        if (error) {
                console.error(error);
        } else {
                // Instantiate aws sdk service objects now that the credentials have been updated.
                // example: var s3 = new AWS.S3();
                console.log(AWS.config.credentials);
                console.log('Successfully logged!');
        }
    });
}
getUserAttributes = (dispatch)=>{

    var pin = "";
    cognitoUser.getUserAttributes(function(err, result) {
        if (err) {
            //alert(err);
            return;
        }
        for (i = 0; i < result.length; i++) {
            if(result[i].getName() == "custom:secretpin"){
                pin = result[i].getValue();
                break;
            }
            
        }
        if(pin != ""){
            dispatch({type:UPDATE_USER_INFO,payload: {prop: 'secretpin', value: pin}});
            Actions.reset('main');
        }
        else
            Actions.reset('main');
    });
   
}

