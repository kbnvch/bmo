import React, { PureComponent } from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";

/// set up screen:
import { CalculateScreen } from './screen';
var ScreenData = null;
var WIDTH = 0;
var HEIGHT = 0;
var resizer = 0;
var boxysize = 0;
var leftP = 0;
var topP = 0;



var cellColor = "#0000";
export function setValuesRend(matrix_number) {
  ScreenData = CalculateScreen(matrix_number);
  WIDTH = ScreenData.WIDTH;
  HEIGHT = ScreenData.HEIGHT;
  resizer = ScreenData.resizer;
  boxysize = ScreenData.boxysize;
  leftP = ScreenData.leftP;
  topP = ScreenData.topP;

}

class TheBackground extends PureComponent {

  render() {
    let backgroundImage = this.props.BGimage;
    return (
      <Image source={backgroundImage} style={[styles.bgImage, { width: WIDTH, height: HEIGHT }]} />

    );
  }
}
class ThePlayer extends PureComponent {

  render() {
    const x = this.props.position[0];
    const y = this.props.position[1];
    const playerImageSource = this.props.playerImageSource;
    const playerStartX = this.props.playerStartX;
    const playerStartY = this.props.playerStartY;
    const empty = this.props.empty;
    const rt = this.props.rt;
    var plImgNr = this.props.plImgNr;
    if (plImgNr > playerImageSource.length - 1) {
      plImgNr = playerImageSource.length - 1;
    }
    var pimg = playerImageSource[plImgNr];
    if (empty) {
      pimg = this.props.emptyImage;
    }
    return (
      <Image source={pimg} style={[styles.player, { transform: [{ rotate: rt }], width: boxysize, height: boxysize, left: x + leftP + (playerStartX - 1) * boxysize, top: y + topP + (playerStartY - 1) * boxysize }]} />
    );
  }
}

class TheHouses extends PureComponent {

  render() {
    var houses = this.props.housesArray;

    return (

      houses.map((n, key) => (<Image source={n.houseImageSource} key={key} style={[styles.house1, { width: boxysize, height: boxysize, left: n.left, top: n.top }]} />))

    );
  }
}
class AnimationRend extends PureComponent {

  render() {
    const x = this.props.x;
    const y = this.props.y;
    const dm = this.props.dm;
    const img = this.props.img;
    return (
      <Image source={img} style={[styles.house1, { width: dm, height: dm, left: x, top: y }]} />
    );
  }
}



class TheMaze extends PureComponent {

  render() {
    const horzW = this.props.HorizontalWalls;
    const vertW = this.props.VerticalWalls;
    const mazeImages = this.props.mazeImgs;
    var imgNr = this.props.tileNumber;
    var max = this.props.matrixNumber;
    max = max * max;
    //console.log("tlNr="+imgNr+",  max="+max);
    if (imgNr > 0 && imgNr < max + 1) {
      mazeImages[imgNr - 1] = this.props.floorImg;
    }
    var tiles = [];

    var n = 0;
    for (let i = 0; i < vertW.length; i++) {
      for (let l = 0; l < horzW[0].length; l++) {
        tiles.push(
          <View key={n} style={[{ left: leftP + boxysize * l, top: topP + boxysize * i, width: boxysize + vertW[i][l] + vertW[i][l + 1], height: boxysize + horzW[i][l] + horzW[i + 1][l], overflow: 'hidden', position: 'absolute' }]} ><Image source={mazeImages[n]} style={{ marginLeft: boxysize * l * (-1), marginTop: boxysize * i * (-1), width: WIDTH * resizer, height: WIDTH * resizer }} /></View>
        );
        n++;
      }
    }

    return (
      <View>{tiles}</View>
    );
  }
}

class TheWalls extends PureComponent {

  render() {
    const horzW = this.props.HorizontalWalls;
    const vertW = this.props.VerticalWalls;

    const wallsColors = this.props.wallsColors;
    const visibleColor = this.props.visibleColor;
    var imgNr = this.props.tileNumber;
    var max = this.props.matrixNumber
    max = max * max;
    if (imgNr > 0 && imgNr < max + 1) {
      wallsColors[imgNr - 1] = visibleColor;
    }
    var tiles = [];
    var n = 0;
    for (let i = 0; i < vertW.length; i++) {
      for (let l = 0; l < horzW[0].length; l++) {
        tiles.push(
          <View key={n} style={[{ left: leftP + boxysize * l, top: topP + boxysize * i, borderLeftWidth: vertW[i][l], borderRightWidth: vertW[i][l + 1], borderTopWidth: horzW[i][l], borderBottomWidth: horzW[i + 1][l], width: boxysize, height: boxysize, backgroundColor: cellColor, position: "absolute", overflow: 'hidden', borderLeftColor: wallsColors[n], borderRightColor: wallsColors[n], borderTopColor: wallsColors[n], borderBottomColor: wallsColors[n] }]} ></View>
        );
        n++;
      }
    }

    return (
      <View>{tiles}</View>
    );
  }
}





const styles = StyleSheet.create({

  player: {
    position: "absolute"
  },
  house1: {
    position: "absolute"
  },
  bgImage: {
    left: 0,
    top: 0,
    borderColor: "#EEE5",
    borderWidth: 1,
    position: "absolute"
  },
});

export { ThePlayer };
export { TheMaze };
export { TheBackground };
export { TheHouses };
export { TheWalls };
export { AnimationRend };