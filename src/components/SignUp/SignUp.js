import React, { Component } from 'react';
import {  View,Image } from 'react-native';
import { 
    Container,
    Text,
    Header,
    Left,
    Body,
    Title,
    Right,
    Button,
    Content
} from 'native-base';
import {Icons} from '@assets/Images';
import { CommonStyles } from '../common/Styles';
import { Actions } from 'react-native-router-flux';
import GardientHeader from '../common/GradientHeader';

import { Strings } from '../../Strings';
import RegBot from '../Bot/RegBot';



export default class SignUp extends Component {
  render() {
    return (
        <Container>
            <Header  style={CommonStyles.header}>
                <Left>
                    <Button transparent onPress={()=>{Actions.pop()}}>
                        <Image style={{width:16,height:16}} source={Icons.back} />                  
                    </Button>
                </Left>
                <Body>
                <Title>
                    {Strings.signup} 
                </Title>
                </Body>
                <Right/>
            </Header>    
            {/* <GardientHeader height={140}>
                <Header  style={[CommonStyles.header,{backgroundColor:"transparent",borderBottomColor:"transparent",borderBottomWidth:0}]}>
                    <Left>
                        <Button transparent onPress={()=>{Actions.pop()}}>
                            <Image source={Icons.back} />                  
                        </Button>
                    </Left>
                    <Body>
                    <Title>
                        {Strings.signup} 
                    </Title>
                    </Body>
                    <Right/>
                </Header>               
            </GardientHeader>            */}
            {/* <RegistrationBot /> */}
            <RegBot />
        </Container>
    );
  }
}
