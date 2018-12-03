import React from 'react';
import './AboutPage.css';

import Typography from '@material-ui/core/Typography';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div className="container">
    <Typography className="header" variant="h4">Technologies Used</Typography>
    <div className="list">
      <ul>
        <li><Typography variant="h5">React</Typography></li>
        <li><Typography variant="h5">Redux-Saga</Typography></li>
        <li><Typography variant="h5">Node.js</Typography></li>
        <li><Typography variant="h5">PostgreSQL</Typography></li>
        <li><Typography variant="h5">React-Confirm-Alert</Typography></li>
        <li><Typography variant="h5">Moment.js</Typography></li>
        <li><Typography variant="h5">React-Google-Maps</Typography></li>
        <li><Typography variant="h5">Material UI</Typography></li>
      </ul>
    </div>
    <Typography className="header" variant="h4">Stretch Features</Typography>
    <div className="list">
      <ul>
        <li><Typography variant="h5">More functionality with Google Maps</Typography></li>
        <li><Typography variant="h5">More intuitive messaging for users</Typography></li>
      </ul>
    </div>
    <Typography className="header" variant="h4">Biggest Challenges</Typography>
    <div className="list">
      <ul>
        <li><Typography variant="h5">Working with Google Maps API</Typography></li>
      </ul>
    </div>

  </div>
);

export default AboutPage;
