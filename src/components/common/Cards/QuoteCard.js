import React, { Component } from 'react';
import { View, Image,ImageBackground  } from 'react-native';
import { Card, CardItem ,Right,Left,Body,Text,Button,Icon, Thumbnail } from 'native-base';
import { CommonStyles } from '../Styles';
import LikeButton  from '../Actions/LikeButton';
import CommentButton from '../Actions/CommentButton';
import ShareButton from '../Actions/ShareButton';
import BookmarkButton from '../Actions/BookmarkButton';
import { fontMedium, fontRegular } from '../../../../themes/variables/Fonts';
import { Icons } from '@assets/Images';
import { Actions } from 'react-native-router-flux';
import { Capitalize } from '../../../Helper';
import { Strings } from '../../../Strings';
import { lightColor6, semiLightColor4 } from '../../../../themes/variables/Colors';

class QuoteCard extends Component {

    constructor(props){
        super(props);
    }


    renderContent(cardtype,incentivename,tags,categoryname){
        const icon =  categoryname == 'financial' ? Icons.financial : Icons.physical
        return(
            <View style={styles.contentContainer}>               
                <Text style={styles.quoteText}>"{incentivename}"</Text>               
                <View style={styles.authorContainer}>
                    <View style={{marginRight:6}}>
                        <Image style={{width:46,height:46,borderRadius:23}} source={{uri: 'https://yt3.ggpht.com/-21brqJmQdQs/AAAAAAAAAAI/AAAAAAAAAAA/2pbdGqawLsE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg'}} />
                    </View>
                    <View  style={{marginLeft:6}}>
                        <Text style={styles.authorName}>John Doe</Text>
                        <Text style={styles.authorCatagory}>Architect</Text>
                    </View>
                </View>
            </View>
           
        )
    }

    render() {
        const {categoryname,categorydesc,subcategoryname,imagepath,tags,cardtype,incentivename} = this.props.feed.inboxitem;
        return (
            <Card style={CommonStyles.feedCard}>
                <View style={CommonStyles.cardContentContainer}>
                <CardItem cardBody >
                    {this.renderContent(cardtype,incentivename,tags,categoryname.toLowerCase())}
                </CardItem>
                <CardItem style={[CommonStyles.actionItem,{borderTopWidth:1,borderTopColor:semiLightColor4}]}>
                    <View style={CommonStyles.actionItemContainer}>
                        <LikeButton 
                            isEarned={this.props.isEarned} 
                            index={this.props.index}
                            feed = {this.props.feed } 
                        />
                        <CommentButton
                            isEarned={this.props.isEarned} 
                            index={this.props.index}
                            feed = {this.props.feed } 
                        />
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
        );
    }
}
const styles = {
    quoteText:{
        fontSize: 18,
        lineHeight:26,
        fontFamily: fontMedium,
        letterSpacing: 0.2,
        textAlign: "center"
    },
    authorContainer:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin:20
    },
    authorName:{
        fontSize: 14,
        lineHeight:22,
        marginTop: 0,
    },
    authorCatagory:{
        fontSize: 12,
        lineHeight:14,
        color: lightColor6,
        marginTop: 0,
    },
    button:{
        alignSelf: 'center',
    },
    buttonImage:{
        width:16,
        height:16,
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
        padding:36
    },
    contentIcon:{
        width:70,
        height:70,
    }
}
export default QuoteCard;
