const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors =  require('cors')
const fs = require("fs")

const app = express();
const port = process.env.PORT || 5000;


// Set up a whitelist and check against it:
var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// Then pass them to cors:
app.use(cors(corsOptions));

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getJson(file){
    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

app.get('/api/getDocuments', (req, res) => {
  res.send(getJson('documentsData.json'));
});

app.put('/api/uploadFile', (req, res) => {
  res.send({'success': 'ok'});
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));