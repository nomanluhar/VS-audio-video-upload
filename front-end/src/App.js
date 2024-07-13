import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import ListingPage from './pages/ListingPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/listing" element={<ListingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
