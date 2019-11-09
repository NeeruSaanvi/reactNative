

import React, { Component } from 'react';
import { View, Image, Modal } from 'react-native';
import { Container, Content, Header, Left, Text, Body, Title, Right, Button } from 'native-base';
import VideoPlayer from '../MultiMedia/VideoPlayer';
import AudioPlayer from '../MultiMedia/AudioPlayer';
import { Icons } from '@assets/Images';
import { Actions } from 'react-native-router-flux';
import { CommonStyles } from '../Styles';
import { semiLightColor4 } from '../../../../themes/variables/Colors';
import EarnedBadge from '../EarnedBadge';
import CommentsView from '../CommentsView';
import CommentsTextInput from '../CommentsTextInput';
import { fontMedium, fontRegular } from '../../../../themes/variables/Fonts';
import { Strings } from '../../../Strings';
import { Capitalize } from '../../../Helper';
import { connect } from "react-redux";
import {UpdateRootInfo} from "../../../actions";

class DataConnect extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            showEarnedBadge: this.props.feed.inboxitem.state == 0 ? false : true,
            disconnectModal : false
        }
    }


    componentWillReceiveProps(nextProps){
        this.setState({showEarnedBadge: nextProps.feed.inboxitem.state == 0 ? false : true})
    }

    toggleModal(disconnect){
        this.setState({disconnectModal: !this.state.disconnectModal});

        if(disconnect)
            this.updateCardState(this.props.index);
    }

    updateCardState(index){
        const newArray =  [...this.props.inbox];
        
        newArray[index].inboxitem.state = 0;

        this.props.UpdateRootInfo({ prop: 'inbox', value: newArray });
        //Actions.pop();
        //Actions.pop({refresh: {refresh:Math.random()}});
    }

    getLogo(subcategoryname){
        switch (subcategoryname) {
            case 'facebook':
                 return {icon:Icons.Facebook }  
                break;
            case 'twitter':
                return {icon:Icons.twitterColor}  
               break;
            case 'linkedin':
               return {icon:Icons.linkedinColor}
            case 'fitbit':
               return {icon:Icons.fitbitColor}
            case 'appelehealth':
               return {icon:Icons.appleHealthColor}
            case 'yodlee':
               return {icon:Icons.bankColor}
            case '401-K':
               return {icon:Icons.foKColor}
              break;
            default:
                return {icon: null};
        }
    }

    connectTo(subcategoryname){
        switch (subcategoryname) {
            case 'facebook':                   
            case 'linkedin':
            case 'fitbit':
                    Actions.push('connectDataSource', { data: this.props.feed, index: this.props.index });
                break;
            case 'twitter':
            case 'appelehealth':
                return;
            case 'yodlee':
                Actions.yodlee();
            case '401-K':
                return;
                break;
            default:
                return;
        }
        
        
    }

    renderPlayerContainer() {
        return (
            <View style={styles.playerContainer}>
                <Image source={{ uri: 'https://midlifehacks.com/wp-content/uploads/2017/04/stones-2.jpg' }}
                    style={styles.imageBg} />
                <View style={styles.overlay}>
                    <Button transparent
                        onPress={() => {  }}
                        style={styles.playButton}
                    >
                        <Image style={styles.playButtonImage} source={Icons.play} />
                        <Text style={styles.playButtonText}>{Strings.play} Audio</Text>
                    </Button>
                </View>
            </View>


        )
    }

    renderAction(incentivename,subcategoryname,state) {
        return (
            <View style={styles.actionContainer}>
                <Image resizeMode='contain' style={styles.actionInfoIcon} source={Icons.lock} />
                <Text style={styles.actionInfoText}>
                    Pellentesque condimentum est nunc, sed accumsan lacus rhoncus nec curabitur eros.
                </Text>

                {
                    state == 0 ?
                    <Button block onPress={()=>{this.connectTo(subcategoryname)}}>
                        <Text>{incentivename}</Text>
                    </Button> :
                    <Button block bordered light onPress={()=>{this.toggleModal()}}>
                        <Text style={{color: "#6E6E6E",fontSize:14}}>{Strings.disconnect} {Capitalize(subcategoryname)}</Text>
                    </Button>
                }
                

            </View>
        )
    }

    renderUserPermissionContent() {
        return(
            <View style={styles.infoContainer}>
                <Text style={styles.infoHeading}>
                    What you’re allowing:
                </Text>
                <Text style={styles.infoListText}>
                    - Suspendisse consequat non risus
                </Text>
                <Text style={styles.infoListText}>
                    - Vivamus vulputate mattis diam sed lobortis
                </Text>
                <Text style={styles.infoListText}>
                    - Morbi venenatis
                </Text>
            </View>
        )

    }

    renderUserPrivateContent() {
        return(
            <View style={styles.infoContainer}>
                <Text style={styles.infoHeading}>
                    What stays private:
                </Text>
                <Text style={styles.infoListText}>
                    - Suspendisse consequat non risus
                </Text>
                <Text style={styles.infoListText}>
                    - Vivamus vulputate mattis diam sed lobortis
                </Text>
                <Text style={styles.infoListText}>
                    - Morbi venenatis
                </Text>
            </View>
        )
    }

    renderDisconnectModal(){
    return(
        <Modal
        animationType="fade"
        transparent={true}
        style={{backgroundColor:'rgba(255,255,255,0.5'}}
        visible={this.state.disconnectModal}
        onRequestClose={() => {
            //alert('Modal has been closed.');
        }}>
            <View style={styles.modalContainer}>
                <View style={styles.modalInfoContainer}>
                    <Image resizeMode="contain" style={styles.modalInfoImage} source={Icons.unlinked} />
                    <Text style={styles.modalHeading}>Are you sure?</Text>
                    <Text style={[styles.infoListText, {marginVertical:16,textAlign:'center',marginHorizontal:16}]}>
                        You’ll miss out on future well-being rewards and insights.
                    </Text>

                    <Button block onPress={()=>{this.toggleModal()}}>
                        <Text>{Strings.stayConnected}</Text>
                    </Button> 
                    <Button  style={{marginVertical: 10}} block bordered light onPress={()=>{this.toggleModal(true)}}>
                        <Text style={{color: "#6E6E6E",fontSize:14}}>{Strings.disconnect}</Text>
                    </Button> 
                </View>
            </View>
    </Modal>
    )
    }


    render() {
        const { categoryname, categorydesc, subcategoryname, imagepath, tags, cardtype, incentivename, amount, state } = this.props.feed.inboxitem;
        const {icon} =  this.getLogo(subcategoryname.toLowerCase());
        return (
            <Container>
                <Header style={[CommonStyles.header, this.state.showEarnedBadge && { height: 90 }]}>
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => { Actions.pop() }}>
                            <Image style={{ width: 16, height: 16 }} source={Icons.back} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 4 }}>
                        <Title>
                            {Strings.dataConnect}
                        </Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        {
                            state == 0 ?
                            <Button transparent onPress={() => { this.connectTo(subcategoryname.toLowerCase()) }}>
                                <Image style={{ width: 16, height: 16 }} source={Icons.plus} />
                            </Button> :
                            <Button transparent onPress={() => {  }}>
                                <Image style={{ width: 16, height: 16 }} source={Icons.linked} />
                            </Button>
                        }
                        
                    </Right>
                </Header>
                {this.state.showEarnedBadge && <EarnedBadge onlyText={true} amount={this.props.feed.inboxitem.amount} />}
                <Content style={{ paddingTop:32 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.headingContainer}>
                        <Image resizeMode='contain' style={styles.contentIcon} source={icon} />
                        <Text style={styles.feedHeading}>{Capitalize(subcategoryname)}</Text>
                    </View>
                    <Text style={styles.descriptionText}>
                        {categorydesc}
                    </Text>
                    {this.renderPlayerContainer(subcategoryname.toLowerCase())}
                    {this.renderUserPermissionContent()}
                    {this.renderUserPrivateContent()}
                    {this.renderAction(incentivename,subcategoryname.toLowerCase(), state)}

                </Content>
                {this.state.disconnectModal && this.renderDisconnectModal()}
            </Container>
        );
    }
}

