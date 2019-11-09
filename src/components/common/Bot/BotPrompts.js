import React , { Component } from "react";
import { View,Image,Modal,KeyboardAvoidingView,ActivityIndicator,TouchableHighlight } from "react-native";
import {
        Content,
        Text,
        Label,
        Input,
        Item,
        List,
        ListItem,
        Left,
        Icon,
        Body,
        Title,
        Header,
        Right,
        Button} from 'native-base';
import { lightColor, primaryColor, semiLightColor3, semiLightColor1 } from "../../../../themes/variables/Colors";
import { Icons } from '@assets/Images';
//import DatePicker from 'react-native-datepicker';
import { CommonStyles } from "../Styles";
import SeparaterButton from '../SeparaterButton';
import { Strings } from "../../../Strings";
import GooglePlacesInput from "../../common/GooglePlacesInput";
import { formatAddress, formatDate, isIphoneX, OS } from "../../../Helper";
import { DatePicker } from 'react-native-wheel-datepicker';
import  moment  from "moment";

const date = new Date();


const InitialState =  {
    date: date,
    multiselectAnswers : [],
    showSaveAnswer: false,
    showMultiSelectPop: false,
    sendDisabled : true,
    selectAddress: false,
    address: {},
    text:""
}

class BotPrompts extends Component{

