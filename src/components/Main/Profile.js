import React, { Component } from 'react';
import { View, Image, Alert, TouchableHighlight } from 'react-native';
import { Container, Header, Left, Text, Body, Title, Right, Button, Content, List, ListItem, Icon } from 'native-base';
import { connect } from "react-redux";
import { SignOut } from "../../actions";
import { CommonStyles } from '../common/Styles';
import { Actions } from 'react-native-router-flux';
import { Icons } from '@assets/Images';
import { twitterColor, linkedinColor, fitbitColor, facebookColor, bankColor, lightColor } from '../../../themes/variables/Colors';
import style from 'react-native-datepicker/style';

const links = [
  { title: "Facebook", connected: "Connected 4/15/18", BG: facebookColor, image: Icons.facebookWhite },
  { title: "Beneficiaries", connected: "Connected 4/15/18", BG: bankColor, image: Icons.bank },
];

const Unlinks = [
  { title: "Fitbit", connected: "Health & Fitness", BG: fitbitColor, image: Icons.fitbit, add: Icons.plusWhite },
  { title: "Twitter", connected: "Social", BG: twitterColor, image: Icons.twitter, add: Icons.plusWhite },
  { title: "Linkedin", connected: "Career", BG: linkedinColor, image: Icons.linkedin, add: Icons.plusWhite },
];


