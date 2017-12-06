import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './SimpleForm.css';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props)
    if (typeof props.where !== "undefined") {
      this.state = { address: props.where }
    } else {
      this.state = {
        address: 'Boulder, CO, USA'
      }
    }
    this.onChange = (address) => this.setState({ address })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

//   render() {
//     return (
//       <div>
//         <SimpleInput
//           addressInput={{
//             onChange: this.onAddressChange,
//             value: this.state.address,
//           }}
//           geoDestinationInput={{
//             onChange: this.onGeoDestinationChange,
//             value: this.state.geoDestination,
//           }}
//         />
//       </div>
//     );
//   }
// }

  render() {
    console.log("******* "+JSON.stringify(this.props))
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      id: "where_input"
    }
    // let options = {
    //   currentLocation = {}
    // }
    return (
      <div>

        <PlacesAutocomplete inputProps={inputProps} />

        </div>
    )
  }
}

export default SimpleForm
