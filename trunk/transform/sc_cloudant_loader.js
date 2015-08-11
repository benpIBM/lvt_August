// Require the necessary libraries
var http = require('http');
var request = require('request');
var csv = require('csv-parser');
var fs = require('fs');


// cUser is the Cloudant username of the account you are loading into
// cPass is the password for the Cloudant account
var cUser = 'dford';
var cPass = 'dhf0rd';

// dbName is the name of the database you are adding data to. If the database does not exist it will get created for you
var dbName = "Aug2";

// The following variables are used to collect the data from the GPAC servers
var loadType = 'DATA';
var year = 2015;
var start_month = 4;
var start_day = 1;
var end_month = 4;
var end_day = 31;

// Variable to count the number of documents added
var docCounter = 0;

// Set to true when you are ready to post documents to Cloudant
var realRun = true;

// Establish an authenticated connection
var absolute_url = "https://"
              +cUser
              +":"
              +cPass
              +"@"
              +cUser
              +".cloudant.com";

// Connect to Cloudant
request.get(absolute_url, function(err, res, body){
  if(err){
    console.log("An error happened: ", err);
  }else{
    console.log("These are some details about our account: ", body);
  }
});

// Create the database URL
var db_url = [absolute_url, dbName].join('/');

// The callback function that gets called with the response from the GPAC servers
callbackLoad = function(response) {
  // The string that will hold the entire response from GPAC
  str = '';
   // Another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

// After the entire response has been recieved, do:
// 1. Write to csv
// 2. Load it into the script
// 3. Transform the data to proper JSON bulk doc format
// 4. Bulk load to Cloudant
  response.on('end', function () {
    fs.writeFile(loadType+'_'+year+'_'+start_month+'_'+end_month+'.csv', str, function(err) {
                if (err) {
                  return console.log(err);
                }

// Some variables to hold and manipulate the JSON
var jsonArr = [];
var jsonArrCounter = 0;
var jsonStrArr ='';

// The first line commented out here would pull data from freshly created csv file
// fs.createReadStream(loadType+'_'+year+'_'+start_month+'_'+end_month+'.csv').pipe(csv()).on('data', function(data) {

  // Since the login to the GPAC doesn't work right now, this pulls from a static file in the local directory
  fs.createReadStream('test.csv').pipe(csv()).on('data', function(data) {

      // For every row in the csv file, update the docCounter
      docCounter++;

      // Format the timestamp
      if (data.Timestamp) {
        data.timestamp = JSON.stringify(data.Timestamp).substr(6,2)+'/'+JSON.stringify(data.Timestamp).substr(9,2)+'/'+JSON.stringify(data.Timestamp).substr(1,4)+' '+JSON.stringify(data.Timestamp).substr(12,8);
        delete data.Timestamp;
      }

      // The following transformations are made to make the data have a consistent structure so that it can be properly reported on
      if (data.Device_Name) {
        data.device = data.Device_Name;
        delete data.Device_Name;
      }
      if (data.Device) {
        data.device = data.Device;
        delete data.Device;
      }
      if (data.Unit){
        data.unit = data.Unit;
        delete data.Unit;
      }
      if (data.Value) {
        data.value = data.Value;
        data.type = 'measurement';
        delete data.Value;
      }
      if (data.Environment) {
        data.environment = data.Environment;
        delete data.Environment;
      }
      if (data.Log_Level) {
        data.log_level = data.Log_Level;
        delete data.Log_Level;
      }
      if (data.Action) {
        data.action = data.Action;
        delete data.Action;
      }
      if (data.Type) {
        data.type = data.Type;
        delete data.Type;
      }
      if (loadType == 'SYSTEM') {
        if (data.action && (JSON.stringify(data.action).indexOf(' changed '))>0){
          jsonStrArr = JSON.stringify(data.action).split(' changed ');
          if (jsonStrArr[0].substr(1) == 'Door Beam') {
            data.device = 'Beam';
          } else {
            data.device = jsonStrArr[0].substr(1);
          }
          data.type = 'action';
          if (jsonStrArr[1].indexOf(' to ') > 0) {
            data.child_device = (jsonStrArr[1].split(' to '))[0];
          }
        } else if (data.action && (JSON.stringify(data.action).indexOf(' triggered '))>0) {
          jsonStrArr = JSON.stringify(data.action).split(' triggered ');
          data.device = jsonStrArr[0].substr(1);
          data.type = 'action';
        } else if (data.action && (JSON.stringify(data.action).indexOf(' from '))>0) {
          jsonStrArr = JSON.stringify(data.action).split(' from ');
          data.device = jsonStrArr[jsonStrArr.length-1].substr(0, jsonStrArr[jsonStrArr.length-1].length-1);
          data.type = 'action';
        } else if (data.action && (JSON.stringify(data.action).indexOf(' for '))>0) {
          jsonStrArr = JSON.stringify(data.action).split(' for ');
          if ((jsonStrArr[1].indexOf('>')>0)) {
            if (((jsonStrArr[jsonStrArr.length-1].substr(0, jsonStrArr[jsonStrArr.length-1].length-1)).split(' >'))[0] == 'Door Beam') {
            data.device = 'Beam';
          } else {
            data.device = ((jsonStrArr[jsonStrArr.length-1].substr(0, jsonStrArr[jsonStrArr.length-1].length-1)).split(' >'))[0];
          }
          } else if ((jsonStrArr[1].indexOf('<')>0)) {
            if (((jsonStrArr[jsonStrArr.length-1].substr(0, jsonStrArr[jsonStrArr.length-1].length-1)).split(' <'))[0] == 'Door Beam') {
            data.device = 'Beam';
          } else {
            data.device = ((jsonStrArr[jsonStrArr.length-1].substr(0, jsonStrArr[jsonStrArr.length-1].length-1)).split(' <'))[0];
          }
          } else if ((jsonStrArr[1].indexOf('=')>0)) {
            if (((jsonStrArr[jsonStrArr.length-1].substr(0, jsonStrArr[jsonStrArr.length-1].length-1)).split(' ='))[0] == 'Door Beam') {
            data.device = 'Beam';
          } else {
            data.device = ((jsonStrArr[jsonStrArr.length-1].substr(0, jsonStrArr[jsonStrArr.length-1].length-1)).split(' ='))[0];
          }
          } else {
            data.device = jsonStrArr[jsonStrArr.length-1].substr(0, jsonStrArr[jsonStrArr.length-1].length-1);
          }
          data.type = 'trigger';
        } 
      }
        // Add the document to the jsonARR
        jsonArr[jsonArrCounter] = data;
      // Increment the jsonArrCounter (could be replaced with the docCounter variable)
      jsonArrCounter += 1;


// When every row of data has been added to the jsonArr, it is time to load into Cloudant
}).on('end', function(data) {

  // Format jsonDoc for bulk load of many docs
  var jsonDoc = {"docs": ""};
  jsonDoc.docs = jsonArr;

  // Bulk load the docs into Cloudant
  if (realRun) {
    console.log('posting to '+db_url);
        request.post({
          url: db_url+"/_bulk_docs",
          json: jsonDoc
        }, function(err, res, body){
          if(err){
            console.log("An error happened: ", err);
          }else{
            console.log("\nYou just made a document: ", body);
          }
        });
      }
    });
});
});
}

