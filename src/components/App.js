import React, { Component } from 'react';
import '../styles/App.css';
import Header from './Header';
import Widget from './Widget';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: 'Austin, TX',
      displayName: '',
      weather: '',
      map: '',
      temp: null,
      maxTemp: null,
      minTemp: null,
      humidity: null,
      wind: null,
      windDeg: null,
      unitPreference: 'F'
    }

    this.fetchLocationData = this.fetchLocationData.bind(this);
    this.getPlace = this.getPlace.bind(this);
    this.getMap = this.getMap.bind(this);
    this.updateUnitPreference = this.updateUnitPreference.bind(this);
  }
  
  updateUnitPreference(e) {
    const unitPref = e.target.value;
    this.setState({
      unitPreference: unitPref
    })
  }

  getMap(displayName) {
    const map = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(displayName)}&zoom=11&size=1200x400&maptype=satellite&key=${process.env.REACT_APP_STATIC_MAP_API}`;
    
    this.setState({
      map
    });
  }

  async fetchLocationData(locationName = this.state.location, unitPreference = this.state.unitPreference) {
    // console.log(this.state.unitPreference)
    
    if (locationName) {
      const unit = ((unitPreference === 'F') ? 'imperial' : 'metric');
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${locationName},us&units=${unit}&mode=json&appid=${process.env.REACT_APP_WEATHER_API}`
      const response = await axios.get(url).then(function (response) {
        return response.data;
      });

      this.setState({
        location: locationName,
        weather: response.weather[0].main,
        temp: response.main.temp,
        maxTemp: response.main.temp_max,
        minTemp: response.main.temp_min,
        humidity: response.main.humidity,
        wind: response.wind.speed,
        windDeg: response.wind.deg
      });
    }
  }

  async getPlace(locationName) {
    const locationDetails = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationName)}&key=${process.env.REACT_APP_GOOGLE_API}`)
    .then(function(res) {
      return res.data;
    })

    this.setState({
      displayName: locationDetails.results[0].formatted_address,
    })
  } 

  componentWillMount() {
    this.fetchLocationData();
    this.getPlace(this.state.location);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.unitPreference !== nextState.unitPreference) {
      this.fetchLocationData(nextState.location, nextState.unitPreference);
    }

    if (this.state.displayName !== nextState.displayName) {
      this.getMap(nextState.displayName)
    }
  }

  render() {
    return (
      <div className="App">
        <Header fetchLocationData={this.fetchLocationData} updateUnitPreference={this.updateUnitPreference} getPlace={this.getPlace} unit={this.state.unitPreference} displayName={this.state.displayName} map={this.state.map} />
        <Widget weather={this.state} />
      </div>
    );
  }
}

export default App;
