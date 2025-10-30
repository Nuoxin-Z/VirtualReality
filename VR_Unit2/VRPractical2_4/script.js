let rnd = (l,u) => Math.floor(Math.random()*(u-l) + l);
let scene;
let rockets = [];

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene"); 
  

  let grid



//Challenge 3
//1) Create 100 rockets in a grid pattern on the X-Z plane just below the plane.  Provide each rocket an appropriate random y coordinate below the plane.
//2) Animate each rocket “launching”. 

for(let i=0; i<10; i++){
  for(let j=0; j<10; j++){
    let rx = i - 5;
    let rz = j - 5;
    let ry = rnd(-5,0);
    let r = new rocket(rx, ry, rz);
    rockets.push(r);
  }
}



  loop();
})

function loop(){
  for (let i=0; i<rockets.length; i++){
    let rocket = rockets[i];
  if(rocket.y<0 && rnd(1,100)===1){
    rocket.speed = rnd(10,50)/1000;
  }
    rockets.launch();
  }
  
  window.requestAnimationFrame( loop );
}
