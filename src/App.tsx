import React from 'react';
import './App.css';
import { Welcome } from './screens/WelcomeScreen/Welcome.screen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Validation } from './screens/ValidationScreen/Validation.screen';
import { PrivateRoute } from './routes/PrivateRoute';
import { Dashboard } from './screens/DashboardScreen/Dashoard.screen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/validation" element={<Validation />} />
        {/* <Route path="/dashboard" element={<PrivateRoute />}> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
