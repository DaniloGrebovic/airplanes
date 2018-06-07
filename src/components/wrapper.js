import React, { Component } from 'react';
import { connect } from 'react-redux';
import geolocation from 'geolocation'
import { getAirplanesData } from '../redux/home'
import { withRouter } from 'react-router-dom'


class Wrapper extends Component {

  componentDidMount() {
    const {getAirplanesData: getData, history} = this.props;
    geolocation.getCurrentPosition(function (err, position) {
      if (err) return history.push('error/location');
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      if (position.coords) {
        getData(latitude, longitude);
      }
    });


    this.timerID = setInterval(() => geolocation.getCurrentPosition(function (err, position) {
      if (err) return history.push('error/location');
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      if (position.coords) {
        getData(latitude, longitude);
      }
    }), (60 * 1000));
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}


const mapStateToProps = ({home}) => ({
  airData: home.airplanesData,
  airplanesLoading: home.airplanesLoading
});

export default connect(mapStateToProps, {getAirplanesData})(withRouter(Wrapper))