require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let favImage = require('../images/favicon.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <h1>To Do List</h1>
        {/*<img src={favImage} alt="Icon" />*/}
        {/*<div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>*/}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
