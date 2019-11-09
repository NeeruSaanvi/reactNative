import React, { Component } from 'react';
import { View, Image,ImageBackground  } from 'react-native';
import { Card, CardItem ,Right,Left,Body,Text,Button,Icon } from 'native-base';
import { CommonStyles } from '../Styles';
import { fontMedium, fontRegular } from '../../../../themes/variables/Fonts';
import { Icons } from '@assets/Images';
import { welcomeColor } from '../../../../themes/variables/Colors';
import { Strings } from '../../../Strings';

class WelcomeCard extends Component {

    constructor(props){
        super(props);
    }


    renderContent(cardtype,incentivename,tags,categoryname,incentivedesc){

        return(
            <View style={styles.contentContainer}>
                <Image resizeMode='contain' style={styles.contentIcon} source={Icons.balloon} />
                <Text style={styles.feedHeading}>Welcome to Avibra!</Text>
                <Text style={styles.feedDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis orci tortor, in vestibulum tellus scelerisque et.</Text>               
            </View>
           
        )
    }

    render() {
        const {categoryname,categorydesc,subcategoryname,imagepath,tags,cardtype,incentivename,incentivedesc} = this.props.feed.inboxitem;
        return (
            <Card style={CommonStyles.feedCard}>
                <View style={CommonStyles.cardContentContainer}>
                <CardItem cardBody >
                    {this.renderContent(cardtype,incentivename,tags,categoryname.toLowerCase(),incentivedesc)}
                </CardItem>
                </View>
            </Card>
        );
    }
}
const styles = {
    feedDescription:{
        fontSize: 14,
        lineHeight:22,
        textAlign: "center"
    },
    feedHeading:{
        fontSize:16,
        fontFamily: fontMedium,
        lineHeight:19,
        marginTop:20,
        marginBottom: 10,
    },

    button:{
        alignSelf: 'center',
    },
    buttonText:{
        fontSize:14,
        fontFamily: fontMedium,
        paddingRight:6,
        color:"#000"
    },
    contentContainer: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        padding:36,
        backgroundColor: welcomeColor
    },
    contentIcon:{
        width:70,
        height:70,
    }
}
export default WelcomeCard;
