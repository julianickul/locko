$(document).ready(function(){
	ymaps.ready(init);
		var myMap, 
			myPlacemark;
		function init(){ 
			myMap = new ymaps.Map("map", {
				center: [55.767168435207,37.695831982802],
				zoom: 14
			}); 
			myPlacemark = new ymaps.Placemark([55.767168435207,37.695831982802], {
				balloonContent: 'Головной офис КБ «ЛОКО-Банк» (ЗАО)'
			});
		myMap.geoObjects.add(myPlacemark);
	}
});
