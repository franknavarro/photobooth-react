import React, { CSSProperties } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import WebcamCapture from 'components/webcam/WebcamPage';
import SelectPage from 'components/selector/SelectPage';
import PrintPage from 'components/print/PrintPage';

// Must use relative import here because history is already a package
import history from 'routerHistory';

const containerStyles: CSSProperties = {
  backgroundColor: 'pink',
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: '0',
  left: '0',
  cursor: 'none',
};

const App: React.FC = () => {
  return (
    <div style={containerStyles}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={WebcamCapture} />
          <Route path="/select" exact component={SelectPage} />
          <Route path="/print" exact component={PrintPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
