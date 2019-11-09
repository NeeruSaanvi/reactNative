

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Container, Content, Header, Left, Text, Body, Title, Right, Button } from 'native-base';
import VideoPlayer from '../MultiMedia/VideoPlayer';
import AudioPlayer from '../MultiMedia/AudioPlayer';
import { Icons } from '@assets/Images';
import { Actions } from 'react-native-router-flux';
import { CommonStyles } from '../Styles';
import LikeButton from '../Actions/LikeButton';
import CommentButton from '../Actions/CommentButton';
import ShareButton from '../Actions/ShareButton';
import BookmarkButton from '../Actions/BookmarkButton';
import { semiLightColor4, primaryShade1, semiDarkColor, primaryShade2, disabledColor, lightColor5, primaryColor, primaryShade5, primaryShade4 } from '../../../../themes/variables/Colors';
import EarnedBadge from '../EarnedBadge';
import { PieChart, LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop, G, Line } from 'react-native-svg';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale'
import { fontMedium } from '../../../../themes/variables/Fonts';
import { Strings } from '../../../Strings';

class RewardDetails extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            showEarnedBadge: true
        }
    }

    onEnd() {
        if (!this.state.showEarnedBadge)
            this.setState({ showEarnedBadge: true })
    }

    renderCard(cardType, incentivename,categoryname) {
        const icon = categoryname == 'financial' ? Icons.financial : Icons.physical
        return (
            <View style={styles.cardContainer}>
                <Image resizeMode='contain' style={styles.contentIcon} source={icon} />
                <Text style={styles.cardDescription}>{incentivename}</Text>
            </View>
        )
    }

    renderActions() {
        return (
            <View style={[CommonStyles.actionItem, styles.actions]}>
                <View style={CommonStyles.actionItemContainer}>
                    <Text style={styles.tags}>{this.props.tags}</Text>
                </View>

                <View style={CommonStyles.actionItemContainer}>
                    <ShareButton
                        message={this.props.feed.inboxitem.incentivedesc}
                        url={this.props.feed.inboxitem.imagepath}
                        title={this.props.feed.inboxitem.categoryname}
                    />
                    <BookmarkButton
                        isEarned={this.props.isEarned}
                        index={this.props.index}
                        feed={this.props.feed}
                    />
                </View>
            </View>
        )
    }

    renderPie() {
        const data = [
            {
                key: 1,
                value: 20,
                svg: { fill: primaryShade2 },
                label: 'Don’t Carry Balance'
            },
            {
                key: 2,
                value: 80,
                svg: { fill: primaryShade1 },
                label: 'Carry Balance'
            }
        ]

        const renderLabel = () => {
            return data.map((slice, index) => {
                return (

                    <View key={`label${index}`} style={styles.label}>
                        <View style={[styles.labelMark, { backgroundColor: slice.svg.fill }]} />
                        <Text style={styles.labelText}>{slice.label}</Text>
                    </View>
                )
            });

        }


        return (
            <View style={styles.chartContainer}>
                <View style={styles.chartHeadingContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.chartHeading}>
                            35% of credit card users in US don't carry balance
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={styles.chart}>
                        <PieChart
                            style={{ height: 160 }}
                            outerRadius={'100%'}
                            innerRadius={0}
                            padAngle={0}
                            data={data}
                        />
                    </View>
                    <View style={styles.chartLabelContainer}>
                        {renderLabel()}
                    </View>
                </View>

            </View>
        )
    }

    renderLine() {

        const data = [
            {
                key: 1,
                xLabel: 2000,
                value: 20,
            },
            {
                key: 2,
                xLabel: 2004,
                value: 35,
            },
            {
                key: 2,
                value: 40,
                xLabel: 2008,
            },
            {
                key: 2,
                xLabel: 2012,
                value: 45,
            },
            {
                key: 2,
                value: 60,
                xLabel: 2016,
            }
        ]
        const dataArray = data.map(obj => obj.value);
        const axesSvg = { fontSize: 10, fill: '#535353',fontWeight: 'bold', };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={primaryShade5}/>
                    <Stop offset={'100%'} stopColor={primaryShade4}/>
                </LinearGradient>
            </Defs>
        )

        const CustomGrid = ({ x, y, data, ticks }) => (
           
            <G>
                {/* {

                    // Horizontal grid
                    data.map(tick => (
                        
                        <Line
                            key={ tick }
                            x1={ '0%' }
                            x2={ '100%' }
                            y1={ y(tick) }
                            y2={ y(tick) }
                            stroke={ '#E7E7E7' }
                            strokeDasharray={ [ 5, 5 ] }
                        />
                    ))
                } */}
                {
                    // Vertical grid
                    data.map((_, index) => (
                       
                        <Line
                            key={ index }
                            y1={ '0%' }
                            y2={ '100%' }
                            x1={ x(index) }
                            x2={ x(index) }
                            stroke={ '#E7E7E7' }
                            strokeDasharray={ [ 5, 5 ] }
                        />
                    ))
                }
            </G>
        )

        return (
            <View style={styles.chartContainer}>
                <View style={styles.chartHeadingContainer}>
                    <View >
                        <Text style={styles.chartHeading}>
                            Total Number of Gym Memberships
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.tipLabel}>
                            2000 - 2016
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',backgroundColor:"#FBFBFB",padding:15,	borderRadius: 6 }}>
                    <YAxis
                        data={dataArray}
                        style={{ marginBottom: xAxisHeight }}
                        contentInset={verticalContentInset}
                        svg={axesSvg}
                        yScale={scale.scaleBand}
                        numberOfTicks={ 5 }
                    />
                    <View style={[styles.chart,{ marginLeft: 10}]}>


                        <LineChart
                            
                            style={{ height: 200 }}
                            data={dataArray}
                            curve={ shape.curveNatural }
                            contentInset={{ top: 10, bottom: 10}}
                            svg={{
                                strokeWidth: 2,
                                stroke: 'url(#gradient)',
                            }}
                        >
                            <CustomGrid belowChart={true}/>

                            <Grid 
                            svg={{ 
                                stroke:'#E7E7E7',
                                strokeDasharray:[ 5, 5 ] 
                             }} 
                            belowChart={true} />
                           
                            <Gradient />
                        </LineChart>


                        <XAxis
                            style={{ marginHorizontal: -10, height: xAxisHeight }}
                            data={data}
                            xAccessor={({ index }) => index}
                            formatLabel={(_, index) => data[ index ].xLabel}
                            contentInset={{ left: 10, right: 10 }}
                          
                            svg={{
                                fill: '#535353',
                                fontSize: 10,
                                fontWeight: 'bold',
                               
                                rotation: -90,
                                originY: 15,
                                y: 5,
                                //y: 0,
                            }}
                         />
                    </View>
                </View>

            </View>
        )
    }

    renderChart(categoryname) {
        //return this.renderPie()
        if(categoryname == 'financial')
            return this.renderPie()

        return this.renderLine()
    }

    renderQuickTip() {
        return (
            <View>
                <Text style={styles.tipLabel}>{Strings.quickTip}:</Text>
                <Text style={styles.quickTipText}>The US has a credit card economy, and as of 2017 debt amounts to $931 billion with the average household carrying credit card balance of $15,983.</Text>
            </View>
        )
    }

    render() {
        const { categoryname, categorydesc, subcategoryname, imagepath, tags, cardtype, incentivename, amount } = this.props.feed.inboxitem;
        return (
            <Container>
                <Header style={[CommonStyles.header, this.state.showEarnedBadge && { height: 90 }]}>
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => { Actions.pop() }}>
                            <Image style={{width:16,height:16}} source={Icons.back} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 4 }}>
                        <Title>
                            {Strings.rewardDetails}
                        </Title>
                    </Body>
                    <Right style={{ flex: 1 }} />

                </Header>
                {this.state.showEarnedBadge && <EarnedBadge amount={amount} />}
                <Content showsVerticalScrollIndicator={false} >
                    {this.renderCard(cardtype, incentivename,categoryname.toLowerCase())}
                    <View style={styles.contentContainer}>
                        <Text style={styles.descriptionText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis orci tortor, in vestibulum tellus scelerisque et.
                        </Text>
                        {this.renderChart(categoryname.toLowerCase())}
                        {this.renderQuickTip()}
                    </View>
                </Content>
                {this.renderActions()}
            </Container>
        );
    }
}

