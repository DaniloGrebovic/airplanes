import React, { Component } from 'react';
import lifecycle from 'recompose/lifecycle';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

const Details = ({}) => {


  return (
    <div>
      <div>
        <div>
          <h2>Airplane details</h2>
        </div>
        <table>
          <thead>
          <tr>
            <th>Airplane Manufacturer and model</th>
            <th>Destination and Flight Origin airport</th>
            <th>Logo of the Airline company</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>Airplane</th>
            <th>Destination</th>
            <th><img src="//logo.clearbit.com/spotify.com"/></th>
          </tr>
          </tbody>
        </table>
      </div>
      }
    </div>
  );
}

export default compose(
  connect(({home}) => ({}), {}),
  lifecycle({}),
)(Details);

