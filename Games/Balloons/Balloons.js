
//first importing variables:
import Variables from './variables';

const shotText = Variables.ShotText;
const emptyImg = Variables.EmptyImage;
const ifWin = Variables.Win;
const winingImageNr = Variables.WiningImageNr;
const arrowImage = Variables.ArrowImage;
const balloonImage = Variables.BalloonImage;
const backgroundImage = Variables.BackgroundImage;
const emptyArrowImage = Variables.EmptyArrowImage;
const exp1 = Variables.BalloonExplodingImage;
const prizeImages = Variables.PrizeImages;
const boxBackgroundImage = Variables.BoxBackgroundImage;


//ZupaCollaImage
//

import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Image, StatusBar, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { TheBackground } from "./renderers";
import { Rend3 } from "./renderers";
import { Rend2 } from "./renderers";
import { Rend1 } from "./renderers";
import { Circle1 } from "./renderers";
import { PrizeBox1 } from "./renderers";
import { UpdLoop } from "./systems"
import { UpdateLoop } from "./systems"
import { UpdateLoop2 } from "./systems"
import {resetSys} from "./systems";


import appreg from './../../appRegistryController';
import { name as appName } from './../../app.json';
import App from './../../App';



import { CalculateScreen } from './screen';
const ScreenData = CalculateScreen(10);
const WIDTH = ScreenData.WIDTH;
const HEIGHT = ScreenData.HEIGHT;
const resizer = ScreenData.resizer;
const boxysize = ScreenData.boxysize;
const leftP = ScreenData.leftP;


const margin = ScreenData.margin;
const arrProportion = Image.resolveAssetSource(arrowImage).height / Image.resolveAssetSource(arrowImage).width;
const arrHeight = boxysize * arrProportion;
const topP = HEIGHT - arrHeight - arrHeight / 10;

const blProportion = Image.resolveAssetSource(balloonImage).height / Image.resolveAssetSource(balloonImage).width;
const bllwidth = boxysize * 1.5;//*2;
const blHeight = bllwidth * blProportion;
const balloons = makeBalloonData();
const diff = Math.abs(bllwidth - boxysize);
const seq = getRandSec();
const balloonArea = HEIGHT * 0.65;
const arrBox = getArrowBoxes();
const ballBox = getBalloonBoxes();
const prizProportion = Image.resolveAssetSource(prizeImages[0]).height / Image.resolveAssetSource(prizeImages[0]).width;
const expProportion = Image.resolveAssetSource(exp1).height / Image.resolveAssetSource(exp1).width;
const binary = [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0];
const bloons = [13, 18, 11, 16, 14, 19, 20, 17, 12, 15];
var przNrs = [];

var theprops;
var this1;
var runnin = true;
var syst1 = [UpdateLoop,UpdateLoop2];