const styles = {
    cardDescription: {
        fontSize: 16,
        lineHeight: 22,
        marginTop: 24,
        textAlign: 'center'
    },
    description: {
        flex: 1,
        padding: 32,
    },
    descriptionText: {
        fontSize: 14,
        lineHeight: 22,
    },
    tags: {
        fontSize: 12
    },
    contentContainer: {
        flex: 1,
        padding: 36
    },
    cardContainer: {
        flex: 1,
        padding: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primaryShade1
    },
    contentIcon: {
        width: 70,
        height: 70,
    },
    actions: {
        borderTopWidth: 1,
        borderTopColor: semiLightColor4,
        paddingVertical: 0,
    },
    chartContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderTopWidth: 1,
        borderTopColor: disabledColor,
        paddingVertical: 26,
        marginTop: 24
    },
    chart: {
        flex: 1
    },
    chartLabelContainer: {
        flex: 1,
        marginLeft: 10,
    },
    chartHeadingContainer: {
        marginBottom: 26,
    },
    chartHeading: {
        fontFamily: fontMedium,
        fontSize: 16,
        lineHeight: 22,
    },
    label: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    labelMark: {
        width: 20,
        height: 20,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    labelText: {
        color: semiDarkColor,
        fontSize: 13,
        lineHeight: 20,
        flexWrap: 'wrap'
    },
    tipLabel: {
        color: lightColor5,
        fontSize: 14,
        lineHeight: 22
    },
    quickTipText: {
        fontSize: 14,
        lineHeight: 22
    }
}

export default RewardDetails;
