import React, { PureComponent } from "react";
import { StyleSheet,Text, View,Image } from "react-native";

class Circle1 extends PureComponent {
  render() {
    const x =this.props.posX;
    const pi = this.props.pi;
    const dots = this.props.dots;
    var cc=0;
    return (
      
     // <View style={[styles.circle, { left: 0-2, top: 0 }]} />
      dots.map((n, key) => (<View key={key} style={[styles.circle, { left: x, top: n , borderColor: "rgba(158, 0, 0, 1.0)"}]} />))
     // houses.map((n, key) => (<Image source={n.houseImageSource} key={key} style={[styles.house1, { width: boxysize, height: boxysize, left: n.left, top: n.top }]} />))
    );
  }
}
 


class PrizeBox1 extends PureComponent {
  render() {
    const posX = this.props.posX;
    const WIDTH = this.props.WIDTH;
    const HEIGHT = this.props.HEIGHT;
    const boxImg = this.props.boxImg;
    const tx = this.props.tx;
    const img=this.props.img;
    
    
    const hgt = (HEIGHT/6);
    const y = HEIGHT/2-hgt/2;
    const wdt=WIDTH*0.87;
    const dm=(HEIGHT/6)-(HEIGHT/6)/4;
    const x = posX +(WIDTH-wdt)/2;
    
    const marg = hgt/8;

    const x1 =posX+ WIDTH/2-(dm/2)-dm-marg;
    const x2 =posX+ WIDTH/2-(dm/2);
    const x3 =posX+ WIDTH/2-(dm/2)+dm+marg;

    const wdt3 = dm*2;
    const hgt3 = marg*3;
  
    
    return (
      <View>
      <Image source={boxImg} style={[styles.rect2, { left: x, top: y, width:wdt, height:hgt+hgt3,borderWidth: 1,borderRadius:8 }]} />
      <Image source={img}  style={[styles.rect2, { left: x1, top: y+marg, width: dm, height:dm,borderWidth: 1,borderRadius:8 }]} />
      <Image source={img}  style={[styles.rect2, { left: x2, top: y+marg, width: dm, height:dm,borderWidth: 1,borderRadius:8 }]} />
      <Image source={img}  style={[styles.rect2, { left: x3, top: y+marg, width: dm, height:dm,borderWidth: 1,borderRadius:8 }]} />
      <Text adjustsFontSizeToFit={true} style={[styles.rect, {left:x2-wdt3/4,top: y+dm+marg+marg/2,  width: wdt3, height: hgt3,fontSize:20,textAlign: 'center',textAlignVertical: "center",fontWeight: 'bold',color: "#338"}]}> {""+tx}</Text>
     </View>
    
    );
  }
}



class Rend1 extends PureComponent {
  render() {
    const x = this.props.posX;
    const width = this.props.width;
    const y = 10;//this.props.position[1] - RADIUS / 2;
    const shots=this.props.shots;
    const tx = this.props.tx;
    return (
      
      <Text adjustsFontSizeToFit={true} style={[styles.rect, {left:x,top:y,  width: width, height: 35,fontSize:18,textAlign: 'center',textAlignVertical: "center",fontWeight: 'bold',color: "#338",borderColor: "#338",backgroundColor:"#e7f3f2",borderWidth: 2,borderRadius:8}]}> {shots+" "+tx}</Text>
    );
  }
}

class TheBackground extends PureComponent {

  render() {
    let backgroundImage = this.props.BGimage;
    const WIDTH = this.props.WIDTH;
    const HEIGHT = this.props.HEIGHT;
    return (
      <Image source={backgroundImage} style={[styles.rect, { width: WIDTH, height: HEIGHT }]} />

    );
  }
}

class RendZ extends PureComponent {

  render() {
    let rImg = this.props.rImg;
    const x = this.props.posX;
    const y = this.props.posY;
    const WIDTH = this.props.WIDTH;
    const HEIGHT = this.props.HEIGHT;
    return (
      <Image source={rImg} style={[styles.rect, {left:x,top:y, width: WIDTH, height: HEIGHT }]} />

    );
  }
}




class Rend2 extends PureComponent {
  render() {
   // const x = this.props.position[0];
    const y = this.props.posY;
    const boxysize =this.props.boxysize;
    const arrHeight=this.props.arrHeight;
    const arrowImage = this.props.arrowImage;

    const box = this.props.box;
    var rt = this.props.rt;
    return (
      <Image source={arrowImage} style={[styles.rect, { transform: [{rotate: rt}],left: box.x, top: y,width:boxysize,height:arrHeight }]} />
    );
  }
}

class Rend4 extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const x = this.props.body.position.x;
    const y = this.props.body.position.y;
    const balloonImage = this.props.theImage;
    const wd=this.props.wd;
    const ht=this.props.ht;
    var refresh=this.props.refresh;
    var x1=x-(wd/2);
    var y1=y-(ht/2);
    var rt = ""+Math.floor(this.props.body.angle*180/Math.PI)+"deg";
    return (
      <Image source={balloonImage} style={[styles.rect, { left:x1, top: y1,width:wd,height:ht }]} />
      );
  }
}



class Rend3 extends PureComponent {
  render() {
    const x = this.props.posX;
    const y = this.props.posY;
    const bllwidth =this.props.bllwidth;
    const blHeight=this.props.blHeight;
    const balloonImage = this.props.balloonImage;
    var rt = this.props.rt;

    return (
      <Image source={balloonImage} style={[styles.rect, {transform: [{rotate: rt}], left: x, top: y,width:bllwidth,height:blHeight }]} />
      );
  }
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
 
const styles = StyleSheet.create({
  circle: {
    //borderColor: "#338",//'rgba(158, 0, 0, 1.0)'
    borderWidth: 1,
    borderRadius: 4 * 2,
    width: 4 * 1,
    height: 4 * 1,
    backgroundColor: "pink",
    position: "absolute"
  },
  rect: {
    //borderColor: "#CCC",
    //borderWidth: 4,
    //backgroundColor: "pink",
    position: "absolute"
  },
  rect2: {
    borderColor: "#338",
    backgroundColor:"#e7f3f2",
    
    //borderColor: "#CCC",
    //borderWidth: 4,
    //backgroundColor: "pink",
    position: "absolute"
  }
});
 
export { TheBackground };
export { Rend4 };
export { RendZ };