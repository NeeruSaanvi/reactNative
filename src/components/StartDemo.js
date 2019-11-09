import React, { Component } from 'react';
import {  View } from 'react-native';
import Swiper from "react-native-swiper";
import { SliderCard } from './common/SliderCard';
import {Images} from '@assets/Images';
import { lightColor, primaryColor } from '../../themes/variables/Colors';

export default class StartDemo extends Component {
  render() {
    return (

             <Swiper
            loop={false}
            bounces={true} 
            index={this.initialSlide}
            dot={<View style={styles.dotStyle} />}
            activeDot={<View style={styles.activeDotStyle} />}
            >
                <SliderCard heading="Avibra" subText="Protect Love, Live Vibrant" imgSrc={Images.demo}/>

                <SliderCard heading="Link Your digital data sources" subText="More data you connect, the more insight you can unlock about your life." imgSrc={Images.demo}/>

                <SliderCard heading="Live Vibrant" subText="Surprice yourself with how well you are doing in all aspects of your life." imgSrc={Images.demo}/>

                <SliderCard heading="Earn Reward" subText="Reward your free life insurance account with your own positive life wellness behavior." imgSrc={Images.demo}/>

                <SliderCard heading="Protect Love" subText="AI driven advisor will offer increased coverage at right time and moment." imgSrc={Images.demo}/>

            </Swiper>
    );
  }
}

const styles = {
    dotStyle:{
        backgroundColor: lightColor,
        width: 4, 
        height: 4, 
        borderRadius: 2, 
        marginLeft: 4, 
        marginRight: 4
    },
    activeDotStyle:{
        backgroundColor: primaryColor,
        width: 6,
        height: 6,
        borderRadius: 3,
        marginLeft: 4,
        marginRight: 4
    },
}
