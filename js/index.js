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

/**
 * Solve the puzzle
 */
function solve_action() {
  // Hide solve button
  $("#div_solve").hide();

  // Connect the dots

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
