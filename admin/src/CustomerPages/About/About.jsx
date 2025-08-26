import React from 'react';
import Navbar from '../Navbar/Navbar';
import CopyrightPage from "../../CustomerComponents/CopyrightPage/CopyrightPage.jsx"
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
  return (
    <div className="about-page-container">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="about-hero">
        <div className="hero-overlay"></div>
        <div className="about-hero-content">
          <h1 className="about-title">About Us – AAR PEE TOOLS</h1>
          <p className="about-subtitle">
            Delivering Premium Cutting Tools Since 1995
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">28+</span>
              <span className="stat-label">Years of Excellence</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Product Categories</span>
            </div>
          </div>
        </div>
      </header>

      <main className="about-content-wrapper">
        {/* Mission Section */}
        <section className="mission-section">
          <div className="container">
            <div className="mission-content">
              <div className="mission-text">
                <h2 className="section-title">Our Mission</h2>
                <p className="mission-description">
                  At AAR PEE TOOLS, we believe that quality tools are the foundation of precision, reliability, and innovation. Established with a vision to provide durable and high-performance solutions, we specialize in delivering a wide range of tools designed to meet the needs of industries, businesses, and individual professionals.
                </p>
                <p className="mission-description">
                  Our commitment goes beyond just supplying tools – we aim to build long-lasting relationships with our customers by offering products that combine strength, efficiency, and affordability. With a focus on modern technology and evolving market trends, AAR PEE TOOLS ensures that every product meets the highest standards of durability, safety, and usability.
                </p>
              </div>
              <div className="mission-visual">
                <div className="mission-card">
                  <div className="card-icon">🎯</div>
                  <h3>Precision</h3>
                  <p>Every tool crafted with exacting standards</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-section">
          <div className="container">
            <h2 className="section-title text-center">Why Choose AAR PEE TOOLS?</h2>
            <div className="features-grid">
              <div className="feature-card">
                {/* <div className="feature-icon">🛠️</div> */}
                <h3>Wide Product Range</h3>
                <p>From hand tools to specialized equipment, we have everything you need for your projects.</p>
              </div>
              <div className="feature-card">
                {/* <div className="feature-icon">✅</div> */}
                <h3>Quality Assurance</h3>
                <p>Every product is thoroughly tested for performance and durability before reaching you.</p>
              </div>
              <div className="feature-card">
                {/* <div className="feature-icon">👥</div> */}
                <h3>Customer-Centric Approach</h3>
                <p>We prioritize customer satisfaction above everything else, always putting your needs first.</p>
              </div>
              <div className="feature-card">
                {/* <div className="feature-icon">🚀</div> */}
                <h3>Innovation Driven</h3>
                <p>Continuously upgrading with the latest technology and designs to stay ahead of the curve.</p>
              </div>
            </div>
          </div>
        </section>

        {/* HSS Tools Section */}
        <section className="tools-section hss-section">
          <div className="container">
            <div className="tools-header">
              <h2 className="section-title">HSS Cutting Tools</h2>
              <p className="tools-description">
                Our premium High-Speed Steel (HSS) tools are designed for strength, precision, and long service life, making them an ideal choice for heavy-duty machining and cutting tasks.
              </p>
            </div>
            <div className="tools-grid">
              <div className="tool-category">
                <h3>Basic Tool Bits</h3>
                <ul className="tools-list">
                  <li>Square Tool Bits</li>
                  <li>Rectangular (Flat) Tool Bits</li>
                  <li>Parting Tool Bits</li>
                  <li>Round Tool Bits</li>
                </ul>
              </div>
              <div className="tool-category">
                <h3>Specialized Tools</h3>
                <ul className="tools-list">
                  <li>Round Head Punch</li>
                  <li>Revolving (Live Center) & Dead Center</li>
                  <li>Drill Chuck (with Key)</li>
                  <li>Traub Collect</li>
                </ul>
              </div>
              <div className="tool-category">
                <h3>Cutting & Milling</h3>
                <ul className="tools-list">
                  <li>HSS Metal Slitting Saw</li>
                  <li>HSS Side & Face Cutter</li>
                  <li>HSS Center Drill & End Mill</li>
                  <li>Machine Reamers</li>
                </ul>
              </div>
              <div className="tool-category">
                <h3>Finishing Tools</h3>
                <ul className="tools-list">
                  <li>Hand Reamer</li>
                  <li>Round Die</li>
                </ul>
              </div>
            </div>
            <div className="tools-footer">
              <p>Each HSS tool is engineered for superior performance, precision cutting, and extended tool life.</p>
            </div>
          </div>
        </section>

        {/* Carbide Tools Section */}
        <section className="tools-section carbide-section">
          <div className="container">
            <div className="tools-header">
              <h2 className="section-title">Carbide Cutting Tools</h2>
              <p className="tools-description">
                As a leading manufacturer and supplier of Carbide Cutting Tools, AAR PEE TOOLS is committed to delivering products that combine efficiency, durability, and precision.
              </p>
            </div>
            <div className="carbide-tools-grid">
              <div className="carbide-tool-card">
                {/* <div className="tool-icon">🔧</div> */}
                <h3>Solid Carbide End Mills</h3>
                <p>Exceptional wear resistance and high cutting efficiency for demanding applications.</p>
              </div>
              <div className="carbide-tool-card">
                {/* <div className="tool-icon">⚡</div> */}
                <h3>Carbide Drills</h3>
                <p>Superior durability and precision for professional drilling operations.</p>
              </div>
            </div>
            <div className="tools-footer">
              <p>Known for their exceptional wear resistance, high cutting efficiency, and durability, our carbide tools are trusted across industries for demanding applications.</p>
            </div>
          </div>
        </section>

        {/* Map section */}
        <section className="map-section">
          <div className="container">
            <div className="map-wrapper">
              <div className="map-card">
                <h2 className="map-title">Find us on the map</h2>
                <div className="leaflet-map">
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
          </div>
        </section>

        {/* Copyright */}
        <CopyrightPage />
      </main>
    </div>
  );
};

export default About;