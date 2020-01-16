const connection = require('./db.js'); 

const runQueryOnDB = (query) => {
  
  return new Promise( (resolve, reject) => {
    
    connection.query(query , (err, result) => {
      if(err) {
        reject(err);
      } else {
        resolve(result);
      }
    })

  })

}


module.exports =  runQueryOnDB;

