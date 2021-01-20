const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var thunder, thunder1,thunder2,thunder3,thunder4;

var engine, world;
var drops = [];
var rand;

var maxDrops=100;

var thunderCreatedFrame=0;

var backgroundImage;

var dropSound, thunderSound;

function preload(){

    thunder1 = loadImage("1.png");
    thunder2 = loadImage("2.png");
    thunder3 = loadImage("3.png");
    thunder4 = loadImage("4.png");
    backgroundImage = loadImage("background.png");
    dropSound = loadSound("drop.mp3");
    thunderSound = loadSound("thunder.mp3");

}

function setup(){
    engine = Engine.create();
    world = engine.world;

    createCanvas(600,700);
    umbrella = new Umbrella(300,500);

    if(frameCount % 150 === 0){

        for(var i=0; i < maxDrops; i++){
            drops.push(new Drop(random(0,600), random(0,400)));
        }

        dropSound.loop();
        loop = true;

    }
    
}

function draw(){
    Engine.update(engine);

    background(backgroundImage); 

    rand = Math.round(random(1,4));
    if(frameCount%30===0){
        thunderCreatedFrame=frameCount;
        thunder = createSprite(random(50,550), random(10,30), 10, 10);
        switch(rand){
            case 1: thunder.addImage(thunder1);
            break;
            case 2: thunder.addImage(thunder2);
            break; 
            case 3: thunder.addImage(thunder3);
            break;
            case 4: thunder.addImage(thunder4);
            break;
            default: break;
        }
        thunder.scale = random(0.5,1);
        thunderSound.loop();
        loop = true;
    }

    if(thunderCreatedFrame + 10 ===frameCount && thunder){
        thunder.destroy();
    }

    umbrella.display();

    for(var i = 0; i<maxDrops; i++){
        drops[i].showDrop();
        drops[i].updateY();
        
    }

    drawSprites();
}   

