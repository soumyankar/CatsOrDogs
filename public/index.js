// Get a reference to the database service
// Variable Declaration.

var matchup=-1;
var dog_elo;
var cat_elo;
var battle_count;
var battles=firebase.database().ref("global-variables/battle_count");
battles.on("value",function(snapshot){
	battle_count=snapshot.val();
});
var K=30; // Our Constant for Elo.
var database = firebase.database();
var ref = firebase.database().ref();
var dogs = matchmaking([1,2,3,4,5,6,7,8,9,10]);
var cats = matchmaking([11,12,13,14,15,16,17,18,19,20]);
console.log(dogs);
console.log(cats);

function Battle(){
	matchup=matchup+1;
	console.log("matchup="+matchup);
	if(matchup>=10)
	{
		document.getElementById("playground").style.display = 'none';
		document.getElementById("end").style.display = 'block';
		battle_count=battle_count+1;
		var battle_count_log=database.ref("global-variables/");
		battle_count_log.update({
		"battle_count" : battle_count
	});
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

// Elo change

function elo_change(result){
/*
Approach:
P1: Probability of winning of player with rating2
P2: Probability of winning of player with rating1.

P1 = (1.0 / (1.0 + pow(10, ((rating1 – rating2) / 400))));
P2 = (1.0 / (1.0 + pow(10, ((rating2 – rating1) / 400))));
Obviously, P1 + P2 = 1.

The rating of player is updated using the formula given below :-

rating1 = rating1 + K*(Actual Score – Expected score);
*/

// To calculate the Winning 
// Probability of Player Cat 
var PCat = Probability(dog_elo, cat_elo); 

// To calculate the Winning 
// Probability of Player Dog
var PDog = Probability(cat_elo, dog_elo); 

// if result = 1; dog = win
// if result =0; cat = win
if (result == 1) { 
    dog_elo = dog_elo + K * (1 - PDog); 
    cat_elo = cat_elo + K * (0 - PCat); 
} 
if (result == 0){ 
	dog_elo = dog_elo + K * (0 - PDog); 
	cat_elo = cat_elo + K * (1 - PCat); 
} 
console.log("new dog elo="+dog_elo);
console.log("new cat elo="+cat_elo);
var key = matchup;
logs(key,dog_elo,cat_elo);
}

// Expected Winning Probability.
function Probability(rating1,rating2) 
{ 
	var prob = 1.0 * 1.0 / (1 + 1.0 *  (Math.pow(10, 1.0*(rating1 - rating2) / 400))); 
	return prob.toFixed(2);
} 

function logs(key,new_dog_elo,new_cat_elo){
	var dog_key=dogs[key];
	var cat_key=cats[key];
	var update = ""+battle_count;
	var dog_participants_elo=database.ref("Participants/"+dog_key+"/");
	dog_participants_elo.update({
		"elo" : new_dog_elo
	});
	var cat_participants_elo=database.ref("Participants/"+cat_key+"/");
	cat_participants_elo.update({
		"elo" : new_cat_elo
	});
	var dog_log=database.ref("Participants/"+dog_key+"/logs/");
	dog_log.update({
		[update] : new_dog_elo
	});
	var cat_log=database.ref("Participants/"+cat_key+"/logs/");
	cat_log.update({
		[update] : new_cat_elo
	});
	
}

