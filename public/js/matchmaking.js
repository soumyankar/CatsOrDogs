// Matchmaking

function getRandomIntInclusive(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
var player1=getRandomIntInclusive(1,10);
var player2=getRandomIntInclusive(11,20);
function sample_range(range, n) {
  var sample = [];
  for(var i=0; i<n; i++) {
    sample.push(range.splice(Math.random()*range.length,1));
}

return sample;
}
var sample = sample_range([1,2,7,8,9,10], 2);
function matchmaking()
{
    var array = [1,2,3,4,5,6,7,8,9,10];
    while(array.length>0)
    {    
        var num = Math.floor(Math.random() * array.length);
        var roll = array.splice(num, 1);
        var yourNumber = roll[ 0 ];
        console.log(yourNumber);
    }
}
console.log(matchmaking());