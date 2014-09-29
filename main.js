var $ = require('jquery');
var pamukkale = require('./companies/pkale.js');
var nilufer = require('./companies/nilufer.js');
var kamilkoc = require('./companies/kkoc.js');
var Logger = require('./logger/logger.js');
var logger = new Logger('MAIN');

//kamilkoc icin istanbul(dudullu): 1105, izmir: 1118
var tarihler = ['02/10/2014', '03/10/2014'];

for(var i = 0; i < 300; i++){
	(function(i){
		setTimeout(function(){
			logger.log('Executing ' + i);
			$(tarihler).each(function(i, x){
				nilufer.getEmptySeatFor(3400, 3500, x, '99:99');			// updated
				pamukkale.getEmptySeatFor(3419, 3500, x, '99:99');		// updated
				kamilkoc.getEmptySeatFor(1105, 1118, x);
			});
		}, i*15000);
	}(i));
}



