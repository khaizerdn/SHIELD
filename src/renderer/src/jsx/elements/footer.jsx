import React from 'react';
import '../../css/elements/footer.css';
// Import Electron's shell module
const { shell } = window.require('electron');

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Open external link using Electron's shell
  const openExternalLink = (url) => {
    shell.openExternal(url);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <span
                className="link" // Add class for styling
                onClick={() => openExternalLink('mailto:cvsucarmona@cvsu.edu.ph')}
              >
                cvsucarmona@cvsu.edu.ph
              </span>
            </li>
            <li>
              <span
                className="link" // Add class for styling
                onClick={() => openExternalLink('https://www.facebook.com/SHIELDSociety.CvSUCarmona')}
              >
                SHIELD Society
              </span>
            </li>
            <li>
              <span
                className="link" // Add class for styling
                onClick={() => openExternalLink('https://www.facebook.com/DIITCvSUCarmona')}
              >
                DIIT
              </span>
            </li>
          </ul>
        </div>
        <div className="other-organizations">
          <h3>Other DIIT Organizations</h3>
          <ul>
            <li>
              <span
                className="link" // Add class for styling
                onClick={() => openExternalLink('https://www.facebook.com/YPADS.Official')}
              >
                YPADS - BSCS
              </span>
            </li>
            <li>
              <span
                className="link" // Add class for styling
                onClick={() => openExternalLink('https://www.facebook.com/elite.bsindt')}
              >
                ELITE - BSIndT
              </span>
            </li>
            <li>
              <span
                className="link" // Add class for styling
                onClick={() => openExternalLink('https://www.facebook.com/cvsuccitec')}
              >
                ITEC - BSIT
              </span>
            </li>
          </ul>
        </div>
        <div className="other-pages">
          <h3>Other Pages</h3>
          <ul>
            <li>
              <span
                className="link" // Add class for styling
                onClick={() => openExternalLink('https://www.facebook.com/CaviteStateU')}
              >
                Cavite State University
              </span>
            </li>
            <li>
              <span
                className="link" // Add class for styling
                onClick={() => openExternalLink('https://www.facebook.com/CvSUCarmona')}
              >
                Cavite State University - Carmona
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; All Rights Reserved. {currentYear}</p>
        <p>Cavite State University | Carmona, Cavite, Philippines</p>
      </div>
    </footer>
  );
};

export default Footer;
