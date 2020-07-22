// To generate random numbers.
// console.log(firebase);
// Get a reference to the database service
var database = firebase.database();
var ref = firebase.database().ref();
// var sk=ref.child("GermanShepherd");

// var ref2 = new Firebase('https://catsordogs-b46a9.firebaseio.com/');
// This is how I updated data.
// var p1=database.ref("Participants/GermanShepherd");
// p1.update(+".jpg";
	// "rank": 2
// });
// This is how I read data

// ref.on("value", function(snapshot) {
// 	console.log(snapshot.val());
// }, function (error) {
// 	console.log("Error: " + error.code);
// });

var playersRef = firebase.database().ref("Participants/");

// playersRef.on("child_added", function(data, prevChildKey) {
// 	var newPlayer = data.val();
// 	console.log("Participant name: " + data.key);
// 	console.log("elo: " + newPlayer.elo);
// 	console.log("rank: " + newPlayer.rank);
// 	console.log("Previous Participant: " + prevChildKey);
// });

// Find the randomised players.
console.log("Dog No.= "+player1);
console.log("Cat No.= "+player2);
var dog = firebase.database().ref("Participants/"+player1);
dog.on("value",function(snapshot){
	console.log(snapshot.val());
	var dog_details=snapshot.val();
	document.getElementById("player1-name").innerHTML="Name: "+dog_details.name;
	document.getElementById("player1-breed").innerHTML="Breed: "+dog_details.breed;
	document.getElementById("player1-picture").src="assets/"+player1+".jpg";
}, function(error){
	console.log("Error:"+error.code);
});

var cat = firebase.database().ref("Participants/"+player2);
cat.on("value",function(snapshot){
	console.log(snapshot.val());
	var cat_details=snapshot.val();
	document.getElementById("player2-name").innerHTML="Name: "+cat_details.name;
	document.getElementById("player2-breed").innerHTML="Breed: "+cat_details.breed;
	document.getElementById("player2-picture").src="assets/"+player2+".jpg";
}, function(error){
	console.log("Error:"+error.code);
});
