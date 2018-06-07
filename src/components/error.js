import React, { Component } from 'react';
import '../style.css'
import lifecycle from 'recompose/lifecycle';
import compose from 'recompose/compose';


const Error = (props) => {

  const pathName = props.location.pathname;
  const errorTitle = () => {
    if (pathName === '/error/500') {
      return '500';
    }
    if (pathName === '/error/location') {
      return '404';
    }
    else {
      return '404';
    }
  };

  const errorText = () => {
    if (pathName === '/error/500') {
      return 'Internal Server Error';
    }
    if (pathName === '/error/location') {
      return 'Sorry, you need to alow location';
    }
    else {
      return 'Page Not Found';
    }
  };

  return (
    <div id="wrapper">
      <div id="top">Oops!</div>
      <div id="middle">{errorTitle()}</div>
      <div id="bottom">{errorText()}</div>
    </div>
  );
}

export default compose(
  lifecycle({}),
)(Error);
