import React from 'react';
import {
  View,
  ImageBackground,
  Switch,
  Slider,
  ActivityIndicator,
  Image
} from 'react-native';
import { Button,Icon,Header,Left,Right,Text } from "native-base";
import {
  Player
} from 'react-native-audio-toolkit';
import { Icons } from '@assets/Images';
import { fontMedium } from '../../../../themes/variables/Fonts';
import LinearGradient from 'react-native-linear-gradient';

//let filename = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.filename = 'https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3';
    this.state = {
      playPauseButton: 'wait',
      recordButton: 'Preparing...',

      stopButtonDisabled: true,
      playButtonDisabled: true,
      recordButtonDisabled: true,

      loopButtonStatus: false,
      progress: 0,
      duration:0,
      currentTime:0,
      error: null
    };
  }

  componentWillMount() {
    this.player = null;
    this.lastSeek = 0;

    this._reloadPlayer();

    this._progressInterval = setInterval(() => {
      if (this.player && this._shouldUpdateProgressBar()) {// && !this._dragging) {
        this.setState({
          progress: Math.max(0, this.player.currentTime) / this.player.duration,
          duration:this.player.duration,
          currentTime: this.player.currentTime
        });
      }
    }, 100);
  }



  _shouldUpdateProgressBar() {
    // Debounce progress bar update by 200 ms
    return Date.now() - this.lastSeek > 200;
  }

  _updateState(err) {
    console.log(this.player.canPlay);
    this.setState({
      playPauseButton: this.player && this.player.isPlaying     ? 'play' : 'chevronWhite',

      stopButtonDisabled:   !this.player   || !this.player.canStop,
      playButtonDisabled:   !this.player   || !this.player.canPlay 

    });
  }

  _playPause() {
    this.player.playPause((err, playing) => {
      console.log(err);
      console.log(playing);
      if (err) {
        this.setState({
          error: err.message
        });
      }
      this._updateState();
    });
  }

  _stop() {
    console.log(this.player)
    this.player.stop(() => {
      this._updateState();
    });
  }

  _seek(percentage) {
    if (!this.player) {
      return;
    }

    this.lastSeek = Date.now();

    let position = percentage * this.player.duration;
    console.log(position);
    this.player.seek(position, () => {
      this._updateState();
    });
  }

  _forwardRewind(forward){
    let position = this.player.currentTime;
    if(forward)
      position += 10000;
    else
      position -= 10000;
    this.player.seek(position, () => {
      this._updateState();
    });
  }

  _reloadPlayer() {
    console.log(this.player);
    if (this.player) {
      this.player.destroy();
    }

    this.player = new Player(this.filename, {
      autoDestroy: false
    }).prepare((err) => {
      if (err) {
        console.log('error at _reloadPlayer():');
        console.log(err);
      } else {
        this.player.looping = this.state.loopButtonStatus;
      }

      this._updateState();

      
    });

    //this._updateState();

    this.player.on('ended', () => {
      this._updateState();
      this.props.onEnd();
    });
    this.player.on('pause', () => {
      this._updateState();
    });
  }



  _toggleLooping(value) {
    this.setState({
      loopButtonStatus: value
    });
    if (this.player) {
      this.player.looping = value;
    }
  }
  millisToMinutesAndSeconds(millis) {
     if(millis == -1)
      return "00:00"
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  componentWillUnmount() {
    if(this.player.isPlaying)
      this.player.stop();
    clearInterval(this._progressInterval);
  }


    renderControlls(controlHideStyle) {
        return (

            <View style={styles.controls}>
                <LinearGradient   colors={['#00000000', '#000']} >
                    <View style={styles.controlsContainer}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        {   
                            this.state.playPauseButton == 'wait'?
                            <ActivityIndicator  color="#ffffff" />
                            :
                            <Button style={{ alignSelf: 'center' }} transparent light onPress={() => this._playPause()}>
                                <Image style={{ width: 16, height: 16 }} source={Icons[this.state.playPauseButton]} />
                            </Button>

                        }
                            
                        </View>
                        <View style={{ flex: 6, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View>
                                <Text style={styles.progressTimeText}>
                                    {this.millisToMinutesAndSeconds(this.state.currentTime)}
                                </Text>
                            </View>

                            <View style={{ width: "70%" }} pointerEvents="none">
                                <Slider 
                                    thumbImage={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="}}
                                                    thumbTintColor="transparent"
                                    thumbTintColor={"#ffffff"} 
                                    minimumTrackTintColor={"#ffffff"} 
                                    maximumTrackTintColor={"#00000050"} 
                                    step={0.0001} 
                                    disabled={this.state.playButtonDisabled} 
                                    onValueChange={(percentage) => this._seek(percentage)} value={this.state.progress}
                                />
                            </View>
                            <View>
                                <Text style={styles.progressTimeText}>
                                    {this.millisToMinutesAndSeconds(this.state.duration)}
                                </Text>
                            </View>


                        </View>
                    </View>
                </LinearGradient>

            </View>
        )
    }

  render() {
    return (
      <ImageBackground
      style={styles.imageBackground}
      source={{ uri: "https://i.pinimg.com/originals/ae/38/25/ae38250de6b2106ddbf9a920b6ced7a8.jpg" }}
    > 
        <View style={styles.playerContainer}>

            <View style={styles.infoContainer}>
              {
                this.state.error && <Text style={styles.errorMessage}>{this.state.error}</Text>
              }
                
            </View>
            {this.renderControlls()}
        </View>
      </ImageBackground>
    );
  }
}

var styles = {
  imageBackground:{
    backgroundColor: '#000',
    width: '100%',
    height: 230,
  },
  playerContainer:{
    flex:1,
    backgroundColor:"#00000010",
    padding:20,
    justifyContent:'center',
  },
  playerButtonsContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playPause:{
    width:70,
    height:70,
    borderWidth:1,
    borderColor:"#fff",
    borderRadius:35,
    justifyContent:'center',
    alignItems:'center',
  },
  playPauseIcon:{
    fontSize:60
  },
  progressTime:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  infoContainer:{
    flex:1,
    justifyContent:"center",
    alignItems: 'center',
  },
  infoText:{
    color:"#fff",
    fontSize:25
  },
  playOptions:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
    color: 'red'
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
};

export default AudioPlayer;
