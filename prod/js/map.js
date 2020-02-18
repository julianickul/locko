ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [55.733835, 37.588227],
        zoom: 12,
        // Обратите внимание, что в API 2.1 по умолчанию карта создается с элементами управления.
        // Если вам не нужно их добавлять на карту, в ее параметрах передайте пустой массив в поле controls.
        controls:[]
    });
	
    var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
		iconLayout: 'default#image',
		iconImageHref: '../images/balun.png',
		iconImageSize: [42, 60],
        balloonContentBody: [
            '<address>',
            '<strong>Офис Яндекса в Москве</strong>',
            '<br/>',
            'Адрес: 119021, Москва, ул. Льва Толстого, 16',
            '<br/>',
            'Подробнее: <a href="https://company.yandex.ru/">https://company.yandex.ru</a>',
            '</address>'
        ].join('')
    });

    myMap.geoObjects.add(myPlacemark);
});