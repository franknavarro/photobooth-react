import React, { CSSProperties } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import WebcamCapture from 'components/webcam/WebcamPage';
import SelectPage from 'components/selector/SelectPage';

const containerStyles: CSSProperties = {
  backgroundColor: 'pink',
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: '0',
  left: '0',
};

const App: React.FC = () => {
  return (
    <div style={containerStyles}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={WebcamCapture} />
          <Route path="/select" exact component={SelectPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
