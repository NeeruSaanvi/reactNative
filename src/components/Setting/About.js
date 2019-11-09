import React, { Component } from "react";
import { View, Keyboard, Image, StyleSheet } from "react-native";
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




class About extends Component {

    constructor() {
        super();

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
                    <Body style={{ flex: 2 }}>
                        <Title>
                        {this.props.data.title || ""}
                        </Title>
                    </Body>
                    <Right />
                </Header>



                <Content style={CommonStyles.ContentPadding}>
                    <Text>
                        {this.props.data.description}
                    </Text>
                </Content>
            </Container>
        )
    };
}

const mapStateToProps = state => {
    const { userInfo } = state.root
    return { userInfo };
}
export default connect(mapStateToProps, {})(About);
