var applyButtonClicked = false;

function generate_year_range(start, end) {
  var years = "";
  for (var year = start; year <= end; year++) {
    years += "<option value='" + year + "'>" + year + "</option>";
  }
  return years;
}

today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var upOrDownMonths = 0;
var thisMonth = moment(today).add(upOrDownMonths, "M");
var futureMonth = moment(today).add(upOrDownMonths + 1, "M");
var createYear = generate_year_range(1970, 2050);
var lang = "en";

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var $dataHead = "<tr>";
for (let dhead in days) {
  $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";

document.getElementById("thead-month-first").innerHTML = $dataHead;
document.getElementById("thead-month-second").innerHTML = $dataHead;

showCalendar(
  thisMonth.format("M"),
  thisMonth.format("YYYY"),
  "calendar-body-first"
);
showCalendar(
  futureMonth.format("M"),
  futureMonth.format("YYYY"),
  "calendar-body-second"
);

var selectedStartDate = null;
var selectedEndDate = null;

function next(event) {
  event.preventDefault();
  upOrDownMonths++;
  thisMonth = moment(today).add(upOrDownMonths, "M");
  futureMonth = moment(today).add(upOrDownMonths + 1, "M");
  showCalendar(
    thisMonth.format("M"),
    thisMonth.format("YYYY"),
    "calendar-body-first"
  );
  showCalendar(
    futureMonth.format("M"),
    futureMonth.format("YYYY"),
    "calendar-body-second"
  );

  // Re-enable the "Previous" button when not in the past
  if (!thisMonth.isBefore(moment(), "month")) {
    document.getElementById("previous").style.display = "block";
  }
}

function previous(event) {
  event.preventDefault();
  upOrDownMonths--;
  thisMonth = moment(today).add(upOrDownMonths - 1, "M");
  futureMonth = moment(today).add(upOrDownMonths, "M");
  showCalendar(
    thisMonth.format("M"),
    thisMonth.format("YYYY"),
    "calendar-body-first"
  );
  showCalendar(
    futureMonth.format("M"),
    futureMonth.format("YYYY"),
    "calendar-body-second"
  );

  // Disable the "Previous" button when in the past
  if (thisMonth.isBefore(moment(), "month")) {
    document.getElementById("previous").style.display = "none";
  }
}
let dateArr = [];
function showCalendar(month, year, element = "calendar-body-first") {
  monthAndYear = document.getElementById(`${element}-monthAndYear`);
  var firstDay = new Date(year, month - 1).getDay();
  tbl = document.getElementById(element);
  tbl.innerHTML = "";
  monthAndYear.innerHTML = months[month - 1] + " " + year;
  var date = 1;
  for (var i = 0; i < 6; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cell = document.createElement("td");
        cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        cell = document.createElement("td");
        cell.setAttribute("data-date", date);
        cell.setAttribute("data-month", month);
        cell.setAttribute("data-year", year);
        cell.setAttribute("data-month_name", months[month - 1]);
        cell.className = "date-picker";
        cell.innerHTML = "<span>" + date + "</span>";

        // Add a class to disable past days
        var currentDate = new Date(year, month - 1, date);
        if (currentDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
          cell.classList.add("past-day");
        } else {
          let currentDateCopy = currentDate;

          cell.addEventListener("click", function (event) {
            if (dateArr.length > 3) {
              dateArr.shift();
            }
            dateArr.forEach((element) => {
              element.classList.remove("red-background");
            });
            dateArr.push(event.target);

            event.target.classList.add("red-background");
            console.log("event --- ----", event.target);
            if (!selectedStartDate) {
              selectedStartDate = currentDateCopy;
            } else if (!selectedEndDate) {
              selectedEndDate = currentDateCopy;
            } else {
              selectedStartDate = currentDateCopy;
              selectedEndDate = null;
            }
            if (
              selectedEndDate < selectedStartDate &&
              selectedEndDate !== null &&
              selectedStartDate !== null
            ) {
              console.log("selectedStartDate ----", selectedStartDate);
              selectedStartDate = selectedEndDate;
              selectedEndDate = null;
            }
            // Highlight the selected date
            highlightDatesBetween(selectedStartDate, selectedEndDate);
            updateCheckInCheckOut(selectedStartDate, selectedEndDate);
          });

          // Highlight the selected dates
          if (
            selectedStartDate &&
            selectedEndDate &&
            currentDate >= selectedStartDate &&
            currentDate <= selectedEndDate
          ) {
            cell.classList.add("highlighted");
          }
        }

        row.appendChild(cell);
        date++;
      }
    }

    tbl.appendChild(row);
  }

  var dateCells = document.querySelectorAll(".date-picker");
}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth - 1, 32).getDate();
}

function highlightDatesBetween(startDate, endDate) {
  var dateCells = document.querySelectorAll(".date-picker");

  dateCells.forEach(function (cell) {
    cell.classList.remove("highlighted", "blue-background"); 
  });

  if (startDate && endDate) {
    var startTimestamp = startDate.getTime();
    var endTimestamp = endDate.getTime();
    var firstDate = Math.min(startTimestamp, endTimestamp);
    var lastDate = Math.max(startTimestamp, endTimestamp);

    dateCells.forEach(function (cell) {
      var cellDate = new Date(
        parseInt(cell.getAttribute("data-year")),
        cell.getAttribute("data-month") - 1,
        cell.getAttribute("data-date")
      ).getTime();

      if (cellDate >= firstDate && cellDate <= lastDate) {
        cell.classList.add("highlighted");
        if (cellDate === firstDate) {
          cell.classList.add("blue-background");
        }
        if (cellDate === lastDate) {
          cell.classList.add("blue-background");
        }
      }
    });
  }
}

function updateCheckInCheckOut(startDate, endDate) {
  const checkInButton = document.getElementById("checkInButton");
  const checkOutButton = document.getElementById("checkOutButton");
  // console.log("updateCheckInCheckOut", startDate, endDate);
  if (endDate < startDate && endDate !== null) {
    const temp = startDate;
    startDate = endDate;
    endDate = null;
  }

  checkInButton.innerHTML = `${startDate ? startDate.toDateString() : ""}`;
  checkOutButton.innerHTML = `${endDate ? endDate.toDateString() : ""}`;
}

const endDateElement = document.getElementById("endDate");
endDateElement.addEventListener("click", function () {
  if (selectedEndDate < selectedStartDate) {
    // Swap the selected end date with the start date
    const tempDate = selectedEndDate;
    selectedEndDate = selectedStartDate;
    selectedStartDate = tempDate;
  }
  console.log("selectedStartDate", selectedStartDate, "----", selectedEndDate);
  highlightDatesBetween(selectedStartDate, selectedEndDate);
  updateCheckInCheckOut(selectedStartDate, selectedEndDate);
});

// Initialize the calendar
next(); // Show the next month
