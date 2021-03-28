const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
const liveUrl = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily";
window.onload = changeLiveChart('bitcoin');


fetch(url)
    .then(response => response.json())
    .then(function (data) {
        let activo;
        data.forEach(e => {
            $(`<li id=${e.id} onclick="changeLiveChart('${e.id}')">`).text(`${e.name} / ${e.current_price}$ / ${e.price_change_percentage_24h.toFixed(2)}%`).appendTo(document.getElementById("activos"));
            setTimeout(function () {
                if (e.price_change_percentage_24h * 100 > 0) {
                    document.getElementById(e.id).style.color = "lime"
                };
                if (e.price_change_percentage_24h * 100 < 0) {
                    document.getElementById(e.id).style.color = "red"
                }
            }, 300);
            setTimeout(function () {
                if (e.price_change_percentage_24h * 100 > 0) {
                    document.getElementById(e.id).style.color = "green"
                };
                if (e.price_change_percentage_24h * 100 < 0) {
                    document.getElementById(e.id).style.color = "indianred"
                }
            }, 1200);
        });
    })
    .catch(error => console.log(error));

function live() {
    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            let activo;
            data.forEach(e =>
                document.getElementById(e.id).innerHTML = (`${e.name} / ${e.current_price}$ / ${e.price_change_percentage_24h.toFixed(2)}%`)
            );
        })
        .catch(error => console.log(error));
}

function changeLiveChart(id) {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`)
        .then((resp) => resp.json())
        .then(function (currencies) {
            let prices = [id];
            let dates = reverseDate(30);
            currencies.prices.forEach(element =>
                prices.push(element[1].toFixed(4))
            );
            var chart = c3.generate({
                bindto: '#live-chart',
                data: {
                    x: 'x',
                    columns: [
                        ['x', ...dates],
                        prices
                    ]
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            values: dates
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format("$,")
                        }
                    }
                },
                point: {
                    show: false
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

let chartPort = c3.generate({
    bindto: '#portfolio-chart',
    data: {
        columns: [
            ['BTC', 30],
            ['ETH', 20],
            ['InxFunds', 50]
        ],
        type: 'pie',
        onclick: function (d, i) {
            console.log("onclick", d, i);
        },
        onmouseover: function (d, i) {
            console.log("onmouseover", d, i);
        },
        onmouseout: function (d, i) {
            console.log("onmouseout", d, i);
        }
    }
});

let chartMonth = c3.generate({
    bindto: '#monthly-chart',
    data: {
        columns: [
            ['sample', 12520, 12200, 13100, 15400, 13150, 15200]
        ]
    },
    legend: {
        show: false
    },
    point: {
        show: false
    }
});

var intervalId = window.setInterval(function () {
    live();
}, 10000);


// moment.js library !!
const reverseDate = (count) => {
    dates = [moment().format("YYYY-MM-DD")];

    for (let i = 1; i < count; i++) {
        dates.push(moment().add(-i, 'days').format("YYYY-MM-DD"));
    }
    return dates.reverse();
};

const elementsToDark = ['body', 'navbar', 'left-navbar']
const styleToDark = ['background: #222', 'color: #fff']
const styleToLight = ['background: rgb(250, 249, 250)', 'color: #222']

function lightDark(mode) {
    if (mode == "Noche") {
        document.getElementById("nocheDia").innerHTML = "Dia"
        setStyle(elementsToDark, styleToDark)
    }
    if (mode == "Dia") {
        document.getElementById("nocheDia").innerHTML = "Noche"
        setStyle(elementsToDark, styleToLight)
    }
}

function setStyle(objId, propertyObject) {
    objId.forEach(e => {
        console.log(e)
        propertyObject.forEach(i => {
            console.log(i)
            console.log(document.getElementById("e"))
        })
    });
}