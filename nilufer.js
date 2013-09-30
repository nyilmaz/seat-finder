var $ = require('jquery');
var Logger = require('./logger.js');
var logger = new Logger('NILUFER TURIZM');


var KOLTUK_URL = 'http://www.nilufer.com.tr/2011/Koltuk.php';
var SEFER_URL = 'http://www.nilufer.com.tr/2011/Sefer.php';

module.exports = {
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
					Varis: Varis
				})
				.done(function(data){})
				.fail(function(data){
					var otobus = $.parseHTML(data.responseText);
					var seats = $(otobus).find('.tdkare');
					var emptySeats = [];
					seats.each(function(i, x){
						var $this = $(this);
						if($this.attr('onclick') && ($info.html() > Tarih)){
							emptySeats.push($this.find('td.duzmetin').html());
						}
					});
					if(emptySeats.length > 0){
						logger.log('Seat(s) found, date: '  + Tarih + ' - ' + $info.html() + ', seat(s) -> ' + emptySeats.toString());
					}
				});
			});
		});

	}
};


