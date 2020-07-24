window.chartColors = {
    // Colors I added, for better contrast.
    sienna: 'rgb(160,82,45)',
    darkslategray: 'rgb(47, 79, 79)',
    seagreen: 'rgb(46, 139, 87)',
    darkred: 'rgb(139, 0, 0)',
    olive: 'rgb(128, 128, 0)',
    purple: 'rgb(127, 0, 127)',
    orangered: 'rgb(255, 69, 0)',
    orange: 'rgb(255, 165, 0)',
    yellow: 'rgb(255, 255, 0)',
    chartreuse: 'rgb(127, 255, 0)',
    mediumspringgreen: 'rgb(0, 250, 154)',
    royalblue: 'rgb(65, 105, 225)',
    aqua: 'rgb(0, 255, 255)',
    deepskyblue: 'rgb(0, 191, 255)',
    blue: 'rgb(0, 0, 255)',
    fuchsia: 'rgb(255, 0, 255)',
    khaki: 'rgb(240, 230, 140)',
    salmon: 'rgb(250, 128, 114)',
    plum: 'rgb(221, 160, 221)',
    deeppink: 'rgb(255, 20, 147)',
    // Preset Colors.
    red: 'hex(#ffa500)',
    orange2: 'rgb(255, 159, 64)',
    yellow2: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue2: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    aqua2: 'rgb(0,255,255)',
    beige: 'rgb(245,245,220)',
    black: 'rgb(0,0,0)',
    lime: 'rgb((0,255,0)',
    golden: 'rgb(218,165,32)',
    orange_red: 'rgb(255,69,0)',
    navy: 'rgb(0,0,128)',
    thistle: 'rgb(216,191,216)',
    slate_grap: 'rgb(112,128,144)'
};
var MONTHS = ['0','1','2','3','4','5','6','7','8','9','10'];
var config = {
    type: 'line',
    data: {
        labels: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'],
    },
    options: {
        legend: {
            display: true
        },
        responsive: true,
        title: {
            display: true,
            text: 'Elo Scoreboard'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
                itemSort: function(tooltipItem,data){
                    var items = [];
                    var index =1;
                    while(index<=20)
                    {
                        var x = data.datasets[tooltipItem.datasetIndex].yLabel;
                        items.push(x);
                        index++;
                    } 
                    items.sort();
                    return items;
                } 
            },
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Battles'
                }
            }],
            yAxes: [{
                display: true,
                ticks: {
                    min: 800,
                    stepSize: 25,
                    max:1200
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Elo Points'
                }
            }]
        }
    }
};

var ctx = document.getElementById('canvas').getContext('2d');
var contestant_breed;
var myLine = new Chart(ctx, config);
var animals = 1;
var elo_log = [];
var colorNames = Object.keys(window.chartColors);
// Get Contestant Breed
while(animals<=20)
{
    var contestant = firebase.database().ref("Participants/"+animals);
    contestant.on("value",function(snapshot){
        var contestant_details=snapshot.val();
        var x=1;
        elo_log=contestant_details.logs;
        elo_log=elo_log.splice(1);
        contestant_breed=contestant_details.breed;
        var colorName = colorNames[config.data.datasets.length % colorNames.length];
        var newColor = window.chartColors[colorName];
        var newDataset = {
            label: contestant_breed,
            backgroundColor: newColor,
            borderColor: newColor,
            data: elo_log,
            fill: false
        };
        config.data.datasets.push(newDataset);
        myLine.update();
    }, function(error){
        console.log("Error:"+error.code);
    });
    myLine.update();
    animals=animals+1;
}
console.log(config);

function contestant_elo_log(animals) {
    console.log(animals);
    var contestant_elo = firebase.database().ref("logs/"+animals);
    contestant_elo.on("value", function(snapshot){
        var contestant_elo_log = snapshot.val();
        console.log(contestant_elo_log);
    });
}