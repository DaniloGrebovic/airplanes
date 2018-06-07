import React, { Component } from 'react';
import lifecycle from 'recompose/lifecycle';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import  geolocation  from 'geolocation'
import {Loader} from './loader'
import { getAirplanesData } from '../redux/home'


function isLoading(loading) {
  if (loading) {
    return (
      <Loader/>
    );
  }
}

const Details = ({airData, airplanesLoading, match}) => {

  const {acList} = airData;
  const {params} = match;
  const plane = acList && acList.filter(plane => plane.Icao === params.id);
  const from = plane && plane[0].From ? plane[0].From : '/';
  
  return (
    <div className="container">
      {isLoading(airplanesLoading)}
      {!airplanesLoading && <div>
        <div className="table-title">
          <h2>Airplane details</h2>
        </div>
        <table className="table-fill">
          <thead>
          <tr>
            <th>Airplane Manufacturer and model</th>
            <th>Destination and Flight Origin airport</th>
            <th>Logo of the Airline company</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>{plane[0].Mdl}</th>
            <th>{from}</th>
            <th><img src="//logo.clearbit.com/spotify.com"/></th>
          </tr>
          </tbody>
        </table>
      </div>}
    </div>
  );
}

export default compose(
  connect(({home}) => ({
    airData: home.airplanesData,
    airplanesLoading: home.airplanesLoading
  }), {
    getAirplanesData
  }),
  lifecycle({
    componentDidMount() {
      const {getAirplanesData: getData} = this.props;
      geolocation.getCurrentPosition(function (err, position) {
        if (err) console.log(err.message);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        if (position.coords) {
          getData(latitude, longitude);
        }
      });
    }
  }),
)(Details);

