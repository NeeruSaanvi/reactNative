import React, { Component } from 'react';
import {  View, Image } from 'react-native';
import { Button,Text } from 'native-base';
import { CommonStyles } from './Styles';
import { lightColor } from '../../../themes/variables/Colors';

export default class SeparaterButton extends Component {
  render() {

    return (
        <Button block light bordered style={[styles.buttonContainer,this.props.style]} onPress={this.props.onPress}>
          <View style={styles.iconContainer}>
            <Image source={this.props.iconSrc}/>
            
          </View>
          {/* <View style={[CommonStyles.lightRightBorder]}/> */}
          <View style={styles.textContainer}>
            <Text>{this.props.title}</Text>
          </View>
        </Button>    
    );
  }
}

const styles = {
  buttonContainer:{
    marginVertical: 5,
    backgroundColor:"#fff",
    flexDirection: 'row',
  },
  iconContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:15,
    borderRightWidth:1,
    borderRightColor:lightColor
  },
  textContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
}


