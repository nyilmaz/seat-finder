var $ = require('jquery');
var Logger = require('../logger/logger.js');
var logger = new Logger('KAMIL KOC');

var SEFER_URL = 'https://www.kamilkoc.com.tr/biletsatinal';
var KOLTUK_URL = 'https://www.kamilkoc.com.tr/biletsatinal';

module.exports = {
	
	getEmptySeatFor: function(departureId, arrivalId, date){

		// tarih formati dd.MM.yyyy
		var mdate = date.replace(/\//g, '.');

		$.post(SEFER_URL, {
			rnd: parseInt(Math.random()*100),
			AjaxRequest: 'getVoyages',
			departureID: departureId,
			arrivalID: arrivalId,
			date: mdate
		}).done(function(data, textStatus, jqXHR){
			
			var html = $.parseHTML(data);
			var runs = $(html).find('.VoyagesRowStyle');

			runs.each(function(i, x){
				var $info = $(html).find('#CB_VoyagesForm_Row_ID_' + getSeferId(x.id) + '_CB_VoyagesForm_Column_DepartureTime');
				
				$.post(KOLTUK_URL, {
					rnd: parseInt(Math.random()*100),
					AjaxRequest: 'showvoyage',
					elementid: x.id,
					Type: 0,
					DepartureID: departureId,
					ArrivalID: arrivalId,
					VoyageDate: mdate
				}).done(function(data){
					var otobus = $.parseHTML(data);
					var emptySeats = [];
					$(otobus).find('div.bsavailable')
						.each(function(i, x){
							emptySeats.push(x.id.replace('seat', ''));
						});

					if(emptySeats.length > 0){
						logger.log('Seat(s) found, date: ' + date + ' - ' + $info.html() + ', seat(s) -> ' + emptySeats.toString());
					}

				});
			});
			
		});
	}
}

function getSeferId(divId){
	return divId.substr(divId.lastIndexOf('_') + 1, divId.length - 1);
}