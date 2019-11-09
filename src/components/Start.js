import React, { Component } from 'react';
import {  View, StyleSheet} from 'react-native';
import {Button,Text} from 'native-base';
import StartDemo from './StartDemo';
import { Actions } from 'react-native-router-flux';
import { Strings } from '../Strings';
import { CommonStyles } from './common/Styles';

export default class Start extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.demoContainer}>
          <StartDemo />
        </View>
        <View style={styles.btnCotainer}>
          <Button block 
          style={CommonStyles.verticalMargin}
          onPress={()=>{Actions.signup()}}
          >
            <Text>{Strings.signup}</Text>
          </Button>
          <Button  light bordered block style={CommonStyles.verticalMargin} onPress={()=>{Actions.login()}}>
            <Text>{Strings.logIn}</Text>
          </Button>
        </View>       
      </View>
    );
  }
}

const styles = {
    container : {
        flex:1,       
        justifyContent: 'center',
        alignItems: 'center',
    },
    demoContainer:{
      flex:2,
      width:"100%",
      paddingHorizontal: 50
    },
    btnCotainer:{
      flex:1,
      width:"100%",
      padding:60,      
      justifyContent:'center',
      alignItems: 'center',
    },
    btnMargin:{
      marginBottom: 15,
    }
}