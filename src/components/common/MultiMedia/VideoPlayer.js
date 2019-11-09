import React, { Component } from 'react';
import { View, Animated, Slider, ActivityIndicator, Dimensions, TouchableWithoutFeedback, StatusBar, PixelRatio, Platform, Image } from 'react-native';
import Video from "react-native-video";
import { Button, Text, Icon, Header, Left, Right } from "native-base";
import { Actions } from 'react-native-router-flux';
import { Icons } from '@assets/Images';
import { fontMedium } from '../../../../themes/variables/Fonts';
import LinearGradient from 'react-native-linear-gradient';

const statusBarSize = 25;

export default class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.filename = 'https://www.rmp-streaming.com/media/bbb-360p.mp4';
        this.state = {
            paused: false,
            progress: 0,
            duration: 0,
            error: false,
            buffering: true,
        };

        this.animated = new Animated.Value(0);
    }




    handleMainButtonTouch = () => {
        this.triggerShowHide();

        if (this.state.progress >= 1) {
            this.player.seek(0);
        }

        this.setState(state => {
            return {
                paused: !state.paused,
            };
        });
    };

    handleBuffer = meta => {
        console.log(meta.isBuffering)
        this.setState({
            buffering: meta.isBuffering,
        });
    };

    handleError = meta => {
        const { error: { code } } = meta;

        let error = "An error has occurred playing this video";
        switch (code) {
            case -11800:
                error = "Could not load video from URL";
                break;
        }

        this.setState({
            error,
        });
    };


    handleProgressPress = value => {
        this.triggerShowHide();

        const position = value;
        const progress = position * this.state.duration;
        console.log(progress);
        const isPlaying = !this.state.paused;

        this.player.seek(progress);
    };

    handleProgress = progress => {
        this.setState({
            progress: progress.currentTime / this.state.duration,
        });
    };

    handleEnd = () => {
        this.setState({ paused: true });
        this.props.onEnd();
    };

    handleLoad = meta => {
        this.setState({
            duration: meta.duration,
        });
        this.triggerShowHide();
    };

    handleVideoPress = () => {
        console.log("this")
        this.triggerShowHide();
    };

    triggerShowHide = () => {
        clearTimeout(this.hideTimeout);

        Animated.timing(this.animated, {
            toValue: 1,
            duration: 100,
        }).start();
        this.hideTimeout = setTimeout(() => {
            Animated.timing(this.animated, {
                toValue: 0,
                duration: 300,
            }).start();
        }, 10000);
    };

    secondsToTime(time) {
        return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
    }

    renderControlls(controlHideStyle) {
        return (

            <Animated.View style={[styles.controls, controlHideStyle]}>
                <LinearGradient   colors={['#00000000', '#000']} >
                    <View style={styles.controlsContainer}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            <Button style={{ alignSelf: 'center' }} transparent light onPress={this.handleMainButtonTouch}>
                                <Image style={{ width: 16, height: 16 }} source={!this.state.paused ? Icons.play : Icons.play} />
                            </Button>
                        </View>
                        <View style={{ flex: 6, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View>
                                <Text style={styles.progressTimeText}>
                                    {this.secondsToTime(Math.floor(this.state.progress * this.state.duration))}
                                </Text>
                            </View>

                            <View style={{ width: "70%" }} pointerEvents="none">
                                <Slider
                                    step={0.0001}
                                    thumbImage={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==" }}
                                    thumbTintColor="transparent"
                                    minimumTrackTintColor={"#ffffff"}
                                    maximumTrackTintColor={"#00000050"}
                                    value={this.state.progress}
                                    onSlidingComplete={this.handleProgressPress}
                                    style={{ alignSelf: 'stretch' }}
                                />
                            </View>
                            <View>
                                <Text style={styles.progressTimeText}>
                                    {this.secondsToTime(Math.floor(this.state.duration))}
                                </Text>
                            </View>


                        </View>
                    </View>
                </LinearGradient>

            </Animated.View>
        )
    }

    render() {
        const { height, width } = Dimensions.get('window');
        const portraitStyle = {
            videoStyle: {
                width: "100%",
                height: width * 0.5625
            },
            videoContainer: {
                width: "100%",
                backgroundColor: "#eee",
                overflow: "hidden",
            }

        }
        const landScapeStyle = {
            videoStyle: {
                height: width + statusBarSize,
            },
            videoContainer: {
                flex: 1,
                // transform: [
                // 	{ rotateZ: '90deg'},
                // 	{ translateY: ((PixelRatio.getPixelSizeForLayoutSize(height)-
                // 		PixelRatio.getPixelSizeForLayoutSize(width))/
                // 		PixelRatio.get()) - statusBarSize },
                // ],
                // height: width,
                // width: height,
            }
        }

        const landscapeOverlayStyle = {
            height: width + statusBarSize,
            width: height,
            transform: [
                { translateY: 0 },
            ]
        }
        const { error } = this.state;
        const { buffering } = this.state;

        const interpolatedControlsOpacity = this.animated.interpolate({
            inputRange: [0, 0.5, 0.99, 1],
            outputRange: [0, 0, 0, 1],
        });

        const interpolatedControlsPoition = this.animated.interpolate({
            inputRange: [0, 0.5, 0.99, 1],
            outputRange: [width - 10, width - 10, width - 10, 1],
        });

        const controlHideStyle = {
            opacity: interpolatedControlsOpacity,
            transform: [
                {
                    translateX: interpolatedControlsPoition,
                },
            ],
        };
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.handleVideoPress}>
                    <Video
                        paused={this.state.paused}
                        source={{ uri: this.filename }}
                        style={portraitStyle.videoStyle}
                        resizeMode="contain"
                        onLoad={this.handleLoad}
                        onProgress={this.handleProgress}
                        onEnd={this.handleEnd}
                        onBuffer={this.handleBuffer}
                        onError={this.handleError}
                        ref={ref => {
                            this.player = ref;
                        }}
                    />
                </TouchableWithoutFeedback>
                {/* <TouchableWithoutFeedback onPress={this.handleVideoPress}> */}
                    {this.renderControlls(controlHideStyle)}
                {/* </TouchableWithoutFeedback> */}
                {
                    error &&
                    <View style={[styles.videoCover]}>

                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                }
                {
                    buffering && !error &&
                    <View style={[styles.videoCover]}>
                        <ActivityIndicator color="#fff" />
                    </View>

                }

            </View>
        );
    }
}

const styles = {
    container: {

        backgroundColor: "#000"
    },
    controls: {
        position: "absolute",
        left: -1,
        bottom: 0,
        right: 0,
        flex: 1,
    },
    mainButton: {
        marginRight: 15,
    },
    controlsContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-around',
        paddingLeft: 10,
        paddingRight: 20,
        paddingVertical: 10,
    },
    // duration: {
    //   color: "#FFF",
    //   marginLeft: 15,
    // },
    videoCover: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0, .9)",
    },
    errorText: {
        color: "#fff",
    },
    playOptions: {
        flex: 1,
        justifyContent: "center",
    },
    progressTime: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 0,
    },
    progressTimeText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: fontMedium,
    },
    playPauseIcon: {
        fontSize: 60
    }
}