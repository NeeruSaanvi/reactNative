import React, { Component } from "react";
import { View, Keyboard, Image, StyleSheet,TouchableHighlight,Modal } from "react-native";
import { UpdateUserInfo, UpdatePersonalInfo,UpdateEditProfileInfo,GetProfile } from "../../actions";
// import PhotoUpload from 'react-native-photo-upload';
import AWS from "aws-sdk";
import { Buffer } from "buffer";
import {
    Card,
    CardItem,
    Container,
    Header,
    Text,
    Content,
    Button,
    Body,
    H1,
    Title,
    Form,
    Item,
    List,
    ListItem,
    Input,
    Label,
    Left,
    Right,
    Icon
} from 'native-base';

import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { CommonStyles } from "../common/Styles";
import { ShowToast } from "../../Helper";
import GooglePlacesInput from "../common/GooglePlacesInput";
import { Loader } from "../common/Loader";
import DatePicker from 'react-native-datepicker';


var _ = require('lodash');

const styles = StyleSheet.create({

    profileViewContainer: {
        flexDirection: 'row',
        flex: 1
    },
    profileIconContainer: {
        justifyContent: 'flex-end',
        flex: 0.12
    },
    profileIcon: {
        textAlign: "center",
        fontSize: 40,
        color: "#999999"
    },
    profileIconFocused: {
        textAlign: "center",
        fontSize: 40,
        color: "#586DFF"
    },
    profileInputContainer: {
        flex: 0.7
    },
    profileInput: {
        borderBottomWidth: 1,
        color: "#999999"
    },
    profileInputFocused: {
        borderBottomWidth: 1,
        color: "#586DFF"
    },
    profileImageContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    profileImage: {
        paddingVertical: 30,
        marginVertical:20,
        width: 70,
        height: 70,
        borderRadius: 35
    },
    borderCheck: {
        borderColor: "red",
        borderWidth: 1
    },
    inlineForm:{
        flexDirection: "row",
        justifyContent:"space-between"
    },
    dateText:{
        position:"absolute",
        left:5,
        top:38,
        color: '#183247',
        fontSize: 17
    },
    marginLeft:{
        marginLeft:20
    },
    marginRight:{
        marginRight:20
    }
})

// const links = [
//     "DataSource",
//     "Account",
//     "Beneficiary"
//   ];

class AccountInfo extends Component {

