import { UPDATE_BOT_INFO,RESET_BOT_INFO, SHOW_LOADER, HIDE_LOADER, HIDE_BOT_LOADER, SHOW_BOT_LOADER, UPDATE_BOT_ANSWER, UPDATE_USER_QUESTIONS } from "./Types";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import {ShowToast} from "../Helper";
//import {CustomException} from "../actions/LogActions"
//import { LogEvent } from "./EventLogActions";
export const UpdateBotInfo = ({ prop, value}) => {
    if(value.reqFor == 'answers')
    {    
            return{

                type: UPDATE_BOT_ANSWER,
                payload: {prop, value}
            }
    }
    return{

        type: UPDATE_BOT_INFO,
        payload: {prop, value}
    }
}

export const AddUserQuestion = ({prop,value,index}) =>{
    return{

        type: UPDATE_USER_QUESTIONS,
        payload: {prop, value , index}
    }
    
}
export const ResetBot=() =>{
    return{
        type: RESET_BOT_INFO,
    }  
}
const regData = [{
    "category": "registration",
    "prompts": [{
            "prompt": "Hello! My name is Arya, how would you like to create your account?",
            "jsonfield": "signuptype",
            "choices": [{
                    "id": 0,
                    "value": "Google"
                },
                {
                    "id": 1,
                    "value": "Facebook"
                },
                {
                    "id": 3,
                    "value": "Email"
                }
            ],
            "multiselect": false,
            "cond": "true",
            "fieldtype": "botsignupoptionprompt",
            "append": false
        },
        {
            "prompt": "permission",
            "jsonfield": "permission",
            "cond": "true",
            "fieldtype": "botlinkprompt",
            "append": false
        }
    ],
    "cond": "true"
},
{
    "category": "permission",
    "prompts": [{
            "prompt": "Let’s first scan your drivers license to verify your identity. You’ll need to allow Avibra access to your camera.",
            "jsonfield": "camerapermission",
            "choices": [{
                    "id": 0,
                    "value": "Give Permission"
                },
                {
                    "id": 1,
                    "value": "Skip for now"
                }
            ],
            "cond": "true",
            "fieldtype": "botpermissionprompt",
            "append": false
        },
        {
            "prompt": "withpermission",
            "jsonfield": "permission",
            "cond": "!camerapermission",
            "fieldtype": "botlinkprompt",
            "append": false
        },
        {
            "prompt": "withoutpermission",
            "jsonfield": "permission",
            "cond": "camerapermission",
            "fieldtype": "botlinkprompt",
            "append": false
        }
    ],
    "cond": "true"
},
{
    "category": "withpermission",
    "prompts": [{
            "prompt": "Great! Can you confirm that this information is correct? Tap the pencil icon to edit.",
            "jsonfield": "skip",
            "fieldtype": "skipanswer",
            "cond": "true",
            "append": false
        },
        {
            "prompt": "profilesession",
            "jsonfield": "profile",
            "cond": "true",
            "fieldtype": "botlinkprompt",
            "append": false
        }
    ],
    "cond": "true"
},
{
    "category": "withoutpermission",
    "prompts": [{
            "prompt": "No worries, we’ll need some information to get you started.",
            "jsonfield": "skip",
            "fieldtype": "skipanswer",
            "cond": "true",
            "append": false
        },
        {
            "prompt": "profilesession",
            "jsonfield": "profile",
            "cond": "true",
            "fieldtype": "botlinkprompt",
            "append": false
        }
    ],
    "cond": "true"
},
{
    "category": "profilesession",
    "prompts": [
        {
            "prompt": "Full Name",
            "jsonfield": "fullname",
            "cond": "true",
            "fieldtype": "bottextprompt",
            "append": true
        },
        {
            "prompt": "DOB",
            "jsonfield": "dob",
            "cond": "true",
            "fieldtype": "botdateprompt",
            "append": true
        },
        {
            "prompt": "What is your gender?",
            "jsonfield": "gender",
            "choices": [{
                    "id": 0,
                    "value": "Male"
                },
                {
                    "id": 1,
                    "value": "Female"
                }
            ],
            "multiselect": false,
            "cond": "true",
            "fieldtype": "botbooleanprompt",
            "append": true
        },
        {
            "prompt": "Height (Cms)",
            "jsonfield": "height",
            "cond": "true",
            "fieldtype": "botnumberprompt",
            "append": true
        },
        {
            "prompt": "Weight (Lbs)",
            "jsonfield": "weight",
            "cond": "true",
            "fieldtype": "botnumberprompt",
            "append": true
        },
        {
            "prompt": "Address",
            "jsonfield": "address",
            "cond": "true",
            "fieldtype": "botaddressprompt",
            "append": true
        },
        {
            "prompt": "Email Address",
            "jsonfield": "email",
            "cond": "true",
            "fieldtype": "botemailprompt",
            "append": true
        },
        {
            "prompt": "Phone Number",
            "jsonfield": "contactnumber",
            "cond": "true",
            "fieldtype": "botphoneprompt",
            "append": true
        },
        {
            "prompt": "Password",
            "jsonfield": "password",
            "cond": "true",
            "fieldtype": "botrepeatpasswordprompt",
            "append": false
        },
        {
            "prompt": "Great! Finally, we’ll need to validate your phone number. Tap Send Confirmation Code and input the code you receive.",
            "jsonfield": "signup",
            "choices": [{
                "id": 0,
                "value": "Send Confirmation Code"
            }],
            "multiselect": false,
            "cond": "true",
            "fieldtype": "botasynclist",
            "append": false
        },
        {
            "prompt": " Code Sent",
            "jsonfield": "skip",
            "fieldtype": "skipanswer",
            "cond": "true",
            "append": false
        },
        {
            "prompt": "Code",
            "jsonfield": "code",
            "cond": "true",
            "fieldtype": "botasynctextprompt",
            "append": false
        },
        {
            "prompt": "Congratualations! Your account is ready to go!",
            "jsonfield": "skip",
            "fieldtype": "skipanswer",
            "cond": "true",
            "append": false
        }
    ],
    "cond": "true"
},
{
    "category": "quickunderwritingsession",
    "prompts": [{
        "prompt": "Are you terminally ill?",
        "jsonfield": "isterminallyill",
        "choices": [{
                "id": 0,
                "value": "No"
            },
            {
                "id": 1,
                "value": "Yes"
            }
        ],
        "cond": "true",
        "fieldtype": "botbooleanprompt"
    }],
    "cond": "true"
},
{
    "category": "subscriptionsession",
    "prompts": [{
        "prompt": "Selct Plan.",
        "jsonfield": "plantype",
        "choices": [{
                "id": 0,
                "value": "Free"
            },
            {
                "id": 1,
                "value": "Plus"
            }
        ],
        "multiselect": false,
        "cond": "true",
        "fieldtype": "botlist"
    }],
    "cond": "true"
}
]
export const GetRegistrationBot = ()=>{
    let data = JSON.parse(JSON.stringify(regData));
    console.log(data);
    return(dispatch)=>{
        // dispatch({type:UPDATE_BOT_INFO,payload: {prop: 'botData', value: data}});
        // CurrentRegistrationQuestions(dispatch,data,"registration");
        axios.get('/profiles/regbotsetup').then((response)=>{
            console.log(JSON.stringify(response.data));
             dispatch({type:UPDATE_BOT_INFO,payload: {prop: 'botData', value: response.data}});
             CurrentRegistrationQuestions(dispatch,response.data,"registration");
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }

}
export const GetData = ()=>{
    console.log('in get data')
    return(dispatch)=>{

        setTimeout(() => {
            dispatch({type:"received"});
            ShowToast("Error ", "danger")
        }, 5000);
       
       // CurrentRegistrationQuestions(dispatch,regData,"registration");
        // axios.get('/profiles/regbotsetup').then((response)=>{
        //     console.log(response.data);
        //      dispatch({type:UPDATE_BOT_INFO,payload: {prop: 'botData', value: regData}});
        //      CurrentRegistrationQuestions(dispatch,regData,"registration");
        // })
        // .catch((err)=>{
        //     console.log(err.message);
        // })
    }

}

export const GetBotQuestion= (data,url,reqFor) =>{
    console.log(reqFor);
     return(dispatch)=>{
         console.log(data);

         //dispatch(_showLoader())
         dispatch({ type: SHOW_BOT_LOADER })

       // CurrentSessionQuestions(dispatch,botData, botData.newstate);
        //dispatch({type:UPDATE_BOT_INFO,payload: {prop: 'botData', value: botData}});
        // dispatch({type:UPDATE_BOT_INFO,payload: {prop: 'currentSession', value: GetCurrentSessionQuestions(botData, botData.newstate) }});
        //dispatch({ type: HIDE_BOT_LOADER });
        
        axios.post(url,data)
          .then(function (response) {
                console.log(response);
            dispatch({type:UPDATE_BOT_INFO,payload: {prop: 'botData', value: reqFor === 'dataBot' ? response.data: response.data[0]}});
            
            if(reqFor === 'dataBot'){
                CurrentSessionQuestions(dispatch,response.data,response.data.newstate);
            }
            else
                dispatch({ type: HIDE_BOT_LOADER })
            //_hideLoader(dispatch); 
            console.log(JSON.stringify(response.data) );
            let logData = {state: reqFor === 'dataBot' ?response.data.newstate: `${response.data[0].incentivecategory + response.data[0].incentivesubcategory}` };

            LogEvent(`User started ${reqFor === 'dataBot' ?'Bot':'Quiz'}`, logData);
               
          })
          .catch(function (err) {
            //CustomException(err)
            dispatch({ type: HIDE_BOT_LOADER })
            ShowToast(err.message, 'danger');
        });
     }
}

export const GetCurrentSessionQuestions = (questions,currentState,reqFor)=>{
    return(dispatch)=>{
        dispatch({ type: SHOW_BOT_LOADER });
        if(reqFor == 'reg')
            CurrentRegistrationQuestions(dispatch,questions,currentState);
        else
            CurrentSessionQuestions(dispatch,questions, currentState);
    }
};

export const SubmitAnswer = (data,url,cardValue,reqFor) =>{
    return(dispatch)=>{
        console.log(data);

        //dispatch(_showLoader())
        dispatch({ type: SHOW_LOADER })

       axios.post(url,data)
         .then(function (response) {
           
           //_hideLoader(dispatch); 
           MarkRead(cardValue,dispatch);
           console.log(response);
          
           let logData = {state: reqFor === 'dataBot' ? data.state: `${data.incentivecategory + data.incentivesubcategory}` };
            
           LogEvent(`User finished ${reqFor === 'dataBot' ?'Bot':'Quiz'}`, logData);
              
         })
         .catch(function (err) {
           // CustomException(err)
           dispatch({ type: HIDE_LOADER })
           ShowToast(err.message, 'danger');
       });
    }

}

MarkRead = (cardInfo,dispatch) => {

        console.log(cardInfo);
        let card = { items :[cardInfo]};

        axios.post('/analytic/inbox/markread',card)
        .then(function (response) {
            dispatch({ type: HIDE_LOADER })
          console.log(response);
          Actions.reset('info',{data:cardInfo});

          LogEvent('User read card', cardInfo);
          
             
        })
        .catch(function (err) {
           // CustomException(err)
            dispatch({ type: HIDE_LOADER })
            ShowToast(err.message, 'danger');
      });
 

}



CurrentSessionQuestions=(dispatch,questions,currentState)=>{
        console.log(currentState);
        
        var currentSession = questions.botsessions.filter((question)=>{
            return (question.category.toLowerCase() === currentState.toLowerCase())
        });
    
        console.log(currentSession);
        dispatch({type:UPDATE_BOT_INFO,payload: {prop: 'currentSession', value: currentSession[0] }});
        dispatch({ type: HIDE_BOT_LOADER })
}

CurrentRegistrationQuestions=(dispatch,questions,currentState)=>{
    console.log(currentState);
    console.log(questions);
    
    var currentSession = questions.filter((question)=>{
        return (question.category.toLowerCase() === currentState.toLowerCase())
    });

    console.log(currentSession);
    dispatch({type:UPDATE_BOT_INFO,payload: {prop: 'currentSession', value: currentSession[0] }});
    dispatch({ type: HIDE_BOT_LOADER })
}
