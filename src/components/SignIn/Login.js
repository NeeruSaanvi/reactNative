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
import SeparaterButton from '../common/SeparaterButton';
import { Strings } from '../../Strings';
import { Icons } from '@assets/Images';
import { CommonStyles } from '../common/Styles';
import { lightColor2, lightColor } from '../../../themes/variables/Colors';
import { SignInUser, ForgotPwd } from '../../actions';
import { ShowToast } from '../../Helper';
import { Loader } from '../common/Loader';

const INITIAL_STATE = {
    isSecure: true,
    email: '',
    password: ''
}
class Login extends Component {
  constructor(props){
    super(props);
    this.state = INITIAL_STATE
  }

  login(){
      console.log(`${this.state.email} ${this.state.password}`);
      this.props.SignInUser({email: this.state.email.toLowerCase(), password: this.state.password, reqFrom: 'login'})
  }

  forgotPassword(){
    if(!this.state.email){
        ShowToast('Please enter your email address', 'danger');
        return;
    }
    this.props.ForgotPwd({email: this.state.email.toLowerCase()})
  }

  togglePassword(){
    this.setState({isSecure: !this.state.isSecure});
  }

  render() {
    return (
      <Container >
            <Header style={CommonStyles.header}>
                <Left>
                    <Button transparent onPress={()=>{Actions.pop()}}>
                        <Image style={{width:16,height:16}} source={Icons.back} />                  
                    </Button>
                </Left>
                <Body>
                <Title>
                    {Strings.login} 
                </Title>
                </Body>
                <Right/>
            </Header>
            <Content showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

            <View style={[styles.halfCotainer]}>
                <SeparaterButton iconSrc={Icons.Google} style={CommonStyles.verticalMargin} title={Strings.connectWith +' '+ Strings.google} />
                <SeparaterButton iconSrc={Icons.Facebook} style={CommonStyles.verticalMargin} title={Strings.connectWith +' '+ Strings.facebook} />
            </View>
            <View style={{justifyContent:"center"}}>
                <View style={{width:15,height:1,backgroundColor:lightColor}} />
            </View>
            <View style={[styles.halfCotainer]}>

                <Item style={[CommonStyles.verticalMargin,styles.paddingHor]} regular >
                    <Input 
                        placeholderTextColor={lightColor2} 
                        placeholder={Strings.email} 
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        autoCapitalize={"none"}
                        keyboardType={"email-address"}
                    />
                </Item>

                <Item style={[CommonStyles.verticalMargin,styles.paddingHor]} regular >
                  <Input 
                        secureTextEntry={this.state.isSecure} 
                        placeholderTextColor={lightColor2} 
                        placeholder={Strings.password}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                  />
                  <Button transparent onPress={this.togglePassword.bind(this)}>
                    <Image source={Icons.visible}/>
                  </Button>
                </Item>

                <Button  disabled={!this.state.email || !this.state.password } style={CommonStyles.verticalMargin} primary  block  onPress={this.login.bind(this)}>
                     <Text>{Strings.login}</Text>
                </Button>

                <Button transparent block onPress={this.forgotPassword.bind(this)}>
                  <Text style={{color:lightColor2}}>{Strings.forgotPassword}</Text>
                </Button>
              </View>
            </Content>
            {this.props.loading && <Loader display={this.props.loading} />}            
      </Container>
    );
  }
}

const styles = {
    container : {
      flexGrow: 1,      
         justifyContent: 'space-around',
         alignItems: 'center',
        paddingHorizontal:60,
        paddingBottom: 60,
    },
    halfCotainer:{
      flex:-1,             
      justifyContent: 'center',
      alignItems: 'center',
      width:"100%"
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

export default connect(mapStateToProps, { SignInUser,ForgotPwd })(Login);