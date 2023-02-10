var applications = [],
  applicationSums = {},
  numApps = 5, //top n apps
  groups = [],
  dates = ["x"],
  blankDays = {},
  minuteCount = ["Screentime"],
  pickupCount = ["Pickups"],
  labels = [
    "App Store",
    "Bumble",
    "Camera",
    "Google Drive",
    "Google Photos",
    "Facebook",
    "Fitbit",
    "Find Friends",
    "Gmail",
    "Google Maps",
    "Grindr",
    "Hornet",
    "Instagram",
    "Maps",
    "Messages",
    "Messenger",
    "Mint",
    "Moment",
    "Music",
    "Notes",
    "OK Cupid",
    "Outlook",
    "Phone",
    "Photos",
    "Slack",
    "Reversee",
    "Safari",
    "Scruff",
    "Strong",
    "Settings",
    "Snapchat",
    "Uber",
    "Lyft",
    "Weather",
    "Tinder",
    "Siri",
    "Pinterest",
    "Venmo",
    "Co — Star",
  ],
  daysToLog = [
    "2019-06-17",
    "2019-06-16",
    "2019-06-15",
    "2019-06-14",
    "2019-06-13",
    "2019-06-12",
    "2019-06-11",
  ],
  log = {
    dates: [],
  };
// ramps = [
//     ['#8b0000', '#cb2f44', '#f47461', '#ffbd84', '#ffffe0'],
//     ['#253494', '#2c7fb8', '#41b6c4', '#a1dab4', '#ffffcc'],
//     ['#006837', '#31a354', '#78c679', '#c2e699', '#ffffcc'], ];
// style = window.getComputedStyle(document.getElementById("#chart"), null);
// width = style.getPropertyValue("width");

export function kickoff(moment, c3) {
  // console.log(moment, moment_before);
  processJSONs(moment, c3);
}

function processJSONs(data1, c3) {
  var a = data1.days;
  var b = [];
  var data = b.reduce((acc, val) => {
    return acc.concat(val);
  }, a);

  applications = {};
  labels.forEach(function(a) {
    applications[a] = [];
    log[a] = [];
  });
  let applicationsArray = [];
  readData(data);
  changeLabels();
  makeGroups(numApps, applicationsArray);
  makeChart(applicationsArray, c3);
}

function compare(a, b) {
  return applicationSums[b[0]] - applicationSums[a[0]];
}

function readData(obj) {
  obj.forEach((day) => {
    //for whatever dates i'm trying to log, push the date and a zero into all the app entries
    if (daysToLog.includes(day.date.slice(0, 10))) {
      log.dates.push(day.date.slice(0, 10));
      for (var app in log) {
        if (app !== "dates") {
          log[app].push(0);
        }
      }
    }

    //If appUsages subarray has length of 0 for a day, it could mean that battery screenshot failed 4 that day.
    //For these cases I manually paste data into moment_before.json.  Therefore, wrap code that generates
    //the arrays in an if loop to make sure that we're only writing days into the array for which there is
    //data. Since there is no day where I do not open up the messages app, I'll use the Message app being
    //zero to indicate battery screenshot failure.
    //        var hasData = day.appUsages.filter(function (val) {
    //            return val.appName === "Messages"
    //        }).length;

    if (
      day.appUsages.filter(function(val) {
        return val.appName === "Messages";
      }).length
    ) {
      dates.push(day.date);
      pickupCount.push(day.pickupCount);
      minuteCount.push(day.minuteCount);

      //Insert blank values for each application once per day.  These will be changed on a per-app basis
      Object.keys(applications).forEach((val) => {
        applications[val].push(0);
      });

      day.appUsages.forEach((appRecord) => {
        const app_name =
          appRecord.appName == "Sc ruff" ? "Scruff" : appRecord.appName;
        //                                    console.log(app_name, applications[app_name]);
        if (applications[app_name]) {
          applications[app_name][applications[app_name].length - 1] =
            appRecord.onScreen;
          if (daysToLog.includes(day.date.slice(0, 10))) {
            log[app_name][log[app_name].length - 1] = appRecord.onScreen;
          }
        }
      });

      //Last, if the day we're considering is actually a patch for missing day in moment.json, alert
      //and remove it
      if (blankDays[day.date.slice(0, 10)]) {
        //                console.log("Found patch for", day.date);
        delete blankDays[day.date.slice(0, 10)];
      }
    } else {
      //            console.log("Blank day at:", day.date);
      blankDays[day.date.slice(0, 10)] = day;
    }
  });
}

function makeGroups(limit, applicationsArray) {
  Object.keys(applications).forEach((val) => {
    const sum = applications[val].reduce((a, v) => a + v, 0);
    applicationSums[val] = sum;
    applications[val].unshift(val);
    applicationsArray.push(applications[val]);
  });
  applicationsArray.sort(compare);
  groups = applicationsArray.slice(0, limit).map((i) => i[0]);
}

function changeLabels() {
  applications.Tinder = applications.Grindr;
  delete applications.Grindr;

  applications.iMessage = applications.Messages;
  delete applications.Messages;
}

function makeChart(applicationsArray, c3) {
  console.log("Blank Days:", blankDays);
  var columns = applicationsArray.filter(function(i, index) {
    return index < numApps;
  });
  columns.unshift(dates); //dates is global

  //    console.log(columns)
  // console.log(parseInt(window.innerWidth/100))
  c3.generate({
    data: {
      x: "x",
      xFormat: "%Y-%m-%dT%H:%M:%S-%L:%S",
      columns: columns,
      type: "area-spline",
      groups: [groups],
    },
    point: {
      show: false,
    },
    legend: {
      position: "inset",
      reverse: true,
    },
    subchart: {
      show: true,
    },
    zoom: {
      rescale: true,
    },
    tooltip: {
      format: {
        value: function(value) {
          return value + " min";
        },
      },
    },
    axis: {
      x: {
        extent: [dates[32], dates[1]],
        type: "timeseries",
        tick: {
          fit: false,
          format: "%m/%d",
        },
        padding: 0,
      },
      y: {
        padding: {
          bottom: 0,
        },
      },
    },

    // color: {
    //     pattern: ramps[Math.floor((Math.random() * (3 - 0) + 0))]
    // },
    padding: {
      left: 25,
      right: 15,
    },
  });
}
