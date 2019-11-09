import React from "react";
import { View, Image, Dimensions } from "react-native";
import { Spinner } from "native-base";
import { Images } from "../../assets/Images";
import { primaryColor } from "../../../themes/variables/Colors";
const { width, height } = Dimensions.get("window");
const Loader = ({size, color, showlogo, display}) => {
    
    if(display){
        return ( 
        
            <View style={styles.loading}>
                {showlogo? <Image style={styles.logo} source={Images.demo}/>: <View/>}
                <Spinner color={ color || primaryColor  } size={size || 'large'} />
            </View>
        )  
    }

    return null; 
  
}

const styles = {
    loading: {
            backgroundColor: '#ffffff90',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex:1000
       
      },
      logo:{      
        margin:20, 
        height: 127, 
        width: 172,
      }
}

export { Loader };