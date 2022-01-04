"use strict";

var github = ["#161B22", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
var halloween = ["#161B22", "#fdf156", "#ffc722", "#ff9711", "#04001b"];
var christmas = ["#161B22", "#eeeeee ", "#D03B3B", "#136637", "#28543C"];

var amber = ["#161B22", "#ffecb3", "#ffd54f", "#ffb300", "#ff6f00"];
var blue = ["#161B22", "#bbdefb", "#64b5f6", "#1e88e5", "#0d47a1"];
var bluegrey = ["#161B22", "#cfd8dc", "#90a4ae", "#546e7a", "#263238"];
var brown = ["#161B22", "#d7ccc8", "#a1887f", "#6d4c41", "#3e2723"];
var cyan = ["#161B22", "#b2ebf2", "#4dd0e1", "#00acc1", "#006064"];
var deeporange = ["#161B22", "#ffccbc", "#ff8a65", "#f4511e", "#bf360c"];
var deeppurple = ["#161B22", "#d1c4e9", "#9575cd", "#5e35b1", "#311b92"];
var green = ["#161B22", "#c8e6c9", "#81c784", "#43a047", "#1b5e20"];
var grey = ["#161B22", "#e0e0e0", "#9e9e9e", "#616161", "#212121"];
var indigo = ["#161B22", "#c5cae9", "#7986cb", "#3949ab", "#1a237e"];
var lightblue = ["#161B22", "#b3e5fc", "#4fc3f7", "#039be5", "#01579b"];
var lightgreen = ["#161B22", "#dcedc8", "#aed581", "#7cb342", "#33691e"];
var lime = ["#161B22", "#f0f4c3", "#dce775", "#c0ca33", "#827717"];
var orange = ["#161B22", "#ffe0b2", "#ffb74d", "#fb8c00", "#e65100"];
var pink = ["#161B22", "#f8bbd0", "#f06292", "#e91e63", "#880e4f"];
var purple = ["#161B22", "#e1bee7", "#ba68c8", "#8e24aa", "#4a148c"];
var red = ["#161B22", "#ffcdd2", "#e57373", "#e53935", "#b71c1c"];
var teal = ["#161B22", "#b2dfdb", "#4db6ac", "#00897b", "#004d40"];
var yellowMd = ["#161B22", "#fff9c4", "#fff176", "#ffd835", "#f57f17"];

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
  yellowMd: yellowMd,
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
      lis[i].style.setProperty("background-color", color[i], "important");
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

function applyOptions() {
  chrome.storage.local.get("favoriteColor", function (color) {
    if (!color.favoriteColor) {
      color.favoriteColor = "halloween";
    }
    applyColorToCssGitHubVars(colors[color.favoriteColor]);
    applyColorToLegend(colors[color.favoriteColor]);
    applyColorToActivity(colors[color.favoriteColor]);
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
