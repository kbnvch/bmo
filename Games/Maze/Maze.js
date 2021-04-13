
//first importing variables:
import Variables from './variables';

const floorImage = Variables.FloorImage;
const fogImage = Variables.FogImage;
const playerImages1 = Variables.PlayerImages1;
const playerImages2 = Variables.PlayerImages2;
const backgroundImage = Variables.BackgroundImage;
const houseImages = Variables.HouseImages;
const emptyImage = Variables.EmptyImage;
const loseImage = Variables.LoseImages;
const winImages = Variables.WinImages;
const explosionImg = Variables.ExplosionImg;
const explosionImg2 = Variables.ExplosionImg2;
const ifWin = Variables.Win;

var matrix = Variables.MAZE_MATRIX;

var playerStartX = Variables.PlayerStarPosition[0];
var playerStartY = Variables.PlayerStarPosition[1];

var visCol = Variables.ColorOfWalls;

var horzW = getHorizontalWalls(matrix);
var vertW = getVerticalWalls(matrix);
var matrixNumber = horzW[0].length;
var mazeImages = fillImagesArray(matrixNumber);
var playerImages;

if (getRandomInt(2) < 1) { playerImages = playerImages1; }
else { playerImages = playerImages2; }

/// set up screen:
import { CalculateScreen } from './screen';
const ScreenData = CalculateScreen(matrixNumber);
const WIDTH = ScreenData.WIDTH;
const HEIGHT = ScreenData.HEIGHT;
const resizer = ScreenData.resizer;
const boxysize = ScreenData.boxysize;
const leftP = ScreenData.leftP;
const topP = ScreenData.topP;

import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, StatusBar } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { setValuesRend } from "./renderers";
import { ThePlayer } from "./renderers";
import { TheMaze } from "./renderers";
import { TheBackground } from "./renderers";
import { TheHouses } from "./renderers";
import { TheWalls } from "./renderers";
import { AnimationRend } from "./renderers";
import { setValuesSys } from "./systems"
import { UpdateLoop } from "./systems";
import { AnimationLoop2 } from "./systems";

import appreg from './../../appRegistryController';
import { name as appName } from './../../app.json';
import App from './../../App';


var houses = [];
var numberOfHouses = 0;
var alphaCol = 'rgba(158, 0, 0, 0.0)';
var colorArr = fillColorArray(matrixNumber);
var tileNr = -1;

if (playerStartX > matrixNumber) { playerStartX = matrixNumber; }

if (playerStartY > matrixNumber) { playerStartY = matrixNumber; }

if (playerStartX < 1) { playerStartX = 1; }

if (playerStartY < 1) { playerStartY = 1; }


var theprops;
var this1;
var runnin = true;

export default class Maze extends PureComponent {
  constructor(props) {
    super(props);
    theprops = props;
    this1 = this;

    setValuesRend(matrixNumber);
    setValuesSys(matrixNumber);
    MakeListOfHouses();
    numberOfHouses = houses.length;
    tileNr = TileCoordToTileNumber(matrixNumber, playerStartX, playerStartY);
  }