    constructor(props) {
        super(props);
        this.state = InitialState;
        console.log('in Prompt')
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.data);
        if(nextProps.index != this.props.index){
            if(nextProps.data.fieldtype == "botskipanswer"){
                this.skipAnswer("",nextProps.index);
            }

            if(nextProps.data.answers){
                this.setAnswerField(nextProps.data.answers, nextProps.data.fieldtype);
            }
        }

    }
    answerID = [];

    setAnswerField(answers,fieldType){
        console.log(answers);
        let value = null;
        answers.map((ans,index)=>{

            if(fieldType == "bottextprompt" || fieldType == "botnumberprompt" || fieldType == "botemailprompt" || fieldType == "botphoneprompt"){

                this.setState({text: ans.answer[0]})
                value = ans.answer[0];
            }
            else if(fieldType == "botdateprompt"){
                this.setState({date: new Date(ans.answer[0])});
                value = ans.answer[0];
            }
            else if(fieldType == "botaddressprompt"){
                const address = formatAddress(ans);
                this.setState({address:ans})
                value = address;
            }
        })
        
        this.setSend(value);
    }

    setText(text){
       this.setState({text})
        this.setSend(text);
    }
    setDate(date){
        //this.textAns = date;
        this.setState({date:date});
        this.setSend(formatDate(date));
    }

    setAddress(address){
        console.log(address);
        let addText = !Object.keys(address).length ? "":"isDer";
        
         this.setSend(addText);
    }

    setSend(text){
        if(text!= "" && this.state.sendDisabled)
            this.setState({sendDisabled:false})
        else if(text== ""){
            this.setState({sendDisabled:true})
        }
    }
    setPasswordText(){
        console.log(this.textInput);
        console.log(this.repeatPassword);
        if((this.textInput && this.repeatPassword) && (this.textInput === this.repeatPassword) ){
            this.textAns = this.textInput;
            this.setState({sendDisabled:false});
            this.setState({text:this.textInput});
        }
        else{
            this.setState({sendDisabled:true})
        }
    }
    resetState(){
        this.setState(InitialState);
        this.answerID = [];
        console.log(this.state.multiselectAnswers);
    }

    renderFieldType(){
        console.log(this.props.data.fieldtype);
        switch(this.props.data.fieldtype){
            case 'bottextprompt':
                return this.renderTextPrompt("default",false);
            case 'botnumberprompt':
                return this.renderTextPrompt("numeric",false);
            case 'botemailprompt':
                return this.renderTextPrompt("email-address",false,'none');
            case 'botphoneprompt':
                return this.renderPhonePrompt("phone-pad",false);
            case 'botpasswordprompt':
                return this.renderTextPrompt("default",true);
            case 'botrepeatpasswordprompt':
                return this.renderRepeatPasswordPrompt("default",true);
            case 'botdateprompt':
                return this.renderDatePrompt(this.props.data.jsonfield);
            case 'botbooleanprompt':
                return this.renderBooleanPrompt();
            case 'botquizprompts':
            case 'botlist':
                return this.renderQuizPrompts();
            case 'botsignupoptionprompt':
                return this.renderSignUpType();
            case 'botpermissionprompt':
                return this.renderPermission();
            case 'botasynclist':
                return this.renderAsyncListPrompt();
            case 'botasynctextprompt':
                return this.renderAsyncTextPrompt("default",false);
            case 'botasyncpasswordprompt':
                return this.renderAsyncTextPrompt("default",true);
            case 'botaddressprompt':
                return this.renderAddressPrompts();
            default:
                return null;
        }
    }

    skipAnswer(id,index){
        this.props.skip(id,index);
    }
    renderTextPrompt(keyboard,secure,cap){

        return (
            <View style={styles.inputContainer}>
                <View style={{flex:1}}>
                    <Item floatingLabel style={styles.inputStyle}>
                        <Label>{this.props.data.prompt.toUpperCase()}</Label>
                        <Input style={styles.textBoxStyle} getRef={(ref) => this._textInput = ref} 
                        autoCapitalize={cap}
                        secureTextEntry={secure} keyboardType={keyboard}
                        
                        //ref={input => { this.textInput = input }}
                        //ref={input => { this.textInput = input }}
                        onChangeText={text => this.setText(text)}
                        value={this.state.text}
                        //onChangeText={(text) => {this.setText(text)}}  
                        autoCorrect={false}/>                  
                    </Item>
                </View>
                <View>
                    <Button  onPress={this.textInputAnswer.bind(this)} disabled={this.state.sendDisabled} style={styles.sendButton}>
                        <Image source={this.state.sendDisabled ? Icons.sendInactive: Icons.sendActive} />   
                    </Button>
                </View>
            </View>
        )
    }

    renderPhonePrompt(keyboard,secure,cap){
        return (
            <View style={styles.inputContainer}>
                <View style={{flex:1}}>
                    <Item floatingLabel style={styles.inputStyle}>
                        <Label>{this.props.data.prompt.toUpperCase()}</Label>
                        <Input style={styles.textBoxStyle} getRef={(ref) => this._textInput = ref} 
                        autoCapitalize={cap}
                        secureTextEntry={secure} keyboardType={keyboard}
                        
                        //ref={input => { this.textInput = input }}
                        //ref={input => { this.textInput = input }}
                        onChangeText={text => this.setText(text)}
                        value={this.state.text}
                        //onChangeText={(text) => {this.setText(text)}}  
                        autoCorrect={false}/>                  
                    </Item>
                </View>
                <View>
                    <Button  onPress={this.textInputAnswer.bind(this)} disabled={this.state.sendDisabled || this.state.text.length != 10} style={styles.sendButton}>
                        <Image source={this.state.sendDisabled  || this.state.text.length != 10 ? Icons.sendInactive: Icons.sendActive} />   
                    </Button>
                </View>
            </View>
        )
    }

    renderAsyncTextPrompt(keyboard,secure){
        return (
            <View style={styles.inputContainer}>
                <View style={{flex:1}}>
                    <Item floatingLabel style={styles.inputStyle}>
                        <Label>{this.props.data.prompt.toUpperCase()}</Label>
                        <Input style={styles.textBoxStyle} getRef={(ref) => this._textInput = ref} 
                        //ref={(ref) => { this.textInput = ref; }} 
                        secureTextEntry={secure} keyboardType={keyboard}
                        
                        //ref={input => { this.textInput = input }}
                        //ref={input => { this.textInput = input }} 
                        onChangeText={(text) => {this.setText(text)}}
                        //onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                        autoCorrect={false}/>                  
                    </Item>
                </View>
                <View>
                    <Button  disabled={this.props.onAsyncClick || this.state.sendDisabled} onPress={this.textInputAnswer.bind(this)}  style={styles.sendButton}>
                        <Image source={this.state.sendDisabled ? Icons.sendInactive: Icons.sendActive} /> 
                        {
                            this.props.onAsyncClick && 
                            <View  style={CommonStyles.absoluteContainer}>
                                <ActivityIndicator color={primaryColor} />
                            </View>
                        }  
                    </Button>
                    
                </View>
            </View>
        )
    }

    renderRepeatPasswordPrompt(keyboard,secure){
        return (
            <View style={styles.inputContainer}>
                <View style={{flex:1,borderRightWidth:1,borderRightColor:lightColor}}>
                    <Item floatingLabel style={styles.inputStyle}>
                        <Label>Password</Label>
                        <Input secureTextEntry={secure} keyboardType={keyboard}
                        getRef={(ref) => this.pwd = ref} 
                        onChangeText={(text) => {this.textInput = text;this.setPasswordText()}} 
                        autoCorrect={false}/>                  
                    </Item>
                </View>
                {/* <View style={[CommonStyles.lightRightBorder]}/> */}
                <View style={{flex:1,marginLeft:30}}>
                    <Item floatingLabel style={styles.inputStyle}>
                        <Label>Confirm</Label>
                        <Input secureTextEntry={secure} keyboardType={keyboard}
                        getRef={(ref) => this.rePwd = ref}
                        onChangeText={(text) => {this.repeatPassword = text;this.setPasswordText()}} 
                        autoCorrect={false}/>                  
                    </Item>
                </View>
                <View>
                    <Button onPress={this.textInputAnswer.bind(this,'repwd')} disabled={this.state.sendDisabled} style={styles.sendButton}>
                        <Image source={this.state.sendDisabled ? Icons.sendInactive: Icons.sendActive} />   
                    </Button>
                </View>
            </View>
        )
    }

    // renderDatePrompt(){
    //     console.log('date')
    //     return (
    //         <View style={styles.inputContainer}>
    //             <View style={{flex:1}}>
    //                 <Item floatingLabel style={styles.inputStyle}>
    //                     <Label>{this.props.data.prompt.toUpperCase()}</Label>
    //                     <Input disabled value={this.state.date}/>
                            
    //                 </Item>
    //                 <DatePicker
    //                     style={styles.datePickerContainer}
    //                     date={this.state.date}
    //                     mode="date"
    //                     placeholder="select date"
    //                     format="YYYY-MM-DD"
    //                     confirmBtnText="Confirm"
    //                     cancelBtnText="Cancel"
    //                     customStyles={styles.datepickerStyle}
    //                     showIcon={true}    
    //                     iconComponent = { <View style={{position:"absolute",left:15}}></View>}
    //                     // onDateChange={(date) => {this.sendAnswer(date) }}
    //                     onDateChange={(date) => this.setDate(date)} 
    //                 />            
    //             </View>
    //             <View>
    //                 <Button onPress={() => {this.sendAnswer(this.state.date)}} disabled={this.state.sendDisabled} style={styles.sendButton}>
    //                     <Image source={this.state.sendDisabled ? Icons.sendInactive: Icons.sendActive} />   
    //                 </Button>
    //             </View>
    //         </View>
  
    //     )
    // }

    renderDatePrompt(jsonfield){
        console.log('date');
        let  maximumDate = null;
        let  minimumDate = null;
        if(jsonfield == 'dob'){
              maximumDate = moment().add(-22, 'years').toDate();
              minimumDate = moment().add(-60, 'years').toDate();
        }
        else{
              maximumDate = moment().add(10, 'years').toDate();
              minimumDate = moment().add(-10, 'years').toDate();
        }

        const dateDtring = formatDate(this.state.date);
        return (
            <View>
                <View style={styles.inputContainer}>
                    <View style={{flex:1}}>
                        <Item floatingLabel style={styles.inputStyle}>
                            <Label>{this.props.data.prompt.toUpperCase()}</Label>
                            <Input disabled value={dateDtring}/>
                                
                        </Item>                             
                    </View>
                    <View>
                        <Button onPress={() => {this.sendAnswer(dateDtring)}} disabled={this.state.sendDisabled} style={styles.sendButton}>
                            <Image source={this.state.sendDisabled ? Icons.sendInactive: Icons.sendActive} />   
                        </Button>
                    </View>
                </View>
                <DatePicker
                    date={this.state.date}
                    maximumDate = {maximumDate}
                    minimumDate = {minimumDate}
                    mode="date"
                    order='M-D-Y'
                    onDateChange={date =>{this.setDate( date )}}
                    style={{ width: '100%',backgroundColor:semiLightColor1 }}
                /> 
            </View>
  
        )
    }

    renderSignUpType(){
        return (
            <View style={styles.btnContainer}>
                { 
                    this.props.data.choices.map((ans,index)=>{  
                        const text = ans.value == "Email" ?Strings.signUpWith :Strings.connectWith            
                    return (
                       
                            <SeparaterButton key={ans.id+"signupType"} iconSrc={Icons[ans.value]} title={text+' '+ ans.value} onPress={() => {this.sendAnswer(ans.id)}} />
                       
                    )
                    }) 
                }
            </View>  
        )
    }
    renderPermission(){
        return (
            <View style={styles.btnContainer}>
                { 
                    this.props.data.choices.map((ans,index)=>{  
                     
                        if(index == 0)
                            return (
                            
                                <Button style={styles.promptfullBtn} block key={ans.id+"boolans"} onPress={() => {this.sendAnswer(ans.id)}} >
                                <Text>{ans.value}</Text>
                                </Button>
                            
                            )

                            return(
                                <Button style={styles.promptfullBtn} light bordered  block key={ans.id+"boolans"} onPress={() => {this.sendAnswer(ans.id)}} >
                                <Text>{ans.value}</Text>
                                </Button>
                            )
                    }) 
                }
            </View>  
        )
    }
    renderBooleanPrompt(){
        return (
            <View  style={styles.btnContainer}>
                { 
                    this.props.data.choices.map((ans,index)=>{              
                    return (
                        <Button style={styles.promptfullBtn} block key={ans.id+"boolans"} onPress={() => {this.sendAnswer(ans.id)}} >
                            <Text>{ans.value}</Text>
                        </Button>
                    )
                    }) 
                }
            </View>  
        )
    }

    renderAsyncListPrompt(){
        return (
            <View  style={styles.btnContainer}>
                   
                { 
                    this.props.data.choices.map((ans,index)=>{              
                    return (
                        <Button disabled={this.props.onAsyncClick} style={styles.promptfullBtn} block key={ans.id+"boolans"} onPress={() => {this.sendAnswer(ans.id)}} >
                            <Text>{ans.value}</Text> 
                            {
                                this.props.onAsyncClick && 
                                <View  style={CommonStyles.absoluteContainer}>
                                    <ActivityIndicator color={primaryColor} />
                                </View>
                            }                      
                        </Button>
                    )
                    }) 
                }
                
                {/* {
                    this.props.onAsyncClick && 
                    <View  style={CommonStyles.absoluteContainer}>
                        <ActivityIndicator color={primaryColor} />
                    </View>
                } */}
            </View>  
        )
    }

    renderAddressPrompts(){

            return (
                <View>
                <View style={styles.inputContainer}>
                    <View style={{flex:1}}>
                        <Item floatingLabel style={styles.inputStyle}>
                            <Label>{this.props.data.prompt.toUpperCase()}</Label>
                            <Input value={formatAddress(this.state.address)} style={styles.textBoxStyle}  getRef={(ref) => this._textInput = ref}
                            autoCorrect={false}/>                  
                        </Item>
                        <TouchableHighlight underlayColor="transparent" onPress={this.toggleAddress.bind(this)} style={CommonStyles.absoluteContainer}>
                        <Text/>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <Button onPress={() => {this.sendAnswer(this.state.address)}} disabled={this.props.onAsyncClick || this.state.sendDisabled}  style={styles.sendButton}>
                            <Image source={this.state.sendDisabled ? Icons.sendInactive: Icons.sendActive} />   
                        </Button>
                        {
                        this.props.onAsyncClick && 
                        <View  style={CommonStyles.absoluteContainer}>
                            <ActivityIndicator color={primaryColor} />
                        </View>
                        }
                    </View>
                    
                </View>
                    <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.selectAddress}
                    onRequestClose={() => {
                        //alert('Modal has been closed.');
                    }}>
                        <View style={{flex:1}}>
                        <Header style={CommonStyles.header}>
                                <Left style={{flex:1}}>
                                    <Button transparent onPress={()=> {this.toggleAddress()}}>
                                        <Image style={{width:16,height:16}} source={Icons.back} />                  
                                    </Button>
                                </Left>
                                <Body style={{flex:4}}>
                                <Title>
                                    {Strings.selectAddress} 
                                </Title>
                                </Body>
                                <Right style={{flex:1}}/>
                            </Header> 
                            <Content >
                                <GooglePlacesInput getAddress={val => {
                                    this.setState({address:val},()=>{
                                        this.toggleAddress();
                                    })
                                    
                                }} />
                            </Content>
                        </View>
                    </Modal>
                </View>
            )

        

    }

    toggleAddress(){
        if(this.state.selectAddress)
            this.setAddress(this.state.address);
            
        this.setState({selectAddress: !this.state.selectAddress});
       
    }



    renderQuizPrompts(){
        if(this.props.data.multiselect){
            
            return (
                <View style={styles.btnContainer}>   
                    <Button style={styles.promptfullBtn}  block onPress={this.showPopUp.bind(this)}>
                        <Text>Select Option</Text>                 
                    </Button>              
                </View>
            );
        }
        return  (
            <View style={styles.btnContainer}>
                {this.getQuizAnswerList()}                         
            </View>
        )
    }
    renderMultiSelectPopUp(){

        return(

        <Modal
          animationType="slide"
          transparent={false}
          onRequestClose={() => {
          }}>
            <View style={{flex:1,flexDirection:"row",padding:15}}>
                
                <View style={{flex:4}} >
                    <Text style={styles.botQuestionText}>{this.props.data.prompt.toUpperCase()}</Text>
                </View>
                <View >
                    <Button onPress={this.closePopUp.bind(this)} transparent small primary rounded><Text>Cancel</Text></Button>
                </View>
            </View>
            <View style={{flex:5,flexDirection:"row",paddingHorizontal:15, paddingBottom:20}}>
                <Content style={{width:"100%"}}>
                    <List>
                        {this.multiSelectAnswersList()}
                    </List>
                </Content>

            </View>
            {this.state.showSaveAnswer &&  
            <View style={{paddingBottom:25,flexDirection:"row",justifyContent:"center", alignItems:"center",marginVertical:5}}>
                    <Button onPress={()=>{this.sendAnswer()}} block primary><Text>Save</Text></Button>
            </View> 
            }
        </Modal>
        )
    }
    getQuizAnswerList(){         
        return this.props.data.choices.map((ans,index)=>{              
                return (
                <Button  block key={ans.id+"listans"} onPress={() => {this.sendAnswer(ans.id)}} style={styles.promptfullBtn}>
                    <Text>{ans.value}</Text>
                </Button>
                )
                })      
    }

    multiSelectAnswersList(){
        const multiSelectButton = {
            width:this.props.data.choices.length > 5 ? "45%" : null
        }
        return this.props.data.choices.map((ans,index)=>{
            console.log(this.answerID.length);
            if(this.answerID.length == 0) {ans.checked = false};
            return (
                <ListItem style={[CommonStyles.spreadShadow,styles.multiSelectList]} key={ans.id+"listmselans"} onPress={()=>{this.multiSelect(ans,index)}} icon>
                    <Left>
                        <Icon active={true} style={{color: ans.checked?"#5A7DFF":"#eee"}} name="checkmark-circle"/>
                    </Left>
                    <Body style={CommonStyles.bb0}>
                        <Text style={{fontWeight: '500'}}>{ans.value}</Text>
                    </Body>
                </ListItem>
            )
        })

    }

    multiSelect(ans,index){
        const newArray = [...this.props.data.choices];

        newArray[index].checked = (ans.checked == undefined ? true : !ans.checked );

        if(newArray[index].checked){
            this.answerID.push(ans.id);

        }else{
            for (var key in this.answerID) {
                if(this.answerID[key]['id'] === ans['recordID']){
                    this.answerID.splice(key,1);
                    break;
                }
            }
        }
       this.setState({showSaveAnswer: this.answerID.length > 0 ? true:false});
    }

    showPopUp(){
        this.setState({
            showMultiSelectPop: true
        });
       // this.slideUp();
    }
    closePopUp(){
        this.setState({
            showMultiSelectPop: false
        })
    }


    textInputAnswer = (reqFor) => {
        if(!this.state.text)
            return;
        var textAns = this.state.text;
        
        // console.log(reqFor);
        if(reqFor === "repwd"){
            this.pwd._root.clear();
            this.rePwd._root.clear();
            this.pwd._root.blur();
            this.rePwd._root.blur();
            
        }
        else{
            this._textInput._root.clear();
            this._textInput._root.blur();
        }
        // //this.textInput = {};
            this.setState(InitialState);
         this.sendAnswer(textAns);
    }

    sendAnswer(ans){
        console.log(typeof ans);
        if(this.state.showMultiSelectPop)
            {
                this.closePopUp();
                this.setState({showSaveAnswer: false}) 
            }
        let answerID;
        if(ans || ans == 0 )
            answerID =  typeof ans == 'object' ? ans : [ans]   
        else
            answerID = this.answerID;
        this.answerID = [];
       // setTimeout(() => {
//console.log(this.props.index);
        this.props.onAnswer(answerID,this.props.index);
        this.setState({sendDisabled: true})          
       // }, 200);    
       
    }


    render(){

        return (
           <KeyboardAvoidingView   behavior= {OS === 'ios'? "padding" : null}>
                {this.renderFieldType()}
            </KeyboardAvoidingView>
        );
    }
}

