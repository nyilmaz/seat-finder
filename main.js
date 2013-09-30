var $ = require('jquery');
var pamukkale = require('./pkale.js');
var nilufer = require('./nilufer.js');
var Logger = require('./logger.js');
var logger = new Logger('MAIN');

var tarihler = ['11/10/2013', '12/10/2013'];

for(var i = 0; i < 300; i++){
	(function(i){
		setTimeout(function(){
			logger.log('Executing ' + i);
			$(tarihler).each(function(i, x){
				nilufer.getEmptySeatFor(3400, 3500, x, '19:00');
				pamukkale.getEmptySeatFor(3400, 3500, x, '19:00');
			});
		}, i*8000);
	}(i));
}
