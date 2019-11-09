import React, { Component } from "react";
import { View, Keyboard, Dimensions, TouchableHighlight, Alert, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import {
    Container,
    Header,
    Text,
    Content,
    Button,
    Body,
    H1,
    Title,
    Form,
    Item,
    Input,
    Label,
    Left,
    Right,
    Icon
} from 'native-base';

import { connect } from "react-redux";
import { UpdateUserInfo, ChangePwd } from "../../actions";
import { CommonStyles } from "../common/Styles";
import { Loader } from "../common/Loader";
import { Icons } from '@assets/Images';


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


class ChangePasswords extends Component {

    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        }

    }

    updatePassword() {
        if (this.state.newPassword != this.state.confirmPassword) {
            alert('Confirm password not match!')
        } else {
            Keyboard.dismiss();
            Actions.pop();
        }


        // this.props.ChangePwd({ oldPassword: this.state.oldPassword, newPassword: this.state.newPassword, confirmPassword: this.state.confirmPassword })
        // this.props.ChangePwd({ oldPassword: this.props.oldPassword, newPassword:this.props.newPassword})
    }

    render() {
        return (
            <Container >

                <Header style={CommonStyles.header}>
                    <Left>
                        <Button transparent onPress={() => { Actions.pop() }}>
                            <Image style={{ width: 16, height: 16 }} source={Icons.back} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 2 }}>
                        <Title>
                            Change Password
                        </Title>
                    </Body>
                    <Right />
                </Header>


                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(249,249,249,1.0)' }}>

                    <View style={{
                        width: viewportWidth - 40, height: 60, marginTop: 15,
                        borderColor: 'rgba(242,242,242,1.0)', borderWidth: 0.5, backgroundColor: '#fff'
                    }}>

                        {this.state.oldPassword != '' &&
                            <Text style={{ fontSize: 11, marginLeft: 10, marginTop: 7, color: 'gray' }}>Old Password</Text>
                        }

                        <Input style={{ fontSize: 14, marginLeft: 5 }}
                            underlineColorAndroid='transparent'
                            value={this.state.oldPassword}
                            onChangeText={(value) => this.setState({ oldPassword: value })}
                            // value={this.props.oldPassword}
                            // onChangeText={value => this.props.UpdateUserInfo({prop: 'oldPassword', value})}
                            placeholder="Old Password"
                            autoCorrect={false}
                            secureTextEntry
                        />
                    </View>

                    <View style={{
                        width: viewportWidth - 40, height: 60, marginTop: 15,
                        borderColor: 'rgba(242,242,242,1.0)', borderWidth: 0.5, backgroundColor: '#fff'
                    }}>

                        {this.state.newPassword != '' &&
                            <Text style={{ fontSize: 11, marginLeft: 10, marginTop: 7, color: 'gray' }}>New Password</Text>
                        }

                        <Input style={{ fontSize: 14, marginLeft: 5 }}
                            underlineColorAndroid='transparent'
                            value={this.state.newPassword}
                            onChangeText={(value) => this.setState({ newPassword: value })}
                            // value={this.props.newPassword}
                            // onChangeText={value => this.props.UpdateUserInfo({prop: 'newPassword', value})}
                            placeholder="New Password"
                            autoCorrect={false}
                            secureTextEntry
                        />
                    </View>

                    <View style={{
                        width: viewportWidth - 40, height: 60, marginTop: 15,
                        borderColor: 'rgba(242,242,242,1.0)', borderWidth: 0.5, backgroundColor: '#fff'
                    }}>

                        {this.state.confirmPassword != '' &&
                            <Text style={{ fontSize: 11, marginLeft: 10, marginTop: 7, color: 'gray' }}>Confirm Password</Text>
                        }

                        <Input style={{ fontSize: 14, marginLeft: 5 }}
                            underlineColorAndroid='transparent'
                            value={this.state.confirmPassword}
                            onChangeText={(value) => this.setState({ confirmPassword: value })}
                            // value={this.props.confirmPassword} 
                            // onChangeText={value => this.props.UpdateUserInfo({prop: 'confirmPassword', value})} 
                            placeholder="Confirm Password"
                            autoCorrect={false}
                            secureTextEntry
                            onSubmitEditing={() => { this.updatePassword(); }}
                        />
                    </View>

                    {this.state.oldPassword != '' && this.state.newPassword != '' && this.state.confirmPassword != '' && this.state.newPassword == this.state.confirmPassword &&
                        <View style={{
                            width: viewportWidth - 40, height: 50, borderRadius: 5, bottom: 20, position: 'absolute',
                            alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,208,212,1)'
                        }}>

                            <TouchableHighlight underlayColor='transparent'
                                style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => {
                                    this.updatePassword();
                                }}>

                                <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Update Password</Text>
                            </TouchableHighlight>
                        </View>
                    }


                    {/* <Content showsVerticalScrollIndicator={false} 
                    contentContainerStyle={{ flexGrow : 0.5, justifyContent : 'center' }}>
        
                    <Item style={CommonStyles.inputMarginTop} stackedLabel>
                        <Label>{this.props.reqFor=="forgot"? "Verification Code":"Old Password"}</Label>
                        <Input value={this.props.oldPassword} 
                            onChangeText={value => this.props.UpdateUserInfo({prop: 'oldPassword', value})} 
                            autoCorrect={false}
                            secureTextEntry />
                    </Item>
                    <Item style={CommonStyles.inputMarginTop} stackedLabel last>
                        <Label>Password</Label>
                        <Input  autoCorrect={false} value={this.props.newPassword}
                            onChangeText={value => this.props.UpdateUserInfo({prop: 'newPassword', value})}   secureTextEntry/>
                    </Item>
                    <Button large style={CommonStyles.mT30} block rounded primary onPress={() => this.updatePassword()}>
                        <Text >Update Password</Text>
                    </Button> 

                </Content> */}
                </View>
                {this.props.loading && <Loader display={this.props.loading} />}
            </Container>
        )
    };
}

const mapStateToProps = state => {
    const { oldPassword, newPassword } = state.auth;
    const { loading } = state.loader;
    return { oldPassword, newPassword, loading };
}


export default connect(mapStateToProps, { UpdateUserInfo, ChangePwd })(ChangePasswords);
