var $ = require('jquery');
var pamukkale = require('./companies/pkale.js');
var nilufer = require('./companies/nilufer.js');
var kamilkoc = require('./companies/kkoc.js');
var Logger = require('./logger/logger.js');
var logger = new Logger('MAIN');

//kamilkoc icin istanbul(dudullu): 1105, izmir: 1118
var tarihler = ['19/10/2013'];

for(var i = 0; i < 300; i++){
	(function(i){
		setTimeout(function(){
			logger.log('Executing ' + i);
			$(tarihler).each(function(i, x){
				nilufer.getEmptySeatFor(3500, 3400, x, '99:99');
				pamukkale.getEmptySeatFor(3500, 3400, x, '99:99');
				kamilkoc.getEmptySeatFor(1118, 1105, x);
			});
		}, i*15000);
	}(i));
}



