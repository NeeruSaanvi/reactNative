

import React, { Component } from 'react';
import { View,Image } from 'react-native';
import { Container,Content,Header,Left,Text,Body,Title,Right,Button } from 'native-base';
import VideoPlayer from '../MultiMedia/VideoPlayer';
import AudioPlayer from '../MultiMedia/AudioPlayer';
import { Icons } from '@assets/Images';
import { Actions } from 'react-native-router-flux';
import { CommonStyles } from '../Styles';
import LikeButton  from '../Actions/LikeButton';
import CommentButton from '../Actions/CommentButton';
import ShareButton from '../Actions/ShareButton';
import BookmarkButton from '../Actions/BookmarkButton';
import { semiLightColor4 } from '../../../../themes/variables/Colors';
import EarnedBadge from '../EarnedBadge';
import CommentsView from '../CommentsView';
import CommentsTextInput from '../CommentsTextInput';


class FeedMultiMediaDescription extends Component {
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
            showEarnedBadge :  this.props.feed.inboxitem.state == 0 ? false : true
        }
    }

    onEnd(){
        if(!this.state.showEarnedBadge)
            this.setState({showEarnedBadge: true})
    }

    renderPlayer(cardType){

        switch (cardType) {
            case 'video':
                return(<VideoPlayer onEnd={()=>{this.onEnd()}} />)
            case 'audio':
                return(<AudioPlayer onEnd={()=>{this.onEnd()}} />)   
            default:
                return null;
        }

    }

    renderActions(){
        return(
            <View style={[CommonStyles.actionItem,styles.actions]}>
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
            </View>
        )
    }
  render() {
    return (
        <Container>
        <Header  style={[CommonStyles.header,this.state.showEarnedBadge && { height:90}]}>
            <Left style={{flex:1}}>
                <Button transparent onPress={()=> {Actions.pop()}}>
                    <Image style={{width:16,height:16}} source={Icons.back} />                  
                </Button>
            </Left>
            <Body style={{flex:4}}>
                <Title>
                    {this.props.feed.inboxitem.categoryname}
                </Title>
            </Body>
            <Right style={{flex:1}}/>
           
        </Header>
        { this.state.showEarnedBadge && <EarnedBadge amount = {this.props.feed.inboxitem.amount}/> }
        <Content showsVerticalScrollIndicator={false}>
        {this.renderPlayer(this.props.feed.inboxitem.cardtype)} 
            <View style={styles.description}>
                    <Text style={styles.descriptionText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis orci tortor, in vestibulum tellus scelerisque et.
                    </Text>
            </View>
            {this.renderActions()}
            <CommentsView data={this.props.feed.inboxitem} />      
        </Content>
            <CommentsTextInput />
        </Container>
    );
  }
}

const styles = {
    description:{
        paddingHorizontal:24,
        paddingTop:24,
        paddingBottom:12,                        
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptionText:{
        fontSize: 14,
        lineHeight:22,
    },
    actions:{
        borderBottomWidth: 1,
        borderBottomColor: semiLightColor4,
        paddingVertical: 10,
    }
}

export default FeedMultiMediaDescription;
