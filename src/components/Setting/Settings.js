import React, { Component } from "react";
import { View, Keyboard, Image, StyleSheet, Alert } from "react-native";
import {
    Card,
    CardItem,
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
    List,
    ListItem,
    Input,
    Label,
    Left,
    Right,
    Icon
} from 'native-base';

import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { CommonStyles } from "../common/Styles";
import { SignOut } from "../../actions";
import { Icons } from '@assets/Images';


const desp = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla velit sem, ornare sed neque eu, auctor mollis mi. Mauris vulputate turpis iaculis odio malesuada, in luctus dui aliquet. Proin at orci congue, sodales quam non, vulputate ipsum. Nullam vel volutpat erat. Sed tristique rhoncus lorem in luctus. Mauris at purus id nisl porttitor ultricies. Aliquam metus mauris, efficitur non mauris id, pellentesque dictum felis. Cras non condimentum urna. Donec pharetra scelerisque enim, at cursus ex porta vel";

const links = [
    { title:"Change Password" },
    { title:"Add PIN" },
    { title:" Push Notifications" },
    { title:"Privacy Policy" },
    { title:"Terms of Service" },
    { title:"Logout" }
  ];

class Settings extends Component {

    constructor() {
        super();

    }

    signOut(){
        this.props.SignOut();
    }

    onLink(rowID,data){
        console.log(rowID)
        switch (rowID) {
            case "1":
                Actions.AddPin();
                break;
            case "2":
                Actions.Notifications();
                break;
            case "3":
                Actions.About({data:{title:"Privacy Policy", description:desp}});
                break;
            case "4":
                Actions.About({data:{title:"Terms & Service", description:desp}});
                break;
            case "5":
                // this.signOut();
                alert("SignOut");
                break;
            default:
                Actions.ChangePasswords();
                break;
        }
    }



    render() {
        return (
            <Container>
                

<Header style={CommonStyles.header}>
                    <Left>
                        <Button transparent onPress={() => { Actions.pop() }}>
                            <Image style={{ width: 16, height: 16 }} source={Icons.back} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>
                        Settings
                        </Title>
                    </Body>
                    <Right />
                </Header>



                <Content  style={[CommonStyles.ContentPaddingHome]}>
                   { links.length > 0 && <List removeClippedSubviews={false}
                        dataArray={links}
                        renderRow={(data, sectionID, rowID, highlightRow) =>
                        <ListItem  key={`${rowID}setting`} onPress={this.onLink.bind(this,rowID)}>
                            <Left>
                                <Text>
                                    {data.title}
                                </Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>}
                    />}
                </Content>
            </Container>
        )
    };
}

const mapStateToProps = state => {
    const { userInfo } = state.root
    return { userInfo };
}

export default connect(mapStateToProps, {SignOut})(Settings);
