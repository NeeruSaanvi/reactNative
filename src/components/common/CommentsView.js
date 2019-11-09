import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { Container, Content, Button, Text, List, ListItem, Left, Right, Body, Thumbnail, Item, Input } from 'native-base';
import { Icons } from '@assets/Images';
import { fontMedium } from '../../../themes/variables/Fonts';
import { lightColor4, lightColor } from '../../../themes/variables/Colors';
import { isIphoneX } from '../../Helper';
import { connect } from "react-redux";
import { UpdateRootInfo, GetComment, SendComment } from "../../actions";
import TimeAgo from "react-native-timeago";
var abbreviate = require('number-abbreviate');

class CommentsView extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.data);

        this.state = {
            setReply: false,
            textFocus: false,
            isReachedBottom: false,
            replyInfo: {}
        }

        this.pageLimit = 8;
        this.pageEnd = false;
        this.getComment(this.getCommentdata);
    }

    static propTypes = {
        data: PropTypes.shape({}).isRequired
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.refresh) {
            this.props.UpdateRootInfo({ prop: 'refresh', value: false });
            console.log(this.getCommentdata)
            this.getComment(this.getCommentdata);
        }

        this.pageEnd = (nextProps.comments || []).length >= nextProps.commentsCount ? true : false

        if ((nextProps.comments || []).length > (this.props.comments || []).length) {
            this.loadedContent = true;
        }
    }

    componentWillUnmount() {
        this.props.UpdateRootInfo({ prop: 'comments', value: [] });
    }

    getCommentdata = {
        "category": this.props.data.categoryname,
        "subcategory": this.props.data.subcategoryname,
        "incentiveid": this.props.data.incentiveid
    }
    commentData = {
        "id": "0",
        "category": this.props.data.categoryname,
        "subcategory": this.props.data.subcategoryname,
        "incentiveid": this.props.data.incentiveid,
        "profileid": this.props.userInfo.profileid,
        "profilename": this.props.userInfo.displayname,
        "commentdate": new Date().toISOString()
    }
    getComment(data, index, previousData, cursor) {
        let pageInfo = {
            "limitnumber": this.pageLimit,
            "cursor": cursor
        }

        this.props.GetComment(Object.assign({}, this.getCommentdata, pageInfo), index, previousData);
    }
    sendComment() {
        this.commentData.comment = this.props.comment;
        this.props.UpdateRootInfo({ prop: 'comment', value: '' });
        console.log(this.commentData);

        this.props.SendComment(this.commentData);


    }
    setParentId(comment) {
        this.commentData.parentcommentid = comment.id;
        this.setState({ setReply: true, textFocus: true, replyInfo: comment });
        console.log(this.commentData);
    }
    closeReply() {
        delete this.commentData.parentcommentid;
        this.setState({ setReply: false, replyInfo: {} });
    }
    viewReplies(comment, index, previousData) {
        console.log(index);
        this.getCommentdata.parentcommentid = comment.id;
        this.getComment(this.getCommentdata, index, previousData, comment.repliesCursor);
    }

    viewShowMore(comment) {
        return comment.viewReply && comment.replies.length < comment.repliesCount;
    }

    isReachedBottom({ nativeEvent }) {
        let visibleArea = nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height;
        let totalArea = nativeEvent.contentSize.height
        if (Math.round(visibleArea / totalArea * 100) > 80 && !this.pageEnd && this.loadedContent) {
            this.getComment(this.getCommentdata, undefined, this.props.comments, this.props.commentsCursor);
            this.loadedContent = false;
        }
    }

    render() {
        return (
            // <Container>
                <Content contentContainerStyle={{paddingBottom:80}} showsVerticalScrollIndicator={false} onScroll={this.isReachedBottom.bind(this)}>
                    <List>
                        <ListItem itemHeader first>
                            <Text>2 GROUP COMMENTS</Text>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail small source={{ uri: "https://yt3.ggpht.com/-21brqJmQdQs/AAAAAAAAAAI/AAAAAAAAAAA/2pbdGqawLsE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg" }} />
                            </Left>
                            <Body>
                                <Text style={styles.username}>John Doe</Text>
                                <Text style={styles.commnetText}>Awesome video, very helpful!</Text>
                            </Body>
                            <Right>
                                <Text style={styles.timeText}>2 hrs ago</Text>
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail small source={{ uri: "https://yt3.ggpht.com/-21brqJmQdQs/AAAAAAAAAAI/AAAAAAAAAAA/2pbdGqawLsE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg" }} />
                            </Left>
                            <Body>
                                <Text style={styles.username}>John Doe</Text>
                                <Text style={styles.commnetText}>Awesome video, very helpful!</Text>
                            </Body>
                            <Right>
                                <Text style={styles.timeText}>2 hrs ago</Text>
                            </Right>
                        </ListItem>
                        <ListItem itemHeader first>
                            <Text>21 COMMUNITY COMMENTS</Text>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail small source={{ uri: "https://yt3.ggpht.com/-21brqJmQdQs/AAAAAAAAAAI/AAAAAAAAAAA/2pbdGqawLsE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg" }} />
                            </Left>
                            <Body>
                                <Text style={styles.username}>John Doe</Text>
                                <Text style={styles.commnetText}>Awesome video, very helpful!</Text>
                            </Body>
                            <Right>
                                <Text style={styles.timeText}>2 hrs ago</Text>
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail small source={{ uri: "https://yt3.ggpht.com/-21brqJmQdQs/AAAAAAAAAAI/AAAAAAAAAAA/2pbdGqawLsE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg" }} />
                            </Left>
                            <Body>
                                <Text style={styles.username}>John Doe</Text>
                                <Text style={styles.commnetText}>Awesome video, very helpful!</Text>
                            </Body>
                            <Right>
                                <Text style={styles.timeText}>2 hrs ago</Text>
                            </Right>
                        </ListItem>                        <ListItem avatar>
                            <Left>
                                <Thumbnail small source={{ uri: "https://yt3.ggpht.com/-21brqJmQdQs/AAAAAAAAAAI/AAAAAAAAAAA/2pbdGqawLsE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg" }} />
                            </Left>
                            <Body>
                                <Text style={styles.username}>John Doe</Text>
                                <Text style={styles.commnetText}>Awesome video, very helpful!</Text>
                            </Body>
                            <Right>
                                <Text style={styles.timeText}>2 hrs ago</Text>
                            </Right>
                        </ListItem>                        <ListItem avatar>
                            <Left>
                                <Thumbnail small source={{ uri: "https://yt3.ggpht.com/-21brqJmQdQs/AAAAAAAAAAI/AAAAAAAAAAA/2pbdGqawLsE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg" }} />
                            </Left>
                            <Body>
                                <Text style={styles.username}>John Doe</Text>
                                <Text style={styles.commnetText}>Awesome video, very helpful!</Text>
                            </Body>
                            <Right>
                                <Text style={styles.timeText}>2 hrs ago</Text>
                            </Right>
                        </ListItem>                        <ListItem avatar>
                            <Left>
                                <Thumbnail small source={{ uri: "https://yt3.ggpht.com/-21brqJmQdQs/AAAAAAAAAAI/AAAAAAAAAAA/2pbdGqawLsE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg" }} />
                            </Left>
                            <Body>
                                <Text style={styles.username}>John Doe</Text>
                                <Text style={styles.commnetText}>Awesome video, very helpful!</Text>
                            </Body>
                            <Right>
                                <Text style={styles.timeText}>2 hrs ago</Text>
                            </Right>
                        </ListItem>                        <ListItem avatar>
                            <Left>
                                <Thumbnail small source={{ uri: "https://yt3.ggpht.com/-21brqJmQdQs/AAAAAAAAAAI/AAAAAAAAAAA/2pbdGqawLsE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg" }} />
                            </Left>
                            <Body>
                                <Text style={styles.username}>John Doe</Text>
                                <Text style={styles.commnetText}>Awesome video, very helpful!</Text>
                            </Body>
                            <Right>
                                <Text style={styles.timeText}>2 hrs ago</Text>
                            </Right>
                        </ListItem>                        <ListItem avatar>
                            <Left>
                                <Thumbnail small source={{ uri: "https://yt3.ggpht.com/-21brqJmQdQs/AAAAAAAAAAI/AAAAAAAAAAA/2pbdGqawLsE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg" }} />
                            </Left>
                            <Body>
                                <Text style={styles.username}>John Doe</Text>
                                <Text style={styles.commnetText}>Awesome video, very helpful!</Text>
                            </Body>
                            <Right>
                                <Text style={styles.timeText}>2 hrs ago</Text>
                            </Right>
                        </ListItem>                        <ListItem avatar>
                            <Left>
                                <Thumbnail small source={{ uri: "https://yt3.ggpht.com/-21brqJmQdQs/AAAAAAAAAAI/AAAAAAAAAAA/2pbdGqawLsE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg" }} />
                            </Left>
                            <Body>
                                <Text style={styles.username}>John Doe</Text>
                                <Text style={styles.commnetText}>Awesome video, very helpful!</Text>
                            </Body>
                            <Right>
                                <Text style={styles.timeText}>2 hrs ago</Text>
                            </Right>
                        </ListItem>                        <ListItem avatar>
                            <Left>
                                <Thumbnail small source={{ uri: "https://yt3.ggpht.com/-21brqJmQdQs/AAAAAAAAAAI/AAAAAAAAAAA/2pbdGqawLsE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg" }} />
                            </Left>
                            <Body>
                                <Text style={styles.username}>John Doe</Text>
                                <Text style={styles.commnetText}>Awesome video, very helpful!</Text>
                            </Body>
                            <Right>
                                <Text style={styles.timeText}>2 hrs ago</Text>
                            </Right>
                        </ListItem>                        <ListItem avatar>
                            <Left>
                                <Thumbnail small source={{ uri: "https://yt3.ggpht.com/-21brqJmQdQs/AAAAAAAAAAI/AAAAAAAAAAA/2pbdGqawLsE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg" }} />
                            </Left>
                            <Body>
                                <Text style={styles.username}>John Doe</Text>
                                <Text style={styles.commnetText}>Awesome video, very helpful!</Text>
                            </Body>
                            <Right>
                                <Text style={styles.timeText}>2 hrs ago</Text>
                            </Right>
                        </ListItem>                        <ListItem avatar>
                            <Left>
                                <Thumbnail small source={{ uri: "https://yt3.ggpht.com/-21brqJmQdQs/AAAAAAAAAAI/AAAAAAAAAAA/2pbdGqawLsE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg" }} />
                            </Left>
                            <Body>
                                <Text style={styles.username}>John Doe</Text>
                                <Text style={styles.commnetText}>Awesome video, very helpful!</Text>
                            </Body>
                            <Right>
                                <Text style={styles.timeText}>2 hrs ago</Text>
                            </Right>
                        </ListItem>
                    </List>
                </Content>               
            // </Container>
        );
    }
}

const styles = {
    username: {
        fontSize: 14,
        fontFamily: fontMedium,
        lineHeight: 22,
        color: "#000",
        fontWeight: '500',
    },
    commnetText: {
        fontSize: 13,
        color: "#000"
    },
    timeText: {
        fontSize: 12,
        color: lightColor4
    }
}

const mapStateToProps = state => {
    const { userInfo, inbox, earned } = state.root;

    return { userInfo, inbox, earned };
}

export default connect(mapStateToProps, { UpdateRootInfo, GetComment, SendComment })(CommentsView);