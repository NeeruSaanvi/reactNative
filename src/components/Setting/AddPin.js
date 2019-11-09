import React, { Component } from "react";
import { View, Keyboard, Dimensions, Alert, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import {
    Container,
    Header,
    Text,
    Content,
    Button,
    Body,
    H1,
    H2,
    Title,
    Form,
    Item,
    Input,
    Label,
    Left,
    Right,
    Icon
} from 'native-base';

import { connect } from "react-redux";
import { CommonStyles } from "../common/Styles";
import { Loader } from "../common/Loader";
import { UpdateUserInfo, AddPIN } from "../../actions";
import { Icons } from '@assets/Images';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class AddPin extends Component {
    constructor() {
        super();
        this.state = {
            pinError: false,
            pin: '',
            confirmPin: ''
        }
    }

    componentDidMount() {
        // this.ref.FirstInput.focus();
    }

    checkPin() {
        if (this.state.pin != this.state.confirmPin) {
            alert('Confirm Pin not match!')
        } else {
            Actions.pop();
        }
    }

    save() {
        console.log("save")
        this.props.AddPIN(this.props.pin);
    }
    onRepeatPin(repin) {
        console.log(repin)
        if (this.props.pin !== repin)
            this.setState({ pinError: true })
        else
            this.setState({ pinError: false })
    }
    render() {

        return (
            <Container >
                <Header style={CommonStyles.header}>
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => { Actions.pop() }}>
                            <Image style={{ width: 16, height: 16 }} source={Icons.back} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 4 }}>
                        <Title>
                            Add PIN
                        </Title>
                    </Body>
                    <Right />
                </Header>



                <View style={{ flex: 1, alignItems: 'center' }}>

                    <View style={{ height: 100, marginTop: 40 }}>

                        {this.state.pin.length != 4 &&
                            <Text style={{ fontSize: 14, textAlign: 'center', color: '#000' }}>Enter your PIN code</Text>
                        }
                        {this.state.pin.length == 4 && this.state.confirmPin.length < 4 &&
                            <Text style={{ fontSize: 14, textAlign: 'center', color: '#000' }}>Confirm your PIN code</Text>
                        }
                        {this.state.pin.length == 4 && this.state.confirmPin.length == 4 &&
                            <Text style={{ fontSize: 14, textAlign: 'center', color: '#000' }}>PIN code set!</Text>
                        }

                        {this.state.pin.length != 4 &&
                            <Input style={{ marginTop: 10, fontSize: 18, color: '#00CCD0' }}
                                // ref={(ref) => { this.FirstInput = ref; }}
                                secureTextEntry
                                underlineColorAndroid='transparent'
                                placeholder="-  -  -  -"
                                keyboardType={"numeric"}
                                textAlign={'center'}
                                maxLength={4}
                                autoCorrect={false}
                                value={this.state.pin}
                                onChangeText={value => this.setState({ pin: value })}
                                onSubmitEditing={() => { this.SecondInput.focus(); }}
                                blurOnSubmit={false}
                            />
                        }

                        {this.state.pin.length == 4 &&
                            <Input style={{ marginTop: 10, fontSize: 18, color: '#00CCD0' }}
                                ref={(ref) => { this.SecondInput = ref; }}
                                secureTextEntry
                                underlineColorAndroid='transparent'
                                placeholder="-  -  -  -"
                                keyboardType={"numeric"}
                                textAlign={'center'}
                                maxLength={4}
                                autoCorrect={false}
                                value={this.state.confirmPin}
                                onChangeText={value => this.setState({ confirmPin: value })}
                                onSubmitEditing={() => { this.checkPin(); }}
                            />
                        }
                    </View>
                </View>


                {/* <Content showsVerticalScrollIndicator={false} contentContainerStyle={CommonStyles.scrollViewMiddleAlign}> */}

                {/* <H2 style={{ fontSize:14, textAlign:'center', color:'#000' }}>PIN code set!</H2> */}

                {/* <Item style={CommonStyles.inputMarginTop} > */}
                {/* <Input style={{ marginTop:10 }}
                    secureTextEntry
                    underlineColorAndroid='transparent'
                    placeholder="Enter PIN"
                    keyboardType={"numeric"} 
                    textAlign={'center'} 
                    maxLength={4} 
                    autoCorrect={false} 
                    value={this.props.pin}
                    onChangeText={value => this.props.UpdateUserInfo({prop: 'pin', value})} 
                /> */}
                {/* </Item> */}

                {/* <Item style={CommonStyles.inputMarginTop} error={this.state.pinError}>
                    <Input secureTextEntry keyboardType={"numeric"} textAlign={'center'}   maxLength={4} autoCorrect={false} value={this.props.repin}
                        onChangeText={value => {this.props.UpdateUserInfo({prop: 'repin', value}); this.onRepeatPin(value)}} placeholder="Repeat PIN" />
                </Item>

                <Button disabled={this.state.pinError}  style={CommonStyles.mT30} block rounded primary onPress={() => this.save()}>
                    <Text >Save</Text>
                </Button> */}
                {/* </Content> */}

                {this.props.loading && <Loader display={this.props.loading} />}
            </Container>
        )
    };
}

const styles = {

}

const mapStateToProps = state => {
    const { pin, repin } = state.auth;
    const { loading } = state.loader;

    return { pin, repin, loading };
}


export default connect(mapStateToProps, { UpdateUserInfo, AddPIN })(AddPin);
