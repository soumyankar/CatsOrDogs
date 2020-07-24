// Elo Algorithm

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
dog_elo = dog_elo.toFixed(2);
cat_elo = cat_elo.toFixed(2);
console.log("new dog elo="+dog_elo);
console.log("new cat elo="+cat_elo);
var key = matchup;
scores[dogs[key]]=dog_elo;
scores[cats[key]]=cat_elo;
// Updates elo onto DB.
// logs(key,dog_elo,cat_elo);
}

// Expected Winning Probability.
function Probability(rating1,rating2) 
{ 
	var prob = 1.0 * 1.0 / (1 + 1.0 *  (Math.pow(10, 1.0*(rating1 - rating2) / 400))); 
	return prob.toFixed(2);
}
