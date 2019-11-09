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
import { Strings } from '../../../Strings';

class MultiMediaCard extends Component {

    constructor(props){
        super(props);
    }

    getTag(tags){
       let hashTag =  tags.map((tag,index)=>{
            return `#${tag} `;
        });

        return hashTag;
    }

    renderContent(cardtype,incentivename,tags){
        return(
            <View style={styles.overlay}>
                <Text style={styles.feedHeading}>{incentivename}</Text>
                <Text style={styles.tags}>{this.getTag(tags)}</Text>
                <Button block transparent 
                    onPress={() => { Actions.feedMultimediaDescription({ feed: this.props.feed , isEarned: this.props.isEarned, index: this.props.index }) }}
                >
                    <Image style={styles.playButtonImage} source={Icons.play} />
                    <Text style={styles.playButtonText}>{Strings.play} {Capitalize(cardtype)}</Text>
                </Button>
            </View>
           
        )
    }

    render() {
        const {categoryname,categorydesc,subcategoryname,imagepath,tags,cardtype,incentivename} = this.props.feed.inboxitem;
        return (
            <Card style={CommonStyles.feedCard}>
                <View style={CommonStyles.cardContentContainer}>
                    <CardItem cardBody >
                        <Image source={{uri: 'https://midlifehacks.com/wp-content/uploads/2017/04/stones-2.jpg'}} 
                        style={styles.imageBg}/>
                        {this.renderContent(cardtype,incentivename,tags)}
                    </CardItem>
                    <CardItem style={CommonStyles.actionItem}>
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
    feedHeading:{
        fontSize: 18,
        lineHeight:22,
        fontFamily: fontRegular,
        color: "#fff",
        textAlign:'center'
    },
    tags:{
        fontSize:12,
        color:"#fff",
        opacity:0.75,
        letterSpacing: 0.2,
        textAlign:'center'
    },

    playButtonImage:{
        marginLeft: 10,
        width:16,
        height:16
    },
    playButtonText:{
        fontSize:14,
        fontFamily: fontMedium,
        paddingLeft:6,
        color: "#fff"
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#00000050',
        justifyContent:"center",
        alignItems: 'center',
        padding:36
    },
    imageBg:{
        height: 200,
        width: null,
        flex: 1 ,
        justifyContent: 'center',
        alignItems: 'center',
       
    }
}
export default MultiMediaCard;
