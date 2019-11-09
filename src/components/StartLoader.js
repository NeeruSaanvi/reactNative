import React, { Component } from "react";
import { View } from "react-native";
import { Container } from 'native-base';
import { connect } from "react-redux";
import { CheckUserLogin } from "../actions";
import { Loader } from "./common/Loader";

class StartLoader extends Component{
    componentDidMount(){
        this.props.CheckUserLogin();
    }
    render(){
        return(
        <Container >
            <Loader showlogo={true} display={true} /> 
        </Container>
        )
    };
}

export default connect(null, { CheckUserLogin })(StartLoader);