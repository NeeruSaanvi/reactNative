import React from "react";
import { View, Image} from "react-native";
import {Text} from 'native-base';
import { semiDarkColor } from "../../../themes/variables/Colors";
//import ResponsiveImage from 'react-native-responsive-image';

const SliderCard  = (props) => {

    return(
       
        <View style={styles.slide}>
            <Image source={ props.imgSrc} style={styles.slideImage}
            resizeMode="contain"/>
            <Text style={styles.subText}>{props.subText}</Text>
        </View>
    )
    
}

const styles = {
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      subText:{
        color: semiDarkColor,
        fontSize: 16,
        lineHeight:24,
        marginVertical:30,
        textAlign:'center', 
      },
      slideImage:{
       
        marginVertical: 30,
        height: 100, 
        width: 200,
      }
}

export {SliderCard}