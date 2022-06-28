import React from 'react';
import './App.css';
import { Welcome } from './screens/WelcomeScreen/Welcome.screen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Validation } from './screens/ValidationScreen/Validation.screen';
import { PrivateRoute } from './routes/PrivateRoute'; //eslint-disable-line
import { Dashboard } from './screens/DashboardScreen/Dashoard.screen';
import { Workspace } from './screens/WorkspaceScreen/Workspace';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/validation" element={<Validation />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/workspace" element={<PrivateRoute />}>
          <Route path="/workspace" element={<Workspace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
