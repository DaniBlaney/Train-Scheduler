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

  $("#submit").on("click", function(){
    event.preventDefault();

    var trainRow = $("<tr>").addClass("trainRow");

    var trainName = $("#data-name").val().trim();
    trainRow.append($("<td>").text(trainName));

    var destination = $("#data-destination").val().trim();
    trainRow.append($("<td>").text(destination));

    var frequency = $("#data-frequency").val().trim();
    trainRow.append($("<td>").text(frequency));

    var trainTime = $("#data-time").val().trim();
    moment(childSnapshot.val().trainTime, "hh:mm").subtract(1, "years")

    var nextArrival= moment(nextArrival).format("hh:mm");
    trainRow.append($("<td>").text(nextArrival));

    var timeDifference = moment().diff(moment(firstTrain), "minutes");
    var remainder = timeDifference % childSnapshot.val().frequency;
    var minutesAway = childSnapshot.val().frequency - remainder;
    trainRow.append($("<td>").text(minutesAway));

    database.ref().set({
      trainList: $(".trainView").html()
    });

    $("#data-name").val("");
    $("#data-destination").val("");
    $("#data-frequency").val("");
    $("#data-time").val("");
  });

  // database.ref().on("value", function(snapshot){
  //   $(".trainView").html(snapshot.val().trainList);
  // });

  // $(document).on("click", ".trainRow", function(){
  //   $(this).remove();

  //   database.ref().set({
  //     trainList: $(".trainView").html()
  //   });
  // });
