
//first importing variables:
import Variables from './variables';

const shotText = Variables.ShotText;
const emptyImg = Variables.EmptyImage;
const ifWin = Variables.Win;
const winingImageNr = Variables.WiningImageNr;
const arrowImage = Variables.ArrowImage;
const balloonImage = Variables.BalloonImage;


const groundImage = Variables.GroundImage;
const plankImage = Variables.PlankImage;
const pillarImage = Variables.PillarImage;
const boltImage = Variables.BoltImage;
const barrierImage = Variables.BarrierImage;
const rnb1Image = Variables.Rnb1Image;
const rnb2Image = Variables.Rnb2Image;
const redImage = Variables.RedImage;
const boxImage = Variables.BoxImage;
const wallImage = Variables.WallImage;
const roofImage = Variables.RoofImage;
const cageImage = Variables.CageImage;

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
import { Rend4 } from "./renderers";
import { RendZ } from "./renderers";
//import { Rend2 } from "./renderers";
//import { Rend1 } from "./renderers";
//import { Circle1 } from "./renderers";
//import { PrizeBox1 } from "./renderers";
//import { UpdLoop } from "./systems"
//import { UpdateLoop } from "./systems"
//import { UpdateLoop2 } from "./systems"
import { Physics } from "./systems2"
import { GameLoop } from "./systems2"
//import {resetSys} from "./systems";


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




const blProportion = Image.resolveAssetSource(balloonImage).height / Image.resolveAssetSource(balloonImage).width;
const bllwidth = boxysize * 1.5;//*2;
const blHeight = bllwidth * blProportion;



const grndProportion = Image.resolveAssetSource(groundImage).height / Image.resolveAssetSource(groundImage).width;
const grndHeight = WIDTH * grndProportion;


const brjProportion = Image.resolveAssetSource(barrierImage).height / Image.resolveAssetSource(barrierImage).width;
const brjwidth = boxysize;//*2;
const brjHeight = brjwidth * brjProportion;//rnb1Image

const rnb1Proportion = Image.resolveAssetSource(rnb1Image).height / Image.resolveAssetSource(rnb1Image).width;
var rnb1width = (WIDTH / 1.3 - boxysize);//*2;
console.log("starting rnb1width value: "+rnb1width+"   and proportion:"+(rnb1width/HEIGHT));
if ((rnb1width/HEIGHT)>0.39){
  rnb1width=0.39*HEIGHT;
  console.log("changing proportionsA.value: "+rnb1width);
}
const rnb1Height = rnb1width * rnb1Proportion;//rnb1Image

const rnb2Proportion = Image.resolveAssetSource(rnb2Image).height / Image.resolveAssetSource(rnb2Image).width;
var rnb2width = (WIDTH / 1.3 - boxysize);//*2;
if ((rnb2width/HEIGHT)>0.39){
  rnb2width=0.39*HEIGHT;
  console.log("changing proportionsB. Value: "+rnb2width);
}
const rnb2Height = rnb2width * rnb2Proportion;//rnb1Image



const plankProportion = Image.resolveAssetSource(plankImage).height / Image.resolveAssetSource(plankImage).width;
const plankwidth = (WIDTH / 2.2);
const plankHeight = plankwidth * plankProportion;//rnb1Image

const pillarProportion = Image.resolveAssetSource(pillarImage).height / Image.resolveAssetSource(pillarImage).width;
const pillarwidth = (plankHeight) * 1.06;
const pillarHeight = pillarwidth * pillarProportion;//rnb1Image

const margin = ScreenData.margin;
const arrProportion = Image.resolveAssetSource(arrowImage).height / Image.resolveAssetSource(arrowImage).width;
const arrWdt = (rnb1width / 3.5);
const arrHeight = arrWdt * arrProportion;
const topP = HEIGHT - arrHeight - arrHeight / 10;

const wallProportion = Image.resolveAssetSource(wallImage).height / Image.resolveAssetSource(wallImage).width;
const wallHeight = HEIGHT - grndHeight;//rnb1Image
const wallwidth = (wallHeight) / wallProportion;

const roofProportion = Image.resolveAssetSource(roofImage).height / Image.resolveAssetSource(roofImage).width;
const roofWidth = WIDTH;
const roofHeight = roofWidth * roofProportion;//rnb1Image

const cageProportion = Image.resolveAssetSource(cageImage).height / Image.resolveAssetSource(cageImage).width;
const cageWidth = WIDTH / 6;
const cageHeight = cageWidth * cageProportion;//rnb1Image


//barrierImage



const balloons = makeBalloonData();
const diff = Math.abs(bllwidth - boxysize);
const seq = getRandSec();
const balloonArea = HEIGHT * 0.65;
const arrBox = getArrowBoxes();
const ballBox = getBalloonBoxes();
const prizProportion = Image.resolveAssetSource(prizeImages[0]).height / Image.resolveAssetSource(prizeImages[0]).width;
const expProportion = Image.resolveAssetSource(exp1).height / Image.resolveAssetSource(exp1).width;
const expWidth=cageWidth;
const expHeight=expWidth*expProportion;
const binary = [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0];
const bloons = [13, 18, 11, 16, 14, 19, 20, 17, 12, 15];



var przNrs = [];

var theprops;
var this1;
var runnin = true;
//var syst1 = [UpdateLoop,UpdateLoop2];


import Matter from 'matter-js';

var systz;


