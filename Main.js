const express = require('express');
const path = require('path');
const bp = require("body-parser");
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
var cors = require('cors');
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bp.json({ limit: '500mb' }));
app.use(bp.urlencoded({ limit: '100mb', extended: true }));

var port = process.env.PORT || 8080;
var corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    callback(null, true);
  }
}
app.use(cors());
 app.post("/", cors(corsOptions), function(req,res,next){
 next();
 });
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(8080, (a)=>{
    console.log("started")
})