const styles = {
    inputContainer:{
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: lightColor,
        backgroundColor:"#fff",
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: isIphoneX?15:0,
    },
    inputStyle:{
        marginLeft:0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },
    textBoxStyle:{
        top:0,
        paddingTop:5,
    },
    sendButton:{
        paddingHorizontal: 25,
    },
    dateLable:{
        top:8,
        color:semiLightColor3,
        left:15,
        position: 'absolute',
    },
    datepickerStyle:{
        btnTextConfirm: {
            color: primaryColor
        },
        dateIcon: {
            position: 'absolute',
            backgroundColor:"transparent",
            left: 0,
        },
        dateText:{
            fontSize:17,
            color:"#00000000",
        },
        dateInput: {
            borderRadius:0,
            borderWidth:0,
            height:50,
            backgroundColor:"transparent",
            borderColor:"transparent",
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
            alignItems: 'flex-start',           
        }
    },
    datePickerContainer:{
        flex: 1,
        width:"100%",
        position:"absolute",
        top:0,
        backgroundColor:"transparent",
        height:50,
        borderRadius:0,
        borderColor:'transparent',
        borderWidth:1,
        justifyContent:"center",
        
    },
    promptfullBtn:{
        marginVertical: 5,
    },
    btnContainer :{
        paddingHorizontal:16,
        paddingVertical: 10,
        marginBottom: isIphoneX?10:0,
    }
}
export default BotPrompts;