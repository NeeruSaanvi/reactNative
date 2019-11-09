import React, { Component } from 'react';
import {
  Container,
  Root,
  StyleProvider
} from "native-base";
import { StatusBar } from 'react-native';
import getTheme from '../themes/components'
import avibra from '../themes/variables/avibra'
import { Provider } from "react-redux";
import store from "./Store"
import AvibraRouter from './AvibraRouter';
// import Start from "./Start";

export default class App extends Component{

  render() {
    StatusBar.setBarStyle('dark-content', true);
    return (
      <Provider  store={ store }>
      <Root>
        <StyleProvider style={getTheme(avibra)}>
  
                <AvibraRouter />
         
        </StyleProvider>
      </Root>
      </Provider>
    )
  }
}

