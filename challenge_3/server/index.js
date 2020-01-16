// // Import the express framework for our node server
// const express = require('express');
// // Import the path module from node to create absolute file paths for express static
// const path = require('path');

// // Instantiate the express server
// const app = express();
// // Set a constant for the port that our express server will listen on
// const PORT = 3000;

// // Serve static files. Any requests for specific files will be served if they exist in the provided folder
// app.use(express.static(path.join(__dirname, '../client/dist')));
// // Start the server on the provided port
// app.listen(PORT, () => console.log('Listening on port: ' + PORT));


const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');
const path = require('path');
const router = require('./router.js');

const app = express();

const PORT = 3000;

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', `http://localhost:${PORT}`);
//   next();
// });

app.use(morgan('dev'));
app.use(parser.json());

app.use(router);



const clientPath = path.join(__dirname, '../client/dist');

app.use(express.static(clientPath));





app.listen(PORT, () => console.log(`Server Listening to PORT ${PORT}`));