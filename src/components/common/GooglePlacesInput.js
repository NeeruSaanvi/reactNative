import React,{Component} from 'react';
import { View, Image, Text, PixelRatio } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { lightColor, semiLightColor3, semiLightColor1, backgroundColor } from '../../../themes/variables/Colors';
import { fontRegular } from '../../../themes/variables/Fonts';
 
// const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
const addressComponents = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  sublocality_level_1:'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

const formattedAddress = {
  "addline1": "",
  "addline2" : "",
  "addline3": "",
  "city": "",
  "state" : "",
  "zipcode" : ""
}
export default class GooglePlacesInput extends Component{
//export default class extends GooglePlacesInput = () => {

  // constructor (props) {
  //   super(props);
  //   console.log(this.props)
  // }

  formatAddress(details){

    var addr = {};
    for (var i = 0; i < details.address_components.length; i++) {
      var addressType = details.address_components[i].types[0];
      if (addressComponents[addressType]) {
        var val = details.address_components[i][addressComponents[addressType]];
        addr[addressType] = val;
      }
    }

    formattedAddress.addline1 = `${addr.street_number || ""} ${addr.route || ""}`.trim();
    formattedAddress.city = addr.locality || addr.sublocality_level_1; 
    formattedAddress.state = addr.administrative_area_level_1;
    formattedAddress.zipcode = addr.postal_code; 
     console.log(formattedAddress);
    this.props.getAddress(formattedAddress);
  }

  render(){
   
    return (
      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        enableHighAccuracyLocation = {true}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        //renderDescription={(row) => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          // console.log(data);
          // console.log(details);
          this.formatAddress (details);
        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyBkfq5es4ny79Kc8lr9QhxJPTpS6QbRVgQ',
          language: 'en', // language of the results
          //types: 'street_address' // default: 'geocode'
         // types: ["street_address", "geocode"]
        }}
        placeholderTextColor={semiLightColor3}
        styles={{
          description: {
            fontFamily: fontRegular,
            color:"#000"
          },
          predefinedPlacesDescription: {
            color:"#000",
            fontFamily: fontRegular,
          },
          textInputContainer:{
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0,                                  
            borderBottomColor:"transparent",
            backgroundColor:backgroundColor,
            padding:0,
            margin:0,
            height:"auto",
            width:"100%"
          },
          textInput:{
            height: 50,
            color:"#000",
            paddingLeft: 0,
            paddingRight:0,
            flex: 1,
            fontSize:17,
            lineHeight: 22,
            backgroundColor:"transparent",
            fontFamily: fontRegular,
          },
          poweredContainer:{
            opacity:0
          }
          
        }}
   
        currentLocation={true} 
        currentLocationLabel="Use Current location"
        nearbyPlacesAPI='GoogleReverseGeocoding' //GooglePlacesSearch GoogleReverseGeocoding
        GoogleReverseGeocodingQuery={{}}
        GooglePlacesSearchQuery={{rankby: 'distance',types: 'food'}}
        //rankby: 'distance',types: 'food'
        //filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        //predefinedPlaces={[homePlace, workPlace]}
        debounce={200}
        // renderLeftButton={() => <Text>C</Text>}
        // renderRightButton={() => <Text>Custom text after the</Text>}
      />
    );
  }

}