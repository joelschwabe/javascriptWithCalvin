
var ctx,
 canvas,
 level,
 timer,
 fps = 60,
 carHeight = 150,
 carWidth = 70,
 carX,
 carY,
 rightPressed = false
 leftPressed = false,
 upPressed = false,
 downPressed = false,
 carAccel = 0,
 accelUp = false,
 accelDown = false,
  accelLeft = false,
  accelRight = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
  else if(e.keyCode == 38) {
      upPressed = true;
  }
  else if(e.keyCode == 40) {
      downPressed = true;
  }
}
function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
  else if(e.keyCode == 38) {
      upPressed = false;
  }
  else if(e.keyCode == 40) {
      downPressed = false;
  }
}

function car( xloc, yloc ,type,xspeed,yspeed){
  this.x = xloc;
  this.y = yloc;
  this.type = type;
  this.speedx = xspeed;
  this.speedy = yspeed;
}

function startCanvas(){
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  level = 1;
  carX = (canvas.width-carWidth)/2;
  carY = canvas.width-carHeight;
  //draw(false);
  timer = setInterval(function() {draw(true)}, (1000/fps));
}

function draw(active) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground(document.getElementById("level0"));
  drawCar();
  handleInputs();
}

function drawBackground(level){
  ctx.drawImage(level, 0,0,canvas.width,canvas.height);
}

function drawCar(){
  ctx.drawImage(document.getElementById("car0"), carX,carY,carWidth, carHeight);
}

function handleInputs(){
  if(rightPressed && carX < canvas.width-carWidth) {
    carAccel += 1;
    accelRight = true;
    accelLeft = false;
    carX += 2 + carAccel;
  }
  else if(leftPressed && carX > 0) {
    carAccel += 1;
    accelLeft = true;
    accelRight = false;
    carX -= 2 + carAccel;
  }
  else if(downPressed && carY < canvas.height-carHeight) {
    carAccel += 1;
    accelUp = true;
    accelDown = false;
    carY += 2 + carAccel;
  }
  else if(upPressed && carY > 0) {
    carAccel += 1;
    accelLeft = true;
    accelRight = false;
    carY -= 2 + carAccel;
  }
  else{
    if(carAccel > 1){
      carAccel -= 2;
    }
    accelLeft = false;
    accelRight = false;
    accelDown = false;
    accelUp = false;
  }
}

function stopGame(outcome){
  clearInterval(timer);
  draw(false);
}

startCanvas();
