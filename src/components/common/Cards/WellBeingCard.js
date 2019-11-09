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
import EarnedBadge from '../EarnedBadge';

class WellBeingCard extends Component {

    constructor(props){
        super(props);
    }

    getTag(tags){
       let hashTag =  tags.map((tag,index)=>{
            return `#${tag} `;
        });

        return hashTag;
    }

    renderContent(cardtype,incentivename,tags,categoryname){
        const icon =  categoryname == 'financial' ? Icons.financial : Icons.physical
        return(
            <View style={styles.contentContainer}>
                <Image resizeMode='contain' style={styles.contentIcon} source={icon} />
                <Text style={styles.feedDescription}>{incentivename}</Text>               
                <Button block transparent 
                    onPress={() => { Actions.rewardDetails({ feed: this.props.feed , isEarned: this.props.isEarned, index: this.props.index, tags : this.getTag(tags) }) }}  
                    style={styles.button}
                >
                    
                    <Text style={styles.buttonText}>{Strings.claimReward}</Text>
                    <Image style={CommonStyles.buttonImage} source={Icons.chevronBlack} />
                </Button>
            </View>
           
        )
    }

    render() {
        const {categoryname,categorydesc,subcategoryname,imagepath,tags,cardtype,incentivename,state} = this.props.feed.inboxitem;
        return (
            <View>
                {state == 1 && <EarnedBadge onCard={true} amount={this.props.feed.inboxitem.amount} />}
            <Card style={[CommonStyles.feedCard, state == 1 && {marginTop: 20}]}>
                
                <View style={CommonStyles.cardContentContainer}>
                <CardItem cardBody >
                    {this.renderContent(cardtype,incentivename,tags,categoryname.toLowerCase())}
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
    feedDescription:{
        fontSize: 14,
        lineHeight:22,
        textAlign: "center"
    },
    tags:{
        fontSize:12
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
export default WellBeingCard;
