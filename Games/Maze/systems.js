
import { Dimensions } from "react-native";
import { CalculateScreen } from './screen';
var ScreenData = null;
var boxysize;

let speed = 3;
let xDir = 0;
let yDir = 0;
let dX = 0;
let dY = 0;
let shoudRunAlone = false;
let getBack = false;


var horzW = [];
var vertW = [];
var isGameRunning = true;
var matrixNr;
var lsNr = 0;
var animate = false;
var animate2 = false;
var animate3 = false;
var playDead = false;
var explosion = false;
var pause = false;
var vk = 0;
var dg = 0;
var hX = 0;
var hY = 0;
var hdm = boxysize;
var himg = null;

export function setValuesSys(matrix_number) {
  ScreenData = CalculateScreen(matrix_number);
  boxysize = ScreenData.boxysize;
  matrixNr = matrix_number;
  if (matrixNr > 8) {
    speed = speed - 1;
  }

  xDir = 0;
  yDir = 0;
  dX = 0;
  dY = 0;
  shoudRunAlone = false;
  getBack = false;


  horzW = [];
  vertW = [];
  isGameRunning = true;
  lsNr = 0;
  animate = false;
  animate2 = false;
  animate3 = false;
  playDead = false;
  explosion = false;
  pause = false;
  vk = 0;
  dg = 0;
  hX = 0;
  hY = 0;
  hdm = boxysize;
  himg = null;
}


const AnimationLoop2 = (entities) => {

  if (explosion) {
    entities.vidEnt.x -= 7;
    entities.vidEnt.y -= 7;
    entities.vidEnt.dm += 14;
    vk++;
    if (vk > 7) {
      entities.vidEnt.x -= 10;
      entities.vidEnt.y -= 10;
      entities.vidEnt.dm += 20;
      explosion = false;
      pause = true;
      vk = 0;
    }
    return entities;
  }
  if (pause) {
    vk++;
    if (vk > 6) {
      pause = false;
      animate = true;
      entities.vidEnt.x = hX;
      entities.vidEnt.y = hY;
      entities.vidEnt.dm = hdm;
      entities.vidEnt.img = himg;
      vk = 0;
    }
    return entities;
  }
  if (animate) {

    entities.vidEnt.x -= 5;
    entities.vidEnt.y -= 5;
    entities.vidEnt.dm += 10;
    vk++;
    if (vk > 10) {
      animate = false;
      animate2 = true;
      vk = 0;
    }
    return entities;
  }
  if (animate2) {
    vk++;
    if (vk > 6) {
      animate2 = false;
      animate3 = true;
      vk = 0;
    }
    return entities;
  }
  if (animate3) {
    entities.vidEnt.x += 5;
    entities.vidEnt.y += 5;
    entities.vidEnt.dm -= 10;
    vk++;
    if (vk > 10) {
      animate3 = false;
      entities.vidEnt.img = entities.playerEntity.emptyImage;
      vk = 0;
    }
    return entities;
  }
  if (playDead) {
    entities.playerEntity.rt = "" + dg + "deg";
    dg += 5;
    vk++;
    if (vk > 72) {
      playDead = false;
      entities.housesEntity.LoseFunct();
      vk = 0;
    }
    return entities;
  }

  return entities;
}

const UpdateLoop = (entities, { touches }) => {

  let playerEnt = entities.playerEntity;
  horzW = playerEnt.HorizontalWalls;
  vertW = playerEnt.VerticalWalls;

  let move = touches.find(x => x.type === "move");
  let playerEntity = entities.playerEntity;
  let mazeEntity = entities.mazeEntity;




  if ((move || shoudRunAlone) && isGameRunning) {


    if (shoudRunAlone == false) {

      xDir = move.delta.pageX;
      yDir = move.delta.pageY;

      xDir = Math.abs(xDir);
      yDir = Math.abs(yDir);

      if (xDir != 0 && xDir < yDir && yDir / xDir > 6) {
        xDir = 0;
        yDir = move.delta.pageY;
      }
      else if (yDir != 0 && yDir < xDir && xDir / yDir > 6) {
        yDir = 0;
        xDir = move.delta.pageX;
      } else {
        xDir = 0;
        yDir = 0;
      }

    }
    if (xDir != 0 || yDir != 0) {
      shoudRunAlone = true;
    }

    if (xDir > 0) {
      xDir = 1 * speed;
    } else if (xDir < 0) {
      xDir = -1 * speed;
    } else if (yDir > 0) {
      yDir = 1 * speed;
    } else if (yDir < 0) {
      yDir = -1 * speed;
    }

    // check if there is a wall

    if (xDir > 0 && IfForbidenToGoRIGHT(playerEntity)) {
      dX = 0;
      dY = 0;
      xDir = 0;
      yDir = 0;
      shoudRunAlone = false;
    } else if (xDir < 0 && IfForbidenToGoLEFT(playerEntity)) {
      dX = 0;
      dY = 0;
      xDir = 0;
      yDir = 0;
      shoudRunAlone = false;
    } else if (yDir > 0 && IfForbidenToGoDOWN(playerEntity)) {
      dX = 0;
      dY = 0;
      xDir = 0;
      yDir = 0;
      shoudRunAlone = false;
    } else if (yDir < 0 && IfForbidenToGoUP(playerEntity)) {
      dX = 0;
      dY = 0;
      xDir = 0;
      yDir = 0;
      shoudRunAlone = false;
    }





    dY = dY + yDir;
    dX = dX + xDir;

    if (playerEntity && playerEntity.position) {
      playerEntity.position = [
        playerEntity.position[0] + xDir,
        playerEntity.position[1] + yDir
      ];
    }

    if (shoudRunAlone == true && (Math.abs(dX) >= boxysize || Math.abs(dY) >= boxysize)) {

      if (xDir > 0) {
        playerEntity.currentTileX = playerEntity.currentTileX + 1;
      } else if (xDir < 0) {
        playerEntity.currentTileX = playerEntity.currentTileX - 1;
      } else if (yDir > 0) {
        playerEntity.currentTileY = playerEntity.currentTileY + 1;
      } else if (yDir < 0) {
        playerEntity.currentTileY = playerEntity.currentTileY - 1;
      }
      dX = 0;
      dY = 0;
      xDir = 0;
      yDir = 0;
      shoudRunAlone = false;

      if (mazeEntity && mazeEntity.mazeImgs && mazeEntity.floorImg) {

        let tlNr = TileCoordToTileNumber(mazeEntity.matrixNumber, playerEntity.currentTileX, playerEntity.currentTileY);
        mazeEntity.tileNumber = tlNr
        entities.wallsEntity.tileNumber = tlNr;
      }

      if (getBack) {
        getBack = false;
      }
      if (playerEntity.lossCount > 2) {
        playDead = true;
        isGameRunning = false;

      }

      IfHouseIsReached(entities);
    }
  }


  return entities;
};



