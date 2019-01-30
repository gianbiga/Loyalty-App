module.exports = function (app) {
    'use strict';

	app.get('/test',function(req, res){
		res.send('Hello World!'); 
	})

    module.exports = app;
};
