import React, { Component } from 'react';
import lifecycle from 'recompose/lifecycle';
import compose from 'recompose/compose';
import { connect } from 'react-redux';


const Home = ({}) => {
  return (
    <div className="container">
      <div>
        <div>
          <h2>List of airplanes</h2>
        </div>
        <table>
          <thead>
          <tr>
            <th>Plane</th>
            <th>Altitude</th>
            <th>Flight code number</th>
          </tr>
          </thead>
          <tbody>
          <tr key={index} style={{textAlign: 'center', cursor: 'pointer'}}>
            <td>Plane</td>
            <td>Altitude</td>
            <td>Flight code number</td>
          </tr>
          </tbody>
        </table>
      </div>
      }
    </div>
  );
};


export default compose(
  connect(() => ({}), {}),
  lifecycle({}),
)(Home);