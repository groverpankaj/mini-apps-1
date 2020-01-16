const express = require('express');
const csv = require('csv-express');

const path = require('path');
const fs = require('fs');

const morgan = require('morgan');
const parser = require('body-parser');

const fileUpload = require('express-fileupload');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;


const app = express();

const processInputData = require('./removeChildrenObject.js');

// Middleware
app.use(morgan('dev'));
app.use(parser.json());

// default options
app.use(fileUpload());


const clientPath = path.join(__dirname, 'client');

app.use(express.static(clientPath));

let file_counter = 1;

// Text Area
app.use(parser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
// Source: https://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters


// app.post("/", (req, res) => {
//   console.log('POST received');
  
//   let ans = processInputData(req.body.input);

//   res.csv(ans , true, 
//     {
//       "Access-Control-Allow-Origin": "*"
//     }
//     , 202)
// });

// Upload
app.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.foo;
  let fileData = sampleFile.data.toString();

  let csvData = processInputData(fileData);


  writeCSVFile(csvData);

  res.csv(csvData , true, 
    {
      "Access-Control-Allow-Origin": "*"
    }
    , 202)

});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));




const writeCSVFile = (csvData) => {
  
  // Making Header
  let objKeys = Object.keys(csvData[0]);

  let myHeaders = [];

  for (let i= 0; i < objKeys.length; i++) {
    let tempObj = {id: objKeys[i], title: objKeys[i].toUpperCase()};
    myHeaders.push(tempObj);
  }


  console.log(myHeaders);
  let csvWriter = createCsvWriter({
    path: `./uploads/csv_report_${file_counter}.csv`,
    // header: [
    //     {id: 'firstName', title: 'firstName'},
    //     {id: 'lastName', title: 'lastName'},
    //     {id: 'county', title: 'county'},
    //     {id: 'city', title: 'city'},
    //     {id: 'role', title: 'role'},
    //     {id: 'sales', title: 'sales'}
    //   ]

    header: myHeaders
  });
 
  // let records = [
  //     {firstName: 'Bob',  lastName: 'French, English'},
  //     {firstName: 'Mary', lastName: 'English'}
  // ];
  
  csvWriter.writeRecords(csvData)       // returns a promise
    .then(() => {
      file_counter++;
        console.log('...Done');
  });

}


