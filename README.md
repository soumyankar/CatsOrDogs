# CatsOrDogs
Uses Arpad Élo algorithm for matchmaking and ranking. More importantly, answers the question - Cats or Dogs?  
This website shows a very simplistic approach towards understanding how the Élo algorithm functions. Users would be asked to compare two images, and depending upon their selection, the elo would increase/decrease for the respective assets.

- Backend using ```Firebase🔥```.
- Server side scripting using ```JS```.
- And obviously, you've got the Bootstrap4 on the front end, along with JQuery!

Help this beginner by trying out the website [here](https://catsordogs.web.app).

_Soumyankar Mohapatra, St. Xaviers' College_ 

## Documentation

This section describes my method of programming this project. I have added comment lines as much as possible to ease readability.

- Begin Button: Contains onClick() attribute which starts the project. This function will **NOT** be used again for the remainder of the project.

- Battles: Both images contain onClick() attributes that trigger 2 functions - one for changing elo of the current matchup, one for showing the next matchup.

- index.js(): This file contains code to initialize certain variables, display the matchup, and finally commit the data.

- elo.js(): This file contains the code to the algorithm. The probability formula, and how Elo points are changed after user input.

- matchmaking,js(): This file contains the algorithm(_lol_) to the battle matchups. Might be a bit confusing.

- commit_data.js(): This file finally commits all the data to the DB. All battle data is stored in JSON objects which are pushed **ONLY** when all 10 battles have been _successfully_(to avoid internet drops, refresh clicks,CMD+W misclicks etc etc) completed by the user.

- graphs.js(): This file contains information on displaying the info. Thanks to [Chart.js!](https://github.com/chartjs/Chart.js).
