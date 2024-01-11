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
import ProgramList from './components/program/ProgramList';
import ListePoster from './components/poster/ListePoster';
import ImageList from './components/image/ImageList ';
import CreateProgram from './components/program/CreateProgram';
import UpdateProgram from './components/program/UpdateProgram';
import AdminDashboard from './components/AdminDashboard';

import Committees from './components/Committeess'; // Correct casing

import CallForPapers from './components/CallForPapers';

// confrence info crud system
import AddConferenceInfo from './components/ConfrenceInfo/AddConferenceInfo';
import UpdateConferenceInfo from './components/ConfrenceInfo/UpdateConferenceInfo';
import ViewConferenceInfo from './components/ConfrenceInfo/ViewConferenceInfo';
import KeynoteForm from './components/keynote/keynoteform';
import KeynoteUpdateForm from './components/keynote/KeynoteUpdateForm';
import KeynoteList from './components/keynote/KeynoteList';
import LoginAdmin from './components/admin/LoginAdmin';

import RegistrationForm from './components/Registration/RegistrationForm';


import CreateContent from './components/CreateContent'; // Import the new component
import ViewContent from './components/ViewContent'; // Import the new component
import UpdateContent from './components/UpdateContent'; 

import ContactForm from './components/Contact/ContactForm';
import UpdateContactForm from './components/Contact/UpdateContactForm';
import ContactList from './components/Contact/ContactList';
import Errore from './components/Error_page';


function App() {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/program" element={<Program />} />
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
          <Route path="/addconferenceinfo" element={<AddConferenceInfo />} />
          <Route path="/updateconferenceinfo/:id" element={<UpdateConferenceInfo />} />
          <Route path="/viewconferenceinfo" element={<ViewConferenceInfo />} />


          <Route path="/committees" element={<Committees />} />
          <Route path="/papers" element={<CallForPapers />} />

          <Route path="/addKeynote" element={<KeynoteForm />} />
          <Route path="/registrationform" element={<RegistrationForm />} />
          <Route path="/updateKeynote/:id" element={<KeynoteUpdateForm />} />
          <Route path="/keynoteList" element={<KeynoteList />} />
        
     

          <Route path="/add-content" element={<CreateContent />} />
          <Route path="/view-content" element={<ViewContent />} />
          <Route path="/update-content/:id" element={<UpdateContent />} />

              <Route path="*" element={<Errore/>} />

         <Route path="/Program/CreateProgram" element={<CreateProgram />} />
          <Route path="/UpdateProgram/:id" element={<UpdateProgram />} />
          <Route path="/Program/ProgramList" element={<ProgramList />} />

          {/* Define other routes as needed */}


          <Route path="/login"  element={<LoginAdmin />} />

          
          <Route path="/Contact/CreateContact" element={<ContactForm />} />
          <Route path="/UpdateContact/:id" element={<UpdateContactForm />} />
          <Route path="/Contact/ContactList" element={<ContactList />} />
         

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
