//Setup express
var express = require('express');
var app = express();
var path = require("path");

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

//Set up express directory
app.use('/public', express.static(__dirname + '/public'));

app.listen(3001);
console.log("Server running on port 3001");