export default class Balloons extends PureComponent {
  constructor(props) {
    super(props);
    theprops = props;
    console.log("starting game");
    this1 = this;




    if (ifWin == false) {
      getRandomPrizesNoWin();
    } else {
      getPrizesWin(winingImageNr);
    }
    console.log("   " + przNrs);

    //  for (let i = 0; i < 200; i++) {
    //   getRandomPrizesNoWin();
    //    console.log("   "+przNrs);

    //  }
  }
  componentWillUnmount() {
    przNrs = [];
    theprops = undefined;
    this1 = undefined;
    runnin = true;
    resetSys();

    console.log("unmounting!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  }

  render() {
    if (runnin) {
      return (
        <GameEngine
          style={styles.container}
          systems={syst1}
          entities={{
            0: { WIDTH: WIDTH, HEIGHT: HEIGHT, BGimage: backgroundImage, renderer: <TheBackground /> },


            11: { p: getRand3(), p2: getRand3(), prizProport: prizProportion, rt: "0deg", mult: blProportion, posX: ballBox[0].x, posY: ballBox[0].y, exp: exp1, box: ballBox[0], balloons: balloons, bNr: 1, balloonImage: balloonImage, bllwidth: bllwidth, blHeight: blHeight, renderer: <Rend3 /> },
            12: { p: getRand3(), p2: getRand3(), prizProport: prizProportion, rt: "0deg", mult: blProportion, posX: ballBox[1].x, posY: ballBox[1].y, exp: exp1, box: ballBox[1], balloons: balloons, bNr: 2, balloonImage: balloonImage, bllwidth: bllwidth, blHeight: blHeight, renderer: <Rend3 /> },
            13: { p: getRand3(), p2: getRand3(), prizProport: prizProportion, rt: "0deg", mult: blProportion, posX: ballBox[2].x, posY: ballBox[2].y, exp: exp1, box: ballBox[2], balloons: balloons, bNr: 3, balloonImage: balloonImage, bllwidth: bllwidth, blHeight: blHeight, renderer: <Rend3 /> },
            14: { p: getRand3(), p2: getRand3(), prizProport: prizProportion, rt: "0deg", mult: blProportion, posX: ballBox[3].x, posY: ballBox[3].y, exp: exp1, box: ballBox[3], balloons: balloons, bNr: 4, balloonImage: balloonImage, bllwidth: bllwidth, blHeight: blHeight, renderer: <Rend3 /> },
            15: { p: getRand3(), p2: getRand3(), prizProport: prizProportion, rt: "0deg", mult: blProportion, posX: ballBox[4].x, posY: ballBox[4].y, exp: exp1, box: ballBox[4], balloons: balloons, bNr: 5, balloonImage: balloonImage, bllwidth: bllwidth, blHeight: blHeight, renderer: <Rend3 /> },
            16: { p: getRand3(), p2: getRand3(), prizProport: prizProportion, rt: "0deg", mult: blProportion, posX: ballBox[5].x, posY: ballBox[5].y, exp: exp1, box: ballBox[5], balloons: balloons, bNr: 6, balloonImage: balloonImage, bllwidth: bllwidth, blHeight: blHeight, renderer: <Rend3 /> },
            17: { p: getRand3(), p2: getRand3(), prizProport: prizProportion, rt: "0deg", mult: blProportion, posX: ballBox[6].x, posY: ballBox[6].y, exp: exp1, box: ballBox[6], balloons: balloons, bNr: 7, balloonImage: balloonImage, bllwidth: bllwidth, blHeight: blHeight, renderer: <Rend3 /> },
            18: { p: getRand3(), p2: getRand3(), prizProport: prizProportion, rt: "0deg", mult: blProportion, posX: ballBox[7].x, posY: ballBox[7].y, exp: exp1, box: ballBox[7], balloons: balloons, bNr: 8, balloonImage: balloonImage, bllwidth: bllwidth, blHeight: blHeight, renderer: <Rend3 /> },
            19: { p: getRand3(), p2: getRand3(), prizProport: prizProportion, rt: "0deg", mult: blProportion, posX: ballBox[8].x, posY: ballBox[8].y, exp: exp1, box: ballBox[8], balloons: balloons, bNr: 9, balloonImage: balloonImage, bllwidth: bllwidth, blHeight: blHeight, renderer: <Rend3 /> },
            20: { p: getRand3(), p2: getRand3(), prizProport: prizProportion, rt: "0deg", mult: blProportion, posX: ballBox[9].x, posY: ballBox[9].y, exp: exp1, box: ballBox[9], balloons: balloons, bNr: 10, balloonImage: balloonImage, bllwidth: bllwidth, blHeight: blHeight, renderer: <Rend3 /> },

            21: { winNr: winingImageNr, WIDTH: WIDTH, margin: (balloonArea / 3) / 4, balloonArea: balloonArea * 0.93, bloons: bloons, binary: binary, Win: Win, Lose: Lose, emptyImg: emptyImg, ifWin: ifWin, numberWent: 0, przNrs: przNrs, prizes: prizeImages, expProportion: expProportion },

            22: { posX: WIDTH / 4, width: WIDTH / 2, shots: 5, tx: shotText, renderer: <Rend1 /> },
            23: { posX: 0, pi: 0, dots: [], renderer: <Circle1 /> },
            24: { boxImg: boxBackgroundImage, img: emptyImg, posX: WIDTH, tx: "You win !", WIDTH: WIDTH, HEIGHT: HEIGHT, renderer: <PrizeBox1 /> },

            25: { p: getRandPosNeg(), rt: "0deg", went: false, posY: arrBox[0].y, box: arrBox[0], empty: emptyArrowImage, boxysize: boxysize, arrHeight: arrHeight, arrowImage: arrowImage, renderer: <Rend2 /> },
            26: { p: getRandPosNeg(), rt: "0deg", went: false, posY: arrBox[1].y, box: arrBox[1], empty: emptyArrowImage, boxysize: boxysize, arrHeight: arrHeight, arrowImage: arrowImage, renderer: <Rend2 /> },
            27: { p: getRandPosNeg(), rt: "0deg", went: false, posY: arrBox[2].y, box: arrBox[2], empty: emptyArrowImage, boxysize: boxysize, arrHeight: arrHeight, arrowImage: arrowImage, renderer: <Rend2 /> },
            28: { p: getRandPosNeg(), rt: "0deg", went: false, posY: arrBox[3].y, box: arrBox[3], empty: emptyArrowImage, boxysize: boxysize, arrHeight: arrHeight, arrowImage: arrowImage, renderer: <Rend2 /> },
            29: { p: getRandPosNeg(), rt: "0deg", went: false, posY: arrBox[4].y, box: arrBox[4], empty: emptyArrowImage, boxysize: boxysize, arrHeight: arrHeight, arrowImage: arrowImage, renderer: <Rend2 /> },
            30: { p: getRandPosNeg(), rt: "0deg", went: false, posY: arrBox[5].y, box: arrBox[5], empty: emptyArrowImage, boxysize: boxysize, arrHeight: arrHeight, arrowImage: arrowImage, renderer: <Rend2 /> },
            31: { p: getRandPosNeg(), rt: "0deg", went: false, posY: arrBox[6].y, box: arrBox[6], empty: emptyArrowImage, boxysize: boxysize, arrHeight: arrHeight, arrowImage: arrowImage, renderer: <Rend2 /> },
            32: { p: getRandPosNeg(), rt: "0deg", went: false, posY: arrBox[7].y, box: arrBox[7], empty: emptyArrowImage, boxysize: boxysize, arrHeight: arrHeight, arrowImage: arrowImage, renderer: <Rend2 /> },
            33: { p: getRandPosNeg(), rt: "0deg", went: false, posY: arrBox[8].y, box: arrBox[8], empty: emptyArrowImage, boxysize: boxysize, arrHeight: arrHeight, arrowImage: arrowImage, renderer: <Rend2 /> },
            34: { p: getRandPosNeg(), rt: "0deg", went: false, posY: arrBox[9].y, box: arrBox[9], empty: emptyArrowImage, boxysize: boxysize, arrHeight: arrHeight, arrowImage: arrowImage, renderer: <Rend2 /> },



            pr1: {},
            pr2: {},
            pr3: {},
          }}>

          <StatusBar hidden={true} />

        </GameEngine>
      );
    }
    else {
      return (
      <GameEngine>
        <StatusBar hidden={true} />
      </GameEngine>);
    }
  }
}

function Win() {
  console.log("won!!!");
//do something
goBackToMainApp();
}

function Lose() {
  console.log("lost!!!");
//do something
goBackToMainApp();
}



function goBackToMainApp(){
  runnin = false;
  this1.forceUpdate();
  setTimeout( () => {
  appreg.registerComponent(appName, () => App);
  appreg.runApplication(appName,theprops);
  runnin = true;
 }, 2000);
}

function Place(stage) {
  let pl = seq[stage - 1];
  let third = balloonArea / 3;
  if (pl == 0) {
    return (third / 2 - third / 4 + getRandom(third / 2));
  }
  if (pl == 1) {
    return (third + third / 2 - third / 4 + getRandom(third / 2));
  }
  if (pl == 2) {
    return (third + third + third / 2 - third / 4 + getRandom(third / 2));
  }
  return 0;
}


function makeBalloonData() {

  return [mkBll(1), mkBll(2), mkBll(3), mkBll(4), mkBll(5), mkBll(6), mkBll(7), mkBll(8), mkBll(9), mkBll(10)];

}

function mkBll(bNr) {

  return { bNr: bNr, pos: [0, 0], isPlaced: false };

}
function getBalloonBoxes() {
  let arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  arr[0] = { x: leftP + margin * 0 + boxysize * 0 - (diff / 2), y: Place(1), x2: 0, y2: 0 };
  arr[1] = { x: leftP + margin * 1 + boxysize * 1 - (diff / 2), y: Place(2), x2: 0, y2: 0 };
  arr[2] = { x: leftP + margin * 2 + boxysize * 2 - (diff / 2), y: Place(3), x2: 0, y2: 0 };
  arr[3] = { x: leftP + margin * 3 + boxysize * 3 - (diff / 2), y: Place(1), x2: 0, y2: 0 };
  arr[4] = { x: leftP + margin * 4 + boxysize * 4 - (diff / 2), y: Place(2), x2: 0, y2: 0 };
  arr[5] = { x: leftP + margin * 5 + boxysize * 5 - (diff / 2), y: Place(3), x2: 0, y2: 0 };
  arr[6] = { x: leftP + margin * 6 + boxysize * 6 - (diff / 2), y: Place(1), x2: 0, y2: 0 };
  arr[7] = { x: leftP + margin * 7 + boxysize * 7 - (diff / 2), y: Place(2), x2: 0, y2: 0 };
  arr[8] = { x: leftP + margin * 8 + boxysize * 8 - (diff / 2), y: Place(3), x2: 0, y2: 0 };
  arr[9] = { x: leftP + margin * 9 + boxysize * 9 - (diff / 2), y: Place(1), x2: 0, y2: 0 };

  arr[0].x2 = arr[0].x + bllwidth;
  arr[1].x2 = arr[1].x + bllwidth;
  arr[2].x2 = arr[2].x + bllwidth;
  arr[3].x2 = arr[3].x + bllwidth;
  arr[4].x2 = arr[4].x + bllwidth;
  arr[5].x2 = arr[5].x + bllwidth;
  arr[6].x2 = arr[6].x + bllwidth;
  arr[7].x2 = arr[7].x + bllwidth;
  arr[8].x2 = arr[8].x + bllwidth;
  arr[9].x2 = arr[9].x + bllwidth;

  arr[0].y2 = arr[0].y + blHeight;
  arr[1].y2 = arr[1].y + blHeight;
  arr[2].y2 = arr[2].y + blHeight;
  arr[3].y2 = arr[3].y + blHeight;
  arr[4].y2 = arr[4].y + blHeight;
  arr[5].y2 = arr[5].y + blHeight;
  arr[6].y2 = arr[6].y + blHeight;
  arr[7].y2 = arr[7].y + blHeight;
  arr[8].y2 = arr[8].y + blHeight;
  arr[9].y2 = arr[9].y + blHeight;
  return arr;
}



function getRandomPrizesNoWin() {
  let nr = arrangePrizes();
  if (nr >= 3) {
    getRandomPrizesNoWin();
  }
}


function getPrizesWin(winNr) {
  przNrs = [];
  let wn = winNr;
  let arr = getRandomThree(5);


  if (wn < 0) {
    wn = getRandom(prizeImages.length);
  }

  przNrs.push(getRandomButNot(prizeImages.length, wn));
  przNrs.push(getRandomButNot(prizeImages.length, wn));
  przNrs.push(getRandomButNot(prizeImages.length, wn));
  przNrs.push(getRandomButNot(prizeImages.length, wn));
  przNrs.push(getRandomButNot(prizeImages.length, wn));

  arr.forEach(nr => {
    przNrs[nr] = wn;
  });
}


function getRandomThree(nr) {
  arr = [0, 0, 0];
  arr[0] = getRandom(nr);
  arr[1] = getRandom(nr);
  arr[2] = getRandom(nr);

  while (arr[1] == arr[2] || arr[1] == arr[0] || arr[2] == arr[0]) {
    arr[0] = getRandom(nr);
    arr[1] = getRandom(nr);
    arr[2] = getRandom(nr);
  }
  return arr;
}





function arrangePrizes() {
  przNrs = [];
  let element_ = 0;
  let max = 0;
  przNrs.push(getRandom(prizeImages.length));
  przNrs.push(getRandom(prizeImages.length));
  przNrs.push(getRandom(prizeImages.length));
  przNrs.push(getRandom(prizeImages.length));
  przNrs.push(getRandom(prizeImages.length));

  element_ = przNrs[0];
  przNrs.forEach(lm => {
    if (lm == element_) {
      max++;
    }
  });
  if (max > 2) {
    return max;
  }
  max = 0;
  element_ = przNrs[1];
  przNrs.forEach(lm => {
    if (lm == element_) {
      max++;
    }
  });
  if (max > 2) {
    return max;
  }
  max = 0;
  element_ = przNrs[2];
  przNrs.forEach(lm => {
    if (lm == element_) {
      max++;
    }
  });
  if (max > 2) {
    return max;
  }
  max = 0;
  element_ = przNrs[3];
  przNrs.forEach(lm => {
    if (lm == element_) {
      max++;
    }
  });
  if (max > 2) {
    return max;
  }
  max = 0;
  element_ = przNrs[4];
  przNrs.forEach(lm => {
    if (lm == element_) {
      max++;
    }
  });
  if (max > 2) {
    return max;
  }
  return max;
}

/**
 
  przNrs.forEach(element => {
    element_=element;
    max = 0;
    przNrs.forEach(lm => {
      if (lm == element_) {
        max++;
      }
    });
    if (max > 2) {
      return max;
    };
  });


 
 */



function getArrowBoxes() {
  let arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  arr[0] = { x: leftP + margin * 0 + boxysize * 0, y: topP, x2: leftP + margin * 0 + boxysize * 0 + boxysize, y2: topP + arrHeight };
  arr[1] = { x: leftP + margin * 1 + boxysize * 1, y: topP, x2: leftP + margin * 1 + boxysize * 1 + boxysize, y2: topP + arrHeight };
  arr[2] = { x: leftP + margin * 2 + boxysize * 2, y: topP, x2: leftP + margin * 2 + boxysize * 2 + boxysize, y2: topP + arrHeight };
  arr[3] = { x: leftP + margin * 3 + boxysize * 3, y: topP, x2: leftP + margin * 3 + boxysize * 3 + boxysize, y2: topP + arrHeight };
  arr[4] = { x: leftP + margin * 4 + boxysize * 4, y: topP, x2: leftP + margin * 4 + boxysize * 4 + boxysize, y2: topP + arrHeight };
  arr[5] = { x: leftP + margin * 5 + boxysize * 5, y: topP, x2: leftP + margin * 5 + boxysize * 5 + boxysize, y2: topP + arrHeight };
  arr[6] = { x: leftP + margin * 6 + boxysize * 6, y: topP, x2: leftP + margin * 6 + boxysize * 6 + boxysize, y2: topP + arrHeight };
  arr[7] = { x: leftP + margin * 7 + boxysize * 7, y: topP, x2: leftP + margin * 7 + boxysize * 7 + boxysize, y2: topP + arrHeight };
  arr[8] = { x: leftP + margin * 8 + boxysize * 8, y: topP, x2: leftP + margin * 8 + boxysize * 8 + boxysize, y2: topP + arrHeight };
  arr[9] = { x: leftP + margin * 9 + boxysize * 9, y: topP, x2: leftP + margin * 9 + boxysize * 9 + boxysize, y2: topP + arrHeight };

  return arr;
}

function getRandSec() {
  let arr = [0, 0, 0];
  arr[0] = getRandom(3);
  arr[1] = getRandom(3);
  arr[2] = getRandom(3);
  while (arr[0] == arr[1] || arr[1] == arr[2] || arr[0] == arr[2]) {
    arr[0] = getRandom(3);
    arr[1] = getRandom(3);
    arr[2] = getRandom(3);
  }

  return arr;
}
function getRandomButNot(max, nr) {
  let n = nr;
  while (n == nr) {
    n = Math.floor(Math.random() * Math.floor(max));
  }
  return n;
}

function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRand3() {
  let p = Math.floor(Math.random() * Math.floor(3));
  if (p == 0) {
    return -1;
  }
  else if (p == 1) {
    return 0;
  }
  else if (p == 2) {
    return 1;
  }
}


function getRandPosNeg() {
  let p = Math.floor(Math.random() * Math.floor(2));
  if (p > 0) {
    return 1;
  }
  else {
    return -1;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});