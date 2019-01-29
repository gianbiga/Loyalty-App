var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '/')));


//inicia o servidor na porta 3000
app.listen(process.env.PORT || 3000, function () {
    console.log("Hello Server!");
});