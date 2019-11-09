import React from "react";
import { View, Image} from "react-native"
import { Text } from "native-base";
import { Icons } from "../../../assets/Images";
import { Strings } from "../../../Strings";

const BotRobo = (props) => {
    return (
        <View style={styles.robotContainer}>
            <Image source={Icons.botRobo} style={styles.botIcon} />
            <Text>{Strings.botName}</Text>
        </View>
    );
}

const styles = {
    robotContainer: {
        flexDirection: 'row',
        paddingVertical:10,
        alignItems: 'center'
    },
    botIcon:{
        marginRight:8
    }
}

export { BotRobo };