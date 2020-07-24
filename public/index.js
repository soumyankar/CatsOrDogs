// Get a reference to the database service
// Variable Declaration.
var matchup=-1;
var dog_elo;
var cat_elo;
var battle_count;
// Firebase DB init.
var database = firebase.database();
var dogs =[];
var cats =[];
var scores =[-999,-999-999,-999-999,-999-999,-999-999,-999-999,-999-999,-999-999,-999-999,-999-999,-999];
var K=30; // Our Constant for Elo.

function initialization(){
	dogs = matchmaking([1,2,3,4,5,6,7,8,9,10]);
	cats = matchmaking([11,12,13,14,15,16,17,18,19,20]);
	// console.log(dogs);
	// console.log(cats);
	var battles=firebase.database().ref("global-variables/battle_count");
	battles.on("value",function(snapshot){
		battle_count=snapshot.val();
	});
}

function Battle(){
	matchup=matchup+1;
	console.log("matchup="+matchup);
	if(matchup>=10)
	{
		document.getElementById("playground").style.display = 'none';
		document.getElementById("end").style.display = 'block';
		commit_logs();
		commit_battle_matchup();
		commit_battle_count();
		return;
	}
	if(matchup<10)
	{
		console.log("Dog No.= "+dogs[matchup]);
		console.log("Cat No.= "+cats[matchup]);

	// Loading Dog Details.
	var dog = firebase.database().ref("Participants/"+dogs[matchup]);
	dog.on("value",function(snapshot){
		console.log(snapshot.val());
		var dog_details=snapshot.val();
		document.getElementById("player1-name").innerHTML="Name: "+dog_details.name;
		document.getElementById("player1-breed").innerHTML="Breed: "+dog_details.breed;
		document.getElementById("player1-picture").src="assets/"+dogs[matchup]+".jpg";
		dog_elo=dog_details.elo;
	}, function(error){
		console.log("Error:"+error.code);
	});

	// Loading Cat Details
	var cat = firebase.database().ref("Participants/"+cats[matchup]);
	cat.on("value",function(snapshot){
		console.log(snapshot.val());
		var cat_details=snapshot.val();
		document.getElementById("player2-name").innerHTML="Name: "+cat_details.name;
		document.getElementById("player2-breed").innerHTML="Breed: "+cat_details.breed;
		document.getElementById("player2-picture").src="assets/"+cats[matchup]+".jpg";
		cat_elo=cat_details.elo;
	}, function(error){
		console.log("Error:"+error.code);
	});
}
}
