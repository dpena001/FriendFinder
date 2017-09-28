// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");

//var waitListData = require("../data/waitinglistData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests.

     var friends = require("../data/friends");
     var totaldifference = friends[0].score ;
     var difference = 0 ;
     var index = 0;
     console.log("Size friends: "+friends.length);

     for (var i = 0; i < friends.length; i++) {
        var value1 = friends[i].scores;
        var value2 = req.body.scores;
        console.log(value1);
        for (var j = 0; j < value1.length; j++){
           var temp = parseInt(value1[j]) - parseInt(value2[j]);
           if( temp < 0){ 
               temp = temp * -1;
               difference = difference + temp;
           }else{
               difference = difference + temp;
           }
        }
        console.log("Indice:"+i+" Greatest: "+totaldifference+" Current Value: "+ difference); 
        if (totaldifference < difference){
             difference = 0;
        } else {
            totaldifference = difference;
            difference = 0;
            index = i;
        }
      }

      friends.push(req.body);
      console.log(friends[index])
      res.json(friends[index]);
   
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friends = [];
    console.log(friends);
  });
};
