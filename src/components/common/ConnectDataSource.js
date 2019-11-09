import React, { Component } from "react";
import { View, Keyboard, StyleSheet, WebView, Image } from "react-native";
import FBSDK, { LoginManager, AccessToken } from "react-native-fbsdk";
import LinkedInModal from "../../libs/react-native-linkedin"
import { Actions } from "react-native-router-flux";
import qs from 'qs';
import {
    Container,
    Header,
    Text,
    Content,
    Button,
    Body,
    H1,
    Title,
    Left,
    Right,
    Icon,
    Card,
    CardItem
} from 'native-base';

import { connect } from "react-redux";
import { UpdateStartInfo,UpdateRootInfo, ConnectToDataSource, CreateUserProfile, GetConfig } from "../../actions";
import { CommonStyles } from "./Styles"
import { Loader } from "./Loader";
import { ShowToast } from "../../Helper";
import { Icons } from "@assets/Images";

class ConnectDataSource extends Component {

    next() {
        Actions.socialImpact();
    }



    renderCreateInsurace() {

        if (this.props.getstart.socialdatasource.length > 0) {
            return (

                <View style={[CommonStyles.ContentPadding, { marginVertical: 15 }]}>
                    <Button large block rounded primary onPress={() => this.CreateInsurace()}>
                        <Text >Create Insurance</Text>
                    </Button>
                </View>
            )
        }
    }

    _connectData(reqFor) {
        this.props.ConnectToDataSource(reqFor);
    }

    CreateInsurace() {
        this.props.CreateUserProfile(this.props.getstart);
        // console.log(JSON.stringify(this.props.getstart.addressObj));
    }

    updateCardState(index){
        const newArray =  [...this.props.inbox];
        
        newArray[index].inboxitem.state = 1;

        this.props.UpdateRootInfo({ prop: 'inbox', value: newArray });
        //Actions.pop();
       // Actions.pop({refresh: {refresh:Math.random()}});
    }

    renderFBDataSource(userInfo, cardInfo, dataSourceConfig, index) {
        LoginManager.logInWithReadPermissions(dataSourceConfig.scope).then((result) => {
            if (result.isCancelled) {
                Actions.pop();
            } else {
                AccessToken.getCurrentAccessToken().then(
                    (token) => {
                        let tokenObj = {
                            "userId": token.userID,
                            "accessToken": token.accessToken,
                            "refreshToken": token.lastRefreshTime.toString(),
                            "tokenType": "",
                            "expiresIn": token.expirationTime.toString(),
                            "scope": token.permissions
                        }
                        this.props.ConnectToDataSource(userInfo, cardInfo, dataSourceConfig, tokenObj);
                        this.updateCardState(index);
                    })
            }
        }, (err) => {
            ShowToast(err.message, 'danger');
        });
    }

