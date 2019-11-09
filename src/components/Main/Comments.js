import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Left, Text, Body, Title, Right, Button } from 'native-base';
import { Icons } from '@assets/Images';
import { Actions } from 'react-native-router-flux';
import CommentsView from '../common/CommentsView';
import CommentsTextInput from '../common/CommentsTextInput';
import { CommonStyles } from '../common/Styles';

class Commnets extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    render() {
        return (
            <Container>
                <Header style={CommonStyles.header}>
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => { Actions.pop() }}>
                            <Image style={{width:16,height:16}} source={Icons.back} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 4 }}>
                        <Title>
                            Comments
                        </Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <CommentsView data={this.props.data} />
                <CommentsTextInput />
            </Container>
        );
    }
}

export default Commnets;
