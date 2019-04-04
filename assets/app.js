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

  function currentTime(){
    var current = moment().format('LT');
    $("#currentTime").html(current);
    setTimeout(currentTime, 1000);
  }

  $("#add-train").on("click", function(event){
    event.preventDefault();

    trainName = $(".data-name").val().trim();
    destination = $(".data-destination").val().trim();
    frequency = $(".data-frequency").val().trim();
    trainTime = moment($(".data-time").val().trim(), "h:mm a").format("HHmm");


    database.ref().push ({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      trainTime: trainTime,
      dataAdded: firebase.database.ServerValue.TIMESTAMP

    });

    $("form")[0].reset();
  });

  database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());
    var firstTrain = moment(childSnapshot.val().trainTime, "hh:mm").subtract(1, "years");
    var timeDifference = moment().diff(moment(firstTrain), "minutes");
    var remainder = timeDifference % childSnapshot.val().frequency;
    var minutesAway = childSnapshot.val().frequency - remainder;
    var nextArrival = moment(firstTrain).format("hh:mm a");
    console.log(firstTrain);
    console.log(timeDifference);
    console.log(remainder);
    console.log(minutesAway);
    console.log(nextArrival);

    $(".trainView").append("<tr><td>"+ childSnapshot.val().trainName +
    "</td><td>" + childSnapshot.val().destination +
    "</td><td>" + childSnapshot.val().frequency +
    "</td><td>" + nextArrival +
    "</td><td>" + minutesAway + "</td></tr>");
  // $("#trainView > tbody").append("<tr><td>" + '<i class="fa fa-trash" id="trashcan" aria-hidden="true"></i>' + "</td><td>" + train + "</td><td>" + destination + "</td><td>" +
  // frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

  }, function(errorObject){
    console.log("Errors handled: " + errorObject.code)
  });

  currentTime();
  // database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
  //    $("#data-name")