    renderFitBitDataSource(userInfo, cardInfo, dataSourceConfig, index) {
        let redirect_uri = "mppy://avibrafit";
        const oauthurl = dataSourceConfig.authUri + "?" +
            qs.stringify({
                client_id: dataSourceConfig.clientId,
                response_type: 'token',
                scope: dataSourceConfig.scope.join(" "),
                redirect_uri: redirect_uri,
                expires_in: '31536000',
                //state,
            });
        return (
            <Container >
                <Header style={CommonStyles.header}>
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => { Actions.pop() }}>
                            <Image style={{ width: 16, height: 16 }} source={Icons.back} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 4 }}>
                        <Title>
                            {cardInfo.inboxitem.subcategoryname}
                        </Title>
                    </Body>
                    <Right style={{ flex: 1 }}/>
                </Header>
                    <WebView
                        source={{ uri: oauthurl }}
                        renderError = {()=>{}}
                        onNavigationStateChange={(event) => {
                            if (event.url.indexOf(redirect_uri) != -1) {
                                const [, query_string] = event.url.match(/\#(.*)/);
                                let token = qs.parse(query_string);
                                let tokenObj = {
                                    "userId": token.user_id || "",
                                    "accessToken": token.access_token || "",
                                    "refreshToken": token.lastRefreshTime || "",
                                    "tokenType": token.token_type,
                                    "expiresIn": token.expires_in.toString(),
                                    "scope": (token.scope || []).split(" ")
                                }
                                this.props.ConnectToDataSource(userInfo, cardInfo, dataSourceConfig, tokenObj);
                                this.updateCardState(index);
                            }
                        }}
                    />
            </Container>
        )
    }

    renderLinkedInDataSource(userInfo, cardInfo, dataSourceConfig, index) {
        return (
            <LinkedInModal
                clientID={dataSourceConfig.clientId}
                clientSecret={dataSourceConfig.clientSecret}
                redirectUri={dataSourceConfig.redirectUri}
                onSuccess={(token) => {
                    let tokenObj = {
                        "userId": token.userID || "",
                        "accessToken": token.access_token || "",
                        "refreshToken": token.lastRefreshTime || "",
                        "tokenType": "",
                        "expiresIn": token.expires_in.toString(),
                        "scope": token.permissions || []
                    }
                    this.props.ConnectToDataSource(userInfo, cardInfo, dataSourceConfig, tokenObj);
                    this.updateCardState(index);
                }}
                onClose={() => { Actions.pop() }}
                onError={() => { Actions.pop() }} />
        )
    }

    renderDefault() {
        return (
            <Container >
                <Header style={CommonStyles.header}>
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => { Actions.pop() }}>
                            <Image style={{ width: 16, height: 16 }} source={Icons.back} />
                        </Button>
                    </Left>
                </Header>
                <Content showsVerticalScrollIndicator={false} style={CommonStyles.ContentPadding}>
                    <H1>Data Connect</H1>
                    <View style={{ marginVertical: 20 }}>
                        <Text style={[CommonStyles.opacText]}>
                            Connect to your social network
                            </Text>
                    </View>


                    <Card style={[CommonStyles.br8, CommonStyles.b0, CommonStyles.spreadShadow]}>
                        <CardItem button onPress={() => this._connectData(this.props.getstart.socialdataConfig[2].commonoauthappDto
                        )} style={[CommonStyles.br8]}>
                            <Left >
                                <Icon style={{ color: "#3B5998" }} active name="logo-facebook" />
                                <Body>
                                    <Text>Connect to facebook</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>

                </Content>

                {this.renderCreateInsurace()}
                {this.props.loading && <Loader display={this.props.loading} />}
            </Container>
        )
    }

    renderDataSource(userInfo, cardInfo, dataSourceConfig, index) {
        switch (cardInfo.inboxitem.subcategoryname.toUpperCase()) {
            case "FACEBOOK":
                return this.renderFBDataSource(userInfo, cardInfo, dataSourceConfig, index)
            case "LINKEDIN":
                return this.renderLinkedInDataSource(userInfo, cardInfo, dataSourceConfig, index)
            case "FITBIT":
                return this.renderFitBitDataSource(userInfo, cardInfo, dataSourceConfig, index)
            default:
                return this.renderDefault();
        }
    }

    componentWillMount() {
        this.props.GetConfig();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.getstart && (nextProps.data.inboxitem.state == 0)) {
            const { data, getstart } = nextProps;
            let dataSourceConfig = getstart.socialdataConfig.filter(function (item) { return item.commonoauthappDto.appName.toUpperCase() == data.inboxitem.subcategoryname.toUpperCase() })[0]
            this.dataSource = this.renderDataSource(this.props.userInfo, data, dataSourceConfig.commonoauthappDto, this.props.index)
        }
    }


    render() {
        return this.dataSource ? this.dataSource : null
        // return (<Button style={{margin:30}} block onPress={()=>{this.updateCardState(this.props.index)}}><Text>Link</Text></Button>)
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
})


const mapStateToProps = state => {

    const { getstart } = state;
    const { userInfo,inbox } = state.root;
    const { loading } = state.loader;

    return { getstart, loading, userInfo,inbox };
}


export default connect(mapStateToProps, { UpdateStartInfo,UpdateRootInfo, ConnectToDataSource, CreateUserProfile, GetConfig })(ConnectDataSource);
