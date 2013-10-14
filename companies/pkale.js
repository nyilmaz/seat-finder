var $ = require('jquery');
var Logger = require('../logger/logger.js');
var logger = new Logger('PAMUKKALE');

var SEFER_URL = 'https://www.pamukkale.com.tr/Sefer.php';
var KOLTUK_URL = 'https://www.pamukkale.com.tr/Koltuk.php';

module.exports = {
	getEmptySeatFor: function(Kalkis, Varis, Tarih, Saat){
		$.get(SEFER_URL, {
			Kalkis: Kalkis,
			Varis: Varis,
			Tarih: Tarih,
			SeciliKoltukSay: '0',
			DevamSayfa: '',
			url: Math.random()
		})
		.done(function(data){})
		.fail(function(data, textStatus, jqXHR){
			var html = $.parseHTML(data.responseText);
			var runs = $(html).find('tr[id^=Sef]');
			runs.each(function(i, x){
				var $x = $(x);
				var $info = $x.find('td[width=39][height=30]');
				var seferNo = $x.attr('id').replace('Sef', '');
				$.get(KOLTUK_URL, {
					Seferid: seferNo,
					Kalkis: Kalkis,
					Varis: Varis,
					SeciliKoltuklar: '',
					DevamSayfa: '',
					url: Math.random()
				})
				.done(function(data){})
				.fail(function(data, textStatus, jqXHR){
					var otobus = $.parseHTML(data.responseText);
					var seats = $(otobus).find('.tdkare');
					var emptySeats = [];
					seats.each(function(i, x){
						var $this = $(this);
						if($this.attr('onclick') && ($info.html() > Tarih)){
							var koltukNo = $this.find('table[id^=Kol]').attr('id').split('*')[1];
							emptySeats.push(koltukNo);
						}
					});
					if(emptySeats.length > 0){
						logger.log('Seat(s) found, date: ' + Tarih + ' - ' + $info.html() + ', seat(s) -> ' + emptySeats.toString());
					}
					
				});
			});
		});
	}
};
