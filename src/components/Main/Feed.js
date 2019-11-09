import React, { Component } from 'react';
import { View , ActivityIndicator} from 'react-native';
import {primaryColor} from "../../../themes/variables/Colors"
import { Text } from 'native-base';
import { connect } from "react-redux";
import { UpdateRootInfo, GetIncentive, GetEarnedIncentive, SendAction, MarkRead, GetPolicy, ClearIncentive } from "../../actions";
import FeedAnimatedHeader from "../common/Feed/FeedAnimatedHeader";
import FeedCards from '../common/Feed/FeedCards';

class Feed extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.pageLimit = 4;

    this.pageEnd = this.earnedPageEnd = false;

  }


  componentDidMount() {
    this.props.GetIncentive({ profileid: this.props.userInfo.profileid, totalitems: this.pageLimit });

    this.props.GetEarnedIncentive({ profileid: this.props.userInfo.profileid, totalitems: this.pageLimit });

    this.props.GetPolicy({ profileid: this.props.userInfo.profileid });
  }

  componentWillReceiveProps(nextProps) {
    this.pageEnd = (nextProps.inbox || []).length >= nextProps.earnCount ? true : false
    this.earnedPageEnd = (nextProps.earned || []).length >= nextProps.earnedCount ? true : false

    if ((nextProps.inbox || []).length > (this.props.inbox || []).length || (nextProps.earned || []).length > (this.props.earned || []).length) {
      this.loadedContent = true;
    }
  }

  isReachedBottom(e) {
    const { nativeEvent } = e;
    let visibleArea = nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height;
    let totalArea = nativeEvent.contentSize.height
    if (Math.round(visibleArea / totalArea * 100) > 75 && !this.pageEnd && this.loadedContent) {
      this.props.GetIncentive({ profileid: this.props.userInfo.profileid, totalitems: this.pageLimit, cursor: this.props.cursor }, true, this.props.inbox)
      this.loadedContent = false;
    }
  }

  isReachedBottomEarned(e) {
    const { nativeEvent } = e;
    let visibleArea = nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height;
    let totalArea = nativeEvent.contentSize.height
    if (Math.round(visibleArea / totalArea * 100) > 75 && !this.earnedPageEnd && this.loadedContent) {
      this.props.GetEarnedIncentive({ profileid: this.props.userInfo.profileid, totalitems: this.pageLimit, cursor: this.props.earnedCursor }, true, this.props.earned)
      this.loadedContent = false;
    }
  }

  renderFeedCard() {
    if (this.props.inbox) {

      return this.props.inbox.map((feed, index) => {
        return (
          <FeedCards
            key={feed.inboxitem.id}
            feed={feed}
            isEarned={false}
            index={index}
          // onRead={(id, amount) => { this.markRead(id, amount) }}
          // onShareModalToggle={(index, id, category, subcategory, incentiveid, actionType, earned) => { this.onShareModalToggle(index, id, category, subcategory, incentiveid, actionType, earned) }}          
          />
        );
      });
    }
  }

  render() {
    return (
      <FeedAnimatedHeader onScroll={this.isReachedBottom.bind(this)} faceValue = {this.props.earnedfacevalue || 0} duration = {this.props.duration || 0}>
        <View style={{ padding: 8 }} >
          {this.renderFeedCard()}
          {
            !this.pageEnd ? <ActivityIndicator style={{ padding: 10 }} size={(this.props.inbox || []).length > 0 ? "small" : "large"} color={primaryColor} /> : null
          }
        </View>
      </FeedAnimatedHeader>
    );
  }
}


const mapStateToProps = state => {
  const { loading } = state.loader;
  const { userInfo, inbox, earned, earnCount, earnedCount, cursor, earnedCursor, defaultfacevalue, earnedfacevalue,duration } = state.root;

  return { loading, userInfo, inbox, earned, earnCount, earnedCount, cursor, earnedCursor, defaultfacevalue, earnedfacevalue,duration };
}

export default connect(mapStateToProps, { UpdateRootInfo, GetIncentive, GetEarnedIncentive, SendAction, MarkRead, GetPolicy, ClearIncentive })(Feed);
