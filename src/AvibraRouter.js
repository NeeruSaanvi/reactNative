import React,{Component} from "react";
import { Platform } from 'react-native';

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Modal,
    Drawer,
    Stack,
    Lightbox,
    Tabs
  } from 'react-native-router-flux';

import Start from "./components/Start";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/SignIn/Login";
import StartLoader from "./components/StartLoader";
import Feed from "./components/Main/Feed";
import ChangePassword from "./components/SignIn/ChangePassword";
import VerifyAccount from "./components/SignIn/VerifyAccount";
import TabIcon from "./components/common/TabIcon";
import Profile from "./components/Main/Profile";
import FeedMultiMediaDescription from "./components/common/Feed/FeedMultiMediaDescription";
import Commnets from "./components/Main/Comments";
import RewardDetails from "./components/common/Feed/RewardDetails";
import Lifematics from "./components/Main/Lifematics";
import Invite from "./components/Main/Invite";
import DataConnect from "./components/common/Feed/DataConnect";
import YodleeUserInfo from "./components/Yodlee/YodleeUserInfo";
import ConnectDataSource from "./components/common/ConnectDataSource";
import AddPin from './components/Setting/AddPin';
import ChangePasswords from './components/Setting/ChangePasswords';
import About from './components/Setting/About';
import Settings from "./components/Setting/Settings";
import Notifications from "./components/Setting/Notifications";
import AccountInfo from "./components/Profile/AccountInfo";
import Beneficiary from "./components/Profile/Beneficiary";
import DataSource from "./components/Profile/DataSource";


const prefix = Platform.OS === 'android' ? 'avibra://avibra/' : 'avibra://';

const onBackPress = () => {
    console.log(Actions.state);
    if (Actions.state.index !== 0) {
    return false
    }
    Actions.pop()
    return true
}

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
       console.log(state)
      return defaultReducer(state, action);
    };
};


class AvibraRouter extends Component{
    render (){
        return (
            <Router
            createReducer={reducerCreate}
            uriPrefix={prefix}
            backAndroidHandler={onBackPress}
            sceneStyle={{ backgroundColor: '#fff' }}>
            <Overlay key="overlay">
                <Modal key="modal"
                    hideNavBar
                    transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid })}
                >

                    <Scene
                            key="startload"                           
                            component={StartLoader}
                            onExit={() => console.log('onExit')}
                            hideNavBar={true}
                            initial
                    />
                    <Stack key="auth" path="auth/:data" >
                        <Scene key="start" component={Start} hideNavBar={true} initial/>
                        <Scene
                            key="signup"
                            component={SignUp}
                            onExit={() => console.log('onExit')}
                            hideNavBar={true}
                        />
                        <Scene
                            key="login"
                            component={Login}
                            onExit={() => console.log('onExit')}
                            hideNavBar={true}
                        />
                        <Scene
                            key="changePassword"
                            component={ChangePassword}
                            onExit={() => console.log('onExit')}
                            hideNavBar={true}
                        />
                        <Scene
                            key="verifyAccount"
                            component={VerifyAccount}
                            onExit={() => console.log('onExit')}
                            hideNavBar={true}
                        />
    
                    </Stack>

                    <Stack key="main" path="main/:data" >
                            <Tabs
                                key="tabbar"
                                swipeEnabled={false}
                                tabBarPosition = "bottom"
                                showLabel={false}
                                tabBarStyle={styles.tabBarStyle}
                                tabStyle = {styles.tabStyle}
                                labelStyle = {styles.labelStyle}
                                activeBackgroundColor="#ffffff"
                                inactiveBackgroundColor="#ffffff"
                                activeTintColor = "#000000"
                                inactiveTintColor = "#00000050"
                                >
       
                               
                                <Stack backToInitial key="profile" title="Profile"  icon={TabIcon} 
                                        iconName="profile">
                                    <Scene key="profile_1" component={Profile} hideNavBar={true} />
                                  
                                </Stack>
                                <Stack initial  key="feed" title="Feed"  icon={TabIcon} 
                                        iconName="feed">
                                        <Scene key="feed_1" component={Feed} hideNavBar={true} /> 
                                </Stack>
                                <Stack  key="lifematics" title="Lifematics"  icon={TabIcon} 
                                        iconName="lifematics">
                                        <Scene key="lifematics_1" component={Lifematics} hideNavBar={true} /> 
                                </Stack>
                            </Tabs>
                            <Scene
                                key="feedMultimediaDescription"
                                component={FeedMultiMediaDescription}
                                hideNavBar={true}
                                path={":data/"}
                            />
                            <Scene
                                key="rewardDetails"
                                component={RewardDetails}
                                hideNavBar={true}
                                path={":data/"}
                            />
                            <Scene
                                key="comments"
                                component={Commnets}
                                hideNavBar={true}
                                path={":data/"}
                            />
                            <Scene
                                key="invite"
                                component={Invite}
                                hideNavBar={true}
                                path={":data/"}
                            />
                            <Scene
                                key="dataConnect"
                                component={DataConnect}
                                hideNavBar={true}
                                path={":data/"}
                            />
                            <Scene
                                key="yodlee"
                                component={YodleeUserInfo}
                                hideNavBar={true}
                                path={":data/"}
                            />
                            <Scene
                                key="connectDataSource"
                                component={ConnectDataSource}
                                hideNavBar={true}
                                path={":data/"}
                            />

                            <Scene
                                key="Settings"
                                component={Settings}
                                hideNavBar={true}
                                path={":data/"}
                            />
                            <Scene
                                key="AddPin"
                                component={AddPin}
                                hideNavBar={true}
                                path={":data/"}
                            />
                            <Scene
                                key="About"
                                component={About}
                                hideNavBar={true}
                                path={":data/"}
                            />
                            <Scene
                                key="ChangePasswords"
                                component={ChangePasswords}
                                hideNavBar={true}
                                path={":data/"}
                            />
                            <Scene
                                key="Notifications"
                                component={Notifications}
                                hideNavBar={true}
                                path={":data/"}
                            />
                            <Scene
                                key="AccountInfo"
                                component={AccountInfo}
                                hideNavBar={true}
                                path={":data/"}
                            />
                            <Scene
                                key="Beneficiary"
                                component={Beneficiary}
                                hideNavBar={true}
                                path={":data/"}
                            />
                            <Scene
                                key="DataSource"
                                component={DataSource}
                                hideNavBar={true}
                                path={":data/"}
                            />
                           
                    </Stack>

                </Modal>
            </Overlay>
            </Router>
        );
    }
   
}

const styles = {
    tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 0,
        height:50,
        shadowColor: 'rgba(0,0,0,0.08)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 4,
    }
}

export default AvibraRouter;