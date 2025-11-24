let scene,car;


window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  car = document.getElementById("car");
  car.x = 5;
  car.dx = -0.1;
  car.move = false;
  car.addEventListener("click",function(){
    car.move = true;
  });

  rocket = document.getElementById("rocket");
  rocket.y = 3
  rocket.dy = 0.03;
  rocket.addEventListener("click",function(){
    rocket.fly = true;
  });
      
  loop();
});

function loop(){
  if(car.move){
    car.x += car.dx;
    car.setAttribute("position",{x:car.x, y:0.2, z:-2});
  };
  
  if(rocket.fly){
    rocket.y += rocket.dy; 
    rocket.setAttribute("position",{x:-8, y:rocket.y, z: -2});
  };
  window.requestAnimationFrame(loop);
};