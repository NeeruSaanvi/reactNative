import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {  View, Image, } from 'react-native';
import {Button,Text} from 'native-base';
import { Icons } from '@assets/Images';
import { Actions } from 'react-native-router-flux';
var abbreviate = require('number-abbreviate')
export default class CommentButton extends Component {
    constructor(props){
        super(props);
    }

    static propTypes = {
        index: PropTypes.number.isRequired,
        feed: PropTypes.shape({}).isRequired,
        isEarned: PropTypes.bool.isRequired 
    }

    render() {
        return (
            <Button transparent dark onPress={() => Actions.comments({ data: this.props.feed.inboxitem })} style={{marginRight:0,marginLeft:10}}>
                <Image style={{width:16,height:16}} source={Icons.comment} />
                <Text style={{paddingLeft:9,paddingRight:9,fontSize:12}}>
                    {abbreviate(this.props.feed.stats.totalcomments, 1)}
                </Text>
            </Button>
        );
    }
}
