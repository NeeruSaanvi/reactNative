import React, { Component } from 'react';
import { View, Image,ImageBackground  } from 'react-native';
import { Card, CardItem ,Right,Left,Body,Text,Button,Icon } from 'native-base';
import { CommonStyles } from '../Styles';
import LikeButton  from '../Actions/LikeButton';
import CommentButton from '../Actions/CommentButton';
import ShareButton from '../Actions/ShareButton';
import BookmarkButton from '../Actions/BookmarkButton';
import { fontMedium, fontRegular } from '../../../../themes/variables/Fonts';
import { Icons } from '@assets/Images';
import { Actions } from 'react-native-router-flux';
import { Capitalize } from '../../../Helper';
import { Strings } from '../../../Strings';
import { semiLightColor5, darkShade } from '../../../../themes/variables/Colors';

class AdvertisementCard extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const {categoryname,categorydesc,subcategoryname,imagepath,tags,cardtype,incentivename} = this.props.feed.inboxitem;
        return (
            <Card style={CommonStyles.feedCard}>
                <CardItem cardBody >
                    <Image source={{uri: 'https://res.cloudinary.com/wolfandbadger/image/upload/s--NTdhHX0b--/q_auto:eco,w_770,h_400,c_fill,g_center/other/284e8e21f9f7a8860c9e'}} 
                    style={styles.imageBg}/>
                </CardItem>

                <CardItem style={[CommonStyles.actionItem,styles.action]}>
                    <View style={CommonStyles.actionItemContainer}>
                        <Text style={styles.tags}>{Strings.advertisement.toUpperCase()}</Text>
                    </View>
                    <View  style={CommonStyles.actionItemContainer}>
                        <Button transparent 
                            onPress={() => {  }}  
                            style={styles.button}
                        >                       
                            <Text style={styles.buttonText}>{Strings.learnMore}</Text>
                            <Image style={CommonStyles.buttonImage} source={Icons.chevronWhite} />
                        </Button>                             
                    </View>
                </CardItem>
            </Card>
        );
    }
}
const styles = {
    feedHeading:{
        fontSize: 18,
        lineHeight:22,
        fontFamily: fontRegular,
        color: "#fff"
    },
    tags:{
        fontSize:10,
        color: semiLightColor5,
    },
    button:{
       alignSelf: 'flex-end',
    },
    buttonText:{
        fontSize:14,
        fontFamily: fontMedium,
        lineHeight:22,
        paddingRight:6,
        color:"#FFF"
    },
    imageBg:{
        height: 200,
        width: null,
        flex: 1 ,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    action:{
        backgroundColor: darkShade,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    }
}
export default AdvertisementCard;
