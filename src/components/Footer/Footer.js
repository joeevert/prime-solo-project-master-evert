import React from 'react';
import './Footer.css'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (
  <footer>
    <p style={{textAlign: 'right', marginRight: '50px'}}>All rights reserved {(new Date().getFullYear())} &copy; Joe Evert</p>
  </footer>
);

export default Footer;
