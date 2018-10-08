$(document).ready(function() {

    
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAN_AxTD6XqNqU2gOMSLgLAQbrhTitZDbY",
        authDomain: "trainscheduler-12c22.firebaseapp.com",
        databaseURL: "https://trainscheduler-12c22.firebaseio.com",
        projectId: "trainscheduler-12c22",
        storageBucket: "trainscheduler-12c22.appspot.com",
        messagingSenderId: "408857104828"
      };
      
    firebase.initializeApp(config);

    var database = firebase.database();

    // Button click capture
    $("#submitIt").on("click", function(event) {
        event.preventDefault();
        var trainName = $("#trainNameInput").val().trim();
        var trainDestination = $("#destinationInput").val().trim();
        var startTime = $("#firstTrainInput").val().trim();
        var trainFrequency = $("#frequencyInput").val().trim();

        // Push values to Firebase
        database.ref().push({
            name: trainName,
            destination: trainDestination,
            start: startTime,
            frequency: trainFrequency,
            dataAdded: firebase.database.ServerValue.TIMESTAMP,
    });

     // Clear input values
     $("#trainNameInput").val("");
     $("#destinationInput").val("");
     $("firstTrainInput").val("");
     $("frequencyInput").val("");


});


    // Listen to firebase for changes and update DOM
    database.ref().on("child_added", function(update) {
           
        var trainName = update.val().name;
        var trainDestination = update.val().destination;
        var startTime = update.val().start;
        var trainFrequency = update.val().frequency;
        
        console.log(trainName);
        console.log(trainDestination);
        console.log(startTime);
        console.log(trainFrequency);

        var convertedStart = moment(startTime, "HH:mm").subtract(1, 'years');
        console.log(convertedStart, "converted start")

        timeDiff = moment().diff(moment(convertedStart), "minutes");
        console.log(timeDiff, "timeDiff");
        
        remainder = timeDiff % trainFrequency;
        console.log(remainder, "remainder");
        
        minutesTilTrain = trainFrequency - remainder;
        console.log(minutesTilTrain, "minutes till train");
        
        nextTrain = moment().add(minutesTilTrain, "minutes").format("HH:mm");
        console.log(nextTrain, "next train");
        
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainFrequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minutesTilTrain),
        );

        // Append each train route to the schedule 
        $("#appendHere").append(newRow)


    });

    
 
});