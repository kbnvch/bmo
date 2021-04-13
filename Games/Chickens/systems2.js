import Matter from 'matter-js';

var da = true;
const Physics = (entities, { time }) => {
  if (da && entities.chicken1) {
    //Matter.Engine.clear(restart.physics.engine);
    entities.chicken1.engine = Matter.Engine.create({ enableSleeping: true });
    let wrld1 = entities.chicken1.engine.world;
    let wd= entities.chicken1.wd;
    let ht= entities.chicken1.ht;


    entities.chicken1.body = Matter.Bodies.rectangle(0+(wd*0)/2, 0, wd, ht, { mass: 200 });
    Matter.World.add(wrld1, [entities.chicken1.body]);

    entities.chicken2.body = Matter.Bodies.rectangle(0+(wd*1)/2, 0, wd, ht, { mass: 200 });
    Matter.World.add(wrld1, [entities.chicken2.body]);

    entities.chicken3.body = Matter.Bodies.rectangle(0+(wd*2)/2, 0, wd, ht, { mass: 200 });
    Matter.World.add(wrld1, [entities.chicken3.body]);

    entities.chicken4.body = Matter.Bodies.rectangle(0+(wd*3)/2, 0, wd, ht, { mass: 200 });
    Matter.World.add(wrld1, [entities.chicken4.body]);

    




   // Matter.Engine.run(entities.chicken1.engine);

    da = false;
    console.log("done?");
    return entities;
  }
  let engine = entities.chicken1.engine;
  engine.world.gravity.y = 0.1;
 // console.log("" + entities.chicken1.body.position.y);

  //Matter.Engine.update(engine, time.delta);
  entities.chicken1.refresh++;
  entities.chicken2.refresh++;
  entities.chicken3.refresh++;
  entities.chicken4.refresh++;

  return entities;
};



export { Physics };