function commit_logs(){
	var dog_key=dogs[key];
	var cat_key=cats[key];
	var update = ""+battle_count;
	var key = 1;
	while(key<=20)
	{
		var animal_participant_elo=database.ref("Participants/"+key+"/");
		animal_participant_elo.update({
			"elo" : parseInt(scores[key]) //Somehow scores[] is a string array? not sure why.
		});
		var animal_log=database.ref("Participants/"+key+"/logs/");
		animal_log.update({
			[update] : parseInt(scores[key]) //Somehow scores[] is a string array? not sure why.
		});
		key = key + 1;
	}
}


function commit_battle_matchup(){
	var battle_matchup = database.ref("battle-matchups/"+battle_count+"/");
	battle_matchup.update({
		"dog_matchups": dogs,
		"cat_matchups": cats
	})

}

// Commit Battle Counts, Always commit at the end.

function commit_battle_count(){
	battle_count=battle_count+1;
	var battle_count_log=database.ref("global-variables/");
	battle_count_log.update({
		"battle_count" : battle_count
	});
}
