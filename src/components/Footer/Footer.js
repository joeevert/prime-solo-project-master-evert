import React from 'react';
import './Footer.css'

const Footer = () => (
  <footer>
    <p style={{textAlign: 'center', color: '#bbb'}}>All rights reserved {(new Date().getFullYear())} &copy; Joe Evert</p>
  </footer>
);

export default Footer;
