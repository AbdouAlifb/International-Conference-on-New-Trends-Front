import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Keynotes from './components/Keynotes';
import Posters from './components/Posters';
import Registration from './components/Registration';
import VenueContact from './components/VenueContact';
import NewsSection from './components/NewsSection';
import Program from './components/Program';

import Gallery from './components/Gallery';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddPoster from './components/poster/AddPoster';
import UpdatePoster from './components/poster/UpdatePoster';
import ListePoster from './components/poster/ListePoster';
import ImageList from './components/image/ImageList ';
import AdminDashboard from './components/AdminDashboard';
//
import KeynoteForm from './components/keynote/keynoteform';
import KeynoteUpdateForm from './components/keynote/KeynoteUpdateForm';
import KeynoteList from './components/keynote/KeynoteList';
//
// confrence info crud system
import AddConferenceInfo from './components/ConfrenceInfo/AddConferenceInfo';
import UpdateConferenceInfo from './components/ConfrenceInfo/UpdateConferenceInfo';
import ViewConferenceInfo from './components/ConfrenceInfo/ViewConferenceInfo';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/program" element={<Program/>} />
          <Route path="/keynotes" element={<Keynotes />} />
          <Route path="/posters" element={<Posters />} />
          <Route path="/addposters" element={<AddPoster />} />
          <Route path="/listeposters" element={<ListePoster />} />
          <Route path="/listegallery" element={<ImageList />} />
          <Route path="/updateposters/:id" element={<UpdatePoster />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/venue-contact" element={<VenueContact />} />
          <Route path="/news" element={<NewsSection />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<AdminDashboard />} />
{/* confrence info crud system route */}
          <Route path="/addconferenceinfo" element={<AddConferenceInfo />} />
    <Route path="/updateconferenceinfo/:id" element={<UpdateConferenceInfo />} />
    <Route path="/viewconferenceinfo" element={<ViewConferenceInfo />} />
    
          <Route path="/addKeynote" element={<KeynoteForm />} />
          <Route path="/updateKeynote/:id" element={<KeynoteUpdateForm />} />
          <Route path="/keynoteList" element={<KeynoteList />} />
          
          {/* Define other routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
