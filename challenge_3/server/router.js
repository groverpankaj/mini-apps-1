const express = require('express');

const router = express.Router();

const controller = require('./controller.js')



router.get('/hello', (req, res) => {
  console.log('Hello GET');
  res.send('GET HELLO');
});

router.post('/hello', (req, res) => {
  res.send('Hello POST');
});

router.get('/clients', controller.getClients);


router.post('/clients', controller.postClient);


module.exports =  router;

