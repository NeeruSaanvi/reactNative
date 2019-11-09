import React, { Component } from "react";
import { View, Keyboard, Image,TouchableHighlight,Dimensions } from "react-native";
import {Content,Text,Button} from 'native-base';
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { CommonStyles } from "../common/Styles";

import { UpdateBotInfo,GetRegistrationBot,SubmitAnswer,ResetBot,GetCurrentSessionQuestions, AddUserQuestion, GetData, SignUp, UpdateUserInfo, SignInUser, CreateUserProfile, ConfirmRegistration} from "../../actions";
import BotQuestionBubble from '../common/Bot/BotQuestionBubble';
import BotPrompts from '../common/Bot/BotPrompts';
import BotAnswerBubble from '../common/Bot/BotAnswerBubble';
import { Icons } from "../../assets/Images";
import { Strings } from "../../Strings";
import { backgroundColor } from "../../../themes/variables/Colors";
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import { Loader } from "../common/Loader";

const InitialState = {
    show: false,
    currentQuestion : 0,
    previousQuestion: -1,
    userTraverse:[],
    onDone: false,
    onLinkDone: false,
    isReverse: false,
    onAsyncClick: false,
    editIndex: null,
    isAnswerDone: false
};
class RegBot extends Component{
    constructor(props){
        super(props);
        this.state = InitialState;
        this.savedId = null;
        this.savedUserQuestionIndex = null;
        this.password = null;
    }

    componentDidMount(){
        setTimeout(() => {
            this.props.GetRegistrationBot(); 
        }, 100);  
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.currentSession !== this.props.currentSession) {
            console.log(this.state.currentQuestion);
            if(this.state.currentQuestion == 0 ) {
               if(nextProps.currentSession.prompts[this.state.currentQuestion].fieldtype === "botlinkprompt"){
                    console.log(nextProps.currentSession.prompts[this.state.currentQuestion].fieldtype)
                    this.onlink(0,nextProps)
                }
                else{
                    this.setUserQuestion(nextProps.currentSession.prompts[this.state.currentQuestion]);
                }
            }
        }

