require('dotenv').config();

const productionLink = 'sample-app.herokuapp.com';
const devLink = 'f26ee4a42cfd.ngrok.io';

// Host URL
module.exports.hostURL = () => {
  if (process.env.MODE == 'production') {
    return `https://${productionLink}`;
  } else {
    return `https://${devLink}`;
  }
};

module.exports.hostURLNonSecure = () => {
  if (process.env.MODE == 'production') {
    return `http://${productionLink}`;
  } else {
    return `http://${devLink}`;
  }
};

module.exports.hostURLWithoutProtocol = () => {
  if (process.env.MODE == 'production') {
    return `${productionLink}`;
  } else {
    return `${devLink}`;
  }
};
