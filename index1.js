//Starting of Strain/Resistance Chart
function get(callback) {
  var user_ref = database.ref("Sensor/Reading1");
  user_ref.on("value", function (snapshot) {
    let data = snapshot.val();
    callback(data); // Call the callback function with the retrieved data
  });
}

var dps = []; // dataPoints
var xVal = 0;
var yVal = 100;
var updateInterval = 1000;
var dataLength = 10; // number of dataPoints visible at any point

window.onload = function () {
  var chart = new CanvasJS.Chart("chartContainer1", {
    title: {
      text: "Strain Sensor Results",
    },
    data: [
      {
        type: "line",
        dataPoints: dps,
      },
    ],
  });

  var updateChart = function (count) {
    count = count || 1;

    get(function (DataArray) {
      var now = new Date();
      var newTime = now.getSeconds();

      for (var j = 0; j < count; j++) {
        yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
        dps.push({
          x: newTime,
          y: DataArray,
        });
        xVal++;
      }

      if (dps.length > dataLength) {
        dps.shift();
      }

      chart.render();
    });
  };

  updateChart(dataLength);
  setInterval(function () {
    updateChart();
  }, updateInterval);
};

var chartContainer1 = document.getElementById("chartContainer1");
var dummyChart = document.getElementById("dummyChart");
var vb = document.getElementById("vibration");
var pr = document.getElementById("pressure");
var cls = document.getElementById("strain");

function toggleChartContainer() {
  if (chartContainer1.style.display === "none") {
    chartContainer1.style.display = "block";
    dummyChart.style.display = "none";
    vb.style.display = "none";
    pr.style.display = "none";
    // cls.classList.add("active");
  } else {
    chartContainer1.style.display = "none";
    dummyChart.style.display = "none";
    vb.style.display = "none";
    pr.style.display = "none";
  }
}
function toggleChartContainer1() {
  // var temp = document.getElementById("temp");

  if (dummyChart.style.display === "none") {
    chartContainer1.style.display = "none";
    dummyChart.style.display = "block";
    pr.style.display = "none";
    vb.style.display = "none";
    // temp.classList.add("active");
  } else {
    chartContainer1.style.display = "none";
    dummyChart.style.display = "none";
    pr.style.display = "none";
    vb.style.display = "none";
  }
}
function toggleChartContainer2() {
  if (vb.style.display === "none") {
    chartContainer1.style.display = "none";
    dummyChart.style.display = "none";
    vb.style.display = "block";
    pr.style.display = "none";
  } else {
    chartContainer1.style.display = "none";
    dummyChart.style.display = "none";
    vb.style.display = "none";
    pr.style.display = "none";
  }
}
function toggleChartContainer3() {
  if (pr.style.display === "none") {
    chartContainer1.style.display = "none";
    dummyChart.style.display = "none";
    vb.style.display = "none";
    pr.style.display = "block";
  } else {
    chartContainer1.style.display = "none";
    dummyChart.style.display = "none";
    vb.style.display = "none";
    pr.style.display = "none";
  }
}

// window.onload(toggleChartContainer3());
const sideMenu = document.querySelector("aside");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");

const darkMode = document.querySelector(".dark-mode");

menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode-variables");
  darkMode.querySelector("span:nth-child(1)").classList.toggle("active");
  darkMode.querySelector("span:nth-child(2)").classList.toggle("active");
});

Stat.forEach((stat) => {
  const tr = document.createElement("tr");
  const trContent = `
        <td>${stat.time}</td>
        <td>${stat.resistance}</td>
        <td>${stat.average}</td>
        <td class="${
          stat.status === "Declined"
            ? "danger"
            : stat.status === "Pending"
            ? "warning"
            : "primary"
        }">${stat.status}</td>
        <td class="primary">Details</td>
    `;
  tr.innerHTML = trContent;
  document.querySelector("table tbody").appendChild(tr);
});