        if(this.state.onAsyncClick) {
            if(nextProps.random != this.props.random) {
                if(nextProps.asyncStatus)
                    this.onCallDoneSuccess(nextProps.asyncStatus,nextProps.asyncRequestDone);           
                else{
                    if(nextProps.signIn){            
                        this.signInUser();
                    }   
                    else if(nextProps.createProfile){
                        this.createProfile(nextProps.userCode);
                    }
                    else
                        this.onCallDoneError(nextProps.asyncStatus);
                }

                
            }

        }

        

    }


    botAnswers = {};
    linkedBotAnswers = {};

    onAnswer(id,userQuestionIndex){
        let currentQ = this.props.userQuestions[userQuestionIndex]; 
        if(currentQ.fieldtype !== "botasynclist" && currentQ.fieldtype !== "botasyncpasswordprompt" && currentQ.fieldtype !== "botasynctextprompt"){
            this.checkandUpdateDate(id,userQuestionIndex);
        }
        else{
            console.log('call server')
            
            this.savedId = id;
            this.savedUserQuestionIndex = userQuestionIndex;
            this.setState({onAsyncClick: true},()=>{

                let data = this.state.isLink? this.linkedBotAnswers:this.botAnswers;
                console.log('data');
                let userData = {
                    email: data.email,
                    password: this.password                        
                }
                // let userData = {
                //     email: 'kirana@grr.la',
                //     password: 'Kiran12345'                        
                // }
                if(currentQ.jsonfield == "signup"){
                    
                    userData.contactnumber = data.contactnumber;
                    userData.fullname = data.fullname;
                    
                    this.props.SignUp(userData);
                }

                else if(currentQ.jsonfield == "code"){ 
                    userData.verificationCode =  this.savedId[0];                
                    this.props.ConfirmRegistration(userData);
                }

                console.log(userData);
                
            });
            return;
        }

    }

    onCallDoneSuccess(asyncStatus, asyncRequestDone){
        if(asyncRequestDone == 'createprofile')
            this.setState({isAnswerDone: true});
        this.setAsyncStatus(asyncStatus);   
        this.checkandUpdateDate(this.savedId,this.savedUserQuestionIndex);
    }

    onCallDoneError(asyncStatus){
        this.setAsyncStatus(asyncStatus);
    }

    setAsyncStatus(asyncStatus){
        console.log(`${this.savedId} saved data ${this.savedUserQuestionIndex}`);
        this.setState({onAsyncClick: false});
        if(asyncStatus)
            this.props.UpdateUserInfo({prop:"asyncStatus", value: !asyncStatus})
    }

    checkandUpdateDate(id,userQuestionIndex){

        const currentQuestion = this.props.userQuestions[userQuestionIndex];
        
        if(currentQuestion.fieldtype == 'botrepeatpasswordprompt')
            this.password = id[0];
        if(currentQuestion.append)
            this.saveBotAnswers(id,currentQuestion,userQuestionIndex);

        this.getAnswers(id,currentQuestion,userQuestionIndex);

        if((this.props.currentSession.prompts.length) === (this.state.currentQuestion+1)){
            this.onDone();
        }
        else{
            this.validate(id);
        }
    }

    validate(id){
        if(this.props.currentSession.prompts[this.state.currentQuestion].fieldtype == "botbooleanprompt" || this.props.currentSession.prompts[this.state.currentQuestion].fieldtype == "botpermissionprompt" || this.props.currentSession.prompts[this.state.currentQuestion].fieldtype == "botsignupoptionprompt"){
            window[this.props.currentSession.prompts[this.state.currentQuestion].jsonfield] = id[0] == 0 ? false : true;
        }
        else{
            window[this.props.currentSession.prompts[this.state.currentQuestion].jsonfield] = id.toString();
        }

        for(var i = this.state.currentQuestion;  i < this.props.currentSession.prompts.length-1; i++){
            if(eval(this.props.currentSession.prompts[i+1].cond)){
                this.showNext(i+1,this.props.currentSession);
                break;
            }
        }

    }

    saveBotAnswers(id,currentQuestion,userQuestionIndex){
        console.log(this.state.isLink +" "+ this.state.linkField);
        const userAnswer = id;
        let answer = this.state.isLink ? this.linkedBotAnswers : this.botAnswers;

        if(currentQuestion.fieldtype == "botbooleanprompt" || currentQuestion.fieldtype == "botpermissionprompt" || currentQuestion.fieldtype == "botsignupoptionprompt"){
            answer[currentQuestion.jsonfield] = id[0];
        }
        else if(currentQuestion.fieldtype == "botlist" || currentQuestion.fieldtype == "botlistprompts"){
            answer[currentQuestion.jsonfield] = []
            userAnswer.map((id)=>{
                currentQuestion.choices.map((ans,index)=>{
                    if(id == ans.id){
                        answer[currentQuestion.jsonfield].push(ans.id);
                    }
                });
            });

        }
        else{
                answer[currentQuestion.jsonfield] = currentQuestion.fieldtype == "botaddressprompt" ? id : id.toString();       
        } 

        console.log(this.botAnswers);
        console.log(this.linkedBotAnswers);
        
    }

    onSkipAnswer(){
        if((this.props.currentSession.prompts.length) === (this.state.currentQuestion+1)){
            this.onDone();
        }
        else
            this.showNext(this.state.currentQuestion+1,this.props.currentSession)
    }

    onDone(){
        console.log('done');

        this.setState({currentQuestion: this.state.currentQuestion,onDone: true});

        if(this.state.isLink)
            this.setState({onLinkDone: true});

        //this.showNext(this.state.currentQuestion,this.props.currentSession);
        return;
    }

    showNext(nextQuestion,currentSession){
        const next = currentSession.prompts[nextQuestion];

        if(next.fieldtype === "botlinkprompt"){
            let linkField = this.state.linkField;

            if(next.append){
                this.botAnswers[next.jsonfield] = {}; 
                if(linkField && linkField != next.jsonfield){
                    this.onlinkSession();
                }
            }
 
            this.setState(InitialState,()=>{
                this.setState({isLink: true,linkField:next.jsonfield,linkSession: next.prompt});
                this.props.GetCurrentSessionQuestions(this.props.botData, next.prompt,'reg');
                
            });
            
            return;
        }

        this.setUserQuestion(next);

        if(nextQuestion > 0){
            this.updateQuestionCount(nextQuestion);          
        }
    }

    updateQuestionCount(nextQuestion){
        this.setState({
            isReverse: false,
            previousQuestion : this.state.currentQuestion,
            currentQuestion: nextQuestion ,
            userTraverse: [...this.state.userTraverse, this.state.currentQuestion]
        }); 
    }

    setUserQuestion(question){
        this.state.editIndex !== null ? this.setState({editIndex : null}) :  this.props.AddUserQuestion({prop:"userQuestions", value:question , index:null});
    }

    onlink(nextQuestion,nextProps){
        console.log(nextQuestion);
        console.log(nextProps.currentSession.prompts.length);

        const next = nextProps.currentSession.prompts[nextQuestion];
        console.log(next.jsonfield);
        this.setState(InitialState);
        this.setState({isLink: true,linkField:next.jsonfield,linkSession: next.prompt});
        
        this.botAnswers[next.jsonfield] = [];      
        this.props.GetCurrentSessionQuestions(nextProps.botData, next.prompt,'reg'); 

        return;
                
    }

    onEdit(index, currentSessionIndex){
        console.log("on Edit"+ index);
        console.log("on Session index "+ this.state.previousQuestion);

        if(this.state.onDone)
            this.setState({onDone:false});
        else{
           console.log(this.props.userQuestions)
        }

        this.setState({
            editIndex: index,
            currentQuestion : this.state.previousQuestion
        })
    }

    getAnswers(id,currentQuestion,userQuestionIndex){

        let answers = []; 
        console.log(this.props.userQuestions);
        console.log(userQuestionIndex);
        console.log(id);
        let question = currentQuestion;
        let questionFieldTpe = question.fieldtype;

        if(questionFieldTpe == "botlist" || questionFieldTpe == "botlistprompts" || questionFieldTpe == "botbooleanprompt" || questionFieldTpe == "botpermissionprompt" || questionFieldTpe == "botsignupoptionprompt"){
            question.choices.map((ans,index)=>{
                    if(id == ans.id){
                        answers.push({answer:ans.value});
                    }
                });
        }
        else{
            if(questionFieldTpe!= "botskipanswer" && questionFieldTpe != "botasynclist" ){
                if(questionFieldTpe == "botaddressprompt")
                    answers.push(id)
                else
                    answers.push({answer:id})
            }
                  
        }

        console.log(answers);
        question['answers'] = answers;

        this.props.AddUserQuestion({prop:'userQuestions',value: question, index:userQuestionIndex})    
    }

    onlinkSession(){
        this.pushTOlink();
        this.setState(InitialState);
    }
    pushTOlink(){
        this.botAnswers[this.state.linkField] = this.linkedBotAnswers;
        //this.linkedBotAnswers = {};
    }

    signInUser(){
       
       // this.props.UpdateUserInfo({prop:"signIn", value: false});
        let data = this.state.isLink? this.linkedBotAnswers:this.botAnswers;

        console.log(this.botAnswers);
        console.log(this.linkedBotAnswers);
        console.log(this.password);
        this.props.SignInUser({email:data.email.toLowerCase(),password:this.password, reqFrom :"signup"})
        //this.props.SignInUser({ email: 'kirana@grr.la',password: 'Kiran12345', reqFrom :"signup"})
    }

    createProfile(userCode){
        if(this.state.isLink)
            this.pushTOlink();
            let answerData = this.botAnswers;
            answerData["usercode"] = userCode;
            answerData["id"] = "0";
            
        console.log(answerData);
        this.props.UpdateUserInfo({prop:"createProfile", value: false});
        this.props.CreateUserProfile(answerData);
    }


    begin(){
        console.log('begin')
    }

    getIndex()
    {
        if(this.state.editIndex !== null)
            return this.state.editIndex;
        return this.props.userQuestions.length - 1;
    }
    componentWillUnmount(){
        console.log("in unmount");
        this.setState(InitialState);
        this.props.ResetBot();
    }



    renderBot(){
        return(

            <InvertibleScrollView  style={{paddingVertical: 16}}  inverted 
                ref={ref => { this.scrollView = ref; }}
                onContentSizeChange={() => {
                    this.scrollView.scrollTo({y: 0, animated: true});
                }}
            >
                <View style={{flex:1}}>
                    { 
                        this.props.userQuestions.map((question,index)=>{
                        return (
                            <BotQuestionBubble isAnswerDone={this.state.isAnswerDone} currentSessionIndex={this.state.currentQuestion}  onEdit={(index,currentSessionIndex)=>{this.onEdit(index,currentSessionIndex)}} key={`reg${index}`} index={index} data = {question}/>
                        )
                        })
                    }  
                </View>
            </InvertibleScrollView>
        )
    }

    renderPrompt(){
        const index = this.getIndex();
        return(
            <BotPrompts onAsyncClick={this.state.onAsyncClick} index={index} onAnswer={(id,index)=>{ this.onAnswer(id,index)}} skip={(id,index)=> this.onSkipAnswer(id,index)}  data = { this.props.userQuestions[index]}/>
        )
            
    }

    renderOnDone(){
        return(
            <View style={CommonStyles.contentPadding}>
                <Button block onPress={()=>{this.signInUser()}}>
                    <Text>{Strings.begin}</Text>
                </Button>
            </View>
        )
    }



    render(){
        console.log(this.props.botLoader)
        return(
            <View style={{flex:1,backgroundColor:backgroundColor}}>

                {
                    this.props.botLoader ?
                    <View style={{flex: 1,justifyContent:"flex-end", padding:16}}>
                        <Image style={{width:30,height:30}} source={Icons.botRobo} />
                    </View>
                    :                        
                    this.props.userQuestions.length > 0 && this.renderBot() 
                }

                {
                    !this.props.botLoader && 
                    (!this.state.onDone ? 
                        this.renderPrompt() : 
                        this.renderOnDone() 
                    ) 
                                   
                }
                 {this.props.loading && <Loader display={this.props.loading} />} 
            </View>
        )
    };
}

const mapStateToProps = state =>{
    const { botData,requestapi,responseapi, botLoader,botQA,currentSession,userQuestions,received} = state.bot;
    const { asyncStatus,signIn,createProfile,random, userCode, asyncRequestDone } = state.auth;
    const { loading } = state.loader;
    return { botData,requestapi,responseapi, botLoader,botQA,currentSession,userQuestions,received,asyncStatus,signIn,createProfile,random ,userCode, asyncRequestDone,loading};
}

export default connect(mapStateToProps,{UpdateBotInfo,GetRegistrationBot,SubmitAnswer,ResetBot,GetCurrentSessionQuestions,AddUserQuestion,GetData,SignUp,UpdateUserInfo,SignInUser,CreateUserProfile,ConfirmRegistration})(RegBot);
