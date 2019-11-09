import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  Image  
} from 'react-native';
import { Text,Button } from 'native-base';
import { backgroundColor, primaryColor } from '../../../../themes/variables/Colors';
import { fontMedium } from '../../../../themes/variables/Fonts';
import { formatDollar, isIphoneX, OS } from '../../../Helper';
import { Icons } from '@assets/Images';
import { CommonStyles } from '../Styles';

class FeedAnimatedHeader extends Component {
  constructor(props) {
    super(props);

    this.offset = 0;
    // this.state= {
    //   scrollY: new Animated.Value(0)
    // };
    this.state = {
      scrollY: new Animated.Value(0),
      titleWidth: 0,
      hideItems: false
    };
  }

  // componentDidMount() {
  //   this.state.scrollY.addListener(({ value }) => (this.offset = value));
  // }

  onScroll = e => {
    this.props.onScroll(e);
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.state.scrollY.setValue(offset);
    if(offset >= 150){
      this.setState({hideItems: true})
    }
    else{
      this.setState({hideItems: false})
    }
  };


  render() {
    const { scrollY } = this.state;

    const opacity = {
      opacity: scrollY.interpolate({
        inputRange: [100, 150],
        outputRange: [1,0]
      }),
    }

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.header, 
            {
              width: "100%",
              height: scrollY.interpolate({
                inputRange: [0, 200],
                outputRange: [160, 90],
                extrapolate: 'clamp',
              }),

              
            },
            this.state.hideItems && CommonStyles.header
          ]}>
          <View>
            <View style={styles.info}>
              {
                !this.state.hideItems ?
                <Animated.Text style={[styles.mediumText,styles.textMargin,opacity,{
                  fontSize: scrollY.interpolate({
                    inputRange: [100, 150],
                    outputRange: [16, 0],
                    extrapolate: 'clamp',
                  }),
                }]}>
                  Amount Earned
                </Animated.Text> : null
              }
              <Animated.Text
                onLayout={e => {
                  if (this.offset === 0 && this.state.titleWidth === 0) {
                    const titleWidth = e.nativeEvent.layout.width;
                    this.setState({ titleWidth });
                  }
                }}
                style={[styles.mediumText,styles.textMargin,{
                  fontSize: scrollY.interpolate({
                    inputRange: [0, 200],
                    outputRange: [30, 20],
                    extrapolate: 'clamp',
                  }),
                }]}>
                 {formatDollar(this.props.faceValue)}
              </Animated.Text>
              <Text style={[{ fontSize:12}]}>
                  {this.props.duration} days of coverage remaining
              </Text>
            </View>
          </View>
          <View style={styles.actions}>
                <View style={styles.btnContainer}>
                     <Button style={[styles.navActions]} dark transparent>
                        <Image style={{width:24,height:24}} source={Icons.notifications} />
                        <View style={styles.hasNotification}></View>
                    </Button>
                    <Button style={styles.navActions} dark transparent>
                    <Image style={{width:24,height:24}} source={Icons.bookmarkLarge} />
                    </Button>
                </View>
                {
                  !this.state.hideItems ?
                  <Animated.View style={[styles.flexMiddleContainer, opacity]}>
                    <Button primary small rounded><Text>Upgrade</Text></Button>
                  </Animated.View> : null
                }
          </View>

          {/* <Animated.View
            style={{
              width: scrollOffset.interpolate({
                inputRange: [0, 200],
                outputRange: [deviceWidth * 0.9 - this.state.titleWidth, 0],
                extrapolate: 'clamp',
              }),
            }}
          /> */}
        </Animated.View>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: '100%' }}
          contentContainerStyle={{ width: '100%' }}
          onScroll={this.onScroll}

          onScroll={Animated.event(
            [{ 
              nativeEvent: { 
                contentOffset: { y: this.state.animatedValue } 
              } 
            }],
            { listener: this.onScroll.bind(this) },
            { useNativeDriver: true } // <-- Add this
          )}
          scrollEventThrottle={16}>

        {this.props.children}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: backgroundColor,
  },
  header: {
    zIndex:10,
    paddingTop: OS === "ios" ? (isIphoneX ? 39 : 15) : 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor:backgroundColor
    
  },
  info:{
    justifyContent:'center',
    alignItems: 'flex-start',
    flex:1,
    paddingHorizontal:12
  },
  actions:{
    justifyContent:'center',
    alignItems: 'center',
  },
  btnContainer:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    flex:1
  },
  flexMiddleContainer:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  },
  mediumText :{
    fontFamily: fontMedium,
    color:"#000"
  },
  textMargin:{
    marginVertical: 5,
  },
  navActions:{
    alignSelf: 'center',
    marginHorizontal: 12,
  },
  shadow:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    elevation: 2,
  },
  hasNotification:{
    width:4,
    height:4,
    position:'absolute',
    borderRadius: 2,
    backgroundColor:primaryColor,
    top:14,
    right:0
  }
});

const mapStateToProps = state =>{
  const { loading } = state.loader;
  const { userInfo } = state.root;
  
  return { loading,userInfo };
}

export default FeedAnimatedHeader;