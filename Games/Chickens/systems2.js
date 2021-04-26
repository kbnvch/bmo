import Matter from 'matter-js';

var da = true;
var engine;

const Physics = (entities, { time }) => {
  if (da && entities.chicken1) {
    
    engine = Matter.Engine.create({ enableSleeping: true });
    let wrld1 = engine.world;
    let wd= entities.chicken1.wd;
    let ht= entities.chicken1.ht;

    let stX=entities.rnb1.posX;
    let stY=entities.rnb1.posY;

    wrld1.gravity.y=0.008;

    entities.chicken1.body = Matter.Bodies.rectangle(stX+(wd*0), stY, wd, ht, { mass: 200 });
    Matter.Body.setStatic(entities.chicken1.body, true);
    Matter.World.add(wrld1, entities.chicken1.body);

    entities.chicken2.body = Matter.Bodies.rectangle(stX+(wd*1)+1, stY-wd*0.45, wd, ht, { mass: 200 });
    Matter.Body.setStatic(entities.chicken2.body, true);
    Matter.World.add(wrld1, entities.chicken2.body);

    entities.chicken3.body = Matter.Bodies.rectangle(stX+(wd*2)+2, stY-wd*0.45, wd, ht, { mass: 200 });
    Matter.Body.setStatic(entities.chicken3.body, false);
    Matter.World.add(wrld1, entities.chicken3.body);

    entities.chicken4.body = Matter.Bodies.rectangle(stX+(wd*3)+3, stY, wd, ht, { mass: 200 });
    Matter.Body.setStatic(entities.chicken4.body, true);
    Matter.World.add(wrld1, entities.chicken4.body);



    entities.catapult5.body = Matter.Bodies.rectangle(entities.store.wd/2,  entities.ground1.posY-120, entities.catapult5.wd, entities.catapult5.ht/3, { mass: 200 });
    Matter.Body.setStatic(entities.catapult5.body, false);
    Matter.World.add(wrld1, entities.catapult5.body);

      //  entities.pillar.posX=entities.plank.body.position.x-entities.pillar.WIDTH/2;
  //  entities.pillar.posY=entities.plank.body.position.y-entities.pillar.WIDTH/4;

 

  
   // let elevation =120;//entities.pillar.HEIGHT- entities.pillar.WIDTH/4;
   // entities.plank.body = Matter.Bodies.rectangle(entities.store.wd/2, entities.ground1.posY-elevation, entities.plank.wd, entities.plank.hd);
    //Matter.Body.setStatic(entities.plank.body, false);
   
    //var prbody = Matter.Bodies.rectangle(entities.plank.body.position.x-(entities.plank.wd/2)+(entities.pillar.WIDTH*0.42), entities.plank.body.position.y+(entities.pillar.ht/1.8), entities.plank.ht/2.5, entities.plank.ht);
    //var groupNonColiding=Matter.Body.nextGroup(true);
    //var constr0=Matter.Constraint.create({bodyA: entities.plank.body, bodyB:prbody ,stiffness: 1,length:0});
    
    //const axPs=Matter.Vector.clone(entities.plank.body.position)-(entities.plank.hd*0.3); 
    //const constr1=Matter.Constraint.create({bodyA: entities.plank.body, pointB: axPs,stiffness: 1,length: 0});

   //Matter.World.add(wrld1, entities.plank.body);
 //   Matter.Composite.add(wrld1, prbody);
   // Matter.Composite.add(wrld1, constr0);
   // Matter.Composite.add(wrld1, constr1);



  //  entities.pillar.posX=entities.plank.body.position.x-entities.pillar.WIDTH/2;
  //  entities.pillar.posY=entities.plank.body.position.y-entities.pillar.WIDTH/4;

  //  let bcX=entities.plank.body.position.x-(entities.plank.wd/2)+(entities.plank.ht/3);
  //  let bcY=entities.plank.body.position.y-100;
    
 //   entities.bolt.body = Matter.Bodies.rectangle(bcX, bcY, entities.bolt.wd, entities.bolt.wd, { mass: 20 });
//    Matter.Body.setStatic(entities.bolt.body, false);
//    Matter.Composite.add(wrld1, entities.bolt.body);
    
    
    var ground = Matter.Bodies.rectangle(entities.ground1.posX+(entities.ground1.WIDTH/2), entities.ground1.posY+(entities.ground1.HEIGHT/2), entities.ground1.WIDTH, entities.ground1.HEIGHT);
    Matter.Body.setStatic(ground, true);
    Matter.World.add(wrld1, ground);




    Matter.Engine.run(engine);

    da = false;
    console.log("done?");
    return entities;
  }

  Matter.Engine.update(engine, time.delta);
  entities.chicken1.refresh++;
  entities.chicken2.refresh++;
  entities.chicken3.refresh++;
  entities.chicken4.refresh++;

  entities.catapult5.refresh++;

 // console.log(""+entities.plank.body.angle);
 // entities.plank.refresh++;
//  entities.bolt.refresh++;

  return entities;
};



export { Physics };