$(function() {

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Carros",
            value: 80
        }, {
            label: "Motos",
            value: 30
        }],
        resize: true
    });

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            dia: '20/Nov/2015',
            carro: 69,
            moto: 19
        }, {
            dia: '21/Nov/2015',
            carro: 54,
            moto: 20
        }, {
            dia: '22/Nov/2015',
            carro: 59,
            moto: 21
        }, {
            dia: '23/Nov/2015',
            carro: 40,
            moto: 16
        }, {
            dia: '24/Nov/2015',
            carro: 12,
            moto: 5
        }, {
            dia: '25/Nov/2015',
            carro: 49,
            moto: 17
        }, {
            dia: '26/Nov/2015',
            carro: 58,
            moto: 21
        }, {
            dia: '27/Nov/2015',
            carro: 38,
            moto: 17
        }],
        xkey: 'dia',
        ykeys: ['carro', 'moto'],
        labels: ['Carros', 'Motos'],
        hideHover: 'auto',
        resize: true
    });

});