const styles = {
    playerContainer: {
        borderRadius: 4,
        overflow: 'hidden',
        marginVertical: 20,
        marginHorizontal: 24,
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        marginBottom:15
    },
    feedHeading: {
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: 0.18,   
        marginLeft: 2,
        fontFamily: fontMedium
    },
    contentIcon: {
        width: 24,
        height: 24,
        marginRight: 2,
    },
    description: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptionText: {
        fontSize: 13,
        lineHeight: 22,
        paddingHorizontal: 24,
    },
    playButton: {
        alignSelf: 'center',
    },
    playButtonImage: {
        marginLeft: 16,
        width: 11,
        height: 12
    },
    playButtonText: {
        fontSize: 14,
        fontFamily: fontMedium,
        paddingLeft: 6,
        color: "#fff"
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#00000050',
        justifyContent: "center",
        alignItems: 'center',
        padding: 36
    },
    imageBg: {
        height: 180,
        width: null,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    infoContainer: {
        flex:1,
        justifyContent:'center',
        marginBottom: 10,
        paddingHorizontal: 24,
    },
    infoHeading: {
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 10,
        fontFamily: fontMedium,
    },

    infoListText: {
        fontSize: 13,
        lineHeight: 22
    },
    actionContainer: {
        padding: 24,
        backgroundColor: "#FAFAFA",
        marginTop:20,
        justifyContent:'center',
        alignItems: 'center',
        marginBottom:25
    },
    actionInfoIcon:{
        width:32,
        height:32,
        margin:20
    },
    actionInfoText:{
        fontSize: 13,
        lineHeight: 20,
        textAlign:'center',
        marginBottom:20
    },
    modalContainer:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.2)",
        justifyContent:'center',
        alignItems: 'center',
        padding:32
    },
    modalInfoContainer:{
        backgroundColor:"#fff",
        padding:16,
        borderRadius:4,
        justifyContent:'center',
        alignItems: 'center',
    },
    modalInfoImage:{
        width:28,
        width:28,
        margin:16,
    },
    modalHeading:{
        fontFamily: fontMedium,
        fontSize:18,
        lineHeight: 21
    }
}


const mapStateToProps = state =>{
    const { userInfo, inbox } = state.root;
    
    return { userInfo, inbox };
}

export default connect(mapStateToProps,{ UpdateRootInfo })(DataConnect);
