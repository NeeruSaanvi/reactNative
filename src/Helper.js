import {Toast} from "native-base";
export const ShowToast = (msg, type) =>{
    Toast.show({
        text: msg,
        position: 'bottom',
        buttonText: 'Okay',
        type:type,
        duration:5000
    })  
}

export const formatAddress = (address)=>{
        
    var addressString = Object.values(address).filter(function(x){
        //console.log(x.indexOf('undefined'));
        
        return (x !== (undefined || null || ''));
    });

    return addressString.toString();
}

export const formatDate = (date)=>{

    return date.toISOString().split('T')[0];
}

export const formatDollar = (num) => {
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

import { Dimensions,Platform } from 'react-native';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export const OS = Platform.OS;
export const isIphoneX = OS === "ios" && deviceHeight === 812 && deviceWidth === 375;


export const ShadowElevation = (elevation)=>{

    let shadow = {
        shadowColor: "#ff0000",
        shadowOpacity: 0.0015 * elevation + 0.18,
        shadowRadius: 0.54 * elevation,
        shadowOffset: {
          height: 0.6 * elevation,
        },
        elevation
      };
}

export const Capitalize = (str)=>{
    var firstLetter = str.slice(0,1);
    return firstLetter.toUpperCase() + str.substring(1);
}

export const RemoveDupsFromArray = (orginalArray)=>{
    // var uniqueArray = _.map(
    //     _.uniq(
    //         _.map(orginalArray, function(obj){
    //             return JSON.stringify(obj);
    //         })
    //     ), function(obj) {
    //         return JSON.parse(obj);
    //     }
    // );

    var uniqueArray = _.uniqBy(orginalArray, function (e) {
        return e.contactnumber;
      });

    return uniqueArray;
}