  componentWillUnmount() {
    matrix = Variables.MAZE_MATRIX;

    playerStartX = Variables.PlayerStarPosition[0];
    playerStartY = Variables.PlayerStarPosition[1];

    visCol = Variables.ColorOfWalls;

    horzW = getHorizontalWalls(matrix);
    vertW = getVerticalWalls(matrix);
    matrixNumber = horzW[0].length;
    mazeImages = fillImagesArray(matrixNumber);
    playerImages = undefined;
    if (getRandomInt(2) < 1) { playerImages = playerImages1; }
    else { playerImages = playerImages2; }
    houses = [];
    numberOfHouses = 0;
    alphaCol = 'rgba(158, 0, 0, 0.0)';
    colorArr = fillColorArray(matrixNumber);
    tileNr = -1;
    theprops = undefined;
    this1 = undefined;
    runnin = true;

    console.log("unmounting!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  }

  render() {
    if (runnin) {
      return (
        <GameEngine
          style={styles.container}
          systems={[UpdateLoop, AnimationLoop2]}
          entities={{
            backgroundEntity: { BGimage: backgroundImage, renderer: <TheBackground /> },
            mazeEntity: { matrixNumber: matrixNumber, HorizontalWalls: horzW, VerticalWalls: vertW, floorImg: floorImage, mazeImgs: mazeImages, tileNumber: tileNr, renderer: <TheMaze /> },
            wallsEntity: { matrixNumber: matrixNumber, HorizontalWalls: horzW, VerticalWalls: vertW, wallsColors: colorArr, visibleColor: visCol, tileNumber: tileNr, renderer: <TheWalls /> },
            playerEntity: { empty: false, position: [0, 0], rt: "0deg", lossCount: 0, currentTileX: playerStartX, currentTileY: playerStartY, playerStartX: playerStartX, playerStartY: playerStartY, plImgNr: 0, playerImageSource: playerImages, playerImage: playerImages, emptyImage: emptyImage, HorizontalWalls: horzW, VerticalWalls: vertW, renderer: <ThePlayer /> },
            housesEntity: { WinFunct: Win, LoseFunct: Lose, housesArray: houses, numberOfHouses: numberOfHouses, winImg: winImages[getRandomInt(winImages.length)], loseImg: loseImage, reRender: 0, renderer: <TheHouses /> },
            vidEnt: { x: 0, y: HEIGHT, dm: 0, img: emptyImage, exp1: explosionImg, exp2: explosionImg2, renderer: <AnimationRend /> }

          }}>
          <StatusBar hidden={true} />
        </GameEngine>
      );
    }
    else {
      return (
        <GameEngine>
          <StatusBar hidden={true} />
        </GameEngine>
      );
    }
  }
}






function Win() {

  //function is executed after win
  console.log("WIN!!!!!!");
  goBackToMainApp();
}

function Lose() {

  //function is executed after losing
  console.log("LOST.........!");
  goBackToMainApp();
}

function goBackToMainApp() {
  runnin = false;
  this1.forceUpdate();
  setTimeout(() => {
    appreg.registerComponent(appName, () => App);
    appreg.runApplication(appName, theprops);
    runnin = true;
  }, 2000);
}



function getHorizontalWalls(matrix) {
  let array = [];
  for (let i = 0; i < matrix.length; i++) {
    if ((i % 2) == 0) {
      array.push(matrix[i]);
    }
  }
  return array;
}

function getVerticalWalls(matrix) {
  let array = [];
  for (let i = 0; i < matrix.length; i++) {
    if ((i % 2) == 1) {
      array.push(matrix[i]);
    }
  }
  return array;
}
function fillImagesArray(matrixNr) {
  let array = [];
  for (let index = 0; index < matrixNr * matrixNr; index++) {
    array.push(fogImage);
  }
  return array;
}
function fillColorArray(matrixNr) {
  let array = [];
  for (let index = 0; index < matrixNr * matrixNr; index++) {
    array.push(alphaCol);
  }
  return array;
}


function MakeListOfHouses() {
  var i;
  for (i = 0; i < horzW[0].length; i++) {
    if (horzW[0][i] == 0 || horzW[0][i] == -1) {
      //console.log("house at the top");
      houses.push(CreateHouseData(leftP + boxysize * i, topP - boxysize, i + 1, 0, 0));
    }
  }

  let last = horzW[0].length - 1;
  for (i = 0; i < horzW[last].length; i++) {
    if (horzW[last + 1][i] == 0 || horzW[last + 1][i] == -1) {
      //console.log("house at the bottom");
      houses.push(CreateHouseData(leftP + boxysize * i, topP + boxysize * last + boxysize, i + 1, last + 2, 0));
    }
  }

  i = 0;
  vertW.forEach(ve => {
    if (ve[0] == 0 || ve[0] == -1) {
      //console.log("house at the left");
      houses.push(CreateHouseData(leftP - boxysize, topP + boxysize * i, 0, i + 1, 0));
    }
    i++;
  });

  i = 0;
  vertW.forEach(ve => {
    if (ve[ve.length - 1] == 0 || ve[ve.length - 1] == -1) {
      //console.log("house at the right");
      houses.push(CreateHouseData(leftP + boxysize * (ve.length - 1), topP + boxysize * i, ve.length, i + 1, 0));
    }
    i++;
  });
  if (ifWin) {
    houses[getRandomInt(houses.length)].win_or_lose = -1;
  }
}


function CreateHouseData(pos_x, pos_y, tile_X, tile_Y, win_lose_indicator) {

  var house = {
    left: pos_x,
    top: pos_y,
    houseImageSource: houseImages[getRandomInt(houseImages.length)],
    tileX: tile_X,
    tileY: tile_Y,
    win_or_lose: win_lose_indicator,
    hasBeenVisited: false
  };

  return house;

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function TileCoordToTileNumber(matrixNumber, tile_x, tile_y) {
  if (tile_x > matrixNumber || tile_x < 1) { return -1; }
  if (tile_y > matrixNumber || tile_y < 1) { return -1; }
  else { return tile_x + (tile_y - 1) * matrixNumber; }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    left: 0,
    top: 0,
    width: WIDTH,
    height: HEIGHT,
    //borderColor: "blue",
    //borderWidth: 2,
  }
});
