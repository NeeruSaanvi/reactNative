import React, { Component } from 'react';
import { View, Modal, Dimensions, Alert, Image, TouchableHighlight } from 'react-native';
import { Actions } from "react-native-router-flux";
import {
    Container, Header, Text, Content, Button, Body, H1, Title, Form,
    Item, Input, Label, List, ListItem, Left, Right, Icon
} from 'native-base';
import { connect } from "react-redux";
import { CommonStyles } from '../common/Styles';
import { GetBeneficiary, UpdateBeneficaiaryInfo, DeleteBeneficairyInfo } from '../../actions';
import DatePicker from 'react-native-datepicker';
import { Icons } from '@assets/Images';


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class Beneficiary extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);

        this.state = {
            showModal: false,
            showaddModal: false,
            selectedRowData: {
                name: null,
                dob: null,
                relationship: null,
                percentage: null
            },
            selectedIndex: null
        }
    }

    componentWillMount() {
        if (this.props.data.openType == '1') {
            //   this.beneficiaryModal();
            this.toggleAddModal();
        }

        this.props.GetBeneficiary();
    }


    onLink(rowID, data) {
        console.log(rowID)
        // alert("rowid " + rowID + " " + JSON.stringify(data))
        this.beneficiaryModal(data, rowID);
    }


    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    toggleAddModal() {
        this.setState({ showaddModal: !this.state.showaddModal })
    }

    beneficiaryModal(data, index) {
        console.log(index);
        this.toggleModal();

        if (data)
            this.setState({ selectedRowData: data, selectedIndex: index })
        else
            this.setState({ selectedRowData: {}, selectedIndex: null })
    }

    deleteBeneficairyInfo(index) {
        this.props.DeleteBeneficairyInfo(parseInt(index));
    }

    setData(data) {
        this.setState(prevState => ({
            selectedRowData: {
                ...prevState.selectedRowData,
                ...data
            }
        }))
    }

    onSave() {

        // this.toggleModal();

        // var data = {
        //   name : this.state.name,
        //   dob : this.state.dob,
        //   relationship: this.state.relationship,
        //   percentage: this.state.percentage
        // }

        // this.setState({selectedRowData: data});

        console.log(this.state.selectedRowData);
        var index = this.state.selectedIndex == null ? this.state.selectedIndex : parseInt(this.state.selectedIndex);
        console.log(index);
        this.props.UpdateBeneficaiaryInfo(this.state.selectedRowData, index)
    }



    render() {
        return (
            <Container >

                <Header style={[CommonStyles.header, this.state.showEarnedBadge && { height: 90 }]}>
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => { Actions.pop() }}>
                            <Image style={{ width: 16, height: 16 }} source={Icons.back} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 4 }}>
                        {this.props.beneficiaryInfo.length > 1 &&
                            <Title>{this.props.beneficiaryInfo.length} Beneficiaries</Title>
                        }
                        {this.props.beneficiaryInfo.length <= 1 &&
                            <Title>{this.props.beneficiaryInfo.length} Beneficiary</Title>
                        }
                    </Body>
                    <Right style={{ flex: 1 }}>
                        {

                            <Button transparent onPress={() => { this.toggleAddModal() }}>
                                <Image style={{ width: 16, height: 16 }} source={Icons.plus} />
                            </Button>

                        }

                    </Right>
                </Header>


                <Content style={[CommonStyles.ContentPadding] && { backgroundColor: 'rgba(249,249,249,1.0)' }} showsVerticalScrollIndicator={false} >
                    {
                        this.props.beneficiaryInfo.length > 0 ?
                            <List
                                removeClippedSubviews={false}
                                dataArray={this.props.beneficiaryInfo}
                                renderRow={(data, sectionID, rowID, highlightRow) =>
                                    <ListItem avatar key={rowID}
                                        style={{ backgroundColor: '#fff' }}
                                        onPress={this.onLink.bind(this, rowID, data)}>

                                        <Body>
                                            <Text>{data.name}</Text>

                                            <Text note>Relationship: {data.relationship}</Text>

                                            <Text note>DOB: {data.dob}</Text>
                                        </Body>

                                        <Right style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                                            <Button
                                                style={{ width: 20, height: 20, borderRadius: 10, marginRight: 10, alignItems: 'center', justifyContent: 'center' }}
                                                onPress={() => {
                                                    // this.beneficiaryModal(data, rowID)
                                                }}>
                                                <Image style={{ width: 12, height: 12 }}
                                                    source={Icons.plusWhite} />
                                            </Button>

                                            <Text>{data.percentage}%</Text>

                                            <Button
                                                style={{ width: 20, height: 20, borderRadius: 10, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}
                                                onPress={() => {
                                                    // alert("rowid " + rowID + " " + JSON.stringify(data))
                                                }}>
                                                <Image style={{ width: 12, height: 12 }}
                                                    source={Icons.plusWhite} />
                                            </Button>
                                        </Right>
                                        {/* <Right style={{flexDirection:"row"}}>
                                  <Button dark small transparent onPress={()=>this.beneficiaryModal(data,rowID)}>
                                    <Icon name="md-create" />
                                  </Button>
                                  <Button danger small transparent onPress={()=>this.deleteBeneficairyInfo(rowID)}>
                                    <Icon name="md-trash" />
                                  </Button>
                              </Right> */}
                                    </ListItem>
                                }
                            />
                            :
                            <View style={CommonStyles.middleAlign}>
                                <Text>No beneficiary is added</Text>
                                <Button block transparent onPress={() => this.beneficiaryModal()}>
                                    <Text>Add Beneficiary</Text>
                                </Button>
                            </View>
                    }
                </Content>



                {/* Modal for Edit Beneficiary */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => {
                        //alert('Modal has been closed.');
                    }}>
                    <View style={{ flex: 1 }}>


                        <Header style={CommonStyles.header}>
                            <Left>
                                <Button transparent onPress={() => { this.toggleModal() }}>
                                    <Image style={{ width: 16, height: 16 }} source={Icons.back} />
                                </Button>
                            </Left>
                            <Body style={{ flex: 2 }} >
                                <Title>Edit Beneficiary</Title>
                            </Body>
                            <Right />
                        </Header>

                        {/* <Header style={[CommonStyles.header && { height: 90 }]}>
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => { this.toggleModal() }}>
                            <Image style={{ width: 16, height: 16 }} source={Icons.back} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 4 }}>
                        <Title>
                        Beneficiary
                        </Title>
                    </Body>
                    
                </Header> */}

                        <Content style={{ padding: 16, backgroundColor: 'rgba(249,249,249,1.0)' }}>

                            <View style={{
                                width: viewportWidth - 40, height: 65, marginTop: 15, borderRadius: 5,
                                borderColor: 'rgba(238,238,238,1.0)', borderWidth: 1, backgroundColor: '#fff'
                            }}>

                                <Text style={{ fontSize: 12, fontWeight: '600', marginLeft: 10, marginTop: 7, color: 'gray' }}>FULL NAME</Text>

                                <Input style={{ fontSize: 16, marginLeft: 5 }}
                                    underlineColorAndroid='transparent'
                                    value={this.state.selectedRowData.name}
                                    onChangeText={(value) => this.setState({ name: value })}
                                    // value={this.props.oldPassword}
                                    // onChangeText={value => this.props.UpdateUserInfo({prop: 'oldPassword', value})}
                                    placeholder="FULL NAME"
                                    autoCorrect={false}
                                />
                            </View>

                            <View style={{
                                width: viewportWidth - 40, height: 65, borderRadius: 5, marginTop: 15,
                                borderColor: 'rgba(238,238,238,1.0)', borderWidth: 1, backgroundColor: '#fff'
                            }}>

                                <Text style={{ fontSize: 12, fontWeight: '600', marginLeft: 10, marginTop: 7, color: 'gray' }}>RELATIONSHIP</Text>

                                <Input style={{ fontSize: 16, marginLeft: 5 }}
                                    underlineColorAndroid='transparent'
                                    value={this.state.selectedRowData.relationship}
                                    onChangeText={(value) => this.setState({ relationship: value })}
                                    // value={this.props.oldPassword}
                                    // onChangeText={value => this.props.UpdateUserInfo({prop: 'oldPassword', value})}
                                    placeholder="RELATIONSHIP"
                                    autoCorrect={false}
                                />
                            </View>

                            <View style={{
                                width: viewportWidth - 40, height: 65, borderRadius: 5, marginTop: 15, justifyContent: 'center',
                                borderColor: 'rgba(238,238,238,1.0)', borderWidth: 1, backgroundColor: '#fff'
                            }}>

                                <Text style={{ fontSize: 12, fontWeight: '600', marginLeft: 10, marginTop: 20, color: 'gray' }}>DOB</Text>

                                <Text style={{ fontSize: 16, marginLeft: 10, position: 'absolute' }}>{this.state.selectedRowData.dob}</Text>

                                <DatePicker
                                    style={{ width: "100%", height: '100%' }}
                                    value={this.state.selectedRowData.dob}
                                    mode="date"
                                    placeholder="DOB"
                                    placeholderTextColor='#000'
                                    format="YYYY-MM-DD"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        btnTextConfirm: {
                                            color: '#586DFF'
                                        }
                                    }}
                                    showIcon={false}
                                    hideText={true}
                                    onDateChange={value => this.setData({ 'dob': value })}
                                />
                            </View>

                            <View style={{
                                width: viewportWidth - 40, height: 50, borderRadius: 5, marginTop: 25,
                                alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,208,212,1)'
                            }}>

                                <TouchableHighlight underlayColor='transparent'
                                    style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => {
                                        this.toggleModal();
                                        this.onSave();
                                    }}>

                                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Save</Text>
                                </TouchableHighlight>
                            </View>

                            <View style={{
                                width: viewportWidth - 40, height: 50, borderRadius: 5, marginTop: 15,
                                borderColor: 'rgba(238,238,238,1.0)', borderWidth: 1,
                                alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'
                            }}>

                                <TouchableHighlight underlayColor='transparent'
                                    style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => {
                                        this.toggleModal();
                                        this.deleteBeneficairyInfo(this.state.selectedIndex);
                                    }}>

                                    <Text style={{ fontSize: 16, fontWeight: '700', color: 'gray' }}>Delete</Text>
                                </TouchableHighlight>
                            </View>

                            {/* <Item  style={[CommonStyles.inputMarginTop,CommonStyles.full]} stackedLabel>
                          <Label>Name</Label>
                            <Input placeholderTextColor={CommonStyles.placeHolderColor.color}  value={this.state.selectedRowData.name} 
                                onChangeText={value => this.setData({'name':value})} autoCorrect={false}/>
                      </Item>
                      <Item style={[CommonStyles.inputMarginTop,CommonStyles.full]} stackedLabel>
                            <Label>DOB</Label>
                        <Text style={styles.dateText}>{this.state.selectedRowData.dob}
                        </Text>
                        <DatePicker
                            style={{flex: 1,marginTop:10,width:"100%"}}
                            value={this.state.selectedRowData.dob}
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
                            onDateChange={value => this.setData({'dob':value})}  
                        />
                      </Item>
                      <Item  style={[CommonStyles.inputMarginTop,CommonStyles.full]} stackedLabel>
                          <Label>Relationship</Label>
                            <Input placeholderTextColor={CommonStyles.placeHolderColor.color}  value={this.state.selectedRowData.relationship} 
                                onChangeText={value => this.setData({'relationship': value})} autoCorrect={false}/>
                      </Item>
                      <Item  style={[CommonStyles.inputMarginTop,CommonStyles.full]} stackedLabel>
                          <Label>Percentage</Label>
                            <Input placeholderTextColor={CommonStyles.placeHolderColor.color} placeholder="in %" keyboardType="numeric" value={this.state.selectedRowData.percentage} 
                                onChangeText={value => this.setData({'percentage': value})} autoCorrect={false}/>
                      </Item> */}
                        </Content>
                    </View>
                </Modal>



                {/* Modal for add new Beneficiary */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showaddModal}
                    onRequestClose={() => {
                        //alert('Modal has been closed.');
                    }}>
                    <View style={{ flex: 1 }}>


                        <Header style={CommonStyles.header}>
                            <Left>
                                <Button transparent onPress={() => { this.toggleAddModal() }}>
                                    <Image style={{ width: 16, height: 16 }} source={Icons.back} />
                                </Button>
                            </Left>
                            <Body style={{ flex: 2 }} >
                                <Title>Add Beneficiary</Title>
                            </Body>
                            <Right />
                        </Header>

                        {/* <Header style={[CommonStyles.header && { height: 90 }]}>
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => { this.toggleModal() }}>
                            <Image style={{ width: 16, height: 16 }} source={Icons.back} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 4 }}>
                        <Title>
                        Beneficiary
                        </Title>
                    </Body>
                    
                </Header> */}

                        <Content style={{ padding: 16, backgroundColor: 'rgba(249,249,249,1.0)' }}>

                            <View style={{
                                width: viewportWidth - 40, height: 65, marginTop: 15, borderRadius: 5,
                                borderColor: 'rgba(238,238,238,1.0)', borderWidth: 1, backgroundColor: '#fff'
                            }}>

                                <Text style={{ fontSize: 12, fontWeight: '600', marginLeft: 10, marginTop: 7, color: 'gray' }}>FULL Name</Text>

                                <Input style={{ fontSize: 16, marginLeft: 5 }}
                                    underlineColorAndroid='transparent'
                                    value={this.state.selectedRowData.name}
                                    onChangeText={(value) => this.setState({ name: value })}
                                    // value={this.props.oldPassword}
                                    // onChangeText={value => this.props.UpdateUserInfo({prop: 'oldPassword', value})}
                                    placeholder="FULL NAME"
                                    autoCorrect={false}
                                />
                            </View>

                            <View style={{
                                width: viewportWidth - 40, height: 65, marginTop: 15, borderRadius: 5,
                                borderColor: 'rgba(238,238,238,1.0)', borderWidth: 1, backgroundColor: '#fff'
                            }}>

                                <Text style={{ fontSize: 12, fontWeight: '600', marginLeft: 10, marginTop: 7, color: 'gray' }}>RELATIONSHIP</Text>

                                <Input style={{ fontSize: 16, marginLeft: 5 }}
                                    underlineColorAndroid='transparent'
                                    value={this.state.selectedRowData.relationship}
                                    onChangeText={(value) => this.setState({ relationship: value })}
                                    // value={this.props.oldPassword}
                                    // onChangeText={value => this.props.UpdateUserInfo({prop: 'oldPassword', value})}
                                    placeholder="RELATIONSHIP"
                                    autoCorrect={false}
                                />
                            </View>

                            <View style={{
                                width: viewportWidth - 40, height: 65, borderRadius: 5, marginTop: 15, justifyContent: 'center',
                                borderColor: 'rgba(238,238,238,1.0)', borderWidth: 1, backgroundColor: '#fff'
                            }}>

                                <Text style={{ fontSize: 12, fontWeight: '600', marginLeft: 10, marginTop: 20, color: 'gray' }}>DOB</Text>

                                <Text style={{ fontSize: 16, marginLeft: 10, position: 'absolute' }}>{this.state.selectedRowData.dob}</Text>

                                <DatePicker
                                    style={{ width: "100%", height: '100%' }}
                                    value={this.state.selectedRowData.dob}
                                    mode="date"
                                    placeholder="DOB"
                                    placeholderTextColor='#000'
                                    format="YYYY-MM-DD"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        btnTextConfirm: {
                                            color: '#586DFF'
                                        }
                                    }}
                                    showIcon={false}
                                    hideText={true}
                                    onDateChange={value => this.setData({ 'dob': value })}
                                />
                            </View>

                            <View style={{
                                width: viewportWidth - 40, height: 50, borderRadius: 5, marginTop: 25,
                                alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,208,212,1)'
                            }}>

                                <TouchableHighlight underlayColor='transparent'
                                    style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => {
                                        this.toggleAddModal();
                                        this.onSave();
                                    }}>

                                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Add</Text>
                                </TouchableHighlight>
                            </View>

                            {/* <View style={{ width: viewportWidth - 40, height:50, borderRadius:5, marginTop:15,
                                borderColor:'rgba(238,238,238,1.0)', borderWidth:1,
                                alignItems:'center', justifyContent:'center', backgroundColor:'#fff' }}>
                        
                        <TouchableHighlight underlayColor='transparent' 
                                style={{ width:'100%', height:'100%', alignItems:'center', justifyContent:'center' }}  
                                onPress={() => 
                                    {
                                        this.toggleAddModal();
                                      this.deleteBeneficairyInfo(this.state.selectedIndex);
                                    }}>
                            
                                <Text style={{ fontSize:16, fontWeight:'700', color:'gray' }}>Delete</Text>
                        </TouchableHighlight>
                    </View> */}

                            {/* <Item  style={[CommonStyles.inputMarginTop,CommonStyles.full]} stackedLabel>
                          <Label>Name</Label>
                            <Input placeholderTextColor={CommonStyles.placeHolderColor.color}  value={this.state.selectedRowData.name} 
                                onChangeText={value => this.setData({'name':value})} autoCorrect={false}/>
                      </Item>
                      <Item style={[CommonStyles.inputMarginTop,CommonStyles.full]} stackedLabel>
                            <Label>DOB</Label>
                        <Text style={styles.dateText}>{this.state.selectedRowData.dob}
                        </Text>
                        <DatePicker
                            style={{flex: 1,marginTop:10,width:"100%"}}
                            value={this.state.selectedRowData.dob}
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
                            onDateChange={value => this.setData({'dob':value})}  
                        />
                      </Item>
                      <Item  style={[CommonStyles.inputMarginTop,CommonStyles.full]} stackedLabel>
                          <Label>Relationship</Label>
                            <Input placeholderTextColor={CommonStyles.placeHolderColor.color}  value={this.state.selectedRowData.relationship} 
                                onChangeText={value => this.setData({'relationship': value})} autoCorrect={false}/>
                      </Item>
                      <Item  style={[CommonStyles.inputMarginTop,CommonStyles.full]} stackedLabel>
                          <Label>Percentage</Label>
                            <Input placeholderTextColor={CommonStyles.placeHolderColor.color} placeholder="in %" keyboardType="numeric" value={this.state.selectedRowData.percentage} 
                                onChangeText={value => this.setData({'percentage': value})} autoCorrect={false}/>
                      </Item> */}
                        </Content>
                    </View>
                </Modal>
            </Container>
        );
    }
}

const styles = {
    dateText: {
        position: "absolute",
        left: 5,
        top: 38,
        color: '#183247',
        fontSize: 17
    }
}
const mapStateToProps = state => {
    const { userInfo, beneficiaryInfo } = state.root;
    return { userInfo, beneficiaryInfo };
}
export default connect(mapStateToProps, { GetBeneficiary, UpdateBeneficaiaryInfo, DeleteBeneficairyInfo })(Beneficiary);