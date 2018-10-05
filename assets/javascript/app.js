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

      var trainName = '';
      var destination = '';
      var startTime = '';
      var frequency = 0;

        // Button click capture
      $("#submitIt").on("click", function(event) {
        event.preventDefault();
        trainName = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        startTime = $("#firstTrainInput").val().trim();
        frequency = $("#frequencyInput").val().trim();

        // Push values to Firebase
        database.ref().push({
            trainName: trainName,
            destination: destination,
            startTime: startTime,
            frequency: frequency,
        });


      });




});