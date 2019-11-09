import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from 'native-base';
import { fontMedium } from '../../../themes/variables/Fonts';
import { Strings } from '../../Strings';
import { Icons } from '@assets/Images';

class EarnedBadge extends Component {

    constructor(props){
        super(props);
    }
    render() {
        return (

             !this.props.onlyText ?
                <View style={[styles.badgeContainer,!this.props.onCard ? {marginTop: 90 - 18} : {top:3}]}>
                    <View>
                        <Text style={[styles.text, styles.value]}>
                            ${this.props.amount} {Strings.earned}
                        </Text>
                    </View>
                    <View>
                        <Button small>
                            <Text style={[styles.text, styles.btnText]}>{Strings.contribute}</Text>
                            <Image style={styles.btnIcon} source={Icons.chevronWhite} />
                        </Button>
                    </View>
                </View>
                :
                <View style={[styles.badgeContainer,{paddingVertical:5}, !this.props.onCard ? {marginTop: 90 - 11}: {top: 4}]}>
                    <Text style={[styles.text, styles.value]}>
                        20 DAYS {Strings.earned.toUpperCase()}
                    </Text>
                 </View>
            
 
           
        );
    }
}

const styles = {
    badgeContainer: {
        flexDirection: 'row',
        padding: 3,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        position: 'absolute',
        zIndex: 100,
        alignSelf: 'center',
    },
    text: {
        fontFamily: fontMedium,
        fontSize: 11,
        lineHeight: 13
    },
    value: {
        color: '#202020',
        paddingHorizontal: 10,
    },
    btnText: {
        paddingRight: 0,
    },
    btnIcon: {
        marginRight: 10,
        marginLeft: 6,
        width: 14,
        height: 14
    }
}

export default EarnedBadge;
