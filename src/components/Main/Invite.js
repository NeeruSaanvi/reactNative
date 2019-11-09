import React, { Component } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { Actions } from "react-native-router-flux";
import {
    Container,
    Header,
    Text,
    Content,
    Button,
    Body,
    Title,
    Form,
    Item,
    Input,
    InputGroup,
    Label,
    List,
    ListItem,
    Left,
    Right,
    Icon,
    Thumbnail
} from 'native-base';
import { connect } from "react-redux";
import { GetContactsList, CreateInvite } from '../../actions';
import DatePicker from 'react-native-datepicker';
import { CommonStyles } from '../common/Styles';
import { Strings } from '../../Strings';
import { Icons } from '@assets/Images';
import { backgroundColor, primaryColor } from '../../../themes/variables/Colors';
import { fontMedium } from '../../../themes/variables/Fonts';
var _ = require('lodash');


const contacts = [];
class Invite extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);

        this.state = {
            filteredContacts: [],
            loadingContacts : false
        }
    }


    componentWillMount() {
         //this.getContacts();
         if( this.props.inviteContacts.length > 0 ){
            this.setState({ filteredContacts: this.props.inviteContacts })
         }

    }

    componentWillReceiveProps(nextProps) {
        if (this.state.filteredContacts.length == 0) {
            console.log(nextProps.inviteContacts);
            this.setState({loadingContacts: false})
            const contact = nextProps.inviteContacts
            this.setState({ filteredContacts: contact })
        }

        if (!_.isEqual(this.props.index, nextProps.index))
            this.updateList(nextProps.index);
    }

    getContacts() {
        this.setState({loadingContacts: true})
        this.props.GetContactsList(true);
    }

    invite(index, contactNumber) {
        var data = { "profileid": this.props.userInfo.profileid, "contactnumber": contactNumber, "state": "Invite" };
        data.state = "Invite";
        this.props.CreateInvite(index, data);
    }

    updateList(index) {
        let newState = Object.assign({}, this.state);
        newState.filteredContacts[index].state = "Invite";
        this.setState(_.cloneDeep(newState));
    }

    filterContacts(query) {
        let q = query.toLowerCase();

        this.setState({filteredContacts: _.filter(contacts , (contact) => {

                let gn = contact.givenname || '';
                let fn = contact.familyname || '';
                let givenname = gn.toLowerCase();
                let familyname = fn.toLowerCase();
                let contactnumber = contact.contactnumber;
                return givenname.indexOf(q) > -1 || familyname.indexOf(q) > -1 || contactnumber.indexOf(q) > -1;
            })
        });
    }

    renderBody() {
        let defaultAvatar = Icons.defaultAvatar;

        contacts = this.props.inviteContacts;

        return (

            contacts.length > 0 ?
                <View style={{flex:1}}>
                    <InputGroup style={styles.searchContainer} >
                        <Image style={{ width: 16, height: 16  }} source={Icons.searchInactive} />
                        <Input onChangeText={(val) => { this.filterContacts(val) }} placeholder='Search...' />
                    </InputGroup>
                    <Content showsVerticalScrollIndicator={false} >
                        <List removeClippedSubviews={false} dataArray={this.state.filteredContacts} renderRow={(contact, sectionID, rowID, highlightRow) => {
                            return (
                                <ListItem avatar key={contact.contactnumber} style={{ marginLeft: 0,paddingVertical:5 }}>
                                    <Left style={{ marginLeft: 5}}>
                                        <Thumbnail style={{width:36,height:36, borderRadius:18}} source={contact.thumbnailpath != "" ? {
                                            uri: contact.thumbnailpath
                                        } : defaultAvatar} />
                                    </Left>
                                    <Body style={{justifyContent:'center'}}>
                                        <Text numberOfLines={1} style={styles.contactName}>{(contact.givenname + " " + (contact.familyname ? contact.familyname : "")).trim()}</Text>
                                        <Text style={styles.contactNumber}>{contact.contactnumber}</Text>
                                    </Body>
                                    <Right  style={{ justifyContent: "center" }}>
                                        <Button block primary small disabled={contact.state != ""} bodered onPress={() => this.invite(rowID, contact.contactnumber)}>
                                            <Text >{contact.state != "" ? Strings.invited : Strings.invite}</Text>
                                        </Button>
                                    </Right>
                                </ListItem>)
                        }}>
                        </List>
                    </Content>
                </View>
                :
                <View style={styles.contactInfoContainer} >
                    <Image style={styles.infoIcon} source={Icons.contacts} />
                    <Text style={styles.infoText}>In order to invite friends, Avibra needs access to your contacts.</Text>
                    <Button disabled={this.state.loadingContacts} block onPress={() => this.getContacts()}>
                        <Text>{Strings.givePermission}</Text>
                        {
                                this.state.loadingContacts && 
                                <View  style={CommonStyles.absoluteContainer}>
                                    <ActivityIndicator color={primaryColor} />
                                </View>
                        } 
                    </Button>
                </View>

        )
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
                    <Body>
                        <Title>
                            {Strings.inviteFriends}
                        </Title>
                    </Body>
                    <Right />
                </Header>
                {this.renderBody.call(this)}
            </Container>
        );
    }
}

const styles = {
    dateText: {
        position: "absolute",
        left: 5,
        top: 38,
        color: '#183247',
        fontSize: 17
    },
    contactInfoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25
    },
    infoText:{
        fontSize:16,
        lineHeight:22,
        textAlign:'center',
        marginVertical: 30,
    },
    infoIcon:{
        width:70,
        height:70
    },
    searchContainer:{
        backgroundColor: backgroundColor,
        paddingLeft:17,
        paddingRight:17,
        marginTop:3,
        borderBottomWidth:0
    },
    contactNumber:{
        color:"#C0C0C0",
        fontSize:12,
        fontFamily: fontMedium,
        lineHeight:14
    },
    contactName:{
        fontSize:16,
        lineHeight:24
    }
}
const mapStateToProps = state => {
    const { inviteContacts, index } = state.contacts
    const { userInfo } = state.root;
    return { userInfo, inviteContacts, index };
}
export default connect(mapStateToProps, { GetContactsList, CreateInvite })(Invite);