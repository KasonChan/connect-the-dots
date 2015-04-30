# Connect-the-Dots #
 
This is a web-based solver for "connect-the-dots".

### Requirements ###

The web app should initially render a blank page with a single `Solve` button in
 the bottom center of the page.  Inside the web app, users will be able to take 
 one of two actions:
 
1. They can click on the `Solve` button to solve the current connect-the-dots 
puzzle.
2. They can click elsewhere on the page (anywhere outside of the `Solve` button)
 to add an additional dot to the page.

After the game has been solved, the `solve` button should be replaced by a 
`Reset` button.  When clicked, the reset button should revert the page to its 
initial state.

See `figures A-D` below for an example iteration of the game.

"Solving" the puzzle simply involves connecting the dots by drawing lines 
between them.  Each dot should be connected to exactly two other dots.  If there
 are `N` dots, you should draw `N` lines to solve the puzzle.  The lines should 
 NOT intersect (see `figures E` and `F`).  Note that there may be multiple 
 correct solutions for any given puzzle.

```
+------------------+   +------------------+   
|                  |   |                  |   
|                  |   |   *              |   
|                  |   |                  |   
|                  |   |                  |   
|                  |   |                  |   
|                  |   |                  |   
|                  |   |                  |   
|                  |   |                  |   
|    <Solve Me>    |   |    <Solve Me>    |   
+------------------+   +------------------+   
  A. App on load.        B. After 1 click.    
  
+------------------+   +------------------+
|                  |   |                  |
|   *    *      *  |   |   *    *------*  |
|                  |   |   | \ /       |  |
|      *           |   |   |  *        |  |
|                  |   |   |           |  |
|                  |   |   |           |  |
|   *           *  |   |   *-----------*  |
|                  |   |                  |
|    <Solve Me>    |   |      <Reset>     |
+------------------+   +------------------+
 C. After 6 clicks.      D. After solving.

+------------------+   +------------------+  
|    *--------*    |   |    *--------*    |
|     \      /     |   |    |        |    |
|      \    /      |   |    |        |    |
|       \  /       |   |    |        |    |
|        \/        |   |    |        |    |
|        /\        |   |    |        |    |
|       /  \       |   |    |        |    |
|      /    \      |   |    |        |    |
|     /      \     |   |    |        |    |
|    *--------*    |   |    *--------*    |
+------------------+   +------------------+
 E. Invalid Sol'n.       F. Valid sol'n.
```

### Development ###

This web application is built with HTML, CSS, and Javascript.
