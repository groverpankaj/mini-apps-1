const runQueryOnDB = require('./model.js');


module.exports.postClient = (req, res) => {

  let  query = `INSERT INTO customers 
    (name, 
    email,
    password,
    addressLineOne,
    addressLineTwo,
    city,
    state,
    phone,
    zipCode,
    creditCardNo,
    expiryDate,
    cvvNo,
    billZipCode) VALUES (
    '${req.body.name}' ,
    '${req.body.email}', 
    '${req.body.password}',
    '${req.body.addressLineOne}', 
    '${req.body.addressLineTwo}',
    '${req.body.city}', 
    '${req.body.state}', 
    '${req.body.phone}', 
    '${req.body.zipCode}', 
    '${req.body.creditCardNo}', 
    '${req.body.expiryDate}', 
     ${req.body.cvvNo}, 
    '${req.body.billZipCode}'
    )`;

    // console.log(query);

    runQueryOnDB(query)
    // .then( rawData => JSON.stringify(rawData))
    .then( jsonData => console.log(jsonData))
    .then( res.send(req.body))
    .catch(() => console.log('error posting'));
}


module.exports.getClients = (req, res) => {

  let query = 'SELECT * FROM customers';

  runQueryOnDB(query)
  .then( rawData => JSON.stringify(rawData))
  .then( jsonData => { 
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.send(jsonData);
  })
  .catch(() => console.log("Error in GET request"))
  

}


