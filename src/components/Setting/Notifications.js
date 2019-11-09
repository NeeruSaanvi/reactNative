import React, { Component } from "react";
import {View, Keyboard, Dimensions, TouchableHighlight, Alert, Switch, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, 
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
    Icon } from 'native-base';

import { connect } from "react-redux";
import { UpdateUserInfo, ChangePwd } from "../../actions";
import { CommonStyles } from "../common/Styles";
import { Loader } from "../common/Loader";
import { Icons } from '@assets/Images';


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


class Notifications extends Component {

    constructor(props){
        super(props);

        this.state = {
            switchReward: false,
            switchLikes: false,
            switchComment: false,
            switchGroupUpdate: false,
        }
            
    }


    render(){
        return(
        <Container >
          
           

<Header style={CommonStyles.header}>
                    <Left>
                        <Button transparent onPress={() => { Actions.pop() }}>
                            <Image style={{ width: 16, height: 16 }} source={Icons.back} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 2 }} >
                        <Title>
                        Push Notifications
                        </Title>
                    </Body>
                    <Right />
                </Header>



            <View style={{ flex:1, alignItems:'center', backgroundColor:'rgba(249,249,249,1.0)' }}>

                <View style={{ width: viewportWidth, height: 50, alignItems:'center',
                            borderColor:'rgba(242,242,242,1.0)', borderTopWidth:0.5, backgroundColor: '#fff' }}>
                    
                    <View style={{ flexDirection:'row', width: viewportWidth-40, height: 50, alignItems:'center', justifyContent:'space-between' }}>
                        
                        <Text style={{ fontSize:14, color:'#000' }}>When i receive well-being rewards</Text>

                        <Switch tintColor={'rgba(225,225,225,1.0)'} onTintColor={'#00CCD0'}
                            style={{ transform: [{ scaleX: .99 }, { scaleY: .99 }] }}
                            onValueChange={(switchReward) => { this.setState({ switchReward }) }}
                            value={(this.state.switchReward)}
                        />
                    </View>
                </View>

                <View style={{ width: viewportWidth, height: 50, alignItems:'center',
                            borderColor:'rgba(242,242,242,1.0)', borderTopWidth:0.5, backgroundColor: '#fff' }}>
                    
                    <View style={{ flexDirection:'row', width: viewportWidth-40, height: 50, alignItems:'center', justifyContent:'space-between' }}>
                        
                        <Text style={{ fontSize:14, color:'#000' }}>When someone likes my updates</Text>

                        <Switch tintColor={'rgba(225,225,225,1.0)'} onTintColor={'#00CCD0'}
                            style={{ transform: [{ scaleX: .99 }, { scaleY: .99 }] }}
                            onValueChange={(switchLikes) => { this.setState({ switchLikes }) }}
                            value={(this.state.switchLikes)}
                        />
                    </View>
                </View>

                <View style={{ width: viewportWidth, height: 50, alignItems:'center',
                            borderColor:'rgba(242,242,242,1.0)', borderTopWidth:0.5, backgroundColor: '#fff' }}>
                    
                    <View style={{ flexDirection:'row', width: viewportWidth-40, height: 50, alignItems:'center', justifyContent:'space-between' }}>
                        
                        <Text style={{ fontSize:14, color:'#000' }}>When someone comments on my updates</Text>

                        <Switch tintColor={'rgba(225,225,225,1.0)'} onTintColor={'#00CCD0'}
                            style={{ transform: [{ scaleX: .99 }, { scaleY: .99 }] }}
                            onValueChange={(switchComment) => { this.setState({ switchComment }) }}
                            value={(this.state.switchComment)}
                        />
                    </View>
                </View>

                <View style={{ width: viewportWidth, height: 50, alignItems:'center', borderBottomWidth:0.5,
                            borderColor:'rgba(242,242,242,1.0)', borderTopWidth:0.5, backgroundColor: '#fff' }}>
                    
                    <View style={{ flexDirection:'row', width: viewportWidth-40, height: 50, alignItems:'center', justifyContent:'space-between' }}>
                        
                        <Text style={{ fontSize:14, color:'#000' }}>When my group receives an update(s)</Text>

                        <Switch tintColor={'rgba(225,225,225,1.0)'} onTintColor={'#00CCD0'}
                            style={{ transform: [{ scaleX: .99 }, { scaleY: .99 }] }}
                            onValueChange={(switchGroupUpdate) => { this.setState({ switchGroupUpdate }) }}
                            value={(this.state.switchGroupUpdate)}
                        />
                    </View>
                </View>

            </View>
            {this.props.loading && <Loader display={this.props.loading} />} 
        </Container>
        )
    };
}

const mapStateToProps = state =>{
    const { oldPassword, newPassword } = state.auth;
    const { loading } = state.loader;
    return {  oldPassword, newPassword,loading };
}


export default connect(mapStateToProps, { UpdateUserInfo, ChangePwd })(Notifications);
