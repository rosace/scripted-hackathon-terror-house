var personImage, flashlightImage, monsterImage, swordImage;
function preload(){
  personImage = loadImage("https://cdn.glitch.com/c3191bd8-d60a-4995-8650-5fdc6994a975%2Fstickfiguer.png?1522014917028");
  flashlightImage = loadImage("https://cdn.glitch.com/c3191bd8-d60a-4995-8650-5fdc6994a975%2Fbanner_image.png?1522015803157");
  monsterImage = loadImage("https://cdn.glitch.com/c3191bd8-d60a-4995-8650-5fdc6994a975%2Feda0e9c540f47c2180655f611b32cb16.png?1522017461050")
  swordImage = loadImage ("https://cdn.glitch.com/c3191bd8-d60a-4995-8650-5fdc6994a975%2Fsword.png?1522016246042");

}

var distance = 10;
var GREY = '#222';
var GREEN = '#556B2F';
var isLightOn = false;
var runOnce = false;
var hasSword = false;

var personSprite, flashlightSprite, monsterSprite, swordSprite;
function setup() {
  createCanvas(1200, 1200);
  
  // person sprite  
  personSprite = createSprite(100, 100, 100, 100);
  personSprite.addImage(personImage);
  
  // flashlight sprite
  flashlightSprite = createSprite(500, 200, 100, 100);             
  flashlightSprite.addImage(flashlightImage)
  
  //sword image
  swordImage;
  
  //create a sprite with a placeholder rectangle as visual component
  //boxSprite = createSprite(300, 150, 50, 100);
  //change the color of the placeholder
  //boxSprite.shapeColor = color(222, 125, 2);  
}
function draw() {
  background(isLightOn ? GREEN : GREY);
  
  if(keyDown(DOWN_ARROW)) {
    personSprite.position.y = personSprite.position.y + distance
  }
  if(keyDown(UP_ARROW)) {
    personSprite.position.y = personSprite.position.y - distance
  }
  if(keyDown(LEFT_ARROW)) {
   personSprite.position.x = personSprite.position.x - distance
  }
  if(keyDown(RIGHT_ARROW)) {
   personSprite.position.x = personSprite.position.x + distance
  }
  drawSprites();
  
  // this happens when you touch the flashlight
  if(flashlightSprite && personSprite.overlap(flashlightSprite)) {
    alert('Congrats! You found the FLASHLIGHT!'); 
    flashlightSprite.position.x = -1000;
    flashlightSprite.position.y = -1000;
    isLightOn = true;
    runOnce = true;
  }
  
  // happens once after you find the flashlight
  if (runOnce) {
    runOnce = false;
    monsterSprite = createSprite(700, 700);
    monsterSprite.addImage (monsterImage);
    swordSprite = createSprite(200, 1000, 100, 100);
    swordSprite.addImage (swordImage);
  }
  
  // this happens when you touch the monster
  if(monsterSprite && personSprite.overlap(monsterSprite)) {
    var answer = window.prompt('FIGHT or RUN?');
    if (answer.toUpperCase() === 'FIGHT' && hasSword) {
      alert('YOU WIN!')
      monsterSprite.position.x = -1000
      monsterSprite.position.y = -1000
    } else {
      personSprite.position.x = 100;
      personSprite.position.y = 100;
    }
  }
  
  if (swordSprite && personSprite.overlap(swordSprite)) {
      alert('CONGRATS! You found the sword!')
      swordSprite.position.x = -1000
      swordSprite.position.y = -1000
      hasSword = true;
  }
  
}

function moveSprite(sprite, x, y) {
  sprite.position.x = x;
  sprite.position.y = y;
}


function mousePressed() {
  personSprite.position.x = mouseX;
  personSprite.position.y = mouseY;
}
 