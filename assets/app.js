// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDmOQl5yGSWibkB1lqd17lLR6VTw9S2BLY",
    authDomain: "train-scheduler-5886f.firebaseapp.com",
    databaseURL: "https://train-scheduler-5886f.firebaseio.com",
    projectId: "train-scheduler-5886f",
    storageBucket: "train-scheduler-5886f.appspot.com",
    messagingSenderId: "665374401793"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var frequency = 0;
  var trainTime = "";

  $("#submit").on("click", function(){
    event.preventDefault();

    trainName = $("#data-name").val().trim();
    destination = $("#data-destination").val().trim();
    frequency = $("#data-frequency").val().trim();
    trainTime = $("#data-time").val().trim();
    // $("<tr>").appendTo("#trainView");

    database.ref().push ({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      trainTime: trainTime,
      dataAdded: firebase.database.ServerValue.TIMESTAMP

    });
    
    $("#trainView").appendTo("<tr><td>"+ childSnapshot.val().trainName +
    "</td><td>" + childSnapshot.val().destination +
    "</td><td>" + childSnapshot.val().frequency +
    "</td><td>" + nextArrival +
    "</td><td>" + minutesAway + "</td></tr>");
    // $("form")[0].reset();
  });

  database.ref().on("child_added", function(childSnapshot){
    var firstTrain = moment(childSnapshot.val().trainTime, "hh:mm").subtract(1, "years")
    var timeDifference = moment().diff(moment(firstTrain), "minutes");
    var remainder = timeDifference % childSnapshot.val().frequency;
    var minutesAway = childSnapshot.val().frequency - remainder;
    var nextArrival = moment(nextArrival).format("hh:mm");
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().timeDifference);
    console.log(childSnapshot.val().remainder);
    console.log(childSnapshot.val().minutesAway);
    console.log(childSnapshot.val().nextArrival);

  // $("#trainView > tbody").append("<tr><td>" + '<i class="fa fa-trash" id="trashcan" aria-hidden="true"></i>' + "</td><td>" + train + "</td><td>" + destination + "</td><td>" +
  // frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

  }, function(errorObject){
    console.log("Errors handled: " + errorObject.code)
  });

  // database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
  //    $("#data-name")
