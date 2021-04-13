

1)   index.js  starts the app which is in ./Games/Balloons/Balloons.js 

2)   all game files live in directory ./Games/Balloons/

3) The very first code line in Balloons.js is the import of all the variables:  images and others
they are imported only once , and then used in the app.

4) All variables live in variables.js file where they can be changed.

5) to modyfy variables to suit your needs you can either change variables in variables.js, or alternatevely change import line  in Balloons.js
to import them from any other location.

6) in variables.js there is Win variable which can be set to true or false, and winning image number


7) Balloons.js has functions Win() and Lose() which are executed at the losing or wining game.
These are empty functions, any code can be written inside to suit your needs. (to close app, etc)

8) App is designed for portrait display only

9) App uses library  react-native-game-engine. Please install this library by running in powershell:
cd _your_project_directory_
npm install --save react-native-game-engine
to make sure you have library installed please while in your project directory run:
npm list --depth 0

