
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { default: fetch } = require('node-fetch');
const fs = require('fs')
let jsonapidata = require('./employees.json'); /* import json file */


/* for getting data from api */
const fetchdata = async () => {
    try {
         const response = await fetch('https://jsonplaceholder.typicode.com/posts');
         const data = await response.json();
         return data;

        
    } catch (error) {
        console.log(error);
        
    }
 
  
};

/* fetching data from api and stored in json file apistored.json */

fetchdata()
 .then(data => {
   const dataJSON = JSON.stringify(data)
   fs.writeFileSync('employees.json', dataJSON)
});

/* There are many methods for writing data into csv format. I have used two metheods
one is using libaray csv writer and other one is fast-csv*/

/* Using csv writer  */
const csvWriter = createCsvWriter({
  path: 'employeedata_usingCsvWriter.csv',
  header: [
    {id: 'userId', title: 'User Id'},
    {id: 'id', title: 'Id'},
    {id: 'title', title: 'Post Title'},
    {id: 'body', title: 'body'},
    
  ]
});
csvWriter
  .writeRecords(jsonapidata)
  .then(()=> console.log('The CSV file was written successfully'));


 /* using fast-csv */ /* other methods */
const fastcsv = require('fast-csv');
const ws = fs.createWriteStream("employeedata_usingFast.csv");
fastcsv
  .write(jsonapidata, { headers: true })
  .pipe(ws);

  


    
 