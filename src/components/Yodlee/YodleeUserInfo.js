import React, { Component } from "react";
import {View,Image, Keyboard,WebView,Modal} from "react-native";
import { Actions } from "react-native-router-flux";
import { Container, 
    Header,
    Text,
    Content,
    Button,
    Body,
    H1,H3,
    Title,
    Form,
    Item,
    Input,
    Label,
    Left,
    Right,
    List,
    ListItem,
    Icon } from 'native-base';

import { connect } from "react-redux";
import { UpdateYodleeUserInfo,CobrandSignIn, SignInYodleeUser,GetAccessToken,YodleeUserSession,GetFastLink } from "../../actions";
import { Loader } from "../common/Loader";
import { CommonStyles } from "../common/Styles";
import { Icons } from "@assets/Images";


class YodleeUserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {showFastLink: false}
    }
    //html = "";
    componentWillMount(){
        this.props.YodleeUserSession({"identity": this.props.userInfo.profileid});
    }
    login(){
        Keyboard.dismiss();
        console.log(this.props.cobrandInfo);
        this.props.SignInYodleeUser({username:this.props.username,password:this.props.password,cobrandSession:this.props.cobrandInfo.session.cobSession})
    }
    getAccessToken(){
        this.props.GetAccessToken({appId:this.props.cobrandInfo.cobrandId,cobrandSession:this.props.cobrandInfo.session.cobSession,userSession:this.props.userInfo.user.session.userSession})
    }

    setFastLink(){
        this.setState({showFastLink: !this.state.showFastLink});
    }

    renderfastLink(){
         console.log(this.props.userSession);
        this.htmlForm = "<style>.center{position: relative;float: left;top: 40%;left: 50%;transform: translate(-50%, -50%);} .processText{font-size:300%,color:#183247}</style><div class='center processText'><h1>Processing...</h1></div><div style='visibility:hidden'><form action='https://node.developer.yodlee.com/authenticate/restserver/' method='post' id='rsessionPost'>	RSession : <input type='text' name='rsession' placeholder='rsession' value='"+this.props.userSession.usersession+"' id='rsession'/><br/>	FinappId : <input type='text' name='app' placeholder='FinappId'  value='"+this.props.userSession.tokens.user.access_tokens[0].app_id+"' id='finappId'/><br/>	Redirect : <input type='text' name='redirectReq' placeholder='true/false' value='true'/><br/>	Token : <input type='text' name='token' placeholder='token' value='"+this.props.userSession.tokens.user.access_tokens[0].value+"' id='token'/><br/>	Extra Params : <input type='text' name='extraParams' placeholer='Extra Params' value='' id='extraParams'/><br/></form></div><script>document.getElementById('rsessionPost').submit();</script>";

        return(
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.showFastLink}
                onRequestClose={() => {
                    //alert('Modal has been closed.');
                }}>
                <View style={{flex:1}}>

                    <Header style={CommonStyles.header}>
                        <Left style={{ flex: 1 }}>
                            <Button transparent onPress={()=> {this.setFastLink()}}>
                                <Image style={{ width: 16, height: 16 }} source={Icons.close} />
                            </Button>
                        </Left>
                        <Right/>
                    </Header>
                    <WebView
                        source={{ html: this.htmlForm }}
                        renderError = {()=>{}}
                        onNavigationStateChange={(event) => {
                            console.log(event);
                        }}
                    />
                </View>
            </Modal>
        )
    }
    renderIcon(container){
        let icon = '';
        switch (container) {
            case 'creditCard':
                icon = 'ios-card';
                break;
            case 'bank':
                icon = 'ios-briefcase';                
                break;
        
            default:
                icon = 'ios-help';  
                break;
        }

        return(
            <Icon name={icon} />
        )
        
    }
    renderLinkedAccounts(){
        console.log(this.props.linkedAccounts);
        if(this.props.userSession.accounts.length > 0){

            return(
                <List
                    dataArray={this.props.userSession.accounts} 
                    renderRow={(account) =>
                    <ListItem style={styles.list}  icon key={account.id.toString()+'account'}>
                        <Left>
                            {this.renderIcon(account.container)}
                        </Left>
                        <Body>
                            <Text>{account.account_name}</Text>
                            <Text note>{account.provider_name} ({account.account_type})</Text>
                        </Body>
                        <Right>
                            <Text>{account.account_status} </Text>
                        </Right>
                    </ListItem>
                }/>
             );
        }
        else{
            return(
                <View style={CommonStyles.middleAlign}>
                    <Text>No accounts linked.</Text>
                    <Button block onPress={()=> {this.setFastLink()}} >
                            <Text  style={CommonStyles.whiteButtonText}>
                                Link Account
                            </Text>
                    </Button>
                </View>
            )
        }
    
    }

    render(){
        return(
        <Container >

            <Header style={CommonStyles.header}>
                <Left style={{ flex: 1 }}>
                    <Button transparent onPress={() => { Actions.pop() }}>
                        <Image style={{ width: 16, height: 16 }} source={Icons.back} />
                    </Button>
                </Left>
                <Body style={{ flex: 4 }}>
                    <Title>
                        Link Accounts
                    </Title>
                </Body>
                <Right style={{ flex: 1 }}>
                    <Button transparent onPress={()=> {this.setFastLink()}}>
                        <Image style={{ width: 16, height: 16 }} source={Icons.plus} />
                    </Button>
                </Right>
            </Header>
            {/* <Header style={CommonStyles.header}>
                <Left style={{flexDirection:"row"}}>
                    <Button onPress={()=> Actions.pop()} transparent>
                        <Icon name='arrow-round-back' />
                    </Button>                  
                </Left>
                <Right>
                    { 
                        this.props.loadFastLink && 
                        <Button onPress={()=> {this.setFastLink()}} style={CommonStyles.padL0} transparent>
                            <Text >Link Account</Text>
                        </Button>
                    }
                </Right>
            </Header> */}

            <View style={{padding:24}}>
             
            <Content showsVerticalScrollIndicator={false} contentContainerStyle={[CommonStyles.scrollViewMiddleAlign,]}> 
            

            {this.props.loadFastLink && this.renderLinkedAccounts()}


            
  
            </Content>
            {
                this.state.showFastLink && this.renderfastLink()
            }
            </View>
            {this.props.loading && <Loader display={this.props.loading} />} 
        </Container>
        )
    };
}

const styles = {
    list:{
        marginVertical:10
    }
}
const mapStateToProps = state =>{
    const { username, password,cobrandInfo,userSession,loadFastLink,linkedAccounts } = state.yodleeInfo;
    const {  userInfo } = state.root
    const { loading } = state.loader;
    return { username, password,userInfo,userSession,loadFastLink,linkedAccounts,loading};
}


export default connect(mapStateToProps, { UpdateYodleeUserInfo,CobrandSignIn,SignInYodleeUser,GetAccessToken,GetFastLink,YodleeUserSession })(YodleeUserInfo);
