import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {  View, Image, } from 'react-native';
import {Button,Text} from 'native-base';
import { Icons } from '@assets/Images';
import { connect } from "react-redux";
import {UpdateRootInfo, SendAction} from "../../../actions";

var abbreviate = require('number-abbreviate')
class LikeButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            liked : this.props.feed.actions.indexOf("like") == -1 ? false : true,
        }

    }

    componentWillReceiveProps(nextProps){
        this.setState({liked: nextProps.feed.actions.indexOf("like") == -1 ? false : true})
    }

    static propTypes = {
        index: PropTypes.number.isRequired,
        feed: PropTypes.shape({}).isRequired,
        isEarned: PropTypes.bool.isRequired 
    }

    getActionType() {
        return this.state.liked ? 'like' : 'lesslike';
    }

    toogleLike(){
        this.setState({liked: !this.state.liked},()=>{
            //this.props.onAction(this.getActionType());
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
        console.log(data);
        this.props.SendAction(data);
    
        const newArray = !isEarned ? [...this.props.inbox] : [...this.props.earned];
    
        newArray[index].stats.totallikes = actionType == "like" ? newArray[index].stats.totallikes + 1 : newArray[index].stats.totallikes - 1;

        let checkFor = actionType == "like" ? "lesslike" : "like";
        let indexOfLike = newArray[index].actions.indexOf(checkFor);

        if(indexOfLike == -1){
            newArray[index].actions.push (actionType);
        }
        else{
            newArray[index].actions[indexOfLike] = actionType;
        }

        console.log(newArray[index]);
        
    
        this.props.UpdateRootInfo({ prop: !isEarned ? 'inbox' : 'earned', value: newArray });
    
        console.log(this.props.inbox);
    
    }



    render() {
        
        const likeIcon  = this.state.liked ? Icons.likeActive: Icons.like;
        return (
            <Button transparent dark 
            onPress={() => { this.toogleLike() }} 
            style={{marginRight:10,marginLeft:0}}
            >
                <Image style={{width:16,height:16}} source={likeIcon} />
                <Text style={{paddingLeft:9,paddingRight:9,fontSize:12}}>{abbreviate(this.props.feed.stats.totallikes, 1)}</Text>
            </Button>
        );
    }
}

const mapStateToProps = state =>{
    const { userInfo, inbox, earned } = state.root;
    
    return { userInfo, inbox, earned };
}

export default connect(mapStateToProps,{ UpdateRootInfo,SendAction })(LikeButton);