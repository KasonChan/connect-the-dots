/**
 * Created by kasonchan on 4/28/15.
 */

var clicks = [], updatedClicks = "";

$(document).ready(function () {
  // In the beginning, show the solve button and hide reset button
  $("#div_reset").hide();

  // Listen for the mouse clicks
  $('#playground').bind('click', function (ev) {
    var $div = $(ev.target);
    var $display = $div.find('#display');

    var offset = $div.offset();
    var x = ev.clientX - offset.left;
    var y = ev.clientY - offset.top;

    // Show the coordinates on display
    $display.text('x: ' + x + ', y: ' + y);

    // Add the coordinates to the clicks array
    clicks.push([x, y]);

    // Log the coordinates of the clicks
    updatedClicks += clicks.length + ":" +
      " " + clicks[clicks.length - 1] + "<br />";

    // Add the log to the page
    $('#log').html(updatedClicks);

    // Constructs the css of the dot
    css = {
      left: clicks[clicks.length - 1][0],
      top: clicks[clicks.length - 1][1],
      zIndex: clicks.length - 1
    }

    // Construct the html and css for the dot
    div = $('<button type="button" class="dot" disabled></button>').css(css);

    // Add the dot to the page
    $('body').append(div);
  });
});

var matrix = [[]];
var length = 0;

// Calculate the all the length from each dot to every other dots
function calculate_matrix() {
  for (i = 0; i < clicks.length; i = i + 1) {
    matrix[i] = [];
    for (j = 0; j < clicks.length; j = j + 1) {
      if (i == j) {
        matrix[i][j] = 0.00.toFixed(2);

        updatedClicks += "[" + i + ", " + j + "]: " + matrix[i][j] + " ";
        // Add the log to the page
        $('#log').html(updatedClicks);
      }
      else {
        x1 = clicks[i][0];
        y1 = clicks[i][1];
        x2 = clicks[j][0];
        y2 = clicks[j][1];

        // Length of the segment between the two dots
        var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1))).toFixed(2);

        matrix[i][j] = length;

        updatedClicks += "[" + i + ", " + j + "]: " + matrix[i][j] + " ";
        // Add the log to the page
        $('#log').html(updatedClicks);
      }
    }

    updatedClicks += "<br />";
    // Add the log to the page
    $('#log').html(updatedClicks);
  }

  return;
}

var current_dot = 0;
// Get the length of the diagonal of the browser
var min_length =
  Math.sqrt((($(window).width() - 0) * ($(window).width() - 0)) +
  (($(window).height() - 0) * ($(window).height() - 0)));
var next_dot = -1;
var visited_dots = [];
var visited_edge = [];

// Draw line from current dot to next dot
function draw_line(x1, y1, x2, y2) {
  // Slope of the segment
  var m = (y2 - y1) / (x2 - x1);
  // Angle of the line
  var angle = (Math.atan(m)) * 180 / (Math.PI);
  // Length of the segment
  var d = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
  var transform;

  // Transform angle depends on the direction of movement of the line
  if (x2 >= x1) {
    transform = (360 + angle) % 360;
  } else {
    transform = 180 + angle;
  }

  // Add the (currently invisible) line to the page
  var id = 'line_' + new Date().getTime();
  var line = "<div id='" + id + "'class='line'></div>";
  $('body').append(line);

  // Rotate the line
  $('#' + id).css({
    'left': x1,
    'top': y1,
    'width': '0px',
    'transform': 'rotate(' + transform + 'deg)',
    'transform-origin': '0px 0px',
    '-ms-transform': 'rotate(' + transform + 'deg)',
    '-ms-transform-origin': '0px 0px',
    '-moz-transform': 'rotate(' + transform + 'deg)',
    '-moz-transform-origin': '0px 0px',
    '-webkit-transform': 'rotate(' + transform + 'deg)',
    '-webkit-transform-origin': '0px 0px',
    '-o-transform': 'rotate(' + transform + 'deg)',
    '-o-transform-origin': '0px 0px'
  });

  // 'draw' the line
  $('#' + id).animate({
    width: d
  }, 400, "linear", function () {
  });

}

/**
 * Solve the puzzle
 */
function solve_action() {
  // Hide solve button
  $("#div_solve").hide();

  // Make playground unclickable
  $('#playground').unbind('click');

  // Create a matrix of distance between two dots
  calculate_matrix();

  visited_dots.push(current_dot);
  visited_edge.push(0.00)

  for (x = 0; x < clicks.length - 1; x = x + 1) {

    for (i = 0; i < clicks.length; i = i + 1) {
      if ((matrix[current_dot][i] != 0)) {
        if ((current_dot != next_dot)) {

          // If not visited
          if ((visited_edge.indexOf(min_length) == -1) &&
            (visited_dots.indexOf(i) == -1)) {
            if ((matrix[current_dot][i] < min_length)) {
              min_length = matrix[current_dot][i];
              next_dot = i;

              //alert("min_length: " + min_length +
              //", current_dot: " + current_dot +
              //", next_dot: " + next_dot);
            }
          }
          else {
            //min_length =
            //  Math.sqrt((($(window).width() - 0) * ($(window).width() - 0)) +
            //  (($(window).height() - 0) * ($(window).height() - 0)));
            //next_dot = -1;
            //
            //alert(min_length + " " + next_dot);
          }
        }

      }
    }

    draw_line(clicks[current_dot][0],
      clicks[current_dot][1],
      clicks[next_dot][0],
      clicks[next_dot][1]);

    // Update current dot and visited dots
    visited_dots.push(next_dot);
    current_dot = next_dot;
    next_dot = -1;
    visited_edge.push(min_length);

    // Get the length of the diagonal of the browser
    min_length =
      Math.sqrt((($(window).width() - 0) * ($(window).width() - 0)) +
      (($(window).height() - 0) * ($(window).height() - 0)));

    // alert("current_dot: " + current_dot + ", next_dot: " + next_dot);
    //alert("visited_dots: " + visited_dots);

  }

  draw_line(clicks[current_dot][0],
    clicks[current_dot][1],
    clicks[0][0],
    clicks[0][1]);


  // Show reset button
  $("#div_reset").show();
}

/**
 * Reset the application
 */
function reset_action() {
  // Reload the page to initial
  location.reload();
}
