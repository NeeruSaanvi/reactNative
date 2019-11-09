import React, { Component } from 'react';
import {View} from 'react-native';
import { Card, Text, CardItem } from 'native-base';
import MultiMediaCard from '../Cards/MultiMediaCard';
import WellBeingCard from '../Cards/WellBeingCard';
import AdvertisementCard from '../Cards/AdvertisementCard';
import ApplicationTipsCard from '../Cards/ApplicationTipsCard';
import QuoteCard from '../Cards/QuoteCard';
import InviteCard from '../Cards/InviteCard';
import DataSourceCard from '../Cards/DataSourceCard';
import WelcomeCard from '../Cards/WelcomeCard';
import QuizCard from '../Cards/QuizCard';

export default class FeedCards extends Component {

    constructor(props){
        super(props);
    }
    renderFeedCards(){
       
        switch (this.props.feed.inboxitem.cardtype) {
            case "welcome":
                return (    
                    <WelcomeCard
                        feed = {this.props.feed }
                        index={this.props.index}
                        isEarned = {this.props.isEarned} 
                    />
                )
            case "quote":
                return (
                    <QuoteCard
                        feed = {this.props.feed }
                        index={this.props.index}
                        isEarned = {this.props.isEarned} 
                    />
                )
            case "invite":
                return (
                    <InviteCard
                        feed = {this.props.feed }
                        index={this.props.index}
                        isEarned = {this.props.isEarned} 
                    />
                )
            case "datasource":
                return (
                    <DataSourceCard
                        feed = {this.props.feed }
                        index={this.props.index}
                        isEarned = {this.props.isEarned} 
                    />
                )
            case "incentive":
            //case "quiz":
                return( 
                    <WellBeingCard 
                        feed = {this.props.feed }
                        index={this.props.index}
                        isEarned = {this.props.isEarned} 
                    />
                )
            case "video":
            case "audio":
                return(
                    <MultiMediaCard 
                        feed = {this.props.feed }
                        index={this.props.index}
                        isEarned = {this.props.isEarned} 
                     />
                )
            case "quiz":
                return(
                    <QuizCard 
                        feed = {this.props.feed }
                        index={this.props.index}
                        isEarned = {this.props.isEarned} 
                    />
                )
            default:
                return(
                    <ApplicationTipsCard 
                    feed = {this.props.feed }
                    index={this.props.index}
                    isEarned = {this.props.isEarned} 
                />
                );
            break;
        }
    }

    render() {
        return (
            this.renderFeedCards()
        );
    }
}


