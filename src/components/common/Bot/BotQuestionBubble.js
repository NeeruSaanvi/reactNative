import React, { Component } from 'react';
import {  View } from 'react-native';
import { Text } from 'native-base';
import { lightColor } from '../../../../themes/variables/Colors';
import BotAnswerBubble from './BotAnswerBubble';
import { BotRobo } from './BotRobo';

export default class BotQuestionBubble extends Component {

    constructor(props){
        super(props)
        console.log(this.props);
    }

    renderQuestion(){

            switch (this.props.data.fieldtype) {
                case 'bottextprompt':
                case 'botnumberprompt':
                case 'botemailprompt':
                case 'botphoneprompt':
                case 'botpasswordprompt':
                case 'botrepeatpasswordprompt':
                case 'botdateprompt':
                case 'botasyncpasswordprompt':
                case 'botasynctextprompt':
                case 'botaddressprompt':
                    return(null);
                default:
                    return(
                        <View style={{paddingHorizontal:16}}>
                            <BotRobo/>
                            <View style={styles.bubbleContainer}>
                                <View style={styles.botQuestionContainer} >
                                    <View style={styles.botBubble}>
                                            <Text style={{lineHeight:22}}>
                                                {this.props.data.prompt}
                                            </Text>
                                    </View>
                                </View>       
                                <View style={styles.emptyContainer} />
                            </View>
                        </View>
                    );
            }
    }
    renderAnswer(){
        if(this.props.data.answers && this.props.data.answers.length > 0){
        return(
            <BotAnswerBubble 
                isAnswerDone={this.props.isAnswerDone} 
                currentSessionIndex={this.props.currentSessionIndex} 
                onEdit={(index,currentSessionIndex)=>{this.props.onEdit(index,currentSessionIndex)}} 
                index={this.props.index} label={this.props.data.prompt} 
                fieldType={this.props.data.fieldtype} 
                answers={this.props.data.answers} 
            />
        )
        }

        else
            return (null);
    }
  render() {
    return (
        <View style={styles.container}>
            {this.renderQuestion()}
            {this.renderAnswer()}
        </View> 
    );
  }
}

const styles = {
    bubbleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    emptyContainer:{
        flex:1,
        paddingHorizontal: 30
    },
    botQuestionContainer:{
        flex: -1,
        
        flexDirection: 'row', 
    },
    botBubble:{
        padding:15,
        borderWidth:1,
        borderColor: lightColor,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 6,
        backgroundColor:"#fff"
    }
}
