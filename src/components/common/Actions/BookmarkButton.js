import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {  View, Image, } from 'react-native';
import {Button} from 'native-base';
import { Icons } from '@assets/Images';
import { connect } from "react-redux";
import {UpdateRootInfo, SendAction} from "../../../actions";
class BookmarkButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookmarked : this.props.feed.actions.indexOf("bookmark") == -1 ? false : true,
        }

    }

    componentWillReceiveProps(nextProps){
        this.setState({bookmarked: nextProps.feed.actions.indexOf("bookmark") == -1 ? false : true})
    }

    static propTypes = {
        index: PropTypes.number.isRequired,
        feed: PropTypes.shape({}).isRequired,
        isEarned: PropTypes.bool.isRequired 
    }

    getActionType() {
        return this.state.bookmarked ? 'bookmark' : 'lessbookmark';
    }

    toogleBookmark(){
        
        this.setState({bookmarked: !this.state.bookmarked},()=>{
            this.sendUserAction(this.props.index, this.props.feed.inboxitem.id, this.props.feed.inboxitem.categoryname, this.props.feed.inboxitem.subcategoryname, this.props.feed.inboxitem.incentiveid,this.getActionType(),this.props.isEarned)
        });   
    }

    sendUserAction(index, id, category, subcategory, incentiveid, actionType, isEarned) {
        console.log(isEarned, !isEarned);
        //alert(actionType);
        let data = {
            "id": "0",
            "cardid": id,
            "category": category,
            "subcategory": subcategory,
            "incentiveid": incentiveid,
            "profileid": this.props.userInfo.profileid,
            "actiontype": actionType
        }

        this.props.SendAction(data); 

        const newArray = !isEarned ? [...this.props.inbox] : [...this.props.earned];
        
        let checkFor = actionType == "bookmark" ? "lessbookmark" : "bookmark";
        let indexOfBookmark = newArray[index].actions.indexOf(checkFor);

        if(indexOfBookmark == -1){
            newArray[index].actions.push (actionType);
        }
        else{
            newArray[index].actions[indexOfBookmark] = actionType;
        }

        this.props.UpdateRootInfo({ prop: !isEarned ? 'inbox' : 'earned', value: newArray });
        console.log(data);
         
    }
    

    render() {
        const bookmarkIcon  = this.state.bookmarked ? Icons.bookmarkActive: Icons.bookmark;
        return (
            <Button transparent  onPress={() => { this.toogleBookmark() }}  style={{marginLeft:12.5}}>
                <Image style={{width:16,height:16}} source={bookmarkIcon} />
            </Button>
        );
    }
}

const mapStateToProps = state =>{
    const { userInfo, inbox, earned } = state.root;
    
    return { userInfo, inbox, earned };
}

export default connect(mapStateToProps,{ UpdateRootInfo,SendAction })(BookmarkButton);
