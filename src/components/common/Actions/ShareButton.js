import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {  View, Image, } from 'react-native';
import {Button} from 'native-base';
import { Icons } from '@assets/Images';
import { OnShare } from '../../../actions';

export default class ShareButton extends Component {
    constructor(props){
        super(props);
    }

    static propTypes = {
        message: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired 
    }

    render() {
        const {message,url,title} = this.props;
        return (
            <Button transparent  onPress={()=> OnShare(message,url,title)} style={{marginRight:12.5}}>
                <Image style={{width:16,height:16}} source={Icons.share} />                
            </Button>
        );
    }
}
