import React, { Component } from 'react';
import {  View } from 'react-native';
import { Header } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

import { CommonStyles } from './Styles';

export default class GradientHeader extends Component {
  render() {
      const startColor = this.props.startColor || "#fff";
      const endColor = this.props.endColor || "rgba(255,255,255,0)";
      const height = this.props.height || 80;
      const styles = {
        gradientContainer:{      
            width:"100%",
            top:0,
            left:0,
            right:0,
            height,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex:10
        },

    }
    return (
        <LinearGradient
       s
        colors={[startColor,'#fff', endColor]} 
        style={[styles.gradientContainer]}>

                {this.props.children}
         
        </LinearGradient>        
    );
  }
}


