//a POST routes API Friends this handles incoming survey results. will also used to handle the compatibility logic
//Load Data
var friends = require("../data/friends.js");

module.exports = function (app) {
  //a GET route that displays JSON of all possible friends
  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function (req, res) {
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    }


    //Here we take the result of the user's survey POST and parse it
    var userData = req.body;
    var userScores = userData.scores;


    //This variabe will calculate the difference betwene the user's score and the score of each user in the database
    var totalDifference = 0;

    //Here we loop through all thefirend possibilities in the database. 
    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i]);
      console.log(friends[i].name);
      totalDifference = 0;

      //We then loopthrough all the scores of each firend
      for (var j = 0; j < friends[i].scores[j]; j++) {

        //We calculate the difference between the scores and sum them ito the totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        //If the sum of differences isless then the differences of the current "best match"
        if (totalDifference <= bestMatch.friendDifference) {

          //Resset the bestMatch to be the new friend. 
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }

    //Finally save the user's data to the database (this has to happen AFTER the check. Otherwise, the database will always return that the user is the user's best firend).
    friends.push(userData);

    //Return a JSON with the user's bestMatch. This will be used by the HTML in the next page. 
    res.json(bestMatch);
  });
}