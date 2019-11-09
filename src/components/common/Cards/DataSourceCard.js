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
import { primaryShade1, facebookColor, financialColor, bankColor, appleColor, linkedinColor, twitterColor, fitbitColor } from '../../../../themes/variables/Colors';
import { Strings } from '../../../Strings';
import EarnedBadge from '../EarnedBadge';

class DataSourceCard extends Component {

    constructor(props){
        super(props);
    }

    getTag(tags){
       let hashTag =  tags.map((tag,index)=>{
            return `#${tag} `;
        });

        return hashTag;
    }

    getLogoandColor(subcategoryname){
        switch (subcategoryname) {
            case 'facebook':
                 return {icon:Icons.facebookWhite, backgroundColor: facebookColor }  
                break;
            case 'twitter':
                return {icon:Icons.twitter, backgroundColor: twitterColor }  
               break;
            case 'linkedin':
               return {icon:Icons.linkedin, backgroundColor: linkedinColor }
            case 'fitbit':
               return {icon:Icons.fitbit, backgroundColor: fitbitColor}
            case 'appelehealth':
               return {icon:Icons.appleHealth, backgroundColor: appleColor }
            case 'yodlee':
               return {icon:Icons.bank, backgroundColor: bankColor}
            case '401-K':
               return {icon:Icons.foK, backgroundColor: financialColor }
              break;
            default:
                return {icon: null, backgroundColor: primaryShade1};
        }
    }

    renderContent(cardtype,incentivename,tags,categoryname,categorydesc,subcategoryname){
        const {icon,backgroundColor} =  this.getLogoandColor(subcategoryname.toLowerCase());
        return(
            <View style={[styles.contentContainer,{backgroundColor}]}>
                <View style={styles.feedHeadContainer}>
                    <Image resizeMode='contain' style={styles.contentIcon} source={icon} />
                    <Text style={styles.feedHeading}>{incentivename}</Text>
                </View>
                
                <Text style={styles.feedDescription}>{categorydesc}</Text>               
                <Button block transparent 
                    onPress={() => { Actions.dataConnect({ feed: this.props.feed , isEarned: this.props.isEarned, index: this.props.index, tags : this.getTag(tags) }) }}   
                   
                >
                    
                    <Text style={styles.buttonText}>{Strings.connect}</Text>
                    <Image style={CommonStyles.buttonImage} source={Icons.chevronWhite} />
                </Button>
            </View>
           
        )
    }

    render() {
        const {categoryname,categorydesc,subcategoryname,imagepath,tags,cardtype,incentivename, state} = this.props.feed.inboxitem;
        return (
            <View>
                {state == 1 && <EarnedBadge onCard={true} onlyText={true} amount={this.props.feed.inboxitem.amount} />}
            <Card style={[CommonStyles.feedCard, state == 1 && {marginTop: 15}]}>
                
                <View style={CommonStyles.cardContentContainer}>
                <CardItem cardBody >
                    {this.renderContent(cardtype,incentivename,tags,categoryname.toLowerCase(),categorydesc,subcategoryname.toLowerCase())}
                </CardItem>
                <CardItem style={CommonStyles.actionItem}>
                    <View style={CommonStyles.actionItemContainer}>
                        <Text style={styles.tags}>{this.getTag(tags)}</Text>
                    </View>
                    <View  style={CommonStyles.actionItemContainer}>
                        <ShareButton
                            message = {this.props.feed.inboxitem.incentivedesc}
                            url = {this.props.feed.inboxitem.imagepath}
                            title = {this.props.feed.inboxitem.categoryname}
                        />
                        <BookmarkButton
                            isEarned={this.props.isEarned} 
                            index={this.props.index}
                            feed = {this.props.feed } 
                        />                               
                    </View>
                </CardItem>
                </View>
            </Card>
            </View>
        );
    }
}
const styles = {
    feedHeadContainer:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    feedDescription:{
        fontSize: 14,
        lineHeight:22,
        textAlign: "center",
        color:"#fff",
        marginTop: 16,
        marginBottom: 16,
    },
    feedHeading:{
        fontSize:16,
        lineHeight:19,
        letterSpacing: 0.18,
        color:"#fff",
        marginLeft:2,
        fontFamily: fontMedium,
        textAlign:'center'
    },
    tags:{
        fontSize:12
    },

    buttonText:{
        fontSize:14,
        fontFamily: fontMedium,
        paddingRight:6,
        paddingLeft:0,
        color:"#fff",
    },
    contentContainer: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        padding:36
    },
    contentIcon:{
        width:24,
        height:24,
        marginRight: 2,
    }
}
export default DataSourceCard;
