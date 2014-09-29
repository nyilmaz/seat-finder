var $ = require('jquery');
var Logger = require('../logger/logger.js');
var logger = new Logger('NILUFER TURIZM');


var KOLTUK_URL = 'http://www.nilufer.com.tr/2011/Koltuk.php';
var SEFER_URL = 'http://www.nilufer.com.tr/2011/Sefer.php';

module.exports = {

	initialize: function(){

	},

	getEmptySeatFor: function(Kalkis, Varis, Tarih){
		
		$.get(
			SEFER_URL,
			{
				Kalkis: Kalkis,
				Varis: Varis,
				Tarih: Tarih,
				SeciliKoltukSay: 0
			}
		).done(function(data){})
		.fail(function(data, textStatus, jqXHR){
			var html = $.parseHTML(data.responseText);
			var runs = $(html).find('tr[id^=Sef]');
			
			runs.each(function(i, x){
				var $x = $(x);
				var $info = $x.find('font[size=4][color=red] b');
				var seferNo = $x.attr('id').replace('Sef', '');
				
				$.get(KOLTUK_URL, 
				{
					Seferid: seferNo,
					Kalkis: Kalkis,
					Varis: Varis,
					SeciliKoltuklar: '',
					DevamSayfa: ''
				})
				.done(function(data){})
				.fail(function(data){
					var otobus = $.parseHTML(data.responseText);
					var seats = $(otobus).find('input.chkbox');
					
					var emptySeats = [];
					seats.each(function(i, x){
						var $x = $(x);
						emptySeats.push($x.attr('id').split('*')[1]);
					});
					if(emptySeats.length > 0){
						if($info.find('b').html()) {
							logger.log('Seat(s) found, date: '  + Tarih + ' - ' + $info.find('b').html() + ', seat(s) -> ' + emptySeats.toString());
						}
						
					}
				});
			});
		});

	}
};


