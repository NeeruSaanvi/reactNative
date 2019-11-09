import React, { Component } from 'react';
import {  View } from 'react-native';
import { Actions } from "react-native-router-flux";
import { Container, 
    Header,
    Text,
    Content,
    Button,
    Body,
    H1,
    Tabs,
    Tab,
    TabHeading,
    Title,
    Form,
    Item,
    Input,
    Label,
    List,
    ListItem,
    Left,
    Right,
    Icon } from 'native-base';
import { connect } from "react-redux";
import { CommonStyles } from '../common/Styles';

const linked = [
  "Facebook","Linkedin"
]

const unlinked = [
  "Fitbit",
  "Yodlee"
]
class DataSource extends Component {
  constructor(props){
    super(props);
    console.log(this.props)
  }
  render() {
    return (
      <Container >
        <Header style={CommonStyles.header}>
            <Left>
                <Button onPress={()=> Actions.pop()} transparent>
                    <Icon name='arrow-round-back' />
                </Button>
            </Left>
            <Body >
              <Title>Data Source</Title>  
            </Body>
            <Right/>
        </Header>

        <View style={[CommonStyles.full,CommonStyles.ContentPadding]}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <View>
              <Text>Amount Earned</Text>
            </View>
            <View>
            <Text style={[CommonStyles.footerIcon,{marginTop:10}]}>${this.props.earnedfacevalue}.00</Text>
            <Text style={[CommonStyles.smallFont, CommonStyles.opacText]}>30 days remaining</Text>
            </View>
        </View>
        <Tabs locked={true}>
            <Tab heading={<TabHeading ><Text>Linked</Text>
            </TabHeading>}>
                <Content style={[CommonStyles.ContentPadding]} showsVerticalScrollIndicator={false} >
                <List
                        dataArray={linked}
                        renderRow={(data, sectionID, rowID, highlightRow) =>
                        <ListItem key={rowID}>
                            <Left>
                            <Text>
                                {data}
                            </Text>
                            </Left>
                        </ListItem>}
                    />
                </Content>


            </Tab>
            <Tab heading={<TabHeading ><Text>Unlinked</Text>
            </TabHeading>}>
                <Content style={[CommonStyles.ContentPadding]} showsVerticalScrollIndicator={false} >
                  <List
                        dataArray={unlinked}
                        renderRow={(data, sectionID, rowID, highlightRow) =>
                        <ListItem key={rowID}>
                            <Left>
                            <Text>
                                {data}
                            </Text>
                            </Left>
                        </ListItem>}
                    />
                </Content>


            </Tab>
        </Tabs>

        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { userInfo, defaultfacevalue, earnedfacevalue } = state.root;
  return { userInfo, defaultfacevalue, earnedfacevalue };
}
export default connect(mapStateToProps,{})(DataSource);