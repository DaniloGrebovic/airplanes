import React, { Component } from 'react';
import lifecycle from 'recompose/lifecycle';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { Loader } from './loader'
import Wrapper from './wrapper'

function isLoading(loading) {
  if (loading) {
    return (
      <Loader/>
    );
  }
}

const Home = ({airData, airplanesLoading, history}) => {
  const {acList} = airData;
  acList && acList.sort((s1, s2) => s2.Alt - s1.Alt);
  return (
    <Wrapper>
      {!acList && isLoading(airplanesLoading)}
      <div className={'container'}>
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
          {acList && acList.map((airplane, index) => {
            return (
              <tr key={index} style={{textAlign: 'center', cursor: 'pointer'}}
                  onClick={() => history.push('/details/' + airplane.Icao)}>
                <td>{airplane.Mdl}</td>
                <td>{airplane.Alt}</td>
                <td>{airplane.Reg}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};


export default compose(
  connect(({home}) => ({
    airData: home.airplanesData,
    airplanesLoading: home.airplanesLoading
  }), {}),
  lifecycle({}),
)(Home);