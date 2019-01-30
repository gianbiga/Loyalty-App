var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '/public')));

	app.get('/tes1t',function(req, res){
		res.send('Hello World!');
	}) 

try {
	// Load all routes
	require('./routes')(app);
} catch (e) {
	console.log(e.message);
}

//inicia o servidor na porta 3000
app.listen(process.env.PORT || 3000, function () {
    console.log("Hello Server!");
});