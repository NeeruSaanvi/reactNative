import React, { Component } from 'react';
import {  View, Image} from 'react-native';
import {
  Button,
  Text,
  Item,
  Input,
  Container,
  Content,
  Header,
  Left,
  Body,
  Title,
  Right
} from 'native-base';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { Strings } from '../../Strings';
import { Icons } from '@assets/Images';
import { CommonStyles } from '../common/Styles';
import { ResendCode,ConfirmRegistration } from '../../actions';
import { lightColor2 } from '../../../themes/variables/Colors';
import { Loader } from '../common/Loader';

class VerifyAccount extends Component {
  constructor(props){
    super(props);
    this.state = {     
      code: '',
    }
  }

  componentWillReceiveProps(nextprops){
      if(nextprops.signIn)
        Actions.popTo('login');
  }

  resendCode(){
    this.props.ResendCode();
  }

  confirmRegistration(){
      this.props.ConfirmRegistration({verificationCode: this.state.code, reqFrom:'login'})
  }

  render() {
    return (
      <Container >
            <Header style={CommonStyles.header}>
                <Left/>
                <Body>
                <Title>
                    {Strings.verifyAccount} 
                </Title>
                </Body>
                <Right/>
            </Header>
            <Content showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                <Text style={[CommonStyles.infoText,CommonStyles.textCenter]}>
                    Please verify your account by providing the verification code sent to your email address and registered mobile number
                </Text>
                <Item style={[CommonStyles.verticalMargin,styles.paddingHor]} regular >
                  <Input
                        placeholderTextColor={lightColor2} 
                        placeholder={Strings.verificationCode}
                        onChangeText={code => this.setState({ code })}
                        value={this.state.code}
                  />
                </Item>


                <Button  disabled={!this.state.code} style={CommonStyles.verticalMargin} primary  block  onPress={this.confirmRegistration.bind(this)}>
                     <Text>{Strings.verify}</Text>
                </Button>
                <Button transparent block onPress={this.resendCode.bind(this)}>
                  <Text style={{color:lightColor2}}>{Strings.resendCode}</Text>
                </Button>

            </Content>
            {this.props.loading && <Loader display={this.props.loading} />}             
      </Container>
    );
  }
}

const styles = {
    container : {
      flexGrow: 1,      
         justifyContent: 'center',
         alignItems: 'center',
        paddingHorizontal:60,
        paddingBottom: 60,
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
    },
    paddingHor:{
      paddingHorizontal: 8,
    }
}

const mapStateToProps = state =>{
    const { loading } = state.loader;
    const { signIn } = state.auth;
    return { loading,signIn }
}

export default connect(mapStateToProps, { ResendCode,ConfirmRegistration })(VerifyAccount);