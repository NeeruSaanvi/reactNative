import { StyleSheet } from 'react-native';
import { lightColor } from '../../../themes/variables/Colors';
export const CommonStyles = StyleSheet.create({
    header: {
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 1,
        shadowColor: "rgba(0,0,0,0.1)",
        shadowRadius: 2,
        elevation: 3,
        borderBottomWidth: 0
    },
    plainHeader: {
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        elevation: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    selfAlignStart: {
        alignSelf: "flex-start"
    },
    scrollViewEnd: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    contentPadding: {
        padding: 16
    },
    contentLargePadding: {
        padding: 32
    },
    lightRightBorder: {
        width: 1,
        height: 26,
        marginLeft: 15,
        backgroundColor: lightColor
    },
    absoluteContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "transparent",
        zIndex: 10
    },
    bold: {
        fontWeight: 'bold',
    },
    verticalMargin: {
        marginVertical: 8,
    },
    textCenter: {
        textAlign: 'center'
    },
    infoText: {
        lineHeight: 22,
        marginVertical: 20
    },
    cardContentContainer:{
       flex:1,
       borderRadius: 4,
       overflow:'hidden'
    },
    feedCard: {
        marginLeft: 0,
        marginRight: 0,
        borderBottomWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
    },
    feedCardItemHead: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 20,
        paddingBottom: 20,
    },
    actionItem: {
        justifyContent: "space-between",
        paddingLeft: 24,
        paddingRight: 24,
        flexDirection: 'row',
        paddingTop:0,
        paddingBottom:0
    },
    actionItemContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
    },
    buttonImage:{
        width:16,
        height:16,
        marginTop:2
    },
    ContentPaddingHome:{
        paddingRight:5,
        paddingLeft:5,
        backgroundColor:'rgba(249,249,249,1.0)'
    },
    lightText:{color:"#9B9B9B"},
    opacText:{color:"#18324760"},
    padL0:{
        paddingLeft:0
    },
    whiteButton:{
        backgroundColor:"#fff",
    },
    whiteButtonText:{
        color:"#5A7DFF"
    },
    footer:{
        paddingHorizontal:20,
        paddingVertical:10,        
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
    mT30:{
        marginTop:30
    },
    mL20:{
        marginLeft:20
    },
    contentAtEnd:{
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
        paddingVertical:10
    },
    textCenter:{
        textAlign:"center"
    },
    bb0:{
        borderBottomWidth: 0
    },
    b0:{
        borderWidth: 0,
        borderColor:"transparent",
    },
    br8:{
        borderRadius:8
    },
    spreadShadow:{        
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    placeHolderColor:{
        color:"#18324750"
    },
    contentBg:{backgroundColor:"#E8ECF3"},
    boldText:{
        fontWeight:"bold",
        color:"#fff"
    },
    smallFont:{
        fontSize:12,
        lineHeight:14
    },
    row:{
        flexDirection:"row"
    },
    smallBadge:{
        width:18,
        height:18,
        alignItems:"center",
        justifyContent:"center",
        right:5,
        top:5
    },
    badgeText:{
        fontSize:10,
        lineHeight:10,
        paddingLeft:0,
        paddingRight:0
    },
    footerIcon:{
        fontSize:33,
        color:"#183247"
    },
    whiteText:{
        color:"#fff"
    }

});