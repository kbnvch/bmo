import { Dimensions } from "react-native";

const ScreenData = CalculateScreen(51);
export default ScreenData;

export function CalculateScreen(matrixNumber) {

  const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
  //resizer tells how much of screen width (or height if runs in lansdcape) maze will take up

  const resizer = 0.85;
  //boxysixe determines the size of one maze cell
  const boxysize = resizer * WIDTH / matrixNumber;
  const margin = boxysize/10;
  const leftP = ((WIDTH - WIDTH * resizer) / 2)-(margin*9/2);
  //const topP = (WIDTH - WIDTH * resizer);
  return { WIDTH: WIDTH, HEIGHT: HEIGHT, resizer: resizer, boxysize: boxysize, leftP: leftP, margin:margin };
}