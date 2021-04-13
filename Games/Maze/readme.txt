

1)   index.js  starts the app which is in ./Games/Maze/Maze.js 

2) The very first code line in Maze.js is the import of all the variables: Win variable,the maze matrix, images and others
they are imported only once , and then used in the app.

3) game has Win variable which if true automatically will make one house win

4) All variables live in variables.js file where they can be changed.

5) to modyfy variables to suit your needs you can either change variables in variables.js, or alternatevely change import line  in Maze.js
to import them from any other location.

6) in variables.js there is example of 8x8, 4x4, 3x3 mazes. Mazes should be square (equal height and lenght) but can be any number (2x2,9x9 etc).
   Also please look at maze_matrix_example.jpg how to fill the matrix according wanted pattern.

7) Maze.js has functions Win() and Lose() which are executed at the losing or wining game.
These are empty functions, any code can be written inside to suit your needs. (to close app, etc)
Game is won, if the winning house is found, and lost if all houses are losing houses;

8) App is designed for portrait display only

9) App uses library  react-native-game-engine. Please install this library by running in powershell:
cd _your_project_directory_
npm install --save react-native-game-engine
to make sure you have library installed please while in your project directory run:
npm list --depth 0

