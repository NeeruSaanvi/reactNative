import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image
} from 'react-native';
import {Icon} from "native-base";
import { Icons } from '@assets/Images';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => {
    const iconColor = { color: props.focused ? "#000000": "#00000050" , fontSize: 20,};
    const iconSrc = props.focused ? `${props.iconName}Active` : `${props.iconName}Inactive`;
  return (
    <View style={styles.TabContiner}>
        {/* <Icon active={props.focused} style={iconColor} name='md-list' /> */}
        <Image style={styles.icon} source={Icons[iconSrc]} />
    </View>
 
  )
};

TabIcon.propTypes = propTypes;

const styles = {
    TabContiner:{
        alignItems: 'center',
        justifyContent: 'center',
        // width:16,
        // height:16
    },
    icon:{
      width:16,
      height:16
    }
}
export default TabIcon;