// The function that makes a request to the GPAC Server which calls the callbackLoad function when it has completed
var options;
var loopArray = function() {
    options = {
      host: 'sct.gpacsys.net',
      path: '/query.php?username=dford&password=dford123&logtype='+loadType+'&format=$2&start_year='+year+'&start_month='+start_month+'&start_day='+start_day+'&start_hour=00&start_min=00&start_sec=00&end_year='+year+'&end_month='+end_month+'&end_day='+end_day+'&end_hour=23&end_min=59&end_sec=59'
    };
    // console.log('load: '+loadType);
    // console.log('year: ' + year);
    // console.log('start_month: '+ start_month);
    // console.log('end_month: '+ end_month);
    http.request(options, callbackLoad).end();
};


// The main function. Puts the database (does nothing if already exists). Then calls loopArray which kicks off the whole process
request.put(db_url, function(err, res, body){
  if(err){
    console.log("An error happened: ", err);
    
  }else{
    console.log("You just made a database: ", body);
    var jsonBody = JSON.parse(body);
    if (jsonBody.error == "file_exists") {
      // Calls loopArray() kicking off the whole process
      loopArray();
      console.log('looping');
    } else {
      // Calls loopArray() kicking off the whole process
      loopArray();
      console.log('looping');
    }
  }
});