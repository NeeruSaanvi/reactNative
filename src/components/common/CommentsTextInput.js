import React, { Component } from 'react';
import { View, Image} from 'react-native';
import {Text,Button,Input,Item} from 'native-base';
import { Icons } from '@assets/Images';
import { lightColor } from '../../../themes/variables/Colors';
import { isIphoneX } from '../../Helper';

class CommentsTextInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            sendDisabled: true
        }
    }
  render() {
    return (
        <View style={styles.inputContainer}>
            <View style={{ flex: 1 }}>
                <Item style={styles.inputStyle}>
                    <Input
                        style={styles.textBoxStyle} getRef={(ref) => this._textInput = ref}
                        placeholder="Write a comment..."
                        //onChangeText={text => this.setText(text)}
                        //value={this.state.text}
                        autoCorrect={false} />
                </Item>
            </View>
            <View>
                <Button disabled={this.state.sendDisabled} style={styles.sendButton}>
                    <Image source={this.state.sendDisabled ? Icons.sendInactive : Icons.sendActive} />
                </Button>
            </View>
        </View>
    );
  }
}

const styles = {
    inputContainer: {
        flex:1,
        paddingHorizontal: 16,
        paddingVertical: 6,
        width:"100%",
        height: 60,
        borderTopWidth: 1,
        backgroundColor:"#fff",
        borderTopColor: lightColor,
        flexDirection: 'row',
        alignItems: 'center',
        position:'absolute',
        bottom: isIphoneX ? 15 : 0,
    },
    inputStyle: {
        marginLeft: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },
    textBoxStyle: {
        top: 0,
        paddingTop: 0,
    },
    sendButton: {
        paddingHorizontal: 25,
        height: 45
    }
}

export default CommentsTextInput;