function IfForbidenToGoUP(playerEntity) {
  for (let i = 0; i < matrixNr; i++) {
    if (playerEntity.currentTileY == (i + 1) && horzW[i][playerEntity.currentTileX - 1] > 0) {
      return true;
    }
  }
  if (playerEntity.currentTileY < 1 || playerEntity.currentTileX < 1 || playerEntity.currentTileX > matrixNr) {
    return true;
  }
  return false;
}

function IfForbidenToGoDOWN(playerEntity) {
  for (let i = 0; i < matrixNr; i++) {
    if (playerEntity.currentTileY == (i + 1) && horzW[i + 1][playerEntity.currentTileX - 1] > 0) {
      return true;
    }
  }
  if (playerEntity.currentTileY > matrixNr || playerEntity.currentTileX < 1 || playerEntity.currentTileX > matrixNr) {
    return true;
  }
  return false;
}

function IfForbidenToGoRIGHT(playerEntity) {

  for (let i = 0; i < matrixNr; i++) {
    if (playerEntity.currentTileY == (i + 1) && vertW[i][playerEntity.currentTileX] > 0) {
      return true;
    }
  }
  if (playerEntity.currentTileY > matrixNr || playerEntity.currentTileY < 1 || playerEntity.currentTileX > matrixNr) {
    return true;
  }
  return false;
}

function IfForbidenToGoLEFT(playerEntity) {

  for (let i = 0; i < matrixNr; i++) {
    if (playerEntity.currentTileY == (i + 1) && vertW[i][playerEntity.currentTileX - 1] > 0) {
      return true;
    }
  }
  if (playerEntity.currentTileY > matrixNr || playerEntity.currentTileY < 1 || playerEntity.currentTileX < 1) {
    return true;
  }
  return false;
}

function TileCoordToTileNumber(matrixNumber, tile_x, tile_y) {
  if (tile_x > matrixNumber || tile_x < 1) { return -1; }
  if (tile_y > matrixNumber || tile_y < 1) { return -1; }
  else { return tile_x + (tile_y - 1) * matrixNumber; }
}

function IfHouseIsReached(entities) {
  let housesEntity = entities.housesEntity;
  let playerEntity = entities.playerEntity;
  let ve = entities.vidEnt;
  let houses = housesEntity.housesArray;
  let winImage = housesEntity.winImg;

  let loseImage = housesEntity.loseImg[lsNr];
  houses.forEach(house => {
    if (house.tileX == playerEntity.currentTileX && house.tileY == playerEntity.currentTileY) {
      if (house.win_or_lose < 0) {
        house.houseImageSource = winImage;
        housesEntity.housesArray = houses;
        housesEntity.reRender = housesEntity.reRender + 1;

        ve.x = house.left;
        ve.y = house.top;
        ve.dm = boxysize;
        ve.img = ve.exp2;


        hX = house.left;
        hY = house.top;
        hdm = boxysize;
        himg = winImage;
        explosion = true;
        playerEntity.empty = true;
        isGameRunning = false;
        setTimeout(() => {
          housesEntity.WinFunct();
        }, 2000);
        

      }
      else {
        housesEntity.housesArray = houses;
        housesEntity.reRender = housesEntity.reRender + 1;
        if (house.hasBeenVisited == false) {
          house.houseImageSource = loseImage;

          ve.x = house.left;
          ve.y = house.top;
          ve.dm = boxysize;
          ve.img = ve.exp1;


          hX = house.left;
          hY = house.top;
          hdm = boxysize;
          himg = loseImage;
          explosion = true;

          playerEntity.lossCount++;
          shoudRunAlone = true;
          getBack = true;
          if (playerEntity.currentTileX < 1) {
            xDir = 1.0;
          }
          else if (playerEntity.currentTileX > matrixNr) {
            xDir = -1.0;
          }
          if (playerEntity.currentTileY > matrixNr) {
            yDir = -1.0;
          }
          else if (playerEntity.currentTileY < 1) {
            yDir = 1.0;
          }



          lsNr++;
          if (lsNr > housesEntity.loseImg.length - 1) {
            lsNr = housesEntity.loseImg.length - 1;
          }
          house.hasBeenVisited = true;
          housesEntity.numberOfHouses--;
          playerEntity.plImgNr = playerEntity.plImgNr + 1;
        }

        if (housesEntity.numberOfHouses == 0) {
          // isGameRunning = false;
          // housesEntity.LoseFunct();
        }
      }

    }
  });

}


export { UpdateLoop };
export { AnimationLoop2 };