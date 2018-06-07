import React, { Component } from 'react';
import lifecycle from 'recompose/lifecycle';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import geolocation from 'geolocation'
import {Loader} from './loader'
import { getAirplanesData } from '../redux/home'

function isLoading(loading) {
  if (loading) {
    return (
      <Loader />
    );
  }
}

const Home = ({airData, airplanesLoading, history}) => {
  const {acList} = airData;

  console.log(airData, 'airDataairDataairDataairDataairData');
  return (
    <div className="container">
      {isLoading(airplanesLoading)}
      {!airplanesLoading && <div>
        <div className="table-title">
          <h2>List of airplanes</h2>
        </div>
        <table className="table-fill">
          <thead>
          <tr>
            <th>Plane</th>
            <th>Altitude</th>
            <th>Flight code number</th>
          </tr>
          </thead>
          <tbody className='table-hover'>
          {acList.map((airplane, index) => {
            return (
              <tr key={index} style={{textAlign: 'center',cursor: 'pointer'}} onClick={() => history.push('/details/' + airplane.Icao)}>
                <td>{airplane.Mdl}</td>
                <td>{airplane.Alt}</td>
                <td>{airplane.Reg}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>}
    </div>
  );
};


export default compose(
  connect(({home}) => ({
    airData: home.airplanesData,
    airplanesLoading: home.airplanesLoading
  }), {
    getAirplanesData
  }),
  lifecycle({
    componentDidMount() {
      const { getAirplanesData: getData } = this.props;
      console.log(getData, 'getDatagetDatagetData');
      geolocation.getCurrentPosition(function (err, position) {
        if (err) return <Loader />;
        console.log(position, 'positionpositionpositionposition');
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        if (position.coords) {
          getData(latitude, longitude);
        }
      });
    }
  }),
)(Home);