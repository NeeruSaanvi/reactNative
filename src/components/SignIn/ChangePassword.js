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
import { UpdatePwd } from '../../actions';
import { lightColor2 } from '../../../themes/variables/Colors';
import { Loader } from '../common/Loader';

class ChangePassowrd extends Component {
  constructor(props){
    super(props);
    this.state = {
      isCode: true,
      isPwd: true,      
      code: '',
      newPassword : ''
    }
  }


  changePassword(){
    this.props.UpdatePwd({code: this.state.code, newPassword: this.state.newPassword})
  }

  togglePassword(key){
    this.setState({[key]: !this.state[key]});
  }

  render() {
    return (
      <Container >
            <Header style={CommonStyles.header} >
                <Left/>
                <Body>
                <Title>
                    {Strings.changePassword} 
                </Title>
                </Body>
                <Right/>
            </Header>
            <Content showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                <Text style={[CommonStyles.infoText,CommonStyles.textCenter]}>
                    Please provide the verification code sent to your email address
                </Text>
                <Item style={[CommonStyles.verticalMargin,styles.paddingHor]} regular >
                  <Input 
                        secureTextEntry={this.state.isCode} 
                        placeholderTextColor={lightColor2} 
                        placeholder={Strings.verificationCode}
                        onChangeText={code => this.setState({ code })}
                        value={this.state.code}
                  />
                  <Button transparent onPress={()=> this.togglePassword('isCode')}>
                    <Image source={Icons.visible}/>
                  </Button>
                </Item>

                <Item style={[CommonStyles.verticalMargin,styles.paddingHor]} regular >
                  <Input 
                        secureTextEntry={this.state.isPwd} 
                        placeholderTextColor={lightColor2} 
                        placeholder={Strings.newPasswrod}
                        onChangeText={newPassword => this.setState({ newPassword })}
                        value={this.state.newPassword}
                        ref={component => this._newPwd = component}
                  />
                  <Button transparent onPress={()=> this.togglePassword('isPwd')}>
                    <Image source={Icons.visible}/>
                  </Button>
                </Item>

                <Button  disabled={!this.state.code || !this.state.newPassword } style={CommonStyles.verticalMargin} primary  block  onPress={this.changePassword.bind(this)}>
                     <Text>{Strings.change}</Text>
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
    return { loading }
}

export default connect(mapStateToProps, { UpdatePwd })(ChangePassowrd);