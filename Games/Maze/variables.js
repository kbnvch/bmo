const Variables = {

  // HERE IS MATRIX OF THE MAZE.
  // HERE WE CREATE ARRAY OF MAZE WALLS. 9 ARRAYS OF HORIZONTAL WALLS AND 8 ARRAYS OF VERTICAL WALS. 
  // IN TOTAL 17 ARRAYS OF WALLS. (NOTE THAT VERTICAL WALS ARE 9 AND HORIZONTAL 8). ZERO (0) MEANS NO WALL.
  // ANOTHER INTEGER FOR EXAMPLE 4 MEANS WALL WITH THINKNESS OF 4 PX. 
  // 
  //
  //houses are automatically created at the passage to outside of maze
  // 
  //please look at maze_matrix_example.jpg 
  // below is an example of 8x8 matrix
  
   MAZE_MATRIX:
   [
     [4, 4, 4, 0, 4, 4, 4, 4],
     [4, 0, 0, 0, 4, 0, 0, 0, 4],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 4, 0, 4, 0, 0, 0, 4],
     [4, 0, 4, 4, 0, 4, 4, 4],
     [4, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 4, 4, 4, 4, 0, 0, 4],
     [4, 0, 0, 0, 0, 0, 0, 4, 4],
     [4, 0, 0, 0, 0, 0, 0, 0],
     [4, 0, 4, 0, 0, 4, 0, 4, 4],
     [0, 4, 4, 4, 0, 0, 0, 0],
     [4, 4, 0, 0, 0, 4, 0, 4, 4],
     [0, 4, 4, 4, 0, 0, 0, 0],
     [4, 4, 0, 0, 0, 4, 0, 4, 4],
     [0, 0, 0, 0, 0, 0, 4, 0],
     [4, 0, 4, 0, 0, 4, 0, 0, 4],
     [4, 4, 0, 4, 4, 4, 4, 4]
   ],


  // here are example of 3x3 matrix
/**
  MAZE_MATRIX:
    [
      [4, 4, 0],
      [4, 4, 0, 4],
      [0, 0, 4],
      [0, 4, 0, 0],
      [0, 0, 4],
      [4, 0, 0, 4],
      [0, 4, 4]
    ],
 */

  // here are example of 4x4 matrix
  /**
      MAZE_MATRIX:
      [
        [4, 4, 0, 4],
        [4, 0, 4, 0, 4],
        [0, 0, 0, 4],
        [4, 0, 4, 0, 0],
        [0, 0, 0, 4],
        [0, 0, 4, 0, 0],
        [0, 0, 0, 4],
        [4, 0, 0, 0, 4],
        [4, 0, 4, 4]
      ],
  **/


  // HERE ARE IMAGE VARIABLES:

  Win:true, // desides if game is won or lost
  FloorImage: require("./pics/the_floor.png"),
  FogImage: require("./pics/the_fog.png"),
  BackgroundImage: require("./pics/grass.png"),
  EmptyImage: require("./pics/empty.png"),
  ExplosionImg:require("./pics/explosion1.png"),
  ExplosionImg2:require("./pics/explosion2.png"),
  LoseImages: [require("./pics/lose_pic00.png"),require("./pics/lose_pic01.png"),require("./pics/lose_pic02.png")],
  WinImages: [require("./pics/win_pic00.png"),require("./pics/win_pic01.png"),require("./pics/win_pic02.png")],

  PlayerImages1: [require("./pics/player1_0.png"),require("./pics/player1_1.png"),require("./pics/player1_2.png"),require("./pics/player1_3.png")],
  PlayerImages2: [require("./pics/player2_0.png"),require("./pics/player2_1.png"),require("./pics/player2_2.png"),require("./pics/player2_3.png")],
  //HERE WE SET ARRAY OF HOUSE IMAGES (app selects randomly one of pictrures from this array):

  HouseImages: [require("./pics/house01.png"), require("./pics/house02.png"), require("./pics/house03.png"), require("./pics/house04.png")],

  //HERE WE SET PLAYER START POSITION (first is number of a collumn, second is number of a row,  
  //for example 1 and  1  would mean player appears in top left cell

  PlayerStarPosition: [2, 3],

  // HERE WE SET COLLOR OF WALLS:

  ColorOfWalls: 'rgba(158, 0, 0, 1.0)'

};
export default Variables;
