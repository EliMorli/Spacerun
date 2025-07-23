import Layout from "./Layout.jsx";

import Home from "./Home";

import OwnAVenue from "./OwnAVenue";

import About from "./About";

import Locations from "./Locations";

import Careers from "./Careers";

import Press from "./Press";

import Games from "./Games";

import Events from "./Events";

import FAQ from "./FAQ";

import Trailer from "./Trailer";

import ImageUploader from "./ImageUploader";

import Contact from "./Contact";

import Tournaments from "./Tournaments";

import Booking from "./Booking";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    OwnAVenue: OwnAVenue,
    
    About: About,
    
    Locations: Locations,
    
    Careers: Careers,
    
    Press: Press,
    
    Games: Games,
    
    Events: Events,
    
    FAQ: FAQ,
    
    Trailer: Trailer,
    
    ImageUploader: ImageUploader,
    
    Contact: Contact,
    
    Tournaments: Tournaments,
    
    Booking: Booking,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/OwnAVenue" element={<OwnAVenue />} />
                
                <Route path="/About" element={<About />} />
                
                <Route path="/Locations" element={<Locations />} />
                
                <Route path="/Careers" element={<Careers />} />
                
                <Route path="/Press" element={<Press />} />
                
                <Route path="/Games" element={<Games />} />
                
                <Route path="/Events" element={<Events />} />
                
                <Route path="/FAQ" element={<FAQ />} />
                
                <Route path="/Trailer" element={<Trailer />} />
                
                <Route path="/ImageUploader" element={<ImageUploader />} />
                
                <Route path="/Contact" element={<Contact />} />
                
                <Route path="/Tournaments" element={<Tournaments />} />
                
                <Route path="/Booking" element={<Booking />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}