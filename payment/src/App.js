import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Pay from './components/Pay';
import Success from './components/Success';

const App = () => {
  return (
    <Router>
      <Routes> {/* Wrap Routes around your Route components */}
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
        {/* You can add more routes here if needed */}
      </Routes>
    </Router>
  );
};

export default App;
