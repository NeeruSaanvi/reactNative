import React, { Component } from 'react';
import {View} from 'react-native';
import {Text, Button} from 'native-base';
import { connect } from "react-redux";
import {SignOut} from "../../actions"

class Lifematics extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
  }
  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
     
          <Text>Lifematics</Text>
      
    </View>
    );
  }
}



const mapStateToProps = state =>{
  const { loading } = state.loader;
  const { userInfo } = state.root;
  
  return { loading,userInfo };
}

export default connect(mapStateToProps,{ SignOut })(Lifematics);
