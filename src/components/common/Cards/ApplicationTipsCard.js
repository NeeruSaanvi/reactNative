import React, { Component } from 'react';
import { View, Image,ImageBackground  } from 'react-native';
import { Card, CardItem ,Right,Left,Body,Text,Button,Icon } from 'native-base';
import { CommonStyles } from '../Styles';
import LikeButton  from '../Actions/LikeButton';
import CommentButton from '../Actions/CommentButton';
import ShareButton from '../Actions/ShareButton';
import BookmarkButton from '../Actions/BookmarkButton';
import { fontMedium, fontRegular } from '../../../../themes/variables/Fonts';
import { Icons } from '@assets/Images';
import { Actions } from 'react-native-router-flux';
import { Capitalize } from '../../../Helper';
import { primaryShade3 } from '../../../../themes/variables/Colors';
import { Strings } from '../../../Strings';

class ApplicationTipsCard extends Component {

    constructor(props){
        super(props);
    }



    renderContent(cardtype,incentivename,tags){
        return(
            <View style={styles.contentContainer}>
                <Image resizeMode='contain' style={styles.contentIcon} source={Icons.tip} />
                <Text style={styles.feedHeading}>{Strings.quickTip}</Text>
                <Text style={styles.feedDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis orci tortor, in vestibulum tellus scelerisque et.</Text>               
            </View>
           
        )
    }

    render() {
        const {categoryname,categorydesc,subcategoryname,imagepath,tags,cardtype,incentivename} = this.props.feed.inboxitem;
        return (
            <Card style={CommonStyles.feedCard}>
                <View style={CommonStyles.cardContentContainer}>
                    <CardItem cardBody >
                        {this.renderContent(cardtype,incentivename,tags)}
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
        textAlign:'center'
    },
    feedHeading:{
        fontSize: 16,
        lineHeight:22,
        fontFamily: fontMedium,
        textAlign:'center'
    },
    contentContainer: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        padding:40,
        backgroundColor: primaryShade3
    },
    contentIcon:{
        width:70,
        height:70,
    }
}
export default ApplicationTipsCard;
