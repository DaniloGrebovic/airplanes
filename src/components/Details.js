import React, { Component } from 'react';
import lifecycle from 'recompose/lifecycle';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import {Loader} from './loader'
import Wrapper from './wrapper'


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
  const to = plane && plane[0].To ? plane[0].To : '/';

  return (
    <Wrapper>
      {!acList && isLoading(airplanesLoading)}
      <div className={'container'}>
        <div className="table-title">
          <h2>Airplane details</h2>
        </div>
        {plane && <table className="table-fill">
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
            <th>{from} <br/> / <br/> {to} </th>
            <th><img src={`//logo.clearbit.com/` + plane[0].Man + '.com'}/></th>
          </tr>
          </tbody>
        </table> }
      </div>
    </Wrapper>
  );
}

export default compose(
  connect(({home}) => ({
    airData: home.airplanesData,
    airplanesLoading: home.airplanesLoading
  }), {

  }),
  lifecycle({}),
)(Details);

