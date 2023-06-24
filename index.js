// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCi06RZhGYuCbAfIrqfvFfssMITICAeC1o",
  authDomain: "dummy-data-774b0.firebaseapp.com",
  databaseURL:
    "https://dummy-data-774b0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dummy-data-774b0",
  storageBucket: "dummy-data-774b0.appspot.com",
  messagingSenderId: "70173763691",
  appId: "1:70173763691:web:d2c173a7824ffd4de0e92e",
  measurementId: "G-YCYK6DT0BT",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set database variable
var database = firebase.database();

function save() {
  let reading = document.getElementById("reading").value;
  var val = document.getElementById("val").value;
  database.ref("Sensor/" + reading).set({
    Reading: val,
    // Reading: reading,
  });
  document.getElementById("reading").value = "";
  document.getElementById("val").value = "";
  alert("Saved");
}

function get() {
  // var val = document.getElementById("username").value;

  var user_ref = database.ref("Sensor/");
  user_ref.on("value", function (snapshot) {
    var data = snapshot.val();
    console.log(data);
    // alert(data);
  });
}
