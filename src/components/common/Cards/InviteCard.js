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
import { primaryShade1 } from '../../../../themes/variables/Colors';
import { Strings } from '../../../Strings';

class InviteCard extends Component {

    constructor(props){
        super(props);
    }

    getTag(tags){
       let hashTag =  tags.map((tag,index)=>{
            return `#${tag} `;
        });

        return hashTag;
    }

    renderContent(cardtype,incentivename,tags,categoryname,incentivedesc){

        return(
            <View style={styles.contentContainer}>
                <Image resizeMode='contain' style={styles.contentIcon} source={Icons.invite} />
                <Text style={styles.feedHeading}>{incentivename}</Text>
                <Text style={styles.feedDescription}>{incentivedesc || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis orci tortor, in vestibulum tellus scelerisque et.'}</Text>               
                <Button block transparent 
                    onPress={() => { Actions.invite({ feed: this.props.feed , isEarned: this.props.isEarned, index: this.props.index, tags : this.getTag(tags) }) }}  
                    style={styles.button}
                >
                    
                    <Text style={styles.buttonText}>{Strings.invite}</Text>
                    <Image style={CommonStyles.buttonImage} source={Icons.chevronBlack} />
                </Button>
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
        textAlign:'center'
    },
    buttonText:{
        fontSize:14,
        fontFamily: fontMedium,
        paddingRight:6,
        paddingLeft:0,
        color:"#000"
    },
    contentContainer: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        padding:36,
        backgroundColor: primaryShade1
    },
    contentIcon:{
        width:70,
        height:70,
    }
}
export default InviteCard;
