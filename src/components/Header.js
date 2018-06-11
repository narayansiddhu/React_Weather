import React, { Component } from 'react';
import LocationForm from './LocationForm';

class Header extends Component {
  render() {

    let mapStyle = {};
    if (this.props.displayName) {
      mapStyle = {
        backgroundImage: `url(${this.props.map})`
      }
    }

    return (
      <div className="location-header" style={mapStyle}>
        <div className="header-content">
          <h1>{this.props.displayName}</h1>
          <LocationForm fetchLocationData={this.props.fetchLocationData} updateUnitPreference={this.props.updateUnitPreference} getPlace={this.props.getPlace} unit={this.props.unit} displayName={this.props.displayName} />
        </div>
      </div>
    )
  }
}

export default Header;