    constructor() {
        super();
        this.state = {
            focusField: "",
            userInfo: {},
            isEdited:false,
            isPhotoUploaded: false,
            selectAddress: false
        }
    }
    userInfo = {};
    componentWillMount() {
        let self = this;
        let s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: { Bucket: "lifexprofilepics" }
        });

        this.s3 = s3
        var params = { Key: this.props.userInfo.profileid }
        s3.headObject(params, function (err, metadata) {
            if (err && err.code === 'NotFound') {
                s3.getSignedUrl('getObject', { Key: "default.jpg" }, (error, url) => {
                    self.setState({ imageURL: url });
                });
            } else {
                s3.getSignedUrl('getObject', params, (error, url) => {
                    self.setState({ imageURL: url });
                });
            }
        });
        
        GetProfile();

        this.userInfo = _.clone(this.props.editUserInfo)
       // const array = [this.props.editUserInfo].slice();
       // this.setState({ userInfo: array[0] });
       console.log("userInfo");
        console.log(this.userInfo);
        console.log("edituserInfo");
        console.log(this.props.editUserInfo);

    }


    getData(userInfo) {

        let list = Object.keys(userInfo).map(key => {
            switch (key) {
                case 'displayname':
                    return { person: userInfo[key] }
                    break;

                default:
                    break;
            }
        })

        return Object.assign({}, ...list)
    }


    renderProfilePic(imageURL) {
        return (
            <View style={styles.marginRight}>              
                    <Image style={styles.profileImage} resizeMode='cover' source={{ uri: imageURL }} ></Image>
            </View>
        )
    }

    renderFields(iconName, value) {
        var self = this;
        return (
            <View key={iconName} style={styles.profileViewContainer}>
                <View style={styles.profileIconContainer}>
                    <Icon style={this.state.focusField == iconName ? styles.profileIconFocused : styles.profileIcon} name={"ios-" + iconName} md={"md-" + iconName} size={100} />
                </View>
                <Item stackedLabel style={styles.profileInputContainer}>
                    <Label> Display Name</Label>
                    <Input
                        value={value}
                        onChangeText={(newValue) => {
                            var data = {};
                            data[iconName] = newValue
                            self.setState({ data: data })
                        }}
                        onFocus={() => { this.setState({ focusField: iconName }) }}
                        onBlur={() => { this.setState({ focusField: "" }) }} />
                </Item>
            </View>
        )
    }

    onPhotoSelect(avatar) {
        if (avatar) {
            var self = this;
            var content = new Buffer(avatar, 'base64')
            var data = {
                Key: this.props.userInfo.profileid,
                Body: content,
                ContentEncoding: 'base64',
                ContentType: 'application/octet-stream'
            };
            this.s3.putObject(data, function (err, data) {
                if (err) {
                    console.log(err);
                    console.log('Error uploading data: ', data);
                } else {
                    self.setState({ isPhotoUploaded: true })

                    ShowToast('Profile Updated Successfuly', 'success');
                    console.log('succesfully uploaded the image!');
                }
            });
            console.log('Image base64 string: ', avatar)
        }
    }


    updatePersonalInfo(){
        var data = {
            id: this.userInfo.profileid,
            personal: this.props.editUserInfo.personal,
            address: this.props.editUserInfo.address
        }

        console.log(data);
        this.props.UpdatePersonalInfo(data);
        this.setState({isEdited:false})
    }

    onFieldChange(){
      console.log(this.props.editUserInfo);
      console.log(this.userInfo); 
      if(_.isEqual(this.props.editUserInfo,this.userInfo)) 
            this.setState({isEdited: false})
      else
            this.setState({isEdited: true})
        
    }
    age(dob) {
     
        var now = new Date();
        var b_split = dob.split('-');
        if(b_split.length == 3){
            var birthDate = new Date(b_split[0], b_split[1]*1-1, b_split[2]);
            var years = Math.floor((now.getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
            console.log(years);
            if(years < 21){
                this.props.UpdateEditProfileInfo({prop: 'dob',  value:this.props.editUserInfo.personal.dob.split("T")[0]});
                ShowToast("Your age must be minimum 21 years", 'warning');
            }
            else{
                this.props.UpdateEditProfileInfo({prop: 'dob',  value:dob})
                this.onFieldChange();
            }
        }
    }

    formatAddress(address){
        
        var addressString = Object.values(address).filter(function(x){
            //console.log(x.indexOf('undefined'));
            
            return (x !== (undefined || null || ''));
        });

        return addressString.toString();
    }

    toggleAddress(){
        this.setState({selectAddress: !this.state.selectAddress});

       this.onFieldChange();
    }

    renderUserInfo(){
      
      return(

        <View>
            <View style={{flexDirection:"row",alignItems:"center"}}>
                {
                    this.renderProfilePic(this.state.imageURL)
                }
                <View>
                    <Title>{this.props.editUserInfo.email}</Title>
                    <Text style={CommonStyles.opacText}>{this.props.editUserInfo.displayname}</Text>
                </View>
            </View>
            {/* <Item stackedLabel>
              <Label>Display Name</Label>
              <Input value={this.props.editUserInfo.personal.displayname}
                       autoCorrect={false} 
                      onChangeText={value => this.props.UpdateEditProfileInfo({prop: 'displayname', value})}
                      onBlur={() => { this.onFieldChange('displayname') }}
                      />
            </Item> */}
            {/* <Item stackedLabel>
              <Label>Phone Number</Label>
              <Input keyboardType="phone-pad" value={this.props.editUserInfo.personal.contactnumber}
                      onChangeText={value => this.props.UpdateEditProfileInfo({prop: 'contactnumber', value})}
                        autoCorrect={false}
                      onBlur={() => { this.onFieldChange() }} />
            </Item>
            <Item style={[CommonStyles.inputMarginTop, CommonStyles.bb0]} stackedLabel>
                  <Label>Address</Label>
                  <GooglePlacesInput getAddress={val => { self.setState({...this.state.userInfo, address: val})}} />
            </Item> */}

                    <View style={styles.inlineForm}>
                        <Item style={[CommonStyles.inputMarginTop,CommonStyles.full]} stackedLabel>
                            <Label>Firstname</Label>
                            <Input value={this.props.editUserInfo.personal.firstname} 
                            onChangeText={value => this.props.UpdateEditProfileInfo({prop: 'firstname', value})} autoCorrect={false} onBlur={() => { this.onFieldChange() }} />
                            
                        </Item>
                        <Item  style={[CommonStyles.inputMarginTop,CommonStyles.full]} stackedLabel>
                        <Label>Lastname</Label>
                            <Input value={this.props.editUserInfo.personal.lastname} 
                            onChangeText={value => this.props.UpdateEditProfileInfo({prop: 'lastname', value})} autoCorrect={false} onBlur={() => { this.onFieldChange() }} />
                        </Item>
                    </View>
                    <Item style={[CommonStyles.inputMarginTop,CommonStyles.full]} stackedLabel>
                            <Label>DOB</Label>
                        <Text style={styles.dateText}>{this.props.editUserInfo.personal.dob.split("T")[0]}
                        </Text>
                        <DatePicker
                            style={{flex: 1,marginTop:10,width:"100%"}}
                            value={this.props.editUserInfo.personal.dob}
                            mode="date"
                            placeholder=""
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                btnTextConfirm: {
                                    color: '#586DFF'
                                  }
                              }}
                            showIcon={false}
                            hideText = {true}                      
                            onDateChange={value => this.age(value)}  
                        />
                    </Item>
                    <View >
                    <Item onPress={this.onFieldChange.bind(this)} iconRight style={[CommonStyles.inputMarginTop]} stackedLabel>
                        <Label>Address</Label>             
                            <Input disabled value={this.formatAddress(this.props.editUserInfo.address)}/>
                            
                                {/* <TouchableHighlight>
                                    <Text/>
                                </TouchableHighlight> */}
                        {/* <GooglePlacesInput getAddress={val => this.props.UpdateEditProfileInfo({prop: 'address', val})} /> */}
                    </Item>
                    <TouchableHighlight underlayColor="transparent" onPress={this.toggleAddress.bind(this)} style={{position:"absolute",top:0,backgroundColor:"transparent",width:"100%",height:"100%"}}>
                        <Text/>
                    </TouchableHighlight>
                    </View>
                    <View style={styles.inlineForm}>
                        <Item style={[CommonStyles.inputMarginTop,CommonStyles.full, styles.marginRight]} stackedLabel>
                            <Label>Height</Label>
                            <Input placeholderTextColor={CommonStyles.placeHolderColor.color} placeholder="in Cms" keyboardType="numeric" value={this.props.editUserInfo.personal.height.toString()} 
                            onChangeText={value => this.props.UpdateEditProfileInfo({prop: 'height', value})} autoCorrect={false}  onBlur={() => { this.onFieldChange() }}/>
                            
                        </Item>
                        <Item  style={[CommonStyles.inputMarginTop,CommonStyles.full, styles.marginLeft]} stackedLabel>
                        <Label>Weight</Label>
                            <Input placeholderTextColor={CommonStyles.placeHolderColor.color} placeholder="in Lbs" keyboardType="numeric" value={this.props.editUserInfo.personal.weight.toString()} 
                                onChangeText={value => this.props.UpdateEditProfileInfo({prop: 'weight', value})} autoCorrect={false} onBlur={() => { this.onFieldChange() }}/>
                        </Item>
                    </View>

        </View>
      )
    }

    render() {
        return (
            <Container>
                <Header style={CommonStyles.header}>
                    <Left>
                        <Button onPress={()=> Actions.pop()} transparent>
                            <Icon name='arrow-round-back' />
                        </Button>
                    </Left>
                    <Body >
                      <Title>Personal Information</Title>  
                    </Body>
                    <Right>
                        {
                            this.state.isEdited && 
                            <Button primary onPress={()=> {this.updatePersonalInfo()}} transparent>
                                <Text>Done</Text>
                            </Button>
                        }
                    </Right>
                </Header>

                <Content style={CommonStyles.ContentPadding}>
                    {                      
                      this.props.editUserInfo && this.renderUserInfo()
                    }
                </Content>
                {this.props.loading && <Loader display={this.props.loading} />}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.selectAddress}
                    onRequestClose={() => {
                        //alert('Modal has been closed.');
                    }}>
                    <View style={{flex:1}}>
                        <Header style={CommonStyles.header}>
                            <Left style={{flexDirection:"row"}}>
                                <Button onPress={()=> {this.toggleAddress()}} transparent>
                                {/* <Button onPress={()=> {this.setFastLink();this.props.UpdateYodleeUserInfo({prop: 'loadFastLink', value: false})}} transparent> */}
                                    <Icon name='close' />
                                </Button>                  
                            </Left>
                            <Right/>
                        </Header>
                        <Content style={CommonStyles.ContentPadding}>
                            <GooglePlacesInput getAddress={val => {
                                this.props.UpdateEditProfileInfo({prop: 'address', value:val})
                                this.toggleAddress();
                            }} />
                        </Content>
                    </View>
                </Modal>
            </Container>
        )
    };
}

const mapStateToProps = state => {
    const { userInfo,editUserInfo } = state.root;
    const { loading } = state.loader;
    return { userInfo,editUserInfo,loading };
}
export default connect(mapStateToProps, { UpdateUserInfo, UpdatePersonalInfo,UpdateEditProfileInfo,GetProfile})(AccountInfo);