class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
  }

  onLink(rowID, data) {
    console.log(rowID)
    switch (rowID) {
      case "0":
        // Actions.AccountInfo();
        break;
      case "1":
        // Actions.Beneficiary();
        break;
      case "2":
        // Actions.DataSource();
        break;
      default:
        // Actions.ChangePasswords();
        break;
    }
  }

  onUnLink(rowID, data) {
    console.log(rowID)
    switch (rowID) {
      case "0":
        // Actions.AccountInfo();
        break;
      case "1":
        // Actions.Beneficiary();
        break;
      case "2":
        // Actions.DataSource();
        break;
      default:
        // Actions.ChangePasswords();
        break;
    }
  }



  render() {
    return (

      <Container>
        <Header style={CommonStyles.header}>
          <Left style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

              <Image style={{ width: 30, height: 30, borderRadius: 15 }}
                source={{ uri: 'https://yt3.ggpht.com/-21brqJmQdQs/AAAAAAAAAAI/AAAAAAAAAAA/2pbdGqawLsE/s100-c-k-no-mo-rj-c0xffffff/photo.jpg' }} />

              <Text style={{ fontSize: 14, color: '#000', marginLeft: 6 }}>John Doe</Text>
            </View>
          </Left>

          <Body></Body>

          <Right style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }} >

            <Button transparent style={{ width: 20, height: 20 }}
              onPress={() => {
                Actions.Settings();
              }}>
              <Image style={{ width: 20, height: 20 }}
                source={Icons.settings} />
            </Button>
            {/* <View style={{marginLeft:10,width:22,height:22,shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.2,shadowRadius: 1,
                  backgroundColor:'rgba(255,211,24,1.0)',borderColor:'white',
                  borderRadius:11,borderWidth:1,alignItems:'center',justifyContent:'center'
                }}>
                <Text style={{color:'white',fontSize:10,fontWeight:'bold'}}>3</Text>
            </View> */}

          </Right>
        </Header>

        <View style={{
          width: '100%', height: 60, borderBottomColor: lightColor,
          borderBottomWidth: 2, justifyContent: 'center', alignItems: style.actionItem, flexDirection: 'row'
        }}>

          <View style={{ width: '90%', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Text>Edit Account Info</Text>

            <Image style={{ width: 20, height: 20, borderRadius: 10 }}
              source={Icons.Correct} />


            {/* <View style={{marginLeft:10,width:22,height:22,shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.2,shadowRadius: 1,
              backgroundColor:'rgba(255,211,24,1.0)',borderColor:'white',
              borderRadius:11,borderWidth:1,alignItems:'center',justifyContent:'center'
          }}>
            <Text style={{color:'white',fontSize:10,fontWeight:'bold'}}>2</Text>

          </View> */}
          </View>

          <View style={{
            width: '10%', height: '100%', justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Button transparent style={{ width: 50, height: 50 }}
              onPress={() => {
                Actions.AccountInfo();
              }}>
              <Image style={{ width: 20, height: 20, borderRadius: 10 }}
                source={Icons.edit} />
            </Button>
          </View>
        </View>

        <View style={{
          width: '100%', height: 60, borderBottomColor: lightColor,
          borderBottomWidth: 2, justifyContent: 'center', alignItems: style.actionItem, flexDirection: 'row'
        }}>
          <TouchableHighlight underlayColor='transparent'
            style={{ width: '90%', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
            onPress={() => {
              Actions.Beneficiary({ data: { openType: "0" } });
            }}>
            <View style={{ width: '90%', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <Text>Benificiary</Text>
              {/* <View style={{marginLeft:10,width:22,height:22,shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.2,shadowRadius: 1,
                        backgroundColor:'rgba(255,211,24,1.0)',borderColor:'white',
                        borderRadius:11,borderWidth:1,alignItems:'center',justifyContent:'center'
                    }}>
                      <Text style={{color:'white',fontSize:10,fontWeight:'bold'}}>1</Text> 

                    </View>*/}
            </View>
          </TouchableHighlight>

          <View style={{ width: '10%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Button transparent style={{ width: 50, height: 50 }}
              onPress={() => {
                Actions.Beneficiary({ data: { openType: "1" } });
              }}>
              <Image style={{ width: 20, height: 20 }}
                source={Icons.plus} />
            </Button>
          </View>
        </View>


        <View style={{
          width: '100%', height: 60, borderBottomColor: lightColor,
          borderBottomWidth: 2, alignItems: style.actionItem, flexDirection: 'row'
        }}>

          <View style={{ width: '90%', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Text>Policy Documents</Text>

          </View>

          <View style={{
            width: '10%', height: '100%', justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Button transparent style={{ width: 50, height: 50 }}
              onPress={() => {
                // Actions.About();
              }}>
              <Image style={{ width: 20, height: 20, borderRadius: 10 }}
                source={Icons.documents} />
            </Button>
          </View>
        </View>

        {/* List content */}

        <Content style={[CommonStyles.ContentPaddingHome]}>
          <View style={{ width: '100%', height: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 10, color: 'lightgray', fontWeight: 'bold' }} > LINKED SOURCES </Text>
          </View>

          {links.length > 0 &&
            <List removeClippedSubviews={false}
              dataArray={links}
              renderRow={(data, sectionID, rowID, highlightRow) =>

                <ListItem style={{ backgroundColor: data.BG, borderRadius: 4, marginBottom: 5 }}
                  key={`${rowID}setting`} onPress={this.onLink.bind(this, rowID)}>

                  <View style={{ flexDirection: 'column', width: 40, height: '100%',  alignItems: 'center'}}>
                    {/* <Icon name= {data.image} />  */}
                    <Image style={{ width: 20, height: 20, borderRadius: 10 }}
                      source={data.image} />
                  </View> 

                  <View style={{ height: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: 14, color: 'white', alignSelf: 'flex-start' }}>{data.title}</Text>
                    <Text style={{ fontSize: 11, color: 'white', alignSelf: 'flex-start' }}>{data.connected}</Text>
                  </View>
                </ListItem>}
            />
          }

          <View style={{ width: '100%', height: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 10, color: 'lightgray', fontWeight: 'bold' }} > NOT LINKED SOURCES </Text>
          </View>

          {Unlinks.length > 0 &&
            <List removeClippedSubviews={false}
              dataArray={Unlinks}
              renderRow={(data, sectionID, rowID, highlightRow) =>

                <ListItem style={{ backgroundColor: data.BG, borderRadius: 4, marginBottom: 5 }}
                  key={`${rowID}setting`} onPress={this.onUnLink.bind(this, rowID)}>

                  <View style={{ flexDirection: 'column', width: 40, height: '100%' }}>

                    <Image style={{ width: 20, height: 20 }}
                      source={data.image} />
                  </View>

                  <View style={{ height: '100%', width: '75%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: 14, color: 'white', alignSelf: 'flex-start' }}>{data.title}</Text>
                    <Text style={{ fontSize: 11, color: 'white', alignSelf: 'flex-start' }}>{data.connected}</Text>
                  </View>

                  <View style={{ flexDirection: 'column', width: 40, height: '100%' }}>
                    <Image style={{ width: 20, height: 20 }}
                      source={data.add} />
                  </View>
                </ListItem>}
            />
          }
        </Content>

        { /* <CommentsView data={this.props.data} />
        <CommentsTextInput /> */}
      </Container>
    );
  }
}



const mapStateToProps = state => {
  const { loading } = state.loader;
  const { userInfo } = state.root;

  return { loading, userInfo };
}

export default connect(mapStateToProps, { SignOut })(Profile);
