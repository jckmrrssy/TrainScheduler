$(document).ready(function() {

    $("#firstTrainInput").mask("00:00");
    $("#frequencyInput").mask("00");

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
    function grabInputs (event) {
        
        
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
        // Not sure why these won't clear 
        $("firstTrainInput").val("");
        $("frequencyInput").val("");


};


    $("#submitIt").on("click", function(event) {
    
        if ($("#trainNameInput").val().length === 0 || $("#destinationInput").val().length === 0 || $("#firstTrainInput").val().length === 0 || $("#frequencyInput").val().length === 0) {
            alert("Please complete all fields");
        } else {
            grabInputs(event);  
    }    
});

    // Listen to firebase for changes and update DOM
    database.ref().on("child_added", function(update) {
          
        // Adding variables to store firebase values
        var trainName = update.val().name;
        var trainDestination = update.val().destination;
        var startTime = update.val().start;
        var trainFrequency = update.val().frequency;
        
        console.log(trainName);
        console.log(trainDestination);
        console.log(startTime);
        console.log(trainFrequency);

        // Moment.js time conversion & calculation
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
        
        // Store each output into a table row 
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainFrequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minutesTilTrain),
        );

        // Append table row to the schedule 
        $("#appendHere").append(newRow)


    });

    
 
});