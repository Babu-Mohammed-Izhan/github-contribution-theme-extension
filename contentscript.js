"use strict";

var github = [  "#9be9a8", "#40c463", "#30a14e", "#216e39" ];
var halloween = [  "#fdf156", "#ffc722", "#ff9711", "#04001b" ];
var christmas = [  "#eeeeee ", "#D03B3B", "#136637", "#28543C"];

var amber = [ "#ffecb3", "#ffd54f", "#ffb300", "#ff6f00" ];
var blue = [  "#bbdefb", "#64b5f6", "#1e88e5", "#0d47a1" ];
var bluegrey = [  "#cfd8dc", "#90a4ae", "#546e7a", "#263238" ];
var brown = [  "#d7ccc8", "#a1887f", "#6d4c41", "#3e2723" ];
var cyan = [  "#b2ebf2", "#4dd0e1", "#00acc1", "#006064" ];
var deeporange = [  "#ffccbc", "#ff8a65", "#f4511e", "#bf360c" ];
var deeppurple = [  "#d1c4e9", "#9575cd", "#5e35b1", "#311b92" ];
var green = [  "#c8e6c9", "#81c784", "#43a047", "#1b5e20" ];
var grey = [  "#e0e0e0", "#9e9e9e", "#616161", "#212121" ];
var indigo = [  "#c5cae9", "#7986cb", "#3949ab", "#1a237e" ];
var lightblue = [  "#b3e5fc", "#4fc3f7", "#039be5", "#01579b" ];
var lightgreen = [  "#dcedc8", "#aed581", "#7cb342", "#33691e" ];
var lime = [  "#f0f4c3", "#dce775", "#c0ca33", "#827717" ];
var orange = [  "#ffe0b2", "#ffb74d", "#fb8c00", "#e65100" ];
var pink = [  "#f8bbd0", "#f06292", "#e91e63", "#880e4f" ];
var purple = [  "#e1bee7", "#ba68c8", "#8e24aa", "#4a148c" ];
var red = [  "#ffcdd2", "#e57373", "#e53935", "#b71c1c" ];
var teal = [  "#b2dfdb", "#4db6ac", "#00897b", "#004d40" ];

var colors = {
  github: github,
  halloween: halloween,
  christmas: christmas,

  amber: amber,
  blue: blue,
  bluegrey: bluegrey,
  brown: brown,
  cyan: cyan,
  deeporange: deeporange,
  deeppurple: deeppurple,
  green: green,
  grey: grey,
  indigo: indigo,
  lightblue: lightblue,
  lightgreen: lightgreen,
  lime: lime,
  orange: orange,
  pink: pink,
  purple: purple,
  red: red,
  teal: teal,
};

var cssGitHubVars = [
  "--color-calendar-graph-day-bg",
  "--color-calendar-graph-day-L1-bg",
  "--color-calendar-graph-day-L2-bg",
  "--color-calendar-graph-day-L3-bg",
  "--color-calendar-graph-day-L4-bg",
];

function applyColorToCssGitHubVars(color) {
  for (var i = 0, l = cssGitHubVars.length; i < l; i++) {
    document.documentElement.style.setProperty(cssGitHubVars[i], color[i]);
  }
}

function applyColorToLegend(color) {
  var doc = document.getElementsByClassName("legend");

  if (doc[0]) {
    var lis = doc[0].getElementsByTagName("li");

    for (var i = 1, l = lis.length; i < l; i++) {
      lis[i].style.setProperty("background-color", color[l-i], "important");
    }
  }
}

function applyColorToActivity(color) {
  var path = document.getElementsByClassName("js-highlight-blob");
  if (path[0]) {
    for (var i = 0, l = path.length; i < l; i++) {
      path[i].setAttribute("fill", color[2]);
      path[i].setAttribute("stroke", color[2]);
    }
  }

  var axis = document.getElementsByClassName("activity-overview-axis");
  if (axis[0]) {
    for (var j = 0, m = axis.length; j < m; j++) {
      axis[j].style.stroke = color[3];
    }
  }

  var points = document.getElementsByClassName("activity-overview-point");
  if (points[0]) {
    for (var k = 0, n = points.length; k < n; k++) {
      points[k].style.stroke = color[3];
    }
  }
}

function applyColorToProgress(color) {
  var progress = document.getElementsByClassName("Progress-item");
  if (progress[0]) {

    for (var i = 1, l = progress.length; i < l; i++) {
      progress[i].style.setProperty("background-color", color[2], "important");
    }
  }
  
}


function applyOptions() {
  chrome.storage.local.get("favoriteColor", function (color) {
    if (!color.favoriteColor) {
      color.favoriteColor = "github";
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      colors[color.favoriteColor][5] =  
    } else {
      colors[color.favoriteColor][5] = "#eeeeee"
    }
    console.log(colors[color.favoriteColor])
    applyColorToCssGitHubVars(colors[color.favoriteColor].reverse());
    applyColorToLegend(colors[color.favoriteColor].reverse());
    applyColorToProgress(colors[color.favoriteColor].reverse());
    applyColorToActivity(colors[color.favoriteColor].reverse());
  });
}

(function () {
  // Call applyOptions after document load
  applyOptions();

  // Observe DOM modifications
  var container = document.getElementById("js-pjax-container");

  if (container) {
    var observer = new MutationObserver(function (mutations) {
      var graph = document.getElementsByClassName("js-yearly-contributions")[0];

      if (graph) {
        applyOptions();
      }
    });

    var config = { subtree: true, childList: true };

    observer.observe(container, config);
  }
})();
