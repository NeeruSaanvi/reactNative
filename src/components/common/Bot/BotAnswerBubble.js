import React, { Component } from 'react';
import {  View,Image } from 'react-native';
import { Text,Button } from 'native-base';
import { lightColor, semiLightColor1, semiLightColor2 } from '../../../../themes/variables/Colors';
import { Icons } from '../../../assets/Images';
import { formatAddress } from '../../../Helper';

export default class BotAnswerBubble extends Component {

    constructor(props){
        super(props)
    }

    componentWillReceiveProps(nextprops){
        console.log(nextprops);
    }

    onEdit(){
        this.props.onEdit(this.props.index, this.props.currentSessionIndex);
    }

    renderLabel(){
        switch (this.props.fieldType) {
            case 'bottextprompt':
            case 'botnumberprompt':
            case 'botemailprompt':
            case 'botphoneprompt':
            case 'botpasswordprompt':
            case 'botrepeatpasswordprompt':
            case 'botdateprompt':
            case 'botasynctextprompt':
            case 'botasyncpasswordprompt':
            return(
                <Text style={styles.label}>
                    {this.props.label.toUpperCase() || ''}
                </Text>
            )
            default:
                return(null);
        }


    }

    renderAnswer(){
        console.log(this.props.answers);
        return this.props.answers.map((ans,index)=>{
            console.log(ans)
            if(this.props.fieldType == "botpasswordprompt" || this.props.fieldType == "botrepeatpasswordprompt"){
                 const pwd = ans.answer.toString().split("");
                return(
                        <View key={`${index}ans`} style={{flexDirection:"row"}}>
                         { 
                             pwd.map((val,i)=>{
                             return  (<View key={`${i}pwd`} style={styles.dotStyle} />)
                            })
                        }
                        </View>
                    )
            }
            else if(this.props.fieldType == "botaddressprompt"){
                return(
                    <Text numberOfLines={1} key={`${index}ans`}>
                        {formatAddress(ans)}
                    </Text>
                )
            }
            return (
                <Text key={`${index}ans`}>
                    {ans.answer}
                </Text>
            )
        })   
    }

    renderEdit(){
        switch (this.props.fieldType) {
            case 'botsignupoptionprompt':
            case 'botpermissionprompt':
                return(null);
            default:
            const fieldType = this.props.fieldType;
            const icon = (this.props.isAnswerDone || fieldType === "botpasswordprompt" || fieldType === "botasyncpasswordprompt" || fieldType === "botasynctextprompt") ?Icons.correct:Icons.edit;
            const disbleEdit = this.props.isAnswerDone || fieldType === "botpasswordprompt" || fieldType === "botasyncpasswordprompt" || fieldType === "botasynctextprompt";
                return(
                    <Button disabled={disbleEdit} transparent style={styles.button} onPress={()=>{this.onEdit()}}>
                        <Image style={{width:16,height:16}} source={icon} />
                    </Button>
                )
        }
    }

    render() {
        const flexDirection = this.props.direction === 'left' ? 'row' : 'row-reverse';
        const justifyContent = this.props.direction === 'left' ? 'flex-start':'flex-end'; 
        return (
            <View style={[styles.bubbleContainer,{flexDirection}]}>
                <View style={[styles.botQuestionContainer,{justifyContent}]} >
                    <View style={styles.botBubble}>
                        <View style={{flex:-1}}>
                            {this.renderLabel()}
                            {this.renderAnswer()}                      
                        </View>
                        <View >
                            {this.renderEdit()}                           
                        </View>
                    </View>
                </View>
            
                <View style={styles.emptyContainer} />
            </View> 
        );
    }
}

const styles = {
    bubbleContainer:{
        alignItems: 'center',
        marginVertical: 5,
        paddingHorizontal:16
    },
    emptyContainer:{
        flex:1
    },
    botQuestionContainer:{
        flex:3,
        flexDirection: 'row', 
    },
    botBubble:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingHorizontal:15,
        paddingVertical: 10,
        backgroundColor:"#EDECEC",
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 0,
        
    },
    label:{
        color: semiLightColor2,
        fontSize: 10,
        marginBottom: 5,
    },
    button:{
        paddingHorizontal:8,
        marginLeft:10
    },
    dotStyle:{
        backgroundColor:"#000",
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 2,
    }
}
