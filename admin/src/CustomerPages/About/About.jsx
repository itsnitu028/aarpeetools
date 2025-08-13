import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
// import AboutUsComponents from '../../CustomerComponents/aboutUsComponents/aboutUsComponents';

import CopyrightPage from "../../CustomerComponents/CopyrightPage/CopyrightPage.jsx"
import { toast } from 'react-hot-toast';
import './About.css';

// Leaflet map imports (installed via: npm i leaflet react-leaflet)
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import {Icon} from 'leaflet'
// Ensure default marker icons work with Vite bundling
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const About = () => {
  // Local state for contact form
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  
  return (
    <div className="about-page-container">
      {/* Navbar (same as homepage) */}
      <Navbar />

      {/* Page Hero/Header with subtle banner and gradient like homepage */}
      <header className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">About AAR PEE TOOLS</h1>
          <p className="about-subtitle">
            Precision. Performance. Trust — delivering premium cutting tools since 1995.
          </p>
        </div>
      </header>

      <main className="about-content-wrapper">
        {/* About summary */}
        <section className="about-section">
          <div className="offer-wrapper">
            <h2 className="offer-title">What We Offer</h2>
            <p className="offer-intro">
              As a premier carbide tools manufacturing company and HSS tools manufacturer, we offer a comprehensive range of
              products designed to meet the demands of various industries:
            </p>
            <div className="offer-grid">
              {/* Left column */}
              <div className="offer-item">
                <img src={"/src/assets/house.png"} alt="HSS" className="offer-icon" />
                <div>
                  <h4>HSS Cutting Tools:</h4>
                  <p>
                    Our range of high-speed steel (HSS) tools includes square tool bits, rectangular (flat) tool bits, parting
                    tool bits, round tool bits, round head punch, revolving (live center) & dead center, drill chuck (with key),
                    Traub collect, HSS metal slitting saw, HSS side & face cutter, HSS center drill & end mill, machine reamers,
                    hand reamer, and round die. Each tool is engineered for superior performance and longevity.
                  </p>
                </div>
              </div>

              {/* Right column */}
              <div className="offer-item">
                <img src={"/src/assets/cutting tools.png"} alt="Carbide" className="offer-icon" />
                <div>
                  <h4>Carbide Cutting Tools:</h4>
                  <p>
                    As one of the leading carbide cutting tools manufacturers, we offer solid carbide end mills and carbide drills.
                    Our carbide tools are known for their exceptional cutting efficiency, wear resistance, and durability.
                  </p>
                </div>
              </div>
            </div>

            {/* Provided image below the section */}
            <div style={{ marginTop: 24 }}>
              <img src={"/src/assets/untitled.png"} alt="What We Offer" style={{ width: '100%', borderRadius: 12, border: '2px solid #e5e7eb' }} />
            </div>
          </div>
        </section>

        {/* More about us (flip cards + CTA reused from homepage styling) */}
  

        {/* Quick contact CTA */}
        <section className="contact-cta">
          <div className="contact-cta-card">
            <div>
              <h3>Have a requirement? Let’s build the right tooling for you.</h3>
              <p>Get in touch with our experts for quotes, catalogs, or custom solutions.</p>
            </div>
            <div className="contact-cta-actions">
              <button className="cta-btn primary">Contact Sales</button>
              <button className="cta-btn secondary">View Catalog</button>
            </div>
          </div>
        </section>

        

        {/* Map section - below contact form */}
        <section className="map-section">
          <div className="map-wrapper">
            <div className="map-card">
              <h2 className="map-title">Find us on the map</h2>
              <div className="leaflet-map">
                {/* Centered approx to Delhi/NCR, adjust as needed */}
                <MapContainer center={[28.6519, 77.2315]} zoom={11} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[28.6519, 77.2315]} icon={new Icon({iconUrl: markerIcon, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                    <Popup>
                      AAR PEE TOOLS<br /> 3405/105, Chawri Bazar, Delhi 110006
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Qualities strip (dark band like homepage) */}
        <CopyrightPage />
      </main>
    </div>
  );
};

export default About;