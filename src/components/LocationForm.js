import React, { Component } from 'react';

class LocationForm extends Component {

  getWeather(event) {
    event.preventDefault();
    const locationValue = this.location.value;
    const unitPreference = this.props.unit || this.unit.value;
    
    this.props.fetchLocationData(locationValue, unitPreference);
    this.props.getPlace(locationValue);
  }

  render() {
    return (
      <div>
        <form className="location-form" onSubmit={(e) => this.getWeather(e)}>
          <input ref={(input) => this.location = input} type="text" placeholder="Enter location name" required />
          <div className="input-toggle">
            <input id="F" ref={(input) => this.unit = input} onChange={this.props.updateUnitPreference} name="unit" type="radio" value="F" defaultChecked />
            <label htmlFor="F" className="label-left">F</label>
            <input id="C" ref={(input) => this.unit = input} onChange={this.props.updateUnitPreference} name="unit" type="radio" value="C" />
            <label htmlFor="C" className="label-right">C</label>
            <div className="toggle-display"></div>
          </div>
        </form>
      </div>
    )
  }
}

export default LocationForm;