export default class Chickens extends PureComponent {
  constructor(props) {
    super(props);
    theprops = props;
    console.log("starting game");
    this1 = this;
    systz = [Physics, GameLoop];



    if (ifWin == false) {
      getRandomPrizesNoWin();
    } else {
      getPrizesWin(winingImageNr);
    }
    console.log("   " + przNrs);
    console.log("rnb1width value: "+rnb1width);

  }
  componentWillUnmount() {
    przNrs = [];
    theprops = undefined;
    this1 = undefined;
    runnin = true;
    //resetSys();

    console.log("unmounting!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  }

  render() {
    if (runnin) {
      return (
        <GameEngine
          style={styles.container}
          systems={systz}
          entities={{
            0: { WIDTH: WIDTH, HEIGHT: HEIGHT, BGimage: backgroundImage, renderer: <TheBackground /> },
            ground1: { posX: 0, posY: HEIGHT - grndHeight, WIDTH: WIDTH, HEIGHT: grndHeight, rImg: groundImage, renderer: <RendZ /> },
            roof1: { posX: 0, posY: (0 - roofHeight / 2), WIDTH: roofWidth, HEIGHT: roofHeight, rImg: roofImage, renderer: <RendZ /> },
            wall1: { posX: 0 - wallwidth / 2, posY: 0, WIDTH: wallwidth, HEIGHT: wallHeight, rImg: wallImage, renderer: <RendZ /> },

            // barrier1:{ posX:(WIDTH/2)-(brjwidth/2),posY:100,WIDTH: brjwidth, HEIGHT: brjHeight, rImg: barrierImage, renderer: <RendZ /> },

            rnb1: { posX: WIDTH - rnb1width, posY: (rnb1Height * 1.2), WIDTH: rnb1width, HEIGHT: rnb1Height, rImg: rnb1Image, renderer: <RendZ /> },
            rnb2: { posX: WIDTH - rnb2width, posY: (rnb2Height * 1.2) + rnb1Height * 2, WIDTH: rnb2width, HEIGHT: rnb2Height, rImg: rnb2Image, renderer: <RendZ /> },
            /**
                 const x = this.props.posX;
                const y = this.props.posY;
                const bllwidth =this.props.bllwidth;
                const blHeight=this.props.blHeight;
                const balloonImage = this.props.balloonImage;
                var rt = this.props.rt; 
              
              
              
             
             */
            chicken1: { went: false, body: undefined, wd: arrWdt, ht: arrHeight, theImage: arrowImage, refresh: 0, rt: "0deg", renderer: <Rend4 /> },
            chicken2: { went: false, body: undefined, wd: arrWdt, ht: arrHeight, theImage: arrowImage, refresh: 0, rt: "0deg", renderer: <Rend4 /> },
            chicken3: { went: false, body: undefined, wd: arrWdt, ht: arrHeight, theImage: arrowImage, refresh: 0, rt: "0deg", renderer: <Rend4 /> },
            chicken4: { went: false, body: undefined, wd: arrWdt, ht: arrHeight, theImage: arrowImage, refresh: 0, rt: "0deg", renderer: <Rend4 /> },

            catapult5: { body: undefined, wd: plankwidth, ht: plankHeight, theImage: plankImage, refresh: 0, rt: "0deg", renderer: <Rend4 /> },
            stand6: { posX: 0, posY: 0, WIDTH: pillarwidth, HEIGHT: pillarHeight, rImg: pillarImage, renderer: <RendZ /> },
            ball7: { body: undefined, wd: pillarwidth * 1.8, ht: pillarwidth * 1.8, theImage: boltImage, refresh: 0, rt: "0deg", renderer: <Rend4 /> },

            cage1: { body: undefined, wd: cageWidth, ht: cageHeight, theImage: cageImage, refresh: 0, rt: "0deg", renderer: <Rend4 /> },
            cage2: { body: undefined, wd: cageWidth, ht: cageHeight, theImage: cageImage, refresh: 0, rt: "0deg", renderer: <Rend4 /> },
            cage3: { body: undefined, wd: cageWidth, ht: cageHeight, theImage: cageImage, refresh: 0, rt: "0deg", renderer: <Rend4 /> },
            cage4: { body: undefined, wd: cageWidth, ht: cageHeight, theImage: cageImage, refresh: 0, rt: "0deg", renderer: <Rend4 /> },
            cage5: { body: undefined, wd: cageWidth, ht: cageHeight, theImage: cageImage, refresh: 0, rt: "0deg", renderer: <Rend4 /> },
            //  cage5: { body:undefined,wd:cageWidth,ht:cageHeight,theImage: cageImage,refresh:0,rt:"0deg", renderer: <Rend4 /> },

            expl1: { posX:-1000, posY: -1000, WIDTH: expWidth, HEIGHT: expHeight, rImg: exp1, renderer: <RendZ /> },
            expl2: { posX:-1000, posY: -1000, WIDTH: expWidth, HEIGHT: expHeight, rImg: exp1, renderer: <RendZ /> },
            expl3: { posX:-1000, posY: -1000, WIDTH: expWidth, HEIGHT: expHeight, rImg: exp1, renderer: <RendZ /> },
            expl4: { posX:-1000, posY: -1000, WIDTH: expWidth, HEIGHT: expHeight, rImg: exp1, renderer: <RendZ /> },
            expl5: { posX:-1000, posY: -1000, WIDTH: expWidth, HEIGHT: expHeight, rImg: exp1, renderer: <RendZ /> },


            chicken99: { body: undefined, wd: arrWdt, ht: arrHeight, theImage: boxImage, refresh: 0, rt: "0deg", renderer: <Rend4 /> },

            store: { wd: WIDTH, ht: HEIGHT },


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



function goBackToMainApp() {
  runnin = false;
  this1.forceUpdate();
  setTimeout(() => {
    appreg.registerComponent(appName, () => App);
    appreg.runApplication(appName, theprops);